import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface ResourcePatchEntry extends BasePatchEntry {
  targetType: 'resource';
  /** Override starting stockpile (defaults to 0). */
  setInitial?: number;
  /** Override starting cap (the unmodified base limit). */
  setInitialLimit?: number;
  /** CSS color used by the UI for this resource. */
  setColor?: string;
}

export const applyResourcePatch = (
  entry: ResourcePatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `resource "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setInitial === 'number' && entry.setInitial >= 0) {
    recognized = true;
    target.initial = entry.setInitial;
  }
  if (typeof entry.setInitialLimit === 'number' && entry.setInitialLimit >= 0) {
    recognized = true;
    target.initialLimit = entry.setInitialLimit;
  }
  if (typeof entry.setColor === 'string' && entry.setColor.length > 0) {
    recognized = true;
    target.color = entry.setColor;
  }
  if (!recognized) {
    reportMissing(ctx, `patch for resource "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateResourcePatch = (raw: any, sourceLabel: string): string | null => {
  for (const k of ['setInitial', 'setInitialLimit'] as const) {
    if (raw[k] !== undefined && (typeof raw[k] !== 'number' || raw[k] < 0)) {
      return `${sourceLabel}: ${k} must be a non-negative number when present`;
    }
  }
  if (raw.setColor !== undefined && (typeof raw.setColor !== 'string' || raw.setColor.length === 0)) {
    return `${sourceLabel}: setColor must be a non-empty string when present`;
  }
  return null;
};
