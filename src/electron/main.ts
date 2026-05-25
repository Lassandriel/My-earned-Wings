import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import yaml from 'js-yaml';
import { IpcChannel, SaveSlotPayload, RuntimeAddonDiscoveryResult, RuntimeAddonPayload } from './ipc.js';
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
    // index.html lives next to main.js inside the packaged asar
    // (dist/index.html, main.js both at the asar root). The historic
    // `..` was needed when finalize-electron-build.cjs's overwritten
    // package.json placed main.js one level deeper — that's no longer
    // the case. Try the flat layout first, fall back to the legacy
    // path so a partially-stale build directory still launches.
    const flat = path.join(__dirname, 'dist', 'index.html');
    const legacy = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(fs.existsSync(flat) ? flat : legacy);
  }

  // Debug aid: open DevTools when the .exe is launched with --devtools so the
  // packaged build can be diagnosed without rebuilding. (`--debug` is reserved
  // by Electron's argv parser and triggers a deprecation warning — use a
  // name Electron doesn't try to intercept.) Pre-release public builds
  // should drop this argv check.
  if (process.argv.includes('--devtools') || process.argv.includes('--debug')) {
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
    // Same layout discovery as the main window above.
    const flat = path.join(__dirname, 'dist', 'devtools.html');
    const legacy = path.join(__dirname, '..', 'dist', 'devtools.html');
    devtoolsWindow.loadFile(fs.existsSync(flat) ? flat : legacy);
  }
  devtoolsWindow.on('closed', () => {
    devtoolsWindow = null;
  });
});

// ─── Phase 16: Runtime addon discovery ──────────────────────────────────────
//
// End users of the packaged .exe can drop YAML-only addons into folders
// the loader picks up at boot. We scan, in order:
//   1. <exe-dir>/addons/          — primary, what the README points to
//   2. <resourcesPath>/addons/    — fallback bundled in the build for examples
// In dev mode neither is scanned (build-time addons under
// content/addons/<name>/ already handle the dev workflow).
//
// Each <addon>/ folder must contain manifest.yaml. We parse the same
// 10 content categories the build script understands, plus i18n/ and
// views/. handlers.ts is intentionally NOT loaded — TS handlers require
// a build step. Runtime addons are pure data.

const RUNTIME_ADDON_CATEGORIES = [
  'resources', 'modifiers', 'actions', 'items', 'npcs',
  'buffs', 'homes', 'milestones', 'navigation', 'titles',
  'sections', 'subTabs',
] as const;

const ADDON_NAME_PATTERN = /^[a-z][a-z0-9_-]*$/;
const ADDON_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

const runtimeAddonScanDirs = (): string[] => {
  const dirs: string[] = [];
  try {
    // Path next to the .exe — the user-facing drop location. Works for
    // both portable and dir-target builds.
    const exeDir = path.dirname(app.getPath('exe'));
    dirs.push(path.join(exeDir, 'addons'));
  } catch {
    // app.getPath may throw in odd contexts; ignore.
  }
  try {
    // resourcesPath is undefined in dev (electron not packaged). Skip then.
    const rp = (process as any).resourcesPath as string | undefined;
    if (rp && typeof rp === 'string') {
      const candidate = path.join(rp, 'addons');
      if (!dirs.includes(candidate)) dirs.push(candidate);
    }
  } catch {
    // ignore
  }
  return dirs;
};

