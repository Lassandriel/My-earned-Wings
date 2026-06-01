/**
 * Electron main process entry. Owns app lifecycle (single-instance,
 * ready, activate, before-quit, window-all-closed) and a small set of
 * window-control IPC handlers (QUIT_APP, RESIZE_WINDOW,
 * OPEN_DEVTOOLS). Everything domain-specific is split out into
 * sibling modules — windows.ts owns the BrowserWindow instances,
 * ipc/{save,content,runtime-addons}.ts each register their own
 * handlers via a single register* call from here.
 */

import { app, BrowserWindow, ipcMain } from 'electron';
import { IpcChannel } from './ipc.js';
import { close as closeDb } from './db.js';
import {
  createMainWindow,
  openDevtoolsWindow,
  closeDevtoolsWindow,
  getMainWindow,
} from './windows.js';
import { registerSaveIpc } from './ipc/save.js';
import { registerContentIpc, killActiveContentScript } from './ipc/content.js';
import { registerRuntimeAddonsIpc } from './ipc/runtime-addons.js';

// __dirname is provided by CommonJS at runtime — no import.meta dance needed.

// Single Instance Logic
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const win = getMainWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  });
}

// ─── Window-control IPC ─────────────────────────────────────────────
ipcMain.on(IpcChannel.QUIT_APP, () => {
  app.quit();
});

ipcMain.on(IpcChannel.RESIZE_WINDOW, (_event, width: number, height: number) => {
  const win = getMainWindow();
  if (win) {
    win.setContentSize(width, height, true);
    win.center();
  }
});

ipcMain.on(IpcChannel.OPEN_DEVTOOLS, () => {
  openDevtoolsWindow();
});

// ─── Domain IPC modules ─────────────────────────────────────────────
// Each registers its own ipcMain handlers; main.ts just calls them.
registerSaveIpc();
registerContentIpc();
registerRuntimeAddonsIpc();

// ─── Lifecycle cleanup ──────────────────────────────────────────────
app.on('before-quit', () => {
  killActiveContentScript();
  closeDevtoolsWindow();
});

app.on('window-all-closed', () => {
  closeDb();
  if (process.platform !== 'darwin') app.quit();
});
