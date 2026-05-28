import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing, mergeModifiers } from './shared';

export interface BuffPatchEntry extends BasePatchEntry {
  targetType: 'buff';
  /** Replace the buff's duration (seconds). */
  setDuration?: number;
  /** Append modifier entries; collision on key warns + skips. */
  addModifiers?: Array<{ key: string; add?: number; mult?: number }>;
}

export const applyBuffPatch = (
  entry: BuffPatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `buff "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setDuration === 'number' && entry.setDuration >= 0) {
    recognized = true;
    target.duration = entry.setDuration;
  }
  if (entry.addModifiers && entry.addModifiers.length > 0) {
    recognized = true;
    mergeModifiers(target, entry.addModifiers, ctx, result, `buff "${entry.targetId}"`);
  }
  if (!recognized) {
    reportMissing(ctx, `patch for buff "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateBuffPatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.setDuration !== undefined && (typeof raw.setDuration !== 'number' || raw.setDuration < 0)) {
    return `${sourceLabel}: setDuration must be a non-negative number when present`;
  }
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
  return null;
};
