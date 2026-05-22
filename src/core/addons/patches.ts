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

export type PatchTargetType =
  | 'action'
  | 'npc'
  | 'item'
  | 'buff'
  | 'resource'
  | 'home'
  | 'navigation'
  | 'milestone'
  | 'section';

export interface BasePatchEntry {
  targetType: PatchTargetType;
  targetId: string;
}

export interface ActionPatchEntry extends BasePatchEntry {
  targetType: 'action';
  /** Append one or more steps to the end of the target action's `steps` array. */
  appendSteps?: any[];
  /**
   * Insert one or more steps at the START of the target action's
   * `steps` array. Useful when an addon wants to inject an extra
   * gating step before the existing flow (e.g. "first prove you've
   * read this book, THEN proceed to the original step 1").
   */
  prependSteps?: any[];
  /**
   * Replace a single step at the given index. The index is 0-based
   * over the action's CURRENT steps array (after any earlier patches
   * applied in load order). Out-of-range indices warn and skip.
   */
  replaceStep?: { index: number; with: any };
  /**
   * Remove the step at the given index. Same 0-based current-array
   * semantics as replaceStep. Out-of-range indices warn and skip.
   * action.maxProgress is auto-decremented to match the new step
   * count when it had been pinned.
   */
  removeStep?: { index: number };
  /**
   * Append entries to the action's TOP-LEVEL `onSuccess` array.
   * (Steps have their own onSuccess; patch those via replaceStep.)
   * Lets addons hook into existing flows — e.g. "when the player
   * builds a kitchen, ALSO set my flag." Each entry is a raw
   * effect object validated by the engine at run time.
   */
  addOnSuccess?: any[];
  /**
   * Merge entries into the action's `requirements` map. Existing
   * keys are NOT overwritten — collision logs a warning and skips
   * that key (multiple addons might want to gate the same action;
   * they need to coordinate, not silently stomp each other).
   */
  addRequirement?: Record<string, any>;
  /**
   * Adjust the action's cost. Delta-based: positive amounts add
   * to the existing cost for that resource, negative reduce
   * (floored at 0). Targets that use the legacy `cost`+`costType`
   * shorthand are converted to a `costs` map on first patch.
   *
   *   modifyCost: { wood: -5, magic: +2 }
   *
   * means "5 wood cheaper, 2 magic more expensive". Resources that
   * weren't on the action become a new cost line when the delta is
   * positive.
   */
  modifyCost?: Record<string, number>;
  /** Replace the action's emoji icon. */
  setIcon?: string;
  /** Replace the action's image path. */
  setImage?: string;
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
}

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

export interface BuffPatchEntry extends BasePatchEntry {
  targetType: 'buff';
  /** Replace the buff's duration (seconds). */
  setDuration?: number;
  /** Append modifier entries; collision on key warns + skips. */
  addModifiers?: Array<{ key: string; add?: number; mult?: number }>;
}

export interface ResourcePatchEntry extends BasePatchEntry {
  targetType: 'resource';
  /** Override starting stockpile (defaults to 0). */
  setInitial?: number;
  /** Override starting cap (the unmodified base limit). */
  setInitialLimit?: number;
  /** CSS color used by the UI for this resource. */
  setColor?: string;
}

export interface HomePatchEntry extends BasePatchEntry {
  targetType: 'home';
  /** Furniture slot capacity. */
  setCapacity?: number;
  /** Override the home's preview image. */
  setImage?: string;
}

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

export interface SectionPatchEntry extends BasePatchEntry {
  targetType: 'section';
  /** Override the i18n key for the section header. */
  setHeaderLabel?: string;
  /** Change the gating flag (empty string = always show). */
  setRequiresFlag?: string;
  /** Change which action.category the section lists. */
  setActionCategory?: string;
}

