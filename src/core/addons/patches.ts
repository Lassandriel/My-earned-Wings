/**
 * Addon patch engine (Phase 17).
 *
 * Lets addons MODIFY existing base-game entries instead of only adding
 * new ones. Critical for narrative addons that need to extend an NPC's
 * quest line (e.g. "after Aria's school graduation, she also hands you
 * the Vandara invitation letter").
 *
 * Patches live alongside an addon's regular content:
 *
 *   content/addons/<name>/patches/<file>.yaml
 *
 * Each YAML file is an array of patch entries. v1 supports a single
 * operation — `appendSteps` for multi-step actions — but the dispatch
 * is keyed on `targetType` + named operations so future ops slot in
 * without breaking existing addons:
 *
 *   - targetType: action
 *     targetId: act-npc-teacher
 *     appendSteps:
 *       - cost: 5
 *         costType: energy
 *         requirements:
 *           flags.school_graduate: true
 *         onSuccess:
 *           - { type: unlockItem, id: item-vandara-letter }
 *           - { type: setFlag, flag: vandara-invited, value: true }
 *           - { type: log, logKey: receive_vandara_letter }
 *         dialogueKey: npc_teacher_vandara_letter
 *
 * Application order is deterministic: addons in name order, then each
 * addon's patch files in lexical order. Within a file, entries apply
 * top-to-bottom. So if two addons both append to the same action,
 * `addon-a` runs first, `addon-b`'s steps land after them.
 *
 * Conflict policy:
 *  - Unknown targetId → fatal at build time, warning at runtime. (At
 *    build time the addon is shipped with the build, so a missing
 *    reference is a bug; at runtime the user dropped the addon in and
 *    we can't crash the game over it.)
 *  - Unknown targetType or unknown operation → same as above.
 *
 * Auto-bump: when `appendSteps` runs, the action's `maxProgress` is
 * bumped to `steps.length` so the UI knows the new steps exist (without
 * the bump, the renderer caps progress at the old count and the new
 * step is never reachable).
 */

export type PatchTargetType = 'action' | 'npc';

export interface BasePatchEntry {
  targetType: PatchTargetType;
  targetId: string;
}

export interface ActionPatchEntry extends BasePatchEntry {
  targetType: 'action';
  /** Append one or more steps to the end of the target action's `steps` array. */
  appendSteps?: any[];
}

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
}

export type PatchEntry = ActionPatchEntry | NpcPatchEntry;

export interface PatchApplyContext {
  /** Where the patch came from — included in error messages. */
  origin: string;
  /**
   * What to do when a patch references something that doesn't exist.
   * `'throw'` for build time (loud failure, addon author sees it);
   * `'warn'` for runtime (the dropped-in addon may target a future
   * version of base; don't crash the game).
   */
  missingTarget: 'throw' | 'warn';
}

export interface PatchApplyResult {
  /** Total entries successfully applied (across all patches passed in). */
  applied: number;
  /** Human-readable warnings (only meaningful when missingTarget='warn'). */
  warnings: string[];
}

/**
 * Apply a list of patches against the per-category registries. Mutates
 * the registries in place. Pure with respect to file I/O — caller is
 * responsible for loading the YAML.
 *
 * `registries` is shaped like the build-time content output:
 *   { action: Record<id, ActionDef>, … }
 * Use category names matching the patch.targetType values.
 */
export const applyPatches = (
  patches: ReadonlyArray<{ entry: PatchEntry; origin: string }>,
  registries: { action: Record<string, any>; npc: Record<string, any> },
  options: { missingTarget: 'throw' | 'warn' },
): PatchApplyResult => {
  const result: PatchApplyResult = { applied: 0, warnings: [] };

  for (const { entry, origin } of patches) {
    const ctx: PatchApplyContext = { origin, missingTarget: options.missingTarget };
    if (entry.targetType === 'action') {
      if (applyActionPatch(entry, registries.action, ctx, result)) {
        result.applied++;
      }
    } else if (entry.targetType === 'npc') {
      if (applyNpcPatch(entry, registries.npc, ctx, result)) {
        result.applied++;
      }
    } else {
      reportMissing(ctx, `unknown targetType "${(entry as any).targetType}"`, result);
    }
  }

  return result;
};

