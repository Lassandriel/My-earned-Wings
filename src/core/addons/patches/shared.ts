import type { PatchApplyContext, PatchApplyResult } from './types';

/**
 * Logs (or throws, depending on context) when a patch references
 * something we can't apply. Build-time wants the addon author to
 * see the error immediately; runtime keeps the game alive and
 * collects warnings the user can inspect.
 */
export const reportMissing = (
  ctx: PatchApplyContext,
  message: string,
  result: PatchApplyResult,
): void => {
  const full = `[${ctx.origin}] ${message}`;
  if (ctx.missingTarget === 'throw') {
    throw new Error(`[patches] ${full}`);
  }
  result.warnings.push(full);
};

/**
 * Shared helper for the "merge modifiers, skip on key collision"
 * pattern used by items and buffs. Mutates `target.modifiers`.
 * Modifiers without a string `key` are silently dropped; duplicates
 * against the existing array log a warning.
 */
export const mergeModifiers = (
  target: any,
  additions: Array<{ key: string; add?: number; mult?: number }>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
  entityLabel: string,
): void => {
  const existing: any[] = Array.isArray(target.modifiers) ? target.modifiers : [];
  const seenKeys = new Set(existing.map((m) => m?.key).filter(Boolean));
  const accepted = additions.filter((m) => {
    if (!m || typeof m.key !== 'string') return false;
    if (seenKeys.has(m.key)) {
      result.warnings.push(`[${ctx.origin}] addModifiers on ${entityLabel}: key "${m.key}" already present, skipped`);
      return false;
    }
    seenKeys.add(m.key);
    return true;
  });
  if (accepted.length > 0) {
    target.modifiers = [...existing, ...accepted];
  }
};
