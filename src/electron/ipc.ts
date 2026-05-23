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
  /**
   * Names of other addons this one needs to function. The renderer
   * enforces these at runtime — addons whose deps are missing get
   * skipped with a warning rather than partially loaded.
   */
  requires?: string[];
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
  /**
   * <fileName> → raw CSS source. Renderer injects each as a
   * <style data-addon-style="<addonName>/<fileName>"> tag so the
   * styles are scoped/identifiable in DevTools. Empty if the
   * addon ships no styles.
   */
  styles: Record<string, string>;
  /**
   * <slot-id> → raw HTML source. Renderer appends each into the
   * matching `<div data-slot="<slot-id>">` element at boot.
   * Empty if the addon ships no slot fragments.
   */
  slots: Record<string, string>;
  /**
   * <fileName> → data: URL (base64-encoded audio). Used to register
   * addon SFX without writing files to disk on the renderer side —
   * the audio engine treats the data URL like any other src. The key
   * the YAML uses is `<addonName>/<basename-no-ext>`; the renderer
   * derives that from each fileName here. Empty if the addon ships
   * no audio.
   */
  sfx: Record<string, string>;
  /**
   * Patches the addon wants applied against base / earlier-loaded
   * addons. Loaded from `patches/*.yaml` and passed straight through
   * to the renderer's patch engine. Empty if the addon ships none.
   * Each entry is a raw patch object (validated by the renderer,
   * not the main process — keeps the main process free of patch
   * schema knowledge).
   */
  patches: any[];
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
