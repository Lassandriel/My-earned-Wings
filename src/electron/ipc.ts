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
  CONTENT_WRITE_ACTION: 'content:writeAction', // (id, patch) → ok / error  [LEGACY, use CONTENT_WRITE]
  CONTENT_WRITE: 'content:write',              // (entityType, id, patch) → ok / error
  CONTENT_WRITE_TRANSLATION: 'content:writeTranslation', // (lang, context, key, value|null) → ok
  CONTENT_BUILD: 'content:build',        // run npm run build:content
  CONTENT_VALIDATE: 'content:validate',  // run npm run check-all

  // Phase 16: Runtime addon loading. The packaged .exe ships a folder
  // next to itself ("addons/") that end users can drop YAML-only addons
  // into. This channel scans that folder + the resources/addons fallback
  // and returns the merged payload to the renderer to apply onto the
  // (build-time generated) registries.
  ADDONS_DISCOVER_RUNTIME: 'addons:discoverRuntime',
} as const;

/**
 * One addon's runtime-loaded payload. Build-time addons (compiled into
 * src/generated/content.ts) are NOT in this list; only YAML files the
 * end user dropped next to the .exe.
 */
export interface RuntimeAddonPayload {
  name: string;
  version: string;
  description?: string;
  author?: string;
  /** Folder this addon was loaded from (absolute path). */
  sourceDir: string;
  /**
   * Map of category → array of parsed YAML entries (each is the raw
   * object with `id: string`). Categories match the build pipeline:
   * resources, modifiers, actions, items, npcs, buffs, homes,
   * milestones, navigation, titles.
   */
  data: Record<string, any[]>;
  /**
   * lang → context → key → string. Already namespaced per addon —
   * collisions with base or other addons are detected at merge time.
   */
  translations: Record<string, Record<string, Record<string, string>>>;
  /**
   * <viewName> → wrapped HTML section (the renderer drops them into
   * the addon-views host node). Empty if the addon ships no views.
   */
  views: Record<string, string>;
}

export interface RuntimeAddonDiscoveryResult {
  /** Absolute paths the loader actually scanned (for the toast / log). */
  scannedDirs: string[];
  /** Successfully parsed addons, sorted by name. */
  addons: RuntimeAddonPayload[];
  /** Non-fatal errors (bad manifest, unreadable YAML, …). UI surfaces these. */
  warnings: string[];
}

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
