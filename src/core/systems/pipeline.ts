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


/**
 * Value Pipeline System - TypeScript Edition
 * Handles complex mathematical calculations with additive and multiplicative modifiers.
 */
export const createPipelineSystem = () => {
  /**
   * Internal Core Rules - Hardcoded balancing logic
   */
  const CoreRules = {
    calculateEfficiency(satiation: number): number {
      if (satiation >= 85) return 1.3;
      if (satiation <= 15) return 0.4;
      // Linear interpolation between 0.4 (at 15%) and 1.3 (at 85%)
      return 0.4 + ((satiation - 15) / 70) * 0.9;
    },
  };

  const _modifierCache = new Map<string, GameModifier[]>();

  return {
    metadata: { id: 'pipeline' },
    /**
     * Calculates a modified value for a given key.
     * Formula: (Base + TotalAdditive) * TotalMultiplicative
     */
    calculate(store: GameState, key: string, baseValue: number = 1): number {
      const modDef = store.content.get<ModifierDefinition>(key, 'modifiers');
      const base = modDef?.baseValue ?? baseValue;

      const modifiers = this.getModifiers(store, key);
      let add = 0;
      let mult = 1;

      modifiers.forEach((m: GameModifier) => {
        if (m.add) add += m.add;
        if (m.mult) mult *= m.mult;
      });

      const final = Math.round((base + add) * mult);

      if (!isFinite(final) || isNaN(final)) {
        console.warn(`[PIPELINE] Invalid result for ${key}. Falling back to base.`, final);
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
      
      // 2.1 Satiation Efficiency
      // Keys are auto-derived from YAML (scalesWithSatiation: true) via build:content
      if (PIPELINE_EFFICIENCY_KEYS.includes(key)) {
        mods.push({ mult: CoreRules.calculateEfficiency(store.stats.satiation) });
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
