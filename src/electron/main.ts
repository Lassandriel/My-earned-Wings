import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { IpcChannel, SaveSlotPayload } from './ipc.js';
import { saveSlot, loadSlot, listSlots, deleteSlot, close as closeDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null;

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
      preload: path.join(__dirname, 'preload.js'),
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

// --- Phase 3: SQLite save system ---
ipcMain.handle(IpcChannel.DB_SAVE, (_event, payload: SaveSlotPayload): boolean => {
  return saveSlot(payload.slot, payload.playerName, payload.data, payload.totalPlayTime);
});

ipcMain.handle(IpcChannel.DB_LOAD, (_event, slot: number) => {
  const row = loadSlot(slot);
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

ipcMain.handle(IpcChannel.DB_LIST, () => listSlots());

ipcMain.handle(IpcChannel.DB_DELETE, (_event, slot: number): boolean => deleteSlot(slot));

app.on('window-all-closed', () => {
  closeDb();
  if (process.platform !== 'darwin') app.quit();
});
