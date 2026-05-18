import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import yaml from 'js-yaml';
import { IpcChannel, SaveSlotPayload } from './ipc.js';
import { saveSlot, loadSlot, listSlots, deleteSlot, close as closeDb } from './db.js';

// __dirname is provided by CommonJS at runtime — no import.meta dance needed.

let mainWindow: BrowserWindow | null;
let devtoolsWindow: BrowserWindow | null = null;
let activeContentScript: ReturnType<typeof spawn> | null = null;

// Resolve the compiled preload location.
// In dev, main.ts runs from src/electron/ via tsx; preload.js is built into
// dist_electron/. In a packaged build, both files live next to each other in
// dist_electron/. Existence check picks whichever is current.
const resolvePreloadPath = (): string => {
  const sibling = path.join(__dirname, 'preload.js');
  if (fs.existsSync(sibling)) return sibling;
  return path.join(__dirname, '..', '..', 'dist_electron', 'preload.js');
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1075,
    minWidth: 960,
    minHeight: 537,
    useContentSize: true,
    resizable: true,
    frame: true,
    autoHideMenuBar: true,
    show: false, // Wait for ready-to-show
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // preload uses relative require('./ipc.js')
      preload: resolvePreloadPath(),
    },
    backgroundColor: '#0f172a',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    // __dirname in the packaged build is .../app.asar/dist_electron/.
    // index.html lives at .../app.asar/dist/index.html — one level up.
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  // Debug aid: open DevTools when the .exe is launched with --debug so the
  // packaged build can be diagnosed without rebuilding. Pre-release public
  // builds should drop this argv check.
  if (process.argv.includes('--debug')) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Once the main window is ready to show, show it
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.center();
    }
  });

  mainWindow.on('close', () => {
    if (devtoolsWindow && !devtoolsWindow.isDestroyed()) {
      devtoolsWindow.close();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Single Instance Logic
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

ipcMain.on(IpcChannel.QUIT_APP, () => {
  app.quit();
});

ipcMain.on(IpcChannel.RESIZE_WINDOW, (_event, width: number, height: number) => {
  if (mainWindow) {
    mainWindow.setContentSize(width, height, true);
    mainWindow.center();
  }
});

// --- Phase 3: SQLite save system (sql.js, all handlers async) ---
ipcMain.handle(IpcChannel.DB_SAVE, async (_event, payload: SaveSlotPayload): Promise<boolean> => {
  return saveSlot(payload.slot, payload.playerName, payload.data, payload.totalPlayTime);
});

ipcMain.handle(IpcChannel.DB_LOAD, async (_event, slot: number) => {
  const row = await loadSlot(slot);
  if (!row) return null;
  return {
    slot: row.slot,
    playerName: row.player_name,
    data: row.data,
    schemaVersion: row.schema_version,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    totalPlayTime: row.total_play_time,
  };
});

ipcMain.handle(IpcChannel.DB_LIST, async () => listSlots());

ipcMain.handle(IpcChannel.DB_DELETE, async (_event, slot: number): Promise<boolean> => deleteSlot(slot));

// --- Phase 4 Iter 3: content authoring (read/write content/*.yaml) ---

/**
 * Project root resolves differently in dev (running from src) vs packaged.
 * In dev, app.getAppPath() returns the project root. In packaged, it
 * points inside app.asar — content/ files would not be writable. We
 * limit content authoring to dev mode.
 */
const projectRoot = (): string => app.getAppPath();
const isContentAuthoringAllowed = () => process.env.NODE_ENV === 'development';

// Map dev-tools tab name → content/<dir>. Translations excluded — special format.
const ENTITY_DIR_MAP: Record<string, string> = {
  actions: 'actions',
  items: 'items',
  npcs: 'npcs',
  modifiers: 'modifiers',
  buffs: 'buffs',
  homes: 'homes',
  milestones: 'milestones',
  navigation: 'navigation',
  titles: 'titles',
  resources: 'resources',
};

/** Find which YAML file in content/<dir>/ contains the given id. Supports array and record formats. */
const findEntityFile = (entityType: string, id: string): string | null => {
  const dir = ENTITY_DIR_MAP[entityType.toLowerCase()];
  if (!dir) return null;
  const contentDir = path.join(projectRoot(), 'content', dir);
  if (!fs.existsSync(contentDir)) return null;
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(contentDir, file);
    try {
      const text = fs.readFileSync(full, 'utf8');
      const parsed = yaml.load(text);
      if (Array.isArray(parsed)) {
        if (parsed.some((e: any) => e && e.id === id)) {
          return path.join('content', dir, file);
        }
      } else if (parsed && typeof parsed === 'object' && id in (parsed as object)) {
        return path.join('content', dir, file);
      }
    } catch {
      // ignore unreadable file
    }
  }
  return null;
};

ipcMain.handle(IpcChannel.CONTENT_FIND, async (_event, entityType: string, id: string): Promise<string | null> => {
  return findEntityFile(entityType, id);
});

ipcMain.handle(IpcChannel.CONTENT_READ, async (_event, relativePath: string): Promise<string | null> => {
  if (!isContentAuthoringAllowed()) return null;
  const safe = path.normalize(relativePath).replace(/^([./\\]+)/, '');
  if (!safe.startsWith('content' + path.sep) && !safe.startsWith('content/')) return null;
  const full = path.join(projectRoot(), safe);
  try {
    return fs.readFileSync(full, 'utf8');
  } catch (err) {
    console.error('[CONTENT_READ] failed:', err);
    return null;
  }
});

/**
 * Patch a single entity in any YAML file under content/<dir>/.
 * Handles both array form (`- id: foo\n  ...`) and record form (`foo: { ... }`).
 * `patch` keys with value === null|undefined are deleted from the entity.
 */
const writeEntityPatch = (
  entityType: string,
  id: string,
  patch: Record<string, unknown>,
): { ok: boolean; error?: string } => {
  if (!isContentAuthoringAllowed()) return { ok: false, error: 'Content authoring is dev-mode only.' };
  const rel = findEntityFile(entityType, id);
  if (!rel) return { ok: false, error: `'${id}' not found in content/${ENTITY_DIR_MAP[entityType.toLowerCase()] ?? entityType}/*.yaml` };
  const full = path.join(projectRoot(), rel);
  try {
    const text = fs.readFileSync(full, 'utf8');
    const parsed = yaml.load(text);
    const applyPatch = (target: Record<string, any>) => {
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === undefined) delete target[k];
        else target[k] = v;
      }
    };
    if (Array.isArray(parsed)) {
      const idx = parsed.findIndex((e: any) => e && e.id === id);
      if (idx < 0) return { ok: false, error: `'${id}' missing from ${rel} (file changed?)` };
      applyPatch(parsed[idx]);
    } else if (parsed && typeof parsed === 'object' && id in (parsed as object)) {
      applyPatch((parsed as any)[id]);
    } else {
      return { ok: false, error: `'${id}' missing from ${rel} (file changed?)` };
    }
    const newText = yaml.dump(parsed, { lineWidth: 100, sortKeys: false, noRefs: true });
    yaml.load(newText); // sanity-check round-trip
    fs.writeFileSync(full, newText, 'utf8');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
};

ipcMain.handle(IpcChannel.CONTENT_WRITE, async (
  _event,
  entityType: string,
  id: string,
  patch: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> => {
  return writeEntityPatch(entityType, id, patch);
});

/**
 * Write a single translation key into content/i18n/<lang>/<context>.yaml.
 * value === null deletes the key. Lang/context/key are validated to keep paths sandboxed.
 */
ipcMain.handle(IpcChannel.CONTENT_WRITE_TRANSLATION, async (
  _event,
  lang: string,
  context: string,
  key: string,
  value: string | null,
): Promise<{ ok: boolean; error?: string }> => {
  if (!isContentAuthoringAllowed()) return { ok: false, error: 'Content authoring is dev-mode only.' };
  if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) return { ok: false, error: `Invalid lang: ${lang}` };
  if (!/^[a-z][a-z0-9_-]*$/i.test(context)) return { ok: false, error: `Invalid context: ${context}` };
  if (typeof key !== 'string' || !key.trim()) return { ok: false, error: 'Empty key' };

  const rel = path.join('content', 'i18n', lang, `${context}.yaml`);
  const full = path.join(projectRoot(), rel);
  try {
    let parsed: Record<string, string> = {};
    if (fs.existsSync(full)) {
      const text = fs.readFileSync(full, 'utf8');
      const loaded = yaml.load(text);
      if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
        parsed = loaded as Record<string, string>;
      }
    }
    if (value === null || value === undefined) delete parsed[key];
    else parsed[key] = String(value);

    const header = `# Translations — ${lang}/${context}. Edited via dev-tools.\n`;
    const newText = header + yaml.dump(parsed, { lineWidth: 0, quotingType: '"', forceQuotes: false });
    yaml.load(newText); // round-trip sanity
    if (!fs.existsSync(path.dirname(full))) fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, newText, 'utf8');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
});

