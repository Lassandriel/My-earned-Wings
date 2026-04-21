import { registries } from '../data/index';
import { GameState } from '../types/game';

/**
 * Boot Service - Draconia
 * Handles the initial assembly of the game store from registries.
 */
export const createBootSystem = () => ({
  /**
   * Populates the initial state with data-driven defaults from registries.
   */
  buildInitialState(baseState: any): GameState {
    const state = JSON.parse(JSON.stringify(baseState));

    // 1. Auto-populate resources and stats
    Object.values(registries.resources).forEach((res: any) => {
      if (res.type === 'resource') {
        const limit = res.initialLimit || 0;
        state.limits[res.id] = limit;
        state.resources[res.id] = Math.min(limit, res.initial || 0);
      } else if (res.type === 'stat') {
        const max = res.initialMax || 100;
        const maxKey = 'max' + res.id.charAt(0).toUpperCase() + res.id.slice(1);
        state.stats[maxKey] = max;
        state.stats[res.id] = Math.min(max, res.initial || 100);
      }
    });

    // 2. Auto-populate NPC data
    Object.values(registries.npcs).forEach((npc: any) => {
      if (npc.progKey && state.npcProgress[npc.progKey] === undefined) {
        state.npcProgress[npc.progKey] = 0;
      }
      if (npc.unlockedAtStart && !state.unlockedNPCs.includes(npc.id)) {
        state.unlockedNPCs.push(npc.id);
      }
    });

    return state;
  }
});
