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
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Once the main window is ready to show, show it
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.center();
    }
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

const findActionFile = (id: string): string | null => {
  const contentDir = path.join(projectRoot(), 'content', 'actions');
  if (!fs.existsSync(contentDir)) return null;
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.yaml')) continue;
    const full = path.join(contentDir, file);
    try {
      const text = fs.readFileSync(full, 'utf8');
      const parsed = yaml.load(text) as Record<string, any> | null;
      if (parsed && typeof parsed === 'object' && id in parsed) {
        return path.join('content', 'actions', file); // return relative
      }
    } catch {
      // ignore unreadable file
    }
  }
  return null;
};

ipcMain.handle(IpcChannel.CONTENT_FIND, async (_event, entityType: string, id: string): Promise<string | null> => {
  if (entityType !== 'actions') return null;
  return findActionFile(id);
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

ipcMain.handle(IpcChannel.CONTENT_WRITE_ACTION, async (
  _event,
  id: string,
  patch: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> => {
  if (!isContentAuthoringAllowed()) return { ok: false, error: 'Content authoring is dev-mode only.' };
  const rel = findActionFile(id);
  if (!rel) return { ok: false, error: `Action '${id}' not found in content/actions/*.yaml` };
  const full = path.join(projectRoot(), rel);
  try {
    const text = fs.readFileSync(full, 'utf8');
    const parsed = yaml.load(text) as Record<string, any>;
    if (!parsed || typeof parsed !== 'object' || !(id in parsed)) {
      return { ok: false, error: `'${id}' missing from ${rel} (file changed?)` };
    }
    // Apply patch — caller decides which fields to overwrite
    parsed[id] = { ...parsed[id], ...patch };
    const newText = yaml.dump(parsed, { lineWidth: 100, sortKeys: false, noRefs: true });
    // Validate by re-parsing the dumped output
    yaml.load(newText);
    fs.writeFileSync(full, newText, 'utf8');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
});

ipcMain.handle(IpcChannel.CONTENT_BUILD, async (): Promise<{ ok: boolean; output: string }> => {
  if (!isContentAuthoringAllowed()) return { ok: false, output: 'dev-only' };
  return new Promise((resolve) => {
    const child = spawn('npm.cmd', ['run', 'build:content'], {
      cwd: projectRoot(),
      shell: false,
    });
    let out = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (out += d.toString()));
    child.on('close', (code) => resolve({ ok: code === 0, output: out }));
    child.on('error', (err) => resolve({ ok: false, output: err.message }));
  });
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
    devtoolsWindow.loadFile(path.join(__dirname, 'dist/devtools.html'));
  }
  devtoolsWindow.on('closed', () => {
    devtoolsWindow = null;
  });
});

app.on('window-all-closed', () => {
  closeDb();
  if (process.platform !== 'darwin') app.quit();
});
