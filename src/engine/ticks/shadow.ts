import { GameState } from '../../types/game';
import { EngineServices } from '../types';
import { LOG_COLOR } from '../../core/constants';

/**
 * Drains magic per tick for EVERY bound shadow. Each bound shadow costs
 * `shadow_bind_cost` per second; the total is the per-shadow cost times
 * the number of active shadows. If the player can't afford the full
 * upkeep, ALL shadows are released at once (you can't sustain any).
 *
 * Lore framing — taught by Sariel in Vandara — is that a shadow performs
 * the action for you while you're free to do other things; binding one
 * costs your own magical energy continuously, so they last only as long
 * as you can feed them. Each story addon grants another slot.
 */
export function tickShadow(state: GameState, services: EngineServices, deltaTime: number): void {
  const bound = state.activeShadows;
  if (!bound || bound.length === 0) return;

  const perShadow = services.pipeline.calculate(state, 'shadow_bind_cost', 3);
  const cost = perShadow * bound.length * deltaTime;

  if ((state.stats.magic ?? 0) >= cost) {
    services.resource.consume(state, 'magic', cost, true);
  } else {
    state.activeShadows = [];
    services.addLog('shadow_broken_magic', 'logs', LOG_COLOR.failure);
    services.playSound('fail');
  }
}
