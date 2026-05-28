import type { BasePatchEntry, PatchApplyContext, PatchApplyResult } from './types';
import { reportMissing } from './shared';

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
   * Append effects to the onSuccess array of a SPECIFIC step in a
   * multi-step (NPC) action. Existing onSuccess entries are kept;
   * new entries appended in order. Use this when an addon needs an
   * existing step to ALSO do something — typically pairing with
   * `appendSteps` so the previous step both finishes its base
   * behaviour and unlocks the next addon-shipped step (e.g. via
   * `extendNPCArc`).
   *
   * `step` accepts:
   *   - a non-negative number — absolute index (0-based)
   *   - a negative number — from-end (-1 = last, -2 = penultimate)
   *   - the string 'last' — alias for -1, most common
   *
   * Dispatch order: addStepOnSuccess runs BEFORE `appendSteps` and
   * `prependSteps` so `last` / negative indices target the steps
   * array as BASE loaded it — appending or prepending in the same
   * entry doesn't shift the target. Out-of-range indices warn and
   * skip.
   */
  addStepOnSuccess?: { step: number | 'last'; effects: any[] };
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

export const applyActionPatch = (
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

  // addStepOnSuccess runs FIRST so `step: 'last'` and negative
  // indices target the steps array as base loaded it. If we let
  // appendSteps/prependSteps run first, "last" would refer to the
  // patch's own appended step — which defeats the point of the field
  // (you almost always want to hook the PREVIOUS step to unlock the
  // appended one via extendNPCArc).
  if (entry.addStepOnSuccess) {
    if (!ensureSteps('addStepOnSuccess')) return false;
    const { step: stepRaw, effects } = entry.addStepOnSuccess;
    const len = target.steps.length;
    let idx: number;
    if (stepRaw === 'last') {
      idx = len - 1;
    } else if (typeof stepRaw === 'number') {
      idx = stepRaw < 0 ? len + stepRaw : stepRaw;
    } else {
      reportMissing(
        ctx,
        `addStepOnSuccess on "${entry.targetId}" needs "step" as a number or 'last'`,
        result,
      );
      return false;
    }
    if (idx < 0 || idx >= len) {
      reportMissing(
        ctx,
        `addStepOnSuccess step "${String(stepRaw)}" resolved to index ${idx}, out of range for "${entry.targetId}" (steps length = ${len})`,
        result,
      );
      return false;
    }
    if (!Array.isArray(effects) || effects.length === 0) {
      reportMissing(
        ctx,
        `addStepOnSuccess on "${entry.targetId}" needs a non-empty "effects" array`,
        result,
      );
      return false;
    }
    const targetStep = target.steps[idx];
    const existing = Array.isArray(targetStep.onSuccess) ? targetStep.onSuccess : [];
    targetStep.onSuccess = [...existing, ...effects];
    mutated = true;
  }

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

export const validateActionPatch = (raw: any, sourceLabel: string): string | null => {
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
  if (raw.addStepOnSuccess !== undefined) {
    if (!raw.addStepOnSuccess || typeof raw.addStepOnSuccess !== 'object') {
      return `${sourceLabel}: addStepOnSuccess must be an object`;
    }
    const step = raw.addStepOnSuccess.step;
    const stepIsNumber = typeof step === 'number';
    const stepIsLast = step === 'last';
    if (!stepIsNumber && !stepIsLast) {
      return `${sourceLabel}: addStepOnSuccess.step must be a number or 'last'`;
    }
    if (!Array.isArray(raw.addStepOnSuccess.effects) || raw.addStepOnSuccess.effects.length === 0) {
      return `${sourceLabel}: addStepOnSuccess.effects must be a non-empty array`;
    }
    for (let i = 0; i < raw.addStepOnSuccess.effects.length; i++) {
      const e = raw.addStepOnSuccess.effects[i];
      if (!e || typeof e !== 'object' || typeof e.type !== 'string') {
        return `${sourceLabel}: addStepOnSuccess.effects[${i}] must be an object with a string "type"`;
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
  return null;
};