// Legacy channel — kept until renderer fully switches to CONTENT_WRITE.
ipcMain.handle(IpcChannel.CONTENT_WRITE_ACTION, async (
  _event,
  id: string,
  patch: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> => {
  return writeEntityPatch('actions', id, patch);
});

const runNpmScript = (script: string): Promise<{ ok: boolean; output: string }> =>
  new Promise((resolve) => {
    const child = spawn('npm.cmd', ['run', script], { cwd: projectRoot(), shell: false });
    activeContentScript = child;
    let out = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (out += d.toString()));
    child.on('close', (code) => {
      activeContentScript = null;
      resolve({ ok: code === 0, output: out });
    });
    child.on('error', (err) => {
      activeContentScript = null;
      resolve({ ok: false, output: err.message });
    });
  });

ipcMain.handle(IpcChannel.CONTENT_BUILD, async (): Promise<{ ok: boolean; output: string }> => {
  if (!isContentAuthoringAllowed()) return { ok: false, output: 'dev-only' };
  return runNpmScript('build:content');
});

ipcMain.handle(IpcChannel.CONTENT_VALIDATE, async (): Promise<{ ok: boolean; output: string }> => {
  if (!isContentAuthoringAllowed()) return { ok: false, output: 'dev-only' };
  return runNpmScript('check-all');
});

