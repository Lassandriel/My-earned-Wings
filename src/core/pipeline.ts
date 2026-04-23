import { GameState, GameModifier, ItemDefinition, ActionDefinition, FlagId, ModifierDefinition } from '../types/game';

/**
 * Value Pipeline System - TypeScript EDITION
 * Handles complex mathematical calculations with additive and multiplicative modifiers.
 * Centralizing this logic makes balancing and scaling much easier.
 */
export const createPipelineSystem = () => {
  return {
    /**
     * Calculates a modified value for a given key.
     * Formula: (Base + TotalAdditive) * TotalMultiplicative
     */
    calculate(store: GameState, key: string, baseValue: number = 1): number {
      // 1. Get base value from registry or use provided default
      const modDef = store.content.get<ModifierDefinition>(key, 'modifiers');
      const base = modDef?.baseValue ?? baseValue;

      const modifiers = this.getModifiers(store, key);

      let add = 0;
      let mult = 1;

      modifiers.forEach((m: GameModifier) => {
        if (m.add) add += m.add;
        if (m.mult) mult *= m.mult;
      });

      const final = (base + add) * mult;

      // --- FINAL SAFETY GUARD (Wave 9) ---
      if (isNaN(final) || !isFinite(final)) {
        console.warn(`[PIPELINE] Invalid result for ${key}. Falling back to base.`, final);
        return base;
      }

      return Math.round(final);
    },

    /**
     * Returns all active modifiers for a specific key.
     */
    getModifiers(store: GameState, key: string): GameModifier[] {
      const mods: GameModifier[] = [];

      // 1. DATA-DRIVEN ITEM & ACTION MODIFIERS (via Flags)
      Object.keys(store.flags).forEach((f) => {
        const flagId = f as FlagId;
        if (store.flags[flagId]) {
          // Check Items
          const item = store.content.get(flagId, 'items') as ItemDefinition | null;
          if (item && item.modifiers) {
            // ONLY apply furniture modifiers if they are in placedItems
            if (item.category !== 'furniture' || store.placedItems.includes(item.id)) {
              item.modifiers
                .filter((m: GameModifier) => m.key === key)
                .forEach((m: GameModifier) => mods.push(m));
            }
          }
          // Check Actions/Buildings
          const action = store.content.get(flagId, 'actions') as ActionDefinition | null;
          if (action && action.modifiers) {
            action.modifiers.filter((m: GameModifier) => m.key === key).forEach((m: GameModifier) => mods.push(m));
          }
        }
      });

      // 2. ACTIVE HOME MODIFIERS (NEW)
      if (store.activeHome) {
        const home = store.content.get(store.activeHome, 'homes');
        if (home && home.modifiers) {
          home.modifiers
            .filter((m: GameModifier) => m.key === key)
            .forEach((m: GameModifier) => mods.push(m));
        }
      }

      // 3. DATA-DRIVEN BUFF MODIFIERS
      Object.values(store.activeBuffs).forEach((buff: any) => {
        const buffDef = store.content.get(buff.id, 'buffs');
        if (buffDef && buffDef.modifiers) {
          buffDef.modifiers
            .filter((m: GameModifier) => m.key === key)
            .forEach((m: GameModifier) => mods.push(m));
        }
      });

      // 3. CORE STATUS RULES (Internal Logic)
      if (
        key === 'resource_efficiency' ||
        ['wood_yield', 'stone_yield', 'meat_yield', 'shards_yield'].includes(key)
      ) {
        const sat = store.stats.satiation;
        let efficiency: number;
        if (sat >= 85) efficiency = 1.3;
        else if (sat <= 15) efficiency = 0.4;
        else {
          // Steeper linear interpolation between 0.4 and 1.3
          efficiency = 0.4 + ((sat - 15) / 70) * 0.9;
        }
        mods.push({ mult: efficiency });
      }

      // Book Knowledge Scaling
      if (key === 'magic_limit_gain') {
        const bookCount = store.resources.books || 0;
        if (bookCount > 0) mods.push({ add: bookCount * 2 });
      }

      return mods;
    },
  };
};
