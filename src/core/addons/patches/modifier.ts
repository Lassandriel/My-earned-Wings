import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface ModifierPatchEntry extends BasePatchEntry {
  targetType: 'modifier';
  /**
   * The modifier's `baseValue` — the actual gameplay number the
   * pipeline reads as the starting point before items / buffs /
   * other modifiers add their own deltas. Patching this is how an
   * addon rebalances base mechanics:
   *
   *   - `shadow_bind_cost.baseValue: 3 → 5` makes the shadow-bind
   *     mechanic more expensive across the board
   *   - `wood_limit.baseValue: 0 → 50` gives the player 50 wood
   *     capacity from the start instead of needing storage
   *   - `magic_regen_passive.baseValue: 0 → 1` enables passive
   *     magic regeneration (the demo defaults to 0)
   *
   * Effectively a single op covers the whole "rebalance" use-case;
   * title/desc patches don't need a dedicated op because both
   * fields are translation keys and the i18n system already lets
   * addons override them.
   */
  setBaseValue?: number;
}

export const applyModifierPatch = (
  entry: ModifierPatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `modifier "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setBaseValue === 'number') {
    recognized = true;
    target.baseValue = entry.setBaseValue;
  }
  if (!recognized) {
    reportMissing(ctx, `patch for modifier "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateModifierPatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.setBaseValue !== undefined && typeof raw.setBaseValue !== 'number') {
    return `${sourceLabel}: setBaseValue must be a number when present`;
  }
  return null;
};
