import { GameState } from '../../types/game';
import { EngineServices } from '../types';
import { LOG_COLOR } from '../../core/constants';

/**
 * Drains magic per tick while a shadow is bound to an action.
 * Releases the shadow and logs/sounds a failure when magic is
 * insufficient. Lore framing — taught by Sariel in Vandara —
 * is that a shadow performs the action for you while you're
 * free to do other things; binding it costs your own magical
 * energy continuously, so it lasts only as long as you can
 * feed it.
 */
export function tickShadow(state: GameState, services: EngineServices, deltaTime: number): void {
  if (!state.activeShadow) return;

  const cost = services.pipeline.calculate(state, 'shadow_bind_cost', 3) * deltaTime;

  if ((state.stats.magic ?? 0) >= cost) {
    services.resource.consume(state, 'magic', cost, true);
  } else {
    state.activeShadow = null;
    services.addLog('shadow_broken_magic', 'logs', LOG_COLOR.failure);
    services.playSound('fail');
  }
}
