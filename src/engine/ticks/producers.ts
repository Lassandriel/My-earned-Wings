import { GameState, ActionDefinition } from '../../types/game';
import { EngineServices } from '../types';
import { LOG_COLOR } from '../../core/constants';

/**
 * Ticks every active producer: checks requirements, deducts magic
 * maintenance, accumulates fractional yields, and commits whole units
 * once a producer's accumulator reaches 1.
 *
 * The accumulator Record is mutated in place — caller persists it
 * between ticks.
 */
export function tickProducers(
  state: GameState,
  services: EngineServices,
  deltaTime: number,
  accumulator: Record<string, number>,
): void {
  state.activeProducers.forEach((id) => {
    const action = services.content.get<ActionDefinition>(id, 'actions');
    if (!action?.passiveProduction) return;

    const prod = action.passiveProduction;
    const intervalSec = prod.interval / 1000;

    if (prod.requirements) {
      const met = Object.entries(prod.requirements).every(
        ([p, r]) => services.actions.checkRequirement(state, p, r),
      );
      if (!met) return;
    }

    if (prod.magicCost) {
      const tickCost = (services.pipeline.calculate(state, id + '_cost', prod.magicCost) / intervalSec) * deltaTime;
      if ((state.stats.magic ?? 0) < tickCost) {
        if ((state.counters.totalTime ?? 0) % 20 === 0) {
          services.addLog(id + '_fail_log', 'logs', LOG_COLOR.failure);
        }
        return;
      }
      services.resource.consume(state, 'magic', tickCost, true);
    }

    const baseYield = services.pipeline.calculate(state, id + '_yield', prod.baseYield);
    const yieldPerSec = baseYield / intervalSec;
    const currentYield = yieldPerSec * deltaTime;

    accumulator[id] = (accumulator[id] || 0) + currentYield;

    if (accumulator[id] >= 1) {
      const amount = Math.floor(accumulator[id]);
      services.resource.add(state, prod.resource, amount, true);
      accumulator[id] -= amount;

      if ((state.counters.totalTime ?? 0) % 20 === 0) {
        services.addLog(id + '_log', 'logs', LOG_COLOR.success);
      }
    }
  });
}
