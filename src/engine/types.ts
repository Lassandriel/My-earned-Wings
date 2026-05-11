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
  | 'executeAction'
  | 'saveGame'
>;
