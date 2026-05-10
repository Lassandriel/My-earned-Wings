import { GameState } from '../../types/game';
import { EngineServices } from '../types';

/**
 * Accumulates passive magic regeneration and commits whole-fraction
 * batches to keep small per-tick gains from being lost to rounding.
 *
 * Returns the next accumulator value — caller persists it between ticks.
 */
export function tickRegen(
  state: GameState,
  services: EngineServices,
  deltaTime: number,
  magicAccumulator: number,
): number {
  const regen = services.pipeline.calculate(state, 'magic_regen_passive', 0);
  if (regen <= 0) return magicAccumulator;

  let acc = magicAccumulator + regen * deltaTime;

  if (acc >= 0.1) {
    services.resource.add(state, 'magic', acc, true);
    acc = 0;
  }

  return acc;
}
