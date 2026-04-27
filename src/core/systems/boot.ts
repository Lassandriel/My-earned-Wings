import { registries } from '../../data/index';
import { GameState } from '../../types/game';
import { createValidatorService } from './validator';

/**
 * Boot Service - Draconia
 * Orchestrates the entire lifecycle of game start: State building, Validation, and Service Booting.
 */
export const createBootSystem = () => {
  const validator = createValidatorService();

  return {
    /**
     * Populates the initial state with data-driven defaults from registries.
     */
    buildInitialState(baseState: any): GameState {
      // 1. Validate data integrity before building state
      validator.validateRegistries(registries as any);

      const state = JSON.parse(JSON.stringify(baseState));

      // 2. Auto-populate resources and stats
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

      // 3. Auto-populate NPC data
      Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.progKey && state.npcProgress[npc.progKey] === undefined) {
          state.npcProgress[npc.progKey] = 0;
        }
        if (npc.unlockedAtStart && !state.unlockedNPCs.includes(npc.id)) {
          state.unlockedNPCs.push(npc.id);
        }
      });

      return state;
    },

    /**
     * Handles the orderly startup of all game systems.
     */
    bootSystems(store: GameState) {
      console.log('[Bootstrapper] Starting system sequence...');

      // 1. Infrastructure first
      const infraSystems = ['bus', 'i18n', 'persistence', 'settingsSystem'];
      this.execBoot(store, infraSystems);

      // 2. Core Gameplay
      const contentSystems = ['preloader', 'background', 'audio', 'ui'];
      this.execBoot(store, contentSystems);

      // 3. Logic & AI
      const logicSystems = ['actions', 'npc', 'story', 'engine'];
      this.execBoot(store, logicSystems);

      console.log('[Bootstrapper] System sequence complete.');
    },

    /**
     * Internal helper to execute boot() on multiple store sub-systems.
     */
    execBoot(store: GameState, systems: string[]) {
      systems.forEach(sys => {
        const instance = (store as any)[sys];
        if (instance && typeof instance.boot === 'function') {
          console.log(`[Bootstrapper] Booting system: ${sys}`);
          instance.boot(store);
        } else if (instance && typeof instance.init === 'function') {
          console.log(`[Bootstrapper] Initializing system: ${sys}`);
          instance.init(store);
        }
      });
    }
  };
};
