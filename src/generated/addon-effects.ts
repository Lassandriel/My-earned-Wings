// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/effects.ts (each must export `registerEffects`)
// Regenerate: npm run build:content
//
// One slot per addon. actions.logic.ts calls every registrar during
// initEffects(), right after the built-in handlers. See
// src/core/addons/effects.ts for the contract.

import type { RegisterAddonEffects } from '../core/addons/effects';
import * as e_smoke_test from '../../content/addons/smoke_test/effects';

export const ADDON_EFFECT_REGISTRARS: Record<string, RegisterAddonEffects> = {
  smoke_test: e_smoke_test.registerEffects,
};
