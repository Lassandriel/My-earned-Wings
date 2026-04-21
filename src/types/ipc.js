/**
 * IPC Channel Definitions - Shared between Main and Preload
 */
export var IpcChannel;
(function (IpcChannel) {
  IpcChannel['QUIT_APP'] = 'quit-app';
  IpcChannel['RESIZE_WINDOW'] = 'resize-window';
})(IpcChannel || (IpcChannel = {}));
