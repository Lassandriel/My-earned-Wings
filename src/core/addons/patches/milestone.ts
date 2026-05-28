import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface MilestonePatchEntry extends BasePatchEntry {
  targetType: 'milestone';
  /**
   * Add new requirement entries. Collision on key warns + skips
   * (same convention as action.addRequirement).
   */
  addRequirement?: Record<string, any>;
  /** Append entries to the milestone's `onUnlock` effects array. */
  addOnUnlock?: any[];
}

export const applyMilestonePatch = (
  entry: MilestonePatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `milestone "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (entry.addRequirement && typeof entry.addRequirement === 'object') {
    recognized = true;
    const existing: Record<string, any> = target.requirements && typeof target.requirements === 'object'
      ? { ...target.requirements }
      : {};
    for (const [k, v] of Object.entries(entry.addRequirement)) {
      if (k in existing) {
        result.warnings.push(`[${ctx.origin}] addRequirement on milestone "${entry.targetId}": key "${k}" already exists, skipped`);
        continue;
      }
      existing[k] = v;
    }
    target.requirements = existing;
  }
  if (entry.addOnUnlock && entry.addOnUnlock.length > 0) {
    recognized = true;
    const existing = Array.isArray(target.onUnlock) ? target.onUnlock : [];
    target.onUnlock = [...existing, ...entry.addOnUnlock];
  }
  if (!recognized) {
    reportMissing(ctx, `patch for milestone "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateMilestonePatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.addRequirement !== undefined) {
    if (!raw.addRequirement || typeof raw.addRequirement !== 'object' || Array.isArray(raw.addRequirement)) {
      return `${sourceLabel}: addRequirement must be a map of path → rule`;
    }
  }
  if (raw.addOnUnlock !== undefined) {
    if (!Array.isArray(raw.addOnUnlock) || raw.addOnUnlock.length === 0) {
      return `${sourceLabel}: addOnUnlock must be a non-empty array when present`;
    }
    for (let i = 0; i < raw.addOnUnlock.length; i++) {
      const e = raw.addOnUnlock[i];
      if (!e || typeof e !== 'object' || typeof e.type !== 'string') {
        return `${sourceLabel}: addOnUnlock[${i}] must be an object with a string "type"`;
      }
    }
  }
  return null;
};
