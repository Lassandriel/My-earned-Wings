import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing, mergeModifiers } from './shared';

export interface ItemPatchEntry extends BasePatchEntry {
  targetType: 'item';
  /**
   * Append modifiers to the item. Collisions on `.key` are
   * skipped with a warning — two addons stacking on the same
   * resource limit should declare different keys or coordinate.
   */
  addModifiers?: Array<{ key: string; add?: number; mult?: number }>;
  /** Replace the item's spaceCost (housing slot consumption). */
  setSpaceCost?: number;
  /** Replace the item's image path. */
  setImage?: string;
}

export const applyItemPatch = (
  entry: ItemPatchEntry,
  itemRegistry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = itemRegistry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `item "${entry.targetId}" not found`, result);
    return false;
  }

  let recognized = false;

  if (entry.addModifiers && entry.addModifiers.length > 0) {
    recognized = true;
    mergeModifiers(target, entry.addModifiers, ctx, result, `item "${entry.targetId}"`);
  }

  if (typeof entry.setSpaceCost === 'number' && entry.setSpaceCost >= 0) {
    recognized = true;
    target.spaceCost = entry.setSpaceCost;
  }

  if (typeof entry.setImage === 'string' && entry.setImage.length > 0) {
    recognized = true;
    target.image = entry.setImage;
  }

  if (!recognized) {
    reportMissing(ctx, `patch for item "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateItemPatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.addModifiers !== undefined) {
    if (!Array.isArray(raw.addModifiers) || raw.addModifiers.length === 0) {
      return `${sourceLabel}: addModifiers must be a non-empty array when present`;
    }
    for (let i = 0; i < raw.addModifiers.length; i++) {
      const m = raw.addModifiers[i];
      if (!m || typeof m !== 'object' || typeof m.key !== 'string') {
        return `${sourceLabel}: addModifiers[${i}] must be an object with a string "key"`;
      }
    }
  }
  if (raw.setSpaceCost !== undefined && (typeof raw.setSpaceCost !== 'number' || raw.setSpaceCost < 0)) {
    return `${sourceLabel}: setSpaceCost must be a non-negative number when present`;
  }
  if (raw.setImage !== undefined && (typeof raw.setImage !== 'string' || raw.setImage.length === 0)) {
    return `${sourceLabel}: setImage must be a non-empty string when present`;
  }
  return null;
};
