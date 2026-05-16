/**
 * Save Schema Migrations
 * --------------------------------------------------------------
 * Bump SAVE_SCHEMA_VERSION whenever an existing save's shape would no
 * longer load cleanly into the current game build (renamed action IDs,
 * removed flags, restructured stats, …).
 *
 * Every bump needs a matching entry in MIGRATIONS that knows how to
 * upgrade a save FROM the previous version TO the new one.
 *
 * On load, runMigrations() runs every migration whose target version is
 * higher than the save's stored version, in order. Saves get re-written
 * with the current version on the next saveGame().
 *
 * Each migration mutates the state object in place. Keep them small and
 * focused; never delete data without a comment explaining why.
 */

import { makeLogger } from '../log';

const log = makeLogger('SAVE');

/** Bump this whenever you add a migration. The number must match the
 *  highest key in MIGRATIONS. */
export const SAVE_SCHEMA_VERSION = 2;

/** A migration takes an old-shape state and brings it to the next version. */
export type Migration = (state: Record<string, unknown>) => void;

/** Renames applied during the v1 → v2 migration (Phase 1.5 follow-up). */
const PHASE_15_RENAMES: Record<string, string> = {
  'act-essen': 'act-eat',
  'act-ausruhen': 'act-rest',
  'act-meditieren': 'act-meditate',
  'act-meditate': 'act-meditate-sanctum',
};

const remapArr = (arr: unknown, map: Record<string, string>): unknown =>
  Array.isArray(arr) ? arr.map((v) => (typeof v === 'string' && map[v]) || v) : arr;

const remapKeys = (
  obj: Record<string, unknown> | undefined,
  map: Record<string, string>,
): Record<string, unknown> | undefined => {
  if (!obj || typeof obj !== 'object') return obj;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const newKey = map[k] || k;
    // If both the old and new key already exist in the same save (very rare,
    // would mean both versions were once written), sum numeric values rather
    // than overwrite to preserve player progress.
    if (newKey in out && typeof out[newKey] === 'number' && typeof v === 'number') {
      out[newKey] = (out[newKey] as number) + v;
    } else {
      out[newKey] = v;
    }
  }
  return out;
};

/**
 * Migrations keyed by target version. The migration at key N upgrades a
 * state from version N-1 to version N.
 *
 * To add a new migration:
 *   1. Bump SAVE_SCHEMA_VERSION above by 1.
 *   2. Add a new entry here under that number.
 *   3. Add a unit test in save-migrations.test.ts.
 */
export const MIGRATIONS: Record<number, Migration> = {
  // v1 → v2: Phase 1.5 follow-up. Primary actions standardised to English
  // (act-eat / act-rest / act-meditate) and the Sanctum meditation got a
  // -sanctum suffix to free up `act-meditate`. Saves from before this
  // change still reference the German IDs in counters and unlockedRecipes.
  2: (state) => {
    if (Array.isArray(state.unlockedRecipes)) {
      state.unlockedRecipes = remapArr(state.unlockedRecipes, PHASE_15_RENAMES) as string[];
    }
    if (state.counters && typeof state.counters === 'object') {
      state.counters = remapKeys(
        state.counters as Record<string, unknown>,
        PHASE_15_RENAMES,
      ) as Record<string, number>;
    }
  },
};

/**
 * Run every migration whose target version is greater than `fromVersion`,
 * in ascending order, ending at SAVE_SCHEMA_VERSION.
 *
 * Returns true on success. Any migration that throws is logged and the
 * function returns false; the caller should treat the save as broken.
 */
export function runMigrations(
  state: Record<string, unknown>,
  fromVersion: number,
): boolean {
  // Saves without an embedded version are assumed to be pre-versioning (v1).
  const start = Number.isFinite(fromVersion) && fromVersion > 0 ? fromVersion : 1;
  if (start >= SAVE_SCHEMA_VERSION) return true;

  for (let v = start + 1; v <= SAVE_SCHEMA_VERSION; v++) {
    const migration = MIGRATIONS[v];
    if (!migration) continue;
    try {
      migration(state);
      // Visible-but-quiet log: helpful when debugging player saves.
      log.info(`Migrated state from v${v - 1} to v${v}`);
    } catch (err) {
      log.error(`Migration to v${v} failed:`, err);
      return false;
    }
  }
  return true;
}
