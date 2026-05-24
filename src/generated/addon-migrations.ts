// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/migrations.ts
// Regenerate: npm run build:content
//
// Each addon that ships migrations contributes one entry below. The
// load path reads this map and calls runAddonMigrations() so addon
// authors can upgrade their slice of an old save (renamed flags,
// restructured items, etc.) without forking the base save-migrations
// file. Runtime addons (drop-in folders) cannot ship migrations —
// TS code requires the build step.

import type { AddonMigrationModule } from '../core/services/save-migrations';
import * as mig_smoke_test from '../../content/addons/smoke_test/migrations';

export const ADDON_MIGRATIONS: Record<string, AddonMigrationModule> = {
  smoke_test: mig_smoke_test as unknown as AddonMigrationModule,
};
