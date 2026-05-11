import { GameState } from '../../types/game';
import { EngineServices } from '../types';

/**
 * UISystem — the bridge between engine state and the Alpine store.
 *
 * Per ARCHITECTURE.md Phase 2, once `state` is a pure-data object
 * separate from the Alpine reactive proxy, this system runs LAST in
 * every tick: it diff-checks engine state against the last-synced
 * snapshot and writes only changed fields to the Alpine store.
 *
 * Today engine state IS the Alpine proxy, so any mutation already
 * propagates through Alpine's own reactivity. This function is a
 * no-op stub that documents where the sync will live and gives the
 * engine tick a stable end-of-tick hook. The closure holds the
 * snapshot reference so the diff implementation can land later
 * without changing the engine.
 */
export interface UISyncSnapshot {
  lastSyncedAt: number;
}

export function createUISync() {
  const snapshot: UISyncSnapshot = { lastSyncedAt: 0 };

  return {
    snapshot,
    /**
     * Push engine state changes to the Alpine store. Currently a no-op
     * because engine state and Alpine store are the same object.
     */
    sync(_state: GameState, _services: EngineServices): void {
      snapshot.lastSyncedAt = Date.now();
    },
  };
}