const applyNpcPatch = (
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

  let mutated = false;

  if (typeof entry.bumpMaxProgress === 'number') {
    const current = typeof target.maxProgress === 'number' ? target.maxProgress : 0;
    if (entry.bumpMaxProgress > current) {
      target.maxProgress = entry.bumpMaxProgress;
      mutated = true;
    }
    // If the requested bump is <= current we treat it as a no-op (not
    // a warning) — addon authors can specify a minimum without caring
    // about the existing value, and multiple addons can stack.
  }

  if (entry.addTradeActions && entry.addTradeActions.length > 0) {
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
      mutated = true;
    }
  }

  if (!mutated) {
    reportMissing(ctx, `patch for npc "${entry.targetId}" had no recognized operations`, result);
    return false;
  }
  return true;
};

const applyActionPatch = (
  entry: ActionPatchEntry,
  actionRegistry: Record<string, any>,
  ctx: PatchApplyContext,
  result: PatchApplyResult,
): boolean => {
  const target = actionRegistry[entry.targetId];
  if (!target) {
    reportMissing(ctx, `action "${entry.targetId}" not found`, result);
    return false;
  }

  let mutated = false;

  if (entry.appendSteps && entry.appendSteps.length > 0) {
    if (!Array.isArray(target.steps)) {
      reportMissing(
        ctx,
        `cannot appendSteps to "${entry.targetId}": target has no "steps" array (is it a multi-step action?)`,
        result,
      );
      return false;
    }
    target.steps = [...target.steps, ...entry.appendSteps];
    // Auto-bump maxProgress so the new steps are actually reachable.
    // Renderer reads maxProgress with `steps.length` as fallback — but
    // when maxProgress is set explicitly (which it is for npc actions)
    // it caps progress. Lift it to the new count.
    if (typeof target.maxProgress === 'number') {
      target.maxProgress = target.steps.length;
    }
    mutated = true;
  }

  if (!mutated) {
    reportMissing(ctx, `patch for "${entry.targetId}" had no recognized operations`, result);
    return false;
  }

  return true;
};

const reportMissing = (
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
 * Validate a parsed patch object's shape. Returns null if valid, or a
 * human-readable error string. Called by the build script + the runtime
 * loader so bad YAML fails fast with a useful message rather than
 * crashing later in applyPatches with a confusing type error.
 */
export const validatePatchEntry = (raw: any, sourceLabel: string): string | null => {
  if (!raw || typeof raw !== 'object') {
    return `${sourceLabel}: patch entry must be an object`;
  }
  if (raw.targetType !== 'action' && raw.targetType !== 'npc') {
    return `${sourceLabel}: targetType "${raw.targetType}" not supported (v1 handles "action" and "npc")`;
  }
  if (typeof raw.targetId !== 'string' || raw.targetId.length === 0) {
    return `${sourceLabel}: targetId missing or empty`;
  }
  if (raw.targetType === 'action') {
    if (raw.appendSteps !== undefined) {
      if (!Array.isArray(raw.appendSteps) || raw.appendSteps.length === 0) {
        return `${sourceLabel}: appendSteps must be a non-empty array when present`;
      }
      for (let i = 0; i < raw.appendSteps.length; i++) {
        const step = raw.appendSteps[i];
        if (!step || typeof step !== 'object') {
          return `${sourceLabel}: appendSteps[${i}] must be an object`;
        }
      }
    }
  } else if (raw.targetType === 'npc') {
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
  }
  // Allow other ops to land later without bumping a version number.
  return null;
};
