import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

export interface NpcPatchEntry extends BasePatchEntry {
  targetType: 'npc';
  /**
   * Raise the NPC's `maxProgress` to at least this number. If the
   * existing value is already higher, the patch is a no-op for this
   * field (no warning — multiple addons may try to extend the same
   * NPC and the max wins).
   *
   * Usually paired with an `appendSteps` patch on the NPC's main
   * action — when an addon adds quest steps, the NPC also needs more
   * room on its progress bar so completion still lines up.
   */
  bumpMaxProgress?: number;
  /**
   * Append one or more trade-action references. Each entry follows
   * the same `{ id, minProgress }` shape used in the base YAML.
   * Duplicate ids are skipped silently (so re-loading the same addon
   * doesn't keep growing the array).
   */
  addTradeActions?: Array<{ id: string; minProgress?: number }>;
  /** Replace the NPC's emoji icon. */
  setIcon?: string;
  /** Replace the NPC's accent color (CSS color value). */
  setColor?: string;
  /** Replace the NPC's portrait image path. */
  setImage?: string;
  /**
   * Merge entries into the NPC's `dialogues` map. Existing keys are
   * NOT overwritten silently — collisions log a warning so multiple
   * addons can't quietly stomp each other. Use a dedicated separate
   * key in your own namespace.
   */
  mergeDialogues?: Record<string, string>;
  /**
   * Re-tag the NPC's chapter (journal grouping). Useful when an
   * addon pulls a base-game NPC into its own story arc — e.g.
   * Vandara re-grouping Aria's late-game appearances under
   * "Chapter Vandara" instead of "Village Life".
   */
  setChapter?: string;
  /**
   * Re-tag the NPC's location (Orte sub-tab). Lets an addon move
   * an NPC into a new physical area it ships (e.g. relocate a
   * villager into Vandara's market). Empty string falls back to
   * the default `village` location at render time.
   */
  setLocation?: string;
}

export const applyNpcPatch = (
  entry: NpcPatchEntry,
  npcRegistry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = npcRegistry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `npc "${entry.targetId}" not found`, result);
    return false;
  }

  // bumpMaxProgress with a no-op (already higher) is still a recognised
  // op — addon authors can declare a minimum without caring about the
  // current value, so we don't error out as "no recognized operations".
  let recognized = false;

  if (typeof entry.bumpMaxProgress === 'number') {
    recognized = true;
    const current = typeof target.maxProgress === 'number' ? target.maxProgress : 0;
    if (entry.bumpMaxProgress > current) {
      target.maxProgress = entry.bumpMaxProgress;
    }
  }

  if (entry.addTradeActions && entry.addTradeActions.length > 0) {
    recognized = true;
    const existing: any[] = Array.isArray(target.tradeActions) ? target.tradeActions : [];
    const seenIds = new Set(existing.map((t) => t.id));
    const additions = entry.addTradeActions.filter((t) => {
      if (typeof t.id !== 'string') return false;
      if (seenIds.has(t.id)) return false;
      seenIds.add(t.id);
      return true;
    });
    if (additions.length > 0) {
      target.tradeActions = [...existing, ...additions];
    }
  }

  if (typeof entry.setIcon === 'string' && entry.setIcon.length > 0) {
    recognized = true;
    target.icon = entry.setIcon;
  }

  if (typeof entry.setColor === 'string' && entry.setColor.length > 0) {
    recognized = true;
    target.color = entry.setColor;
  }

  if (typeof entry.setImage === 'string' && entry.setImage.length > 0) {
    recognized = true;
    target.image = entry.setImage;
  }

  if (typeof entry.setChapter === 'string' && entry.setChapter.length > 0) {
    recognized = true;
    target.chapter = entry.setChapter;
  }

  if (typeof entry.setLocation === 'string') {
    recognized = true;
    // Empty string falls back to the renderer's 'village' default.
    if (entry.setLocation.length === 0) delete target.location;
    else target.location = entry.setLocation;
  }

  if (entry.mergeDialogues && typeof entry.mergeDialogues === 'object') {
    recognized = true;
    const existing: Record<string, string> = target.dialogues && typeof target.dialogues === 'object'
      ? { ...target.dialogues }
      : {};
    for (const [k, v] of Object.entries(entry.mergeDialogues)) {
      if (k in existing) {
        result.warnings.push(`[${ctx.origin}] mergeDialogues on npc "${entry.targetId}": key "${k}" already exists, skipped`);
        continue;
      }
      existing[k] = v;
    }
    target.dialogues = existing;
  }

  if (!recognized) {
    reportMissing(ctx, `patch for npc "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

export const validateNpcPatch = (raw: any, sourceLabel: string): string | null => {
  if (raw.bumpMaxProgress !== undefined && (typeof raw.bumpMaxProgress !== 'number' || raw.bumpMaxProgress < 1)) {
    return `${sourceLabel}: bumpMaxProgress must be a positive number when present`;
  }
  if (raw.addTradeActions !== undefined) {
    if (!Array.isArray(raw.addTradeActions) || raw.addTradeActions.length === 0) {
      return `${sourceLabel}: addTradeActions must be a non-empty array when present`;
    }
    for (let i = 0; i < raw.addTradeActions.length; i++) {
      const t = raw.addTradeActions[i];
      if (!t || typeof t !== 'object' || typeof t.id !== 'string') {
        return `${sourceLabel}: addTradeActions[${i}] must be an object with a string "id"`;
      }
    }
  }
  for (const k of ['setIcon', 'setColor', 'setImage', 'setChapter'] as const) {
    if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
      return `${sourceLabel}: ${k} must be a non-empty string when present`;
    }
  }
  // setLocation allows empty string (= use renderer's default).
  if (raw.setLocation !== undefined && typeof raw.setLocation !== 'string') {
    return `${sourceLabel}: setLocation must be a string when present`;
  }
  if (raw.mergeDialogues !== undefined) {
    if (!raw.mergeDialogues || typeof raw.mergeDialogues !== 'object' || Array.isArray(raw.mergeDialogues)) {
      return `${sourceLabel}: mergeDialogues must be an object map of key → string`;
    }
    for (const [k, v] of Object.entries(raw.mergeDialogues)) {
      if (typeof v !== 'string') {
        return `${sourceLabel}: mergeDialogues["${k}"] must be a string value`;
      }
    }
  }
  return null;
};
