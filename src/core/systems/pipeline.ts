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
      Object.keys(store.flags).forEach((f) => {
        const flagId = f as FlagId;
        if (!store.flags[flagId]) return;

        // Check Items/Furniture
        const item = store.content.get<ItemDefinition>(flagId, 'items');
        if (item?.modifiers) {
          if (item.category !== 'furniture' || store.placedItems.includes(item.id)) {
            item.modifiers.forEach((m) => {
              if (m.key === key) mods.push(m);
            });
          }
        }

        // Check Actions/Buildings
        const action = store.content.get<ActionDefinition>(flagId, 'actions');
        if (action?.modifiers) {
          action.modifiers.forEach((m) => {
            if (m.key === key) mods.push(m);
          });
        }
      });

      // 2. DATA-DRIVEN: Active Home
      if (store.activeHome) {
        const home = store.content.get(store.activeHome, 'homes');
        home?.modifiers?.forEach((m: GameModifier) => {
          if (m.key === key) mods.push(m);
        });
      }

      // 3. DATA-DRIVEN: Buffs
      Object.values(store.activeBuffs || {}).forEach((buff: any) => {
        const buffDef = store.content.get(buff.id, 'buffs');
        buffDef?.modifiers?.forEach((m: GameModifier) => {
          if (m.key === key) mods.push(m);
        });
      });

      // 4. LOGIC-DRIVEN: Satiation Efficiency
      const efficiencyKeys = [
        'resource_efficiency',
        'wood_yield',
        'stone_yield',
        'meat_yield',
        'shards_yield',
      ];
      if (efficiencyKeys.includes(key)) {
        mods.push({ mult: CoreRules.calculateEfficiency(store.stats.satiation) });
      }

      // 5. LOGIC-DRIVEN: Knowledge & Study
      if (key === 'magic_limit_gain') {
        const bookCount = store.resources.books || 0;
        if (bookCount > 0) mods.push({ add: bookCount * 2 });

        // Apply study_efficiency (Recursive lookup)
        const studyEff = this.calculate(store, 'study_efficiency', 1);
        if (studyEff !== 1) mods.push({ mult: studyEff });
      }

      return mods;
    },
  };
};
