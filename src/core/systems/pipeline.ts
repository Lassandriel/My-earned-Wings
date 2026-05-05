import {
  GameState,
  GameModifier,
  ItemDefinition,
  ActionDefinition,
  FlagId,
  ModifierDefinition,
} from '../../types/game';

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

      // 1. DATA-DRIVEN: Items & Buildings (via Flags)
      // Optimization: Only iterate flags that are true
      for (const flagId in store.flags) {
        if (!store.flags[flagId as FlagId]) continue;

        // Check Items/Furniture
        const item = store.content.get<ItemDefinition>(flagId, 'items');
        if (item?.modifiers) {
          if (item.category !== 'furniture' || store.placedItems.includes(item.id)) {
            for (const m of item.modifiers) {
              if (m.key === key) mods.push(m);
            }
          }
        }

        // Check Actions/Buildings
        const action = store.content.get<ActionDefinition>(flagId, 'actions');
        if (action?.modifiers) {
          for (const m of action.modifiers) {
            if (m.key === key) mods.push(m);
          }
        }
      }

      // 2. DATA-DRIVEN: Active Home
      if (store.activeHome) {
        const home = store.content.get(store.activeHome, 'homes');
        if (home?.modifiers) {
          for (const m of home.modifiers) {
            if (m.key === key) mods.push(m);
          }
        }
      }

      // 3. DATA-DRIVEN: Buffs
      if (store.activeBuffs) {
        for (const buffId in store.activeBuffs) {
          const buffDef = store.content.get(buffId, 'buffs');
          if (buffDef?.modifiers) {
            for (const m of buffDef.modifiers) {
              if (m.key === key) mods.push(m);
            }
          }
        }
      }

      // 4. DATA-DRIVEN: Active Title
      if (store.activeTitle) {
        const title = store.content.get(store.activeTitle, 'titles');
        if (title?.modifiers) {
          for (const m of title.modifiers) {
            if (m.key === key) mods.push(m);
          }
        }
      }

      // 5. LOGIC-DRIVEN: Satiation Efficiency
      const efficiencyKeys = ['resource_efficiency', 'wood_yield', 'stone_yield', 'meat_yield', 'shards_yield'];
      if (efficiencyKeys.includes(key)) {
        mods.push({ mult: CoreRules.calculateEfficiency(store.stats.satiation) });
      }

      // 6. LOGIC-DRIVEN: Knowledge & Study
      if (key === 'magic_limit_gain') {
        const bookCount = store.resources.books || 0;
        if (bookCount > 0) mods.push({ add: bookCount * 2 });

        // Apply study_efficiency (Prevent infinite recursion if study_efficiency depends on magic_limit_gain)
        const studyEff = this.calculate(store, 'study_efficiency', 1);
        if (studyEff !== 1) mods.push({ mult: studyEff });
      }

      return mods;
    },
  };
};
