/**
 * Active-addons registry — single source of truth for "what's loaded
 * right now". Used by the save system to embed a compatibility
 * snapshot in every save, and by the load path to detect when a
 * save needs an addon that's no longer present.
 *
 * Build-time addons are baked into the bundle via BUILD_TIME_ADDONS
 * (generated from each addon's manifest.yaml at content build).
 * Runtime addons (drop-in folders next to the .exe) register
 * themselves here when the runtime loader processes them — that's
 * why the runtime loader calls `registerRuntimeAddons` instead of
 * us scanning some other registry.
 */

import { BUILD_TIME_ADDONS } from '../../generated/content';

export interface AddonRef {
  name: string;
  version: string;
  /**
   * 'build' = compiled into the bundle, always present together.
   * 'runtime' = dropped in as a folder; user can add/remove without
   * a rebuild. The distinction matters when a save misses an addon:
   * a missing build addon means the user is on the wrong build; a
   * missing runtime addon means they removed a folder.
   */
  source: 'build' | 'runtime';
  /** Optional manifest copy fields surfaced for UI listing. */
  description?: string;
  author?: string;
  /**
   * From manifest `required: true`. Locks the Disable toggle in the
   * Addons settings tab — used by `core` so the base game can't be
   * disabled. Default false / undefined.
   */
  required?: boolean;
  /**
   * True iff the player has this addon in their disabled list. Set
   * at boot from settings.disabledAddons; the UI uses it to grey out
   * the row and to remind the player a restart is needed.
   */
  disabled?: boolean;
  /**
   * Per-category YAML entry counts ('npcs' → 9, 'actions' → 12, …).
   * Build-time addons get these from build-content.ts; runtime addons
   * get them tallied from their IPC payload at boot. Used by the
   * Addons settings tab to show what each addon actually adds.
   */
  entries?: Record<string, number>;
}

const runtimeAddons: AddonRef[] = [];

/** Called by runtime-addons.ts once per boot after discovery completes. */
export const registerRuntimeAddons = (
  addons: ReadonlyArray<{
    name: string;
    version: string;
    description?: string;
    author?: string;
    entries?: Record<string, number>;
  }>,
): void => {
  runtimeAddons.length = 0;
  for (const a of addons) {
    runtimeAddons.push({
      name: a.name,
      version: a.version,
      source: 'runtime',
      description: a.description,
      author: a.author,
      entries: a.entries,
    });
  }
};

/**
 * Module-local cache of names the player has disabled. Set by main.ts
 * at boot (after it reads localStorage) so getActiveAddons can stamp
 * the `disabled` flag on each entry for the UI.
 */
let disabledNames: ReadonlySet<string> = new Set();
export const setDisabledAddons = (names: ReadonlyArray<string>): void => {
  disabledNames = new Set(names);
};

/** Every addon that's currently active in the running game. Sorted by name. */
export const getActiveAddons = (): AddonRef[] => {
  const out: AddonRef[] = [];
  for (const a of BUILD_TIME_ADDONS) {
    out.push({
      name: a.name,
      version: a.version,
      source: 'build',
      description: a.description,
      author: a.author,
      required: a.required,
      entries: a.entries,
      disabled: disabledNames.has(a.name),
    });
  }
  for (const a of runtimeAddons) {
    out.push({ ...a, disabled: disabledNames.has(a.name) });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
};

/**
 * Quick "is addon X active right now?" lookup for addon-vs-addon
 * conditional logic. Mirrors what plugin systems typically expose
 * so addons can light up extra integration paths only when the
 * companion addon happens to be present.
 *
 *     if (isAddonLoaded('vandara')) {
 *       // do extra Vandara-specific wiring
 *     }
 *
 * Build-time + runtime both count. No version-comparison here on
 * purpose; addons that need version gating can read `getActiveAddons()`
 * directly. The shape of "compatible version" is too domain-specific
 * to bake into this primitive.
 */
export const isAddonLoaded = (name: string): boolean => {
  for (const a of BUILD_TIME_ADDONS) if (a.name === name) return true;
  for (const a of runtimeAddons) if (a.name === name) return true;
  return false;
};

/** Lightweight shape stored in saves — just name+version, no source. */
export interface SavedAddonRef {
  name: string;
  version: string;
}

/** Snapshot the currently active addons for embedding in a save. */
export const snapshotActiveAddonsForSave = (): SavedAddonRef[] =>
  getActiveAddons().map(({ name, version }) => ({ name, version }));

/**
 * Compare a save's addon snapshot against currently loaded addons.
 *
 * Three kinds of mismatch the load path cares about:
 *   - missing: addon was in save, not loaded now (Save needs it!)
 *   - added: addon is loaded now, wasn't in save (likely fine)
 *   - versionDelta: addon present both sides, version differs
 *     (likely fine if addon kept saves compatible; flagged so the
 *     player gets a heads-up if it didn't)
 */
export interface AddonCompatReport {
  ok: boolean;
  missing: SavedAddonRef[];
  added: AddonRef[];
  versionDelta: Array<{ name: string; saved: string; loaded: string }>;
}

export const compareAddonsAgainstSave = (
  saved: ReadonlyArray<SavedAddonRef> | undefined | null,
): AddonCompatReport => {
  const loaded = getActiveAddons();
  const loadedByName = new Map(loaded.map((a) => [a.name, a]));
  const savedSafe = Array.isArray(saved) ? saved : [];
  const savedByName = new Map(savedSafe.map((a) => [a.name, a]));

  const missing: SavedAddonRef[] = [];
  const versionDelta: Array<{ name: string; saved: string; loaded: string }> = [];
  for (const s of savedSafe) {
    const l = loadedByName.get(s.name);
    if (!l) {
      missing.push(s);
      continue;
    }
    if (l.version !== s.version) {
      versionDelta.push({ name: s.name, saved: s.version, loaded: l.version });
    }
  }

  const added: AddonRef[] = [];
  for (const l of loaded) {
    if (!savedByName.has(l.name)) added.push(l);
  }

  return {
    ok: missing.length === 0 && versionDelta.length === 0,
    missing,
    added,
    versionDelta,
  };
};
