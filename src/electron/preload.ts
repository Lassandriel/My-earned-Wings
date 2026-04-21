import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannel } from './ipc.js';

contextBridge.exposeInMainWorld('electronAPI', {
  quitApp: () => ipcRenderer.send(IpcChannel.QUIT_APP),
  resizeWindow: (width: number, height: number) =>
    ipcRenderer.send(IpcChannel.RESIZE_WINDOW, width, height),
});
