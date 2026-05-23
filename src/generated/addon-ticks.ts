// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/ticks.ts (each must export `onTick`)
// Regenerate: npm run build:content
//
// One slot per addon. The engine calls each hook from processTick()
// once per simulation second after the built-in ticks. See
// src/core/addons/ticks.ts for the contract.

import type { AddonTickHook } from '../core/addons/ticks';

export const ADDON_TICKS: Record<string, AddonTickHook> = {};
