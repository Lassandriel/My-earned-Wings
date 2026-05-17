/**
 * Custom Action Handlers — Phase 1.5b
 * --------------------------------------------------------------
 * YAML actions can declare `customExecute: <name>` to delegate to a TS function
 * registered here. The dispatcher in actions.logic.ts looks up the name and runs
 * the handler instead of (or alongside) the normal pipeline finalize step.
 *
 * Add new handlers here when YAML data alone is not expressive enough.
 */
import type { GameState } from '../../types/game';

export type CustomExecuteResult = boolean | void | { success?: boolean; [k: string]: unknown };
export type CustomExecuteHandler = (state: GameState, actionId: string) => CustomExecuteResult;

/**
 * Default for dialog/story actions: route through the NPC execute pipeline,
 * which handles dialogue progression, step costs/rewards, and onSuccess effects.
 */
const npcExecute: CustomExecuteHandler = (state, actionId) =>
  (state as any).npcExecute(actionId);

/**
 * Tree-of-Life finale: standard NPC step plus the demo-completion side effect.
 */
const treeOfLife: CustomExecuteHandler = (state, actionId) => {
  const result = (state as any).npcExecute(actionId);
  if (result && (result as any).success) {
    (state as any).viewManager?.completeDemo?.(state);
  }
  return result;
};

/**
 * Dream Bloom: pure data action — onSuccess hooks in YAML do all the work.
 * Kept here so the customExecute marker in magic.yaml resolves cleanly.
 */
const dreamBloom: CustomExecuteHandler = () => true;

import { ADDON_HANDLERS } from '../../generated/addon-handlers';

/**
 * Built-in handlers shipped with the base game live here. Addon handlers
 * come in from `src/generated/addon-handlers.ts` (auto-generated from
 * `content/addons/<name>/handlers.ts`) with their keys namespaced to
 * `<addon>/<name>` so collisions across addons are impossible.
 */
export const CUSTOM_EXECUTE_HANDLERS: Record<string, CustomExecuteHandler> = {
  npc_execute: npcExecute,
  tree_of_life: treeOfLife,
  dream_bloom: dreamBloom,
  ...ADDON_HANDLERS,
};
