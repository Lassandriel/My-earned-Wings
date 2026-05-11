import { GameState } from '../types/game';

/**
 * Services the engine and its subsystems need outside of pure state data.
 * Splitting these from `state` is the first step of the Phase 2 migration:
 * once `state` is a pure data object, services live in their own container
 * and the engine no longer depends on Alpine.js reactivity.
 */
export type EngineServices = Pick<
  GameState,
  | 'pipeline'
  | 'resource'
  | 'actions'
  | 'content'
  | 'commands'
  | 'addLog'
  | 'playSound'
  | 'saveGame'
> & {
  /**
   * Reference to the engine-owned game state. Phase 2 Step 8: engine code
   * should read/write through this instead of Alpine.store('game') so
   * mutations don't trigger Alpine reactivity per-tick. Today (Stage 1)
   * this is identity-equal to the Alpine store; Stage 2 will deep-clone
   * it so writes here don't propagate without UISync.
   */
  gameState: GameState;
};
