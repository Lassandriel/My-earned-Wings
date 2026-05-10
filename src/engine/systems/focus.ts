import { GameState } from '../../types/game';
import { EngineServices } from '../types';

/**
 * Drains magic per tick while arcane focus is active.
 * Breaks focus and logs/sounds a failure when magic is insufficient.
 */
export function tickFocus(state: GameState, services: EngineServices, deltaTime: number): void {
  if (!state.activeFocus) return;

  const cost = services.pipeline.calculate(state, 'arcane_focus_cost', 3) * deltaTime;

  if (state.stats.magic >= cost) {
    services.resource.consume(state, 'magic', cost, true);
  } else {
    state.activeFocus = null;
    services.addLog('focus_broken_magic', 'logs', 'var(--accent-red)');
    services.playSound('fail');
  }
}
