/**
 * Addon effect-type registry.
 *
 * The action engine has a `registerEffect(type, handler)` extension
 * point already; the built-in effects (setFlag, addBuff, modifyResource,
 * …) call it during boot. Until now, addons couldn't reach it — so
 * an addon that wanted a new effect type like `summonShadow` had to
 * fork actions.effects.ts.
 *
 * Addons that need custom effects now drop an `effects.ts` next to
 * the other addon files:
 *
 *     // content/addons/<name>/effects.ts
 *     import type { RegisterAddonEffects } from '../../../src/core/addons/effects';
 *
 *     export const registerEffects: RegisterAddonEffects = (register) => {
 *       register('summonShadow', (game, effect) => {
 *         const s = game.addonStateFor<{ shadows: number }>('vandara');
 *         s.shadows = (s.shadows ?? 0) + 1;
 *       });
 *     };
 *
 * The build script collects each addon's `registerEffects` into
 * src/generated/addon-effects.ts, and actions.logic.ts calls them
 * all once during initEffects() right after the built-ins. YAML can
 * then declare `onSuccess: [{ type: summonShadow, ... }]` and the
 * runtime dispatch finds the handler.
 *
 * Limits:
 * - Runtime addons (drop-in folders) cannot ship effects.ts —
 *   build-time only, same as ticks/migrations.
 * - Collisions are first-write-wins: if two addons register the same
 *   `type` string, the later one overrides. We log a warning so the
 *   author notices.
 */

import type { GameState, GameEffect } from '../../types/game';

/**
 * The handler an addon writes for one of its custom effect types.
 * Mirrors the built-in shape (state + effect → mutate state). The
 * effect parameter is loosely typed as `GameEffect` because addons
 * pick their own field shape; we don't want to force every addon to
 * extend the base union just to get autocomplete.
 */
export type AddonEffectHandler = (game: GameState, effect: GameEffect) => void;

/**
 * The function each addon's `effects.ts` exports as `registerEffects`.
 * Takes a `register(type, handler)` callback bound to the engine's
 * own registry so the addon's handlers slot in alongside the
 * built-ins. We expose the same registration shape as the built-in
 * `RegisterEffect` so addon code reads identically to base code.
 */
export type RegisterAddonEffects = (
  register: (type: string, handler: AddonEffectHandler) => void,
) => void;
