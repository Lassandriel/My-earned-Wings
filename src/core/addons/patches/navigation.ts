import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface NavigationPatchEntry extends BasePatchEntry {
  targetType: 'navigation';
  /** Base-icon key (e.g. 'crafting' → menu_crafting.webp). */
  setIcon?: string;
  /** Custom image path that overrides the icon-name convention. */
  setImage?: string;
  /** i18n key for the tab label. */
  setLabel?: string;
  /** Flag the tab is gated behind. Pass empty string to ungate. */
  setRequiredFlag?: string;
}

export const applyNavigationPatch = (
  entry: NavigationPatchEntry,
  registry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = registry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `navigation entry "${entry.targetId}" not found`, result);
    return false;
  }
  let recognized = false;
  if (typeof entry.setIcon === 'string' && entry.setIcon.length > 0) {
    recognized = true;
    target.icon = entry.setIcon;
  }
  if (typeof entry.setImage === 'string' && entry.setImage.length > 0) {
    recognized = true;
    target.image = entry.setImage;
  }
  if (typeof entry.setLabel === 'string' && entry.setLabel.length > 0) {
    recognized = true;
    target.label = entry.setLabel;
  }
  if (typeof entry.setRequiredFlag === 'string') {
    recognized = true;
    // Empty string means "ungate" — remove the field rather than
    // store "" (which truthiness-checks would mishandle).
    if (entry.setRequiredFlag.length === 0) delete target.requiredFlag;
    else target.requiredFlag = entry.setRequiredFlag;
  }
  if (!recognized) {
    reportMissing(ctx, `patch for navigation "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateNavigationPatch = (raw: any, sourceLabel: string): string | null => {
  for (const k of ['setIcon', 'setImage', 'setLabel'] as const) {
    if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
      return `${sourceLabel}: ${k} must be a non-empty string when present`;
    }
  }
  // setRequiredFlag intentionally allows empty string (= ungate).
  if (raw.setRequiredFlag !== undefined && typeof raw.setRequiredFlag !== 'string') {
    return `${sourceLabel}: setRequiredFlag must be a string when present`;
  }
  return null;
};
