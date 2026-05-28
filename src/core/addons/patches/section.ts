import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface SectionPatchEntry extends BasePatchEntry {
  targetType: 'section';
  /** Override the i18n key for the section header. */
  setHeaderLabel?: string;
  /** Change the gating flag (empty string = always show). */
  setRequiresFlag?: string;
  /** Change which action.category the section lists. */
  setActionCategory?: string;
}

export const applySectionPatch = (
  entry: SectionPatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `section "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setHeaderLabel === 'string' && entry.setHeaderLabel.length > 0) {
    recognized = true;
    target.headerLabel = entry.setHeaderLabel;
  }
  if (typeof entry.setRequiresFlag === 'string') {
    recognized = true;
    if (entry.setRequiresFlag.length === 0) delete target.requiresFlag;
    else target.requiresFlag = entry.setRequiresFlag;
  }
  if (typeof entry.setActionCategory === 'string' && entry.setActionCategory.length > 0) {
    recognized = true;
    target.actionCategory = entry.setActionCategory;
  }
  if (!recognized) {
    reportMissing(ctx, `patch for section "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateSectionPatch = (raw: any, sourceLabel: string): string | null => {
  for (const k of ['setHeaderLabel', 'setActionCategory'] as const) {
    if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
      return `${sourceLabel}: ${k} must be a non-empty string when present`;
    }
  }
  if (raw.setRequiresFlag !== undefined && typeof raw.setRequiresFlag !== 'string') {
    return `${sourceLabel}: setRequiresFlag must be a string when present`;
  }
  return null;
};
