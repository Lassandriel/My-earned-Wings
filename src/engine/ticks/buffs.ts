import { GameState } from '../../types/game';

/**
 * Ticks down active buff timers and removes expired ones.
 * Pure data mutation — no service dependencies.
 */
export function tickBuffs(state: GameState, deltaTime: number): void {
  if (!state.activeBuffs) return;

  Object.keys(state.activeBuffs).forEach((id) => {
    const buff = state.activeBuffs[id];
    if (!buff) return;

    buff.remaining = Math.max(0, buff.remaining - deltaTime);
    if (buff.remaining <= 0) {
      const newBuffs = { ...state.activeBuffs };
      delete newBuffs[id];
      state.activeBuffs = newBuffs;
    }
  });
}
