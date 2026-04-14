const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  quitApp: () => ipcRenderer.send('quit-app'),
  resizeWindow: (w, h) => ipcRenderer.send('resize-window', w, h)
});
