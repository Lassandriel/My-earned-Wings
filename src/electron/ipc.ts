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
  // Phase 4 Iter 3: content authoring
  CONTENT_FIND: 'content:find',          // (entityType, id) → file path or null
  CONTENT_READ: 'content:read',          // (relativePath) → text
  CONTENT_WRITE_ACTION: 'content:writeAction', // (id, patch) → ok / error
  CONTENT_BUILD: 'content:build',        // run npm run build:content
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
