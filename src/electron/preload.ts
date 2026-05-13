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

  // Phase 4: Dev tools window
  openDevtools: () => ipcRenderer.send(IpcChannel.OPEN_DEVTOOLS),

  // Phase 4 Iter 3: content authoring
  contentFind: (entityType: string, id: string): Promise<string | null> =>
    ipcRenderer.invoke(IpcChannel.CONTENT_FIND, entityType, id),
  contentRead: (relativePath: string): Promise<string | null> =>
    ipcRenderer.invoke(IpcChannel.CONTENT_READ, relativePath),
  contentWriteAction: (id: string, patch: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke(IpcChannel.CONTENT_WRITE_ACTION, id, patch),
  contentBuild: (): Promise<{ ok: boolean; output: string }> =>
    ipcRenderer.invoke(IpcChannel.CONTENT_BUILD),
  contentValidate: (): Promise<{ ok: boolean; output: string }> =>
    ipcRenderer.invoke(IpcChannel.CONTENT_VALIDATE),
});
