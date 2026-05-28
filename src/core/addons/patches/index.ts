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
 * Each YAML file is an array of patch entries. Operations are keyed
 * on `targetType` + named op fields so new ops can land later without
 * breaking existing addons:
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
 * This module is organised as one file per target category — action.ts,
 * npc.ts, item.ts, … — each exporting its entry interface, apply
 * function, and validator. This file (`index.ts`) re-exports the
 * public API and wires the dispatchers.
 */

import type {
  PatchTargetType,
  PatchApplyContext,
  PatchApplyResult,
  PatchRegistries,
} from './types';

import { applyActionPatch, validateActionPatch, type ActionPatchEntry } from './action';
import { applyNpcPatch, validateNpcPatch, type NpcPatchEntry } from './npc';
import { applyItemPatch, validateItemPatch, type ItemPatchEntry } from './item';
import { applyBuffPatch, validateBuffPatch, type BuffPatchEntry } from './buff';
import { applyResourcePatch, validateResourcePatch, type ResourcePatchEntry } from './resource';
import { applyModifierPatch, validateModifierPatch, type ModifierPatchEntry } from './modifier';
import { applyHomePatch, validateHomePatch, type HomePatchEntry } from './home';
import { applyNavigationPatch, validateNavigationPatch, type NavigationPatchEntry } from './navigation';
import { applyMilestonePatch, validateMilestonePatch, type MilestonePatchEntry } from './milestone';
import { applySectionPatch, validateSectionPatch, type SectionPatchEntry } from './section';
import { reportMissing } from './shared';

// Re-export base types so consumers only need to import from
// '../addons/patches' (which resolves to this file).
export type {
  PatchTargetType,
  PatchApplyContext,
  PatchApplyResult,
  PatchRegistries,
} from './types';
export type {
  ActionPatchEntry,
  NpcPatchEntry,
  ItemPatchEntry,
  BuffPatchEntry,
  ResourcePatchEntry,
  ModifierPatchEntry,
  HomePatchEntry,
  NavigationPatchEntry,
  MilestonePatchEntry,
  SectionPatchEntry,
};

export type PatchEntry =
  | ActionPatchEntry
  | NpcPatchEntry
  | ItemPatchEntry
  | BuffPatchEntry
  | ResourcePatchEntry
  | ModifierPatchEntry
  | HomePatchEntry
  | NavigationPatchEntry
  | MilestonePatchEntry
  | SectionPatchEntry;

/**
 * Per-targetType dispatch table. Each row pairs the registry key
 * we look up in PatchRegistries with the apply function from the
 * matching per-category module. The dispatcher in applyPatches uses
 * this to route an entry without a 10-way switch.
 */
const PATCH_DISPATCH: Record<
  PatchTargetType,
  {
    registryKey: keyof PatchRegistries;
    apply: (entry: any, reg: Record<string, any>, ctx: PatchApplyContext, result: PatchApplyResult) => boolean;
  }
> = {
  action:     { registryKey: 'action',     apply: applyActionPatch     as any },
  npc:        { registryKey: 'npc',        apply: applyNpcPatch        as any },
  item:       { registryKey: 'item',       apply: applyItemPatch       as any },
  buff:       { registryKey: 'buff',       apply: applyBuffPatch       as any },
  resource:   { registryKey: 'resource',   apply: applyResourcePatch   as any },
  modifier:   { registryKey: 'modifier',   apply: applyModifierPatch   as any },
  home:       { registryKey: 'home',       apply: applyHomePatch       as any },
  navigation: { registryKey: 'navigation', apply: applyNavigationPatch as any },
  milestone:  { registryKey: 'milestone',  apply: applyMilestonePatch  as any },
  section:    { registryKey: 'section',    apply: applySectionPatch    as any },
};

const VALID_TARGETS = new Set<PatchTargetType>([
  'action', 'npc', 'item', 'buff', 'resource', 'modifier',
  'home', 'navigation', 'milestone', 'section',
]);

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

/**
 * Per-targetType validator dispatch. Each entry returns either null
 * (valid) or a human-readable error string.
 */
const VALIDATOR_DISPATCH: Record<PatchTargetType, (raw: any, sourceLabel: string) => string | null> = {
  action:     validateActionPatch,
  npc:        validateNpcPatch,
  item:       validateItemPatch,
  buff:       validateBuffPatch,
  resource:   validateResourcePatch,
  modifier:   validateModifierPatch,
  home:       validateHomePatch,
  navigation: validateNavigationPatch,
  milestone:  validateMilestonePatch,
  section:    validateSectionPatch,
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
  if (!VALID_TARGETS.has(raw.targetType)) {
    return `${sourceLabel}: targetType "${raw.targetType}" not supported (v2 handles ${[...VALID_TARGETS].join(', ')})`;
  }
  if (typeof raw.targetId !== 'string' || raw.targetId.length === 0) {
    return `${sourceLabel}: targetId missing or empty`;
  }
  const perType = VALIDATOR_DISPATCH[raw.targetType as PatchTargetType];
  // perType will always be defined because VALID_TARGETS is the same
  // set of keys, but TS doesn't know that — guard anyway.
  return perType ? perType(raw, sourceLabel) : null;
};