export type PatchEntry =
  | ActionPatchEntry
  | NpcPatchEntry
  | ItemPatchEntry
  | BuffPatchEntry
  | ResourcePatchEntry
  | HomePatchEntry
  | NavigationPatchEntry
  | MilestonePatchEntry
  | SectionPatchEntry;

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
/**
 * The registry bag passed into applyPatches. Only `action` and `npc`
 * are required (they're the most common targets and the earliest in
 * the patch system's history); everything else is optional. When an
 * entry targets a category whose registry isn't in the bag, the
 * patch is reported as a missing-target rather than crashing.
 */
export interface PatchRegistries {
  action: Record<string, any>;
  npc: Record<string, any>;
  item?: Record<string, any>;
  buff?: Record<string, any>;
  resource?: Record<string, any>;
  home?: Record<string, any>;
  navigation?: Record<string, any>;
  milestone?: Record<string, any>;
  section?: Record<string, any>;
}

const PATCH_DISPATCH: Record<
  PatchTargetType,
  { registryKey: keyof PatchRegistries; apply: (entry: any, reg: Record<string, any>, ctx: PatchApplyContext, result: PatchApplyResult) => boolean }
> = {
  action: { registryKey: 'action', apply: (e, r, c, x) => applyActionPatch(e, r, c, x) },
  npc: { registryKey: 'npc', apply: (e, r, c, x) => applyNpcPatch(e, r, c, x) },
  item: { registryKey: 'item', apply: (e, r, c, x) => applyItemPatch(e, r, c, x) },
  buff: { registryKey: 'buff', apply: (e, r, c, x) => applyBuffPatch(e, r, c, x) },
  resource: { registryKey: 'resource', apply: (e, r, c, x) => applyResourcePatch(e, r, c, x) },
  home: { registryKey: 'home', apply: (e, r, c, x) => applyHomePatch(e, r, c, x) },
  navigation: { registryKey: 'navigation', apply: (e, r, c, x) => applyNavigationPatch(e, r, c, x) },
  milestone: { registryKey: 'milestone', apply: (e, r, c, x) => applyMilestonePatch(e, r, c, x) },
  section: { registryKey: 'section', apply: (e, r, c, x) => applySectionPatch(e, r, c, x) },
};

