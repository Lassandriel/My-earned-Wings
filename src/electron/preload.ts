import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  quitApp: () => ipcRenderer.send('quit-app'),
  resizeWindow: (width: number, height: number) => ipcRenderer.send('resize-window', width, height)
});
