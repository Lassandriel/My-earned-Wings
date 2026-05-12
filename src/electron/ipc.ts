/**
 * IPC Channel Definitions - Shared between Main, Preload, and Renderer
 */
export const IpcChannel = {
  QUIT_APP: 'quit-app',
  RESIZE_WINDOW: 'resize-window',

  // Phase 3: SQLite save system
  DB_SAVE: 'db:save',
  DB_LOAD: 'db:load',
  DB_LIST: 'db:list',
  DB_DELETE: 'db:delete',

  // Phase 4: Dev tools window
  OPEN_DEVTOOLS: 'devtools:open',
} as const;

export interface SaveSlotPayload {
  slot: number;
  playerName: string;
  data: string;
  totalPlayTime: number;
}

export interface SaveSlotMeta {
  slot: number;
  playerName: string;
  schemaVersion: number;
  createdAt: number;
  updatedAt: number;
  totalPlayTime: number;
}

export interface LoadResult {
  slot: number;
  playerName: string;
  data: string;
  schemaVersion: number;
  createdAt: number;
  updatedAt: number;
  totalPlayTime: number;
}
