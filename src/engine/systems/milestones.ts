import { GameState, MilestoneDefinition, FlagId } from '../../types/game';
import { EngineServices } from '../types';
import { invalidateCaches } from '../../core/constants';

/**
 * Walks every milestone in the registry and unlocks those whose
 * requirements are now satisfied: sets the flag, runs each onUnlock
 * effect handler, and invalidates the pipeline/resource caches.
 *
 * Idempotent — already-set flags are skipped.
 */
export function tickMilestones(state: GameState, services: EngineServices): void {
  const milestones = Object.values(
    services.content.registries.milestones,
  ) as MilestoneDefinition[];

  milestones.forEach((milestone) => {
    const flagId = milestone.id as FlagId;
    if (state.flags[flagId]) return;

    const met = Object.entries(milestone.requirements).every(
      ([p, r]) => services.actions.checkRequirement(state, p, r),
    );
    if (!met) return;

    state.flags[flagId] = true;
    milestone.onUnlock?.forEach((effect) => {
      const handler = services.actions.effectHandlers[effect.type];
      if (handler) handler(state, effect);
    });

    invalidateCaches(services);
  });
}
