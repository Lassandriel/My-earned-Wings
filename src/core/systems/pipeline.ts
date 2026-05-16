import {
  GameState,
  GameModifier,
  ItemDefinition,
  ActionDefinition,
  FlagId,
  ModifierDefinition,
  HomeDefinition,
  BuffDefinition,
  TitleDefinition,
} from '../../types/game';
import { PIPELINE_EFFICIENCY_KEYS } from '../../generated/content';
import { makeLogger } from '../log';

const log = makeLogger('PIPELINE');


/**
 * Value Pipeline System - TypeScript Edition
 * Handles complex mathematical calculations with additive and multiplicative modifiers.
 */
export const createPipelineSystem = () => {
  /**
   * Internal Core Rules - Hardcoded balancing logic.
   *
   * Phase 1.5 follow-up (May 2026): the engine no longer multiplies. Satiation
   * is now a flat integer additive that ranges from -5 (starving) to +5
   * (well-fed), applied to every yield with `scalesWithSatiation: true`.
   */
  const CoreRules = {
    calculateSatiationBonus(satiation: number): number {
      // (sat - 50) / 10, rounded toward zero, clamped to [-5, +5].
      const raw = Math.trunc((satiation - 50) / 10);
      return Math.max(-5, Math.min(5, raw));
    },
  };

  const _modifierCache = new Map<string, GameModifier[]>();

  return {
    metadata: { id: 'pipeline' },
    /**
     * Calculates a modified value for a given key.
     * Formula: max(0, base + Σ adds)   — additive only, no multiplication.
     * (Multiplicative modifiers were removed during Phase 1.5; the field is
     *  still tolerated on GameModifier for forward compat but ignored here.)
     */
    calculate(store: GameState, key: string, baseValue: number = 1): number {
      const modDef = store.content.get<ModifierDefinition>(key, 'modifiers');
      const base = modDef?.baseValue ?? baseValue;

      const modifiers = this.getModifiers(store, key);
      let add = 0;
      modifiers.forEach((m: GameModifier) => {
        if (m.add) add += m.add;
      });

      const final = Math.max(0, base + add);

      if (!isFinite(final) || isNaN(final)) {
        log.warn(`Invalid result for ${key}. Falling back to base.`, final);
        return base;
      }

      return final;
    },

    /**
     * Returns all active modifiers for a specific key.
     */
    getModifiers(store: GameState, key: string): GameModifier[] {
      const mods: GameModifier[] = [];

      // 1. STATIC MODIFIERS (Cached)
      if (_modifierCache.has(key)) {
        mods.push(..._modifierCache.get(key)!);
      } else {
        const staticMods: GameModifier[] = [];
        
        // 1.1 Items & Buildings (via Flags)
        const activeFlags = Object.keys(store.flags).filter(f => store.flags[f as FlagId]);
        for (const flagId of activeFlags) {
          const item = store.content.get<ItemDefinition>(flagId, 'items');
          if (item?.modifiers) {
            if (item.category !== 'furniture' || store.placedItems.includes(item.id)) {
              for (const m of item.modifiers) {
                if (m.key === key) staticMods.push(m);
              }
            }
          }
          const action = store.content.get<ActionDefinition>(flagId, 'actions');
          if (action?.modifiers) {
            // Stack modifiers based on how many times this building was built
            const count = action.maxCount ? (store.counters[flagId] || 0) : 1;
            for (let i = 0; i < count; i++) {
              for (const m of action.modifiers) {
                if (m.key === key) staticMods.push(m);
              }
            }
          }
        }

        // 1.2 Active Home
        if (store.activeHome) {
          const home = store.content.get<HomeDefinition>(store.activeHome, 'homes');
          if (home?.modifiers) {
            for (const m of home.modifiers) {
              if (m.key === key) staticMods.push(m);
            }
          }
        }

        // 1.3 Active Buffs
        if (store.activeBuffs) {
          for (const buffId in store.activeBuffs) {
            const buffDef = store.content.get<BuffDefinition>(buffId, 'buffs');
            if (buffDef?.modifiers) {
              for (const m of buffDef.modifiers) {
                if (m.key === key) staticMods.push(m);
              }
            }
          }
        }

        // 1.4 Active Title
        if (store.activeTitle) {
          const title = store.content.get<TitleDefinition>(store.activeTitle, 'titles');
          if (title?.modifiers) {
            for (const m of title.modifiers) {
              if (m.key === key) staticMods.push(m);
            }
          }
        }

        _modifierCache.set(key, staticMods);
        mods.push(...staticMods);
      }

      // 2. DYNAMIC MODIFIERS (Never Cached)
      
      // 2.1 Satiation bonus — flat integer add (-5 starving … +5 well-fed).
      // Keys are auto-derived from YAML (scalesWithSatiation: true) via build:content.
      if (PIPELINE_EFFICIENCY_KEYS.includes(key)) {
        const bonus = CoreRules.calculateSatiationBonus(store.stats.satiation);
        if (bonus !== 0) mods.push({ add: bonus });
      }

      // 2.2 Books scaling — extra magic_limit per stored book.
      // (Phase 1.5 follow-up: study_efficiency multiplier was removed with the
      //  Vandara/Schule rollback. Reintroduce here when the academy returns.)
      if (key === 'magic_limit_gain') {
        const books = store.resources?.books ?? 0;
        if (typeof books === 'number' && books > 0) mods.push({ add: books * 2 });
      }

      return mods;
    },

    invalidateCache() {
      _modifierCache.clear();
    },
  };
};