const loadAddonYamlDir = (
  dir: string,
  warnings: string[],
  addonName: string,
  category: string,
): any[] => {
  if (!fs.existsSync(dir)) return [];
  const out: any[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(dir, file);
    try {
      const parsed = yaml.load(fs.readFileSync(full, 'utf8'));
      if (!Array.isArray(parsed)) {
        warnings.push(`[${addonName}/${category}/${file}] expected an array, skipped`);
        continue;
      }
      for (const entry of parsed) {
        if (!entry || typeof entry !== 'object' || typeof (entry as any).id !== 'string') {
          warnings.push(`[${addonName}/${category}/${file}] entry missing string "id", skipped`);
          continue;
        }
        out.push(entry);
      }
    } catch (err) {
      warnings.push(`[${addonName}/${category}/${file}] parse error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonTranslations = (
  i18nDir: string,
  warnings: string[],
  addonName: string,
): Record<string, Record<string, Record<string, string>>> => {
  const out: Record<string, Record<string, Record<string, string>>> = {};
  if (!fs.existsSync(i18nDir)) return out;
  for (const lang of fs.readdirSync(i18nDir)) {
    const langDir = path.join(i18nDir, lang);
    let st: fs.Stats;
    try { st = fs.statSync(langDir); } catch { continue; }
    if (!st.isDirectory()) continue;
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) {
      warnings.push(`[${addonName}/i18n] invalid lang folder "${lang}", skipped`);
      continue;
    }
    out[lang] = {};
    for (const file of fs.readdirSync(langDir).filter((f) => /\.ya?ml$/.test(f))) {
      const ctx = file.replace(/\.ya?ml$/, '');
      try {
        const parsed = yaml.load(fs.readFileSync(path.join(langDir, file), 'utf8'));
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          out[lang]![ctx] = parsed as Record<string, string>;
        } else {
          warnings.push(`[${addonName}/i18n/${lang}/${file}] expected an object, skipped`);
        }
      } catch (err) {
        warnings.push(`[${addonName}/i18n/${lang}/${file}] parse error: ${(err as Error).message}`);
      }
    }
  }
  return out;
};

const loadAddonStyles = (
  stylesDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(stylesDir)) return out;
  for (const file of fs.readdirSync(stylesDir)) {
    if (!file.endsWith('.css')) continue;
    try {
      out[file] = fs.readFileSync(path.join(stylesDir, file), 'utf8');
    } catch (err) {
      warnings.push(`[${addonName}/styles/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonSlots = (
  slotsDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(slotsDir)) return out;
  for (const file of fs.readdirSync(slotsDir)) {
    if (!file.endsWith('.html')) continue;
    const slotId = file.replace(/\.html$/, '');
    try {
      out[slotId] = fs.readFileSync(path.join(slotsDir, file), 'utf8').trim();
    } catch (err) {
      warnings.push(`[${addonName}/slots/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const SFX_EXT_RE = /\.(mp3|ogg|wav|m4a)$/i;
const SFX_MIME: Record<string, string> = {
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  m4a: 'audio/mp4',
};

const loadAddonSfx = (
  sfxDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(sfxDir)) return out;
  for (const file of fs.readdirSync(sfxDir)) {
    const m = file.match(SFX_EXT_RE);
    if (!m) continue;
    const ext = m[1]!.toLowerCase();
    const mime = SFX_MIME[ext] ?? 'application/octet-stream';
    try {
      // Encode the audio bytes as a data: URL so the renderer can play
      // them with a plain `new Audio(src)` — no extra file-protocol or
      // session-handler glue needed. Cost: ~1.33x size vs raw file in
      // memory while the addon is loaded. Acceptable for short SFX
      // (a few hundred KB tops). If users start shipping music here,
      // we'll switch to a session.protocol.handle() for streaming.
      const bytes = fs.readFileSync(path.join(sfxDir, file));
      out[file] = `data:${mime};base64,${bytes.toString('base64')}`;
    } catch (err) {
      warnings.push(`[${addonName}/sfx/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonViews = (
  viewsDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(viewsDir)) return out;
  for (const file of fs.readdirSync(viewsDir)) {
    if (!file.endsWith('.html')) continue;
    const viewName = file.replace(/\.html$/, '');
    if (!/^[a-z0-9_-]+$/.test(viewName)) {
      warnings.push(`[${addonName}/views/${file}] view name must match [a-z0-9_-]+, skipped`);
      continue;
    }
    try {
      const body = fs.readFileSync(path.join(viewsDir, file), 'utf8');
      const viewId = `${addonName}/${viewName}`;
      // Same wrapper the build script writes for build-time view fragments.
      out[viewName] =
        `<!-- ${viewId} (runtime addon) -->\n` +
        `<section class="view-section" x-show="$store.game.view === '${viewId}'" x-transition:enter="view-enter">\n` +
        body.trim() + `\n</section>`;
    } catch (err) {
      warnings.push(`[${addonName}/views/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonPatchesDir = (
  dir: string,
  warnings: string[],
  addonName: string,
): any[] => {
  if (!fs.existsSync(dir)) return [];
  const out: any[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(dir, file);
    try {
      const parsed = yaml.load(fs.readFileSync(full, 'utf8'));
      if (!Array.isArray(parsed)) {
        warnings.push(`[${addonName}/patches/${file}] expected an array, skipped`);
        continue;
      }
      // Don't validate patch shape here — the renderer's patch engine
      // owns the schema. Main process just hands raw objects through.
      for (const entry of parsed) {
        if (entry && typeof entry === 'object') out.push(entry);
      }
    } catch (err) {
      warnings.push(`[${addonName}/patches/${file}] parse error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadOneRuntimeAddon = (
  dir: string,
  folderName: string,
  warnings: string[],
): RuntimeAddonPayload | null => {
  const manifestPath = path.join(dir, 'manifest.yaml');
  if (!fs.existsSync(manifestPath)) {
    warnings.push(`[${folderName}] missing manifest.yaml — skipped`);
    return null;
  }
  let manifest: any;
  try {
    manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    warnings.push(`[${folderName}] manifest.yaml parse error: ${(err as Error).message}`);
    return null;
  }
  if (!manifest || typeof manifest !== 'object') {
    warnings.push(`[${folderName}] manifest.yaml is not an object — skipped`);
    return null;
  }
  const name = manifest.name;
  const version = manifest.version;
  if (typeof name !== 'string' || !ADDON_NAME_PATTERN.test(name)) {
    warnings.push(`[${folderName}] manifest.name "${name}" invalid (must match ${ADDON_NAME_PATTERN}) — skipped`);
    return null;
  }
  if (typeof version !== 'string' || !ADDON_VERSION_PATTERN.test(version)) {
    warnings.push(`[${folderName}] manifest.version "${version}" invalid (must be MAJOR.MINOR.PATCH) — skipped`);
    return null;
  }
  if (name !== folderName) {
    warnings.push(`[${folderName}] folder name does not match manifest.name "${name}" — skipped`);
    return null;
  }

  const data: Record<string, any[]> = {};
  for (const category of RUNTIME_ADDON_CATEGORIES) {
    const items = loadAddonYamlDir(path.join(dir, category), warnings, name, category);
    if (items.length > 0) data[category] = items;
  }
  const translations = loadAddonTranslations(path.join(dir, 'i18n'), warnings, name);
  const views = loadAddonViews(path.join(dir, 'views'), warnings, name);
  const styles = loadAddonStyles(path.join(dir, 'styles'), warnings, name);
  const slots = loadAddonSlots(path.join(dir, 'slots'), warnings, name);
  const sfx = loadAddonSfx(path.join(dir, 'sfx'), warnings, name);
  const patches = loadAddonPatchesDir(path.join(dir, 'patches'), warnings, name);

  return {
    name,
    version,
    description: typeof manifest.description === 'string' ? manifest.description : undefined,
    author: typeof manifest.author === 'string' ? manifest.author : undefined,
    requires: Array.isArray(manifest.requires)
      ? (manifest.requires as unknown[]).filter((r): r is string => typeof r === 'string')
      : undefined,
    sourceDir: dir,
    data,
    translations,
    views,
    styles,
    slots,
    sfx,
    patches,
  };
};

const discoverRuntimeAddons = (): RuntimeAddonDiscoveryResult => {
  const result: RuntimeAddonDiscoveryResult = {
    scannedDirs: [],
    addons: [],
    warnings: [],
  };
  // Dev mode: don't scan anything. Build-time addons under
  // content/addons/<name>/ already cover the developer workflow.
  if (process.env.NODE_ENV === 'development') return result;

  const seenNames = new Set<string>();
  for (const scanDir of runtimeAddonScanDirs()) {
    result.scannedDirs.push(scanDir);
    if (!fs.existsSync(scanDir)) continue;
    let entries: string[];
    try { entries = fs.readdirSync(scanDir); } catch (err) {
      result.warnings.push(`could not read ${scanDir}: ${(err as Error).message}`);
      continue;
    }
    for (const folderName of entries.sort()) {
      if (folderName.startsWith('_') || folderName.startsWith('.')) continue;
      const full = path.join(scanDir, folderName);
      let st: fs.Stats;
      try { st = fs.statSync(full); } catch { continue; }
      if (!st.isDirectory()) continue;

      if (seenNames.has(folderName)) {
        result.warnings.push(`[${folderName}] already loaded from an earlier scan path — duplicate at ${full} ignored`);
        continue;
      }
      const addon = loadOneRuntimeAddon(full, folderName, result.warnings);
      if (addon) {
        result.addons.push(addon);
        seenNames.add(folderName);
      }
    }
  }
  result.addons.sort((a, b) => a.name.localeCompare(b.name));
  return result;
};

/**
 * Open the user-facing runtime-addons folder in the OS file manager.
 * If it doesn't exist yet, create the primary one (next-to-exe path)
 * before opening — saves the player a "folder doesn't exist" error
 * the first time they install an addon.
 *
 * Returns the path that was opened so the renderer can show it in
 * a toast / log line.
 */
ipcMain.handle(IpcChannel.ADDONS_OPEN_FOLDER, async (): Promise<{ ok: boolean; path?: string; error?: string }> => {
  const dirs = runtimeAddonScanDirs();
  if (dirs.length === 0) {
    return { ok: false, error: 'No runtime addons path available (dev mode?)' };
  }
  // Prefer an existing dir; if none exist, create the first candidate.
  let target = dirs.find((d) => fs.existsSync(d));
  if (!target) {
    target = dirs[0]!;
    try {
      fs.mkdirSync(target, { recursive: true });
    } catch (err) {
      return { ok: false, error: `mkdir failed: ${(err as Error).message}` };
    }
  }
  try {
    await shell.openPath(target);
    return { ok: true, path: target };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
});

ipcMain.handle(IpcChannel.ADDONS_DISCOVER_RUNTIME, async (): Promise<RuntimeAddonDiscoveryResult> => {
  const result = discoverRuntimeAddons();
  console.log(
    `[runtime-addons] scanned ${result.scannedDirs.length} dir(s), found ${result.addons.length} addon(s): ` +
      (result.addons.map((a) => `${a.name}@${a.version}`).join(', ') || '(none)') +
      (result.warnings.length ? ` — ${result.warnings.length} warning(s)` : ''),
  );
  for (const dir of result.scannedDirs) console.log(`  scan: ${dir}`);
  for (const w of result.warnings.slice(0, 10)) console.log(`  warn: ${w}`);
  return result;
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