export const applyPatches = (
  patches: ReadonlyArray<{ entry: PatchEntry; origin: string }>,
  registries: PatchRegistries,
  options: { missingTarget: 'throw' | 'warn' },
): PatchApplyResult => {
  const result: PatchApplyResult = { applied: 0, warnings: [] };

  for (const { entry, origin } of patches) {
    const ctx: PatchApplyContext = { origin, missingTarget: options.missingTarget };
    const dispatch = PATCH_DISPATCH[entry.targetType];
    if (!dispatch) {
      reportMissing(ctx, `unknown targetType "${(entry as any).targetType}"`, result);
      continue;
    }
    const reg = registries[dispatch.registryKey];
    if (!reg) {
      reportMissing(
        ctx,
        `${entry.targetType} patches need a ${entry.targetType} registry, none supplied`,
        result,
      );
      continue;
    }
    if (dispatch.apply(entry, reg, ctx, result)) {
      result.applied++;
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

  // Track two booleans separately: `recognized` = "this patch declared
  // at least one op field we know about" (so we don't error with 'no
  // recognized operations'); `mutated` is unused at this layer but
  // kept for symmetry. The bumpMaxProgress no-op case is a real
  // recognized op — addon authors can specify a minimum without
  // caring about the existing value — so we count it as recognized
  // even when the lift is a no-op.
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

  if (entry.mergeDialogues && typeof entry.mergeDialogues === 'object') {
    recognized = true;
    const existing: Record<string, string> = target.dialogues && typeof target.dialogues === 'object'
      ? { ...target.dialogues }
      : {};
    for (const [k, v] of Object.entries(entry.mergeDialogues)) {
      if (k in existing) {
        // Collision — log + skip. Authors should namespace their
        // dialogue keys so this only fires when two addons step on
        // each other.
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

  const ensureSteps = (opName: string): boolean => {
    if (!Array.isArray(target.steps)) {
      reportMissing(
        ctx,
        `cannot ${opName} on "${entry.targetId}": target has no "steps" array (is it a multi-step action?)`,
        result,
      );
      return false;
    }
    return true;
  };

  const syncMaxProgress = () => {
    // maxProgress is only auto-managed when it was explicitly set (npc
    // actions). When undefined, the renderer derives it from
    // steps.length, so leave it alone.
    if (typeof target.maxProgress === 'number') {
      target.maxProgress = target.steps.length;
    }
  };

  if (entry.appendSteps && entry.appendSteps.length > 0) {
    if (!ensureSteps('appendSteps')) return false;
    target.steps = [...target.steps, ...entry.appendSteps];
    syncMaxProgress();
    mutated = true;
  }

  if (entry.prependSteps && entry.prependSteps.length > 0) {
    if (!ensureSteps('prependSteps')) return false;
    target.steps = [...entry.prependSteps, ...target.steps];
    syncMaxProgress();
    mutated = true;
  }

  if (entry.replaceStep) {
    if (!ensureSteps('replaceStep')) return false;
    const { index, with: replacement } = entry.replaceStep;
    if (typeof index !== 'number' || index < 0 || index >= target.steps.length) {
      reportMissing(
        ctx,
        `replaceStep index ${index} out of range for "${entry.targetId}" (steps length = ${target.steps.length})`,
        result,
      );
      return false;
    }
    if (!replacement || typeof replacement !== 'object') {
      reportMissing(ctx, `replaceStep on "${entry.targetId}" needs a "with" object`, result);
      return false;
    }
    target.steps = [...target.steps.slice(0, index), replacement, ...target.steps.slice(index + 1)];
    // steps.length unchanged, no maxProgress sync needed
    mutated = true;
  }

  if (entry.removeStep) {
    if (!ensureSteps('removeStep')) return false;
    const { index } = entry.removeStep;
    if (typeof index !== 'number' || index < 0 || index >= target.steps.length) {
      reportMissing(
        ctx,
        `removeStep index ${index} out of range for "${entry.targetId}" (steps length = ${target.steps.length})`,
        result,
      );
      return false;
    }
    target.steps = [...target.steps.slice(0, index), ...target.steps.slice(index + 1)];
    syncMaxProgress();
    mutated = true;
  }

  if (entry.addOnSuccess && entry.addOnSuccess.length > 0) {
    const existing = Array.isArray(target.onSuccess) ? target.onSuccess : [];
    target.onSuccess = [...existing, ...entry.addOnSuccess];
    mutated = true;
  }

  if (entry.addRequirement && typeof entry.addRequirement === 'object') {
    const existing: Record<string, any> = target.requirements && typeof target.requirements === 'object'
      ? { ...target.requirements }
      : {};
    let anyAdded = false;
    for (const [k, v] of Object.entries(entry.addRequirement)) {
      if (k in existing) {
        result.warnings.push(`[${ctx.origin}] addRequirement on "${entry.targetId}": key "${k}" already exists, skipped`);
        continue;
      }
      existing[k] = v;
      anyAdded = true;
    }
    if (anyAdded) {
      target.requirements = existing;
      mutated = true;
    }
  }

  if (entry.modifyCost && typeof entry.modifyCost === 'object') {
    // Normalise to a costs-map even if the action used the
    // single-cost shorthand, so the delta math is uniform.
    let costs: Record<string, number> = {};
    if (target.costs && typeof target.costs === 'object') {
      costs = { ...target.costs };
    } else if (typeof target.cost === 'number' && typeof target.costType === 'string') {
      costs[target.costType] = target.cost;
    }
    for (const [res, delta] of Object.entries(entry.modifyCost)) {
      if (typeof delta !== 'number') continue;
      const next = (costs[res] || 0) + delta;
      if (next <= 0) {
        // Cost went to zero or below — remove the line entirely so
        // the engine doesn't keep a 0-cost entry around (which
        // confuses cost-rendering and resource consumption).
        delete costs[res];
      } else {
        costs[res] = next;
      }
    }
    target.costs = costs;
    // Wipe the legacy shorthand fields now that costs is canonical
    // — keeping both around could let the engine double-count.
    if (target.cost !== undefined) delete target.cost;
    if (target.costType !== undefined) delete target.costType;
    mutated = true;
  }

  if (typeof entry.setIcon === 'string' && entry.setIcon.length > 0) {
    target.icon = entry.setIcon;
    mutated = true;
  }

  if (typeof entry.setImage === 'string' && entry.setImage.length > 0) {
    target.image = entry.setImage;
    mutated = true;
  }

  if (!mutated) {
    reportMissing(ctx, `patch for "${entry.targetId}" had no recognized operations`, result);
    return false;
  }

  return true;
};

const applyItemPatch = (
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
    const existing: any[] = Array.isArray(target.modifiers) ? target.modifiers : [];
    const seenKeys = new Set(existing.map((m) => m?.key).filter(Boolean));
    const additions = entry.addModifiers.filter((m) => {
      if (!m || typeof m.key !== 'string') return false;
      if (seenKeys.has(m.key)) {
        result.warnings.push(`[${ctx.origin}] addModifiers on item "${entry.targetId}": key "${m.key}" already present, skipped`);
        return false;
      }
      seenKeys.add(m.key);
      return true;
    });
    if (additions.length > 0) {
      target.modifiers = [...existing, ...additions];
    }
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

/**
 * Shared helper for the "merge modifiers, skip on key collision"
 * pattern used by both items and buffs. Mutates target.modifiers.
 */
const mergeModifiers = (
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

const applyBuffPatch = (
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

const applyResourcePatch = (
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

const applyHomePatch = (
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

const applyNavigationPatch = (
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

const applyMilestonePatch = (
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

const applySectionPatch = (
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
  const VALID_TARGETS = new Set([
    'action', 'npc', 'item', 'buff', 'resource', 'home', 'navigation', 'milestone', 'section',
  ]);
  if (!VALID_TARGETS.has(raw.targetType)) {
    return `${sourceLabel}: targetType "${raw.targetType}" not supported (v2 handles ${[...VALID_TARGETS].join(', ')})`;
  }
  if (typeof raw.targetId !== 'string' || raw.targetId.length === 0) {
    return `${sourceLabel}: targetId missing or empty`;
  }
  if (raw.targetType === 'action') {
    // Step-array operations share validation shape.
    for (const opName of ['appendSteps', 'prependSteps'] as const) {
      if (raw[opName] !== undefined) {
        if (!Array.isArray(raw[opName]) || raw[opName].length === 0) {
          return `${sourceLabel}: ${opName} must be a non-empty array when present`;
        }
        for (let i = 0; i < raw[opName].length; i++) {
          const step = raw[opName][i];
          if (!step || typeof step !== 'object') {
            return `${sourceLabel}: ${opName}[${i}] must be an object`;
          }
        }
      }
    }
    if (raw.replaceStep !== undefined) {
      if (!raw.replaceStep || typeof raw.replaceStep !== 'object') {
        return `${sourceLabel}: replaceStep must be an object { index, with }`;
      }
      if (typeof raw.replaceStep.index !== 'number' || raw.replaceStep.index < 0) {
        return `${sourceLabel}: replaceStep.index must be a non-negative number`;
      }
      if (!raw.replaceStep.with || typeof raw.replaceStep.with !== 'object') {
        return `${sourceLabel}: replaceStep.with must be an object`;
      }
    }
    if (raw.removeStep !== undefined) {
      if (!raw.removeStep || typeof raw.removeStep !== 'object') {
        return `${sourceLabel}: removeStep must be an object { index }`;
      }
      if (typeof raw.removeStep.index !== 'number' || raw.removeStep.index < 0) {
        return `${sourceLabel}: removeStep.index must be a non-negative number`;
      }
    }
    if (raw.addOnSuccess !== undefined) {
      if (!Array.isArray(raw.addOnSuccess) || raw.addOnSuccess.length === 0) {
        return `${sourceLabel}: addOnSuccess must be a non-empty array when present`;
      }
      for (let i = 0; i < raw.addOnSuccess.length; i++) {
        const e = raw.addOnSuccess[i];
        if (!e || typeof e !== 'object' || typeof e.type !== 'string') {
          return `${sourceLabel}: addOnSuccess[${i}] must be an object with a string "type"`;
        }
      }
    }
    if (raw.addRequirement !== undefined) {
      if (!raw.addRequirement || typeof raw.addRequirement !== 'object' || Array.isArray(raw.addRequirement)) {
        return `${sourceLabel}: addRequirement must be a map of path → rule`;
      }
    }
    if (raw.modifyCost !== undefined) {
      if (!raw.modifyCost || typeof raw.modifyCost !== 'object' || Array.isArray(raw.modifyCost)) {
        return `${sourceLabel}: modifyCost must be a map of resource → number delta`;
      }
      for (const [res, delta] of Object.entries(raw.modifyCost)) {
        if (typeof delta !== 'number') {
          return `${sourceLabel}: modifyCost["${res}"] must be a number`;
        }
      }
    }
    for (const k of ['setIcon', 'setImage'] as const) {
      if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
        return `${sourceLabel}: ${k} must be a non-empty string when present`;
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
    for (const k of ['setIcon', 'setColor', 'setImage'] as const) {
      if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
        return `${sourceLabel}: ${k} must be a non-empty string when present`;
      }
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
  } else if (raw.targetType === 'item') {
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
  } else if (raw.targetType === 'buff') {
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
  } else if (raw.targetType === 'resource') {
    for (const k of ['setInitial', 'setInitialLimit'] as const) {
      if (raw[k] !== undefined && (typeof raw[k] !== 'number' || raw[k] < 0)) {
        return `${sourceLabel}: ${k} must be a non-negative number when present`;
      }
    }
    if (raw.setColor !== undefined && (typeof raw.setColor !== 'string' || raw.setColor.length === 0)) {
      return `${sourceLabel}: setColor must be a non-empty string when present`;
    }
  } else if (raw.targetType === 'home') {
    if (raw.setCapacity !== undefined && (typeof raw.setCapacity !== 'number' || raw.setCapacity < 0)) {
      return `${sourceLabel}: setCapacity must be a non-negative number when present`;
    }
    if (raw.setImage !== undefined && (typeof raw.setImage !== 'string' || raw.setImage.length === 0)) {
      return `${sourceLabel}: setImage must be a non-empty string when present`;
    }
  } else if (raw.targetType === 'navigation') {
    for (const k of ['setIcon', 'setImage', 'setLabel'] as const) {
      if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
        return `${sourceLabel}: ${k} must be a non-empty string when present`;
      }
    }
    // setRequiredFlag intentionally allows empty string (= ungate).
    if (raw.setRequiredFlag !== undefined && typeof raw.setRequiredFlag !== 'string') {
      return `${sourceLabel}: setRequiredFlag must be a string when present`;
    }
  } else if (raw.targetType === 'milestone') {
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
  } else if (raw.targetType === 'section') {
    for (const k of ['setHeaderLabel', 'setActionCategory'] as const) {
      if (raw[k] !== undefined && (typeof raw[k] !== 'string' || raw[k].length === 0)) {
        return `${sourceLabel}: ${k} must be a non-empty string when present`;
      }
    }
    if (raw.setRequiresFlag !== undefined && typeof raw.setRequiresFlag !== 'string') {
      return `${sourceLabel}: setRequiresFlag must be a string when present`;
    }
  }
  // Allow other ops to land later without bumping a version number.
  return null;
};
