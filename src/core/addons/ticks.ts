/**
 * Addon tick-hook contract.
 *
 * Addons that want periodic logic (mana regen for a shadow mechanic,
 * weather cycle, spawn timers, …) drop a `ticks.ts` next to the
 * other addon files:
 *
 *     // content/addons/<name>/ticks.ts
 *     import type { AddonTickHook } from '../../../src/core/addons/ticks';
 *
 *     export const onTick: AddonTickHook = (state, services, deltaTime) => {
 *       // mutate state freely; ui-sync runs right after this batch.
 *     };
 *
 * The build script collects every addon's `onTick` into ADDON_TICKS
 * (generated at src/generated/addon-ticks.ts). The engine calls each
 * hook from inside `processTick` once per simulation heartbeat (1s),
 * after the built-in ticks (buffs, focus, regen, producers) and
 * before the UI sync. That ordering means an addon can read fresh
 * resource values but its writes still make it to the renderer
 * without an extra frame of lag.
 *
 * Limits:
 * - Only one hook per addon. Authors who need multiple can call
 *   internal helpers from inside `onTick`; we keep the registry
 *   shape simple so a typo in the export name fails loudly at build.
 * - Runtime addons (drop-in folders, no TS build) CANNOT ship a
 *   tick hook — TS source needs the bundler. They have to live
 *   without periodic logic, by design.
 * - Throwing a hook does NOT stop other hooks. Each is wrapped in
 *   its own try/catch so one buggy addon can't freeze the game loop.
 */

import type { GameState } from '../../types/game';
import type { EngineServices } from '../../engine/types';
import { makeLogger } from '../log';

const log = makeLogger('ADDON-TICK');

/**
 * Signature an addon's `onTick` must match. Mirrors what the built-in
 * tick functions (`tickBuffs`, `tickRegen`, …) take so addons can use
 * the same helpers without adapters.
 */
export type AddonTickHook = (
  state: GameState,
  services: EngineServices,
  deltaTime: number,
) => void;

/**
 * Run every registered addon tick hook in name-sorted order. One
 * addon's failure is logged and swallowed — the loop continues.
 * Returns the number of hooks that ran successfully (useful for
 * tests + future perf instrumentation).
 */
export function runAddonTicks(
  state: GameState,
  services: EngineServices,
  deltaTime: number,
  hooks: Record<string, AddonTickHook>,
): number {
  let ok = 0;
  for (const addonName of Object.keys(hooks).sort()) {
    const fn = hooks[addonName];
    if (typeof fn !== 'function') continue;
    try {
      fn(state, services, deltaTime);
      ok++;
    } catch (err) {
      // Don't spam the log on every tick if an addon throws every
      // call — but we DO want the player to see it once. The engine
      // gets called 60 times a minute; even a quiet "warn" is too
      // chatty. Drop to debug; addon authors should test their hooks.
      log.debug(`[${addonName}] onTick threw:`, err);
    }
  }
  return ok;
}
