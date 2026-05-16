import { registries } from '../../data/index';
import { GameState } from '../../types/game';
import { makeLogger } from '../log';

const log = makeLogger('BOOT');

/**
 * Boot Service - Draconia
 * Orchestrates the entire lifecycle of game start: State building, Validation, and Service Booting.
 */
declare const Alpine: {
  store: (name: string, value?: any) => any;
};
export const createBootSystem = () => {

  return {
    /**
     * Populates the initial state with data-driven defaults from registries.
     */
    buildInitialState(baseState: Partial<GameState>): GameState {
      // 1. Create a clean copy of the base state while preserving functions
      const state = { ...baseState } as GameState;
      
      // Deep clone only specific data-heavy objects to avoid reference sharing
      const DATA_FIELDS = ['resources', 'limits', 'stats', 'flags', 'npcProgress', 'activeBuffs', 'activeProducers', 'counters', 'settings'] as const;
      DATA_FIELDS.forEach(field => {
        if (baseState[field]) {
          (state as unknown as Record<string, unknown>)[field] = JSON.parse(JSON.stringify(baseState[field]));
        }
      });

      // 2. Auto-populate resources and stats
      Object.values(registries.resources).forEach((res: any) => {
        if (res.type === 'resource') {
          const limit = res.initialLimit || 0;
          state.limits[res.id as import('../../types/game').ResourceId] = limit;
          state.resources[res.id as import('../../types/game').ResourceId] = Math.min(limit, res.initial || 0);
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
      log.info('Starting system sequence...');

      // 1. Infrastructure first
      const infraSystems = ['bus', 'input', 'i18n', 'persistence', 'settingsSystem', 'logger'];
      this.execBoot(store, infraSystems);

      // 2. Core Content & Feedback
      const contentSystems = ['preloader', 'background', 'audio', 'ui', 'juice', 'pipeline'];
      this.execBoot(store, contentSystems);

      // 3. Logic & Flow
      const logicSystems = ['actions', 'npc', 'story', 'engine', 'item', 'housing', 'dialogue', 'ellie', 'viewManager'];
      this.execBoot(store, logicSystems);

      log.info('System sequence complete.');

      // Final Lifecycle Check: Ensure the view is at menu unless otherwise specified by state
      if (store.view !== 'menu') {
        log.info('Normalizing view to menu. Previous:', store.view);
        store.view = 'menu';
      }
    },

    /**
     * Internal helper to execute boot() on multiple store sub-systems.
     */
    execBoot(store: GameState, systems: string[]) {
      systems.forEach(sys => {
        const instance = (store as unknown as Record<string, { boot?: (s: GameState) => void; init?: (s: GameState) => void }>)[sys];
        if (instance && typeof instance.boot === 'function') {
          log.debug(`Booting system: ${sys}`);
          instance.boot(store);
        } else if (instance && typeof instance.init === 'function') {
          log.debug(`Initializing system: ${sys}`);
          instance.init(store);
        }
      });
    }
  };
};
