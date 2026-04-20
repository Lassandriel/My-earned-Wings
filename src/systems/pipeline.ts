import { GameState, GameModifier, ItemDefinition, ActionDefinition, FlagId } from '../types/game';

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
      // Default base overrides for specific keys
      let base = baseValue;
      if (key === 'meat_yield') base = 2;
      if (key === 'garden_yield') base = 3;
      if (key === 'shards_yield') base = 15;
      if (key === 'eat_satiation_gain') base = 10;
      if (key === 'rest_energy_gain') base = 15;
      if (key === 'wood_yield') base = 3;
      if (key === 'stone_yield') base = 2;
      if (key === 'magic_yield') base = 15;

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

      return Math.round(final * 100) / 100;
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
            item.modifiers.filter((m) => m.key === key).forEach((m) => mods.push(m));
          }
          // Check Actions/Buildings
          const action = store.content.get(flagId, 'actions') as ActionDefinition | null;
          if (action && action.modifiers) {
            action.modifiers.filter((m) => m.key === key).forEach((m) => mods.push(m));
          }
        }
      });

      // 2. DATA-DRIVEN BUFF MODIFIERS
      Object.values(store.activeBuffs).forEach((buff: any) => {
        const buffDef = store.content.get(buff.id, 'buffs');
        if (buffDef && buffDef.modifiers) {
          buffDef.modifiers.filter((m: GameModifier) => m.key === key).forEach((m: GameModifier) => mods.push(m));
        }
        // Legacy buff support
        if (key === 'energy_reg_bonus' && buff.type === 'energy_reg_bonus') {
          mods.push({ add: buff.value });
        }
      });

      // 3. CORE STATUS RULES (Internal Logic)
      if (
        key === 'resource_efficiency' ||
        ['wood_yield', 'stone_yield', 'meat_yield', 'shards_yield'].includes(key)
      ) {
        const sat = store.stats.satiation;
        let efficiency: number;
        if (sat >= 80) efficiency = 1.25;
        else if (sat <= 20) efficiency = 0.66;
        else {
          const curve = 1.5 - ((sat - 20) / 60) * 0.7;
          efficiency = 1 / curve;
        }
        mods.push({ mult: efficiency });
      }

      // Ellie NPC Scaling
      if (key === 'garden_yield') {
        const ellieProg = store.npcProgress['ellie'] || 0;
        if (ellieProg > 0) mods.push({ add: ellieProg });
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