// --- Phase 4: Dev tools window ---
ipcMain.on(IpcChannel.OPEN_DEVTOOLS, () => {
  if (devtoolsWindow && !devtoolsWindow.isDestroyed()) {
    devtoolsWindow.focus();
    return;
  }
  devtoolsWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 500,
    autoHideMenuBar: true,
    backgroundColor: '#0f172a',
    title: 'My-earned-Wings · Dev Tools',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // preload uses relative require('./ipc.js')
      preload: resolvePreloadPath(),
    },
  });
  if (process.env.NODE_ENV === 'development') {
    devtoolsWindow.loadURL('http://localhost:5173/devtools.html');
  } else {
    // Same one-level-up dance as the main window's loadFile above.
    devtoolsWindow.loadFile(path.join(__dirname, '..', 'dist', 'devtools.html'));
  }
  devtoolsWindow.on('closed', () => {
    devtoolsWindow = null;
  });
});

app.on('before-quit', () => {
  if (activeContentScript && !activeContentScript.killed) {
    activeContentScript.kill();
    activeContentScript = null;
  }
  if (devtoolsWindow && !devtoolsWindow.isDestroyed()) {
    devtoolsWindow.close();
  }
});

app.on('window-all-closed', () => {
  closeDb();
  if (process.platform !== 'darwin') app.quit();
});
