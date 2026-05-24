/**
 * Smoke-test migrations — proves the addon save-migration framework
 * loads + runs without breaking anything.
 *
 * SCHEMA_VERSION starts at 2 so saves with no addonSchemaVersions
 * field (treated as v1) will trigger the 1→2 migration on load.
 * The migration touches only the addon's own bucket so it can never
 * corrupt base state, no matter what shape an old save has.
 */

import type { AddonMigrationModule } from '../../../src/core/services/save-migrations';

export const SCHEMA_VERSION: AddonMigrationModule['SCHEMA_VERSION'] = 2;

export const MIGRATIONS: AddonMigrationModule['MIGRATIONS'] = {
  // v1 → v2: rename a hypothetical field. We don't actually have any
  // smoke_test state in old saves (the addon is new), so this is a
  // no-op in practice — but the dispatch path runs and logs the
  // migration, which is the part we want to verify.
  2: (state) => {
    // Ensure the addon's bucket exists so any down-stream code that
    // assumes it isn't undefined can rely on that invariant after
    // migrations run.
    const addonState = (state.addonState ??= {}) as Record<string, Record<string, unknown>>;
    addonState.smoke_test ??= {};
    addonState.smoke_test.migratedToV2 = true;
  },
};
