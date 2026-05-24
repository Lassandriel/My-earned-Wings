/**
 * Smoke-test effects — registers `smokeFlash` so the YAML action
 * act-smoke-ping (with `onSuccess: [{ type: smokeFlash, intensity: 3 }]`)
 * actually dispatches at runtime. Without this file, base would log a
 * "unknown effect type" warning and skip the entry; this proves the
 * addon registration path reaches the dispatch table.
 */

import type { RegisterAddonEffects } from '../../../src/core/addons/effects';

export const registerEffects: RegisterAddonEffects = (register) => {
  register('smokeFlash', (game, effect) => {
    // Stash a counter in our addon-namespaced state bucket so a save
    // round-trip can verify the effect actually fired. Reads use the
    // same bucket — see ticks.ts for a read example.
    // Same shape as ticks.ts — write to the plain field, not the
    // store helper, so this works whether the dispatcher gives us
    // the Alpine store or the engine's plain-data clone.
    const addonState = (game.addonState ??= {}) as Record<string, Record<string, unknown>>;
    const s = (addonState.smoke_test ??= {}) as {
      smokeFlashCount?: number;
      lastSmokeFlash?: { intensity: number; at: number };
    };
    // GameEffect is the base game's closed union; addon-defined types
    // get a runtime dispatch slot but no entry in the type. Cast via
    // `unknown` to read our custom field without lying about the
    // base union's shape.
    const intensityRaw = (effect as unknown as { intensity?: unknown }).intensity;
    const intensity = typeof intensityRaw === 'number' ? intensityRaw : 1;
    s.lastSmokeFlash = { intensity, at: Date.now() };
    s.smokeFlashCount = (s.smokeFlashCount ?? 0) + 1;
  });
};
