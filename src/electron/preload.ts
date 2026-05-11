import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannel, SaveSlotPayload, SaveSlotMeta, LoadResult } from './ipc.js';

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls (existing)
  quitApp: () => ipcRenderer.send(IpcChannel.QUIT_APP),
  resizeWindow: (width: number, height: number) =>
    ipcRenderer.send(IpcChannel.RESIZE_WINDOW, width, height),

  // Phase 3: SQLite save system
  dbSave: (payload: SaveSlotPayload): Promise<boolean> =>
    ipcRenderer.invoke(IpcChannel.DB_SAVE, payload),
  dbLoad: (slot: number): Promise<LoadResult | null> =>
    ipcRenderer.invoke(IpcChannel.DB_LOAD, slot),
  dbList: (): Promise<SaveSlotMeta[]> => ipcRenderer.invoke(IpcChannel.DB_LIST),
  dbDelete: (slot: number): Promise<boolean> => ipcRenderer.invoke(IpcChannel.DB_DELETE, slot),
});
