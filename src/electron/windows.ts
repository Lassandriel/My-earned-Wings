/**
 * Window management for the Electron main process.
 *
 * Owns the two top-level BrowserWindows (game + devtools) and the
 * shared preload-path resolution. Other modules read the current
 * windows via getMainWindow / getDevtoolsWindow rather than holding
 * their own references, so window lifecycle stays in one place.
 */

import { BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;
let devtoolsWindow: BrowserWindow | null = null;

/**
 * Resolve the compiled preload location.
 * In dev, main.ts runs from src/electron/ via tsx; preload.js is built
 * into dist_electron/. In a packaged build, both files live next to
 * each other in dist_electron/. Existence check picks whichever is
 * current.
 */
export const resolvePreloadPath = (): string => {
  const sibling = path.join(__dirname, 'preload.js');
  if (fs.existsSync(sibling)) return sibling;
  return path.join(__dirname, '..', '..', 'dist_electron', 'preload.js');
};

export const getMainWindow = (): BrowserWindow | null => mainWindow;
export const getDevtoolsWindow = (): BrowserWindow | null => devtoolsWindow;

export function createMainWindow() {
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

  return mainWindow;
}

export function openDevtoolsWindow() {
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
}

/** Close the devtools window if open. Used on main-window close + before-quit. */
export function closeDevtoolsWindow() {
  if (devtoolsWindow && !devtoolsWindow.isDestroyed()) {
    devtoolsWindow.close();
  }
}
