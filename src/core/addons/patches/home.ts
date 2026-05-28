import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface HomePatchEntry extends BasePatchEntry {
  targetType: 'home';
  /** Furniture slot capacity. */
  setCapacity?: number;
  /** Override the home's preview image. */
  setImage?: string;
}

export const applyHomePatch = (
  entry: HomePatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `home "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setCapacity === 'number' && entry.setCapacity >= 0) {
    recognized = true;
    target.capacity = entry.setCapacity;
  }
  if (typeof entry.setImage === 'string' && entry.setImage.length > 0) {
    recognized = true;
    target.image = entry.setImage;
  }
  if (!recognized) {
    reportMissing(ctx, `patch for home "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateHomePatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.setCapacity !== undefined && (typeof raw.setCapacity !== 'number' || raw.setCapacity < 0)) {
    return `${sourceLabel}: setCapacity must be a non-negative number when present`;
  }
  if (raw.setImage !== undefined && (typeof raw.setImage !== 'string' || raw.setImage.length === 0)) {
    return `${sourceLabel}: setImage must be a non-empty string when present`;
  }
  return null;
};
