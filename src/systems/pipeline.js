/**
 * Value Pipeline System
 * Handles complex mathematical calculations with additive and multiplicative modifiers.
 * Centralizing this logic makes balancing and scaling much easier.
 */
export const createPipelineSystem = () => {
    return {
        /**
         * Calculates a modified value for a given key.
         * Formula: (Base + TotalAdditive) * TotalMultiplicative
         */
        calculate(store, key, baseValue) {
            const modifiers = this.getModifiers(store, key);
            
            let add = 0;
            let mult = 1;
            
            modifiers.forEach(m => {
                if (m.add) add += m.add;
                if (m.mult) mult *= m.mult;
            });
            
            return (baseValue + add) * mult;
        },

        /**
         * Returns all active modifiers for a specific key.
         * In a more advanced version, this could be data-driven.
         */
        getModifiers(store, key) {
            const mods = [];

            // --- ITEM & FLAG MODIFIERS ---
            if (key === 'wood_yield') {
                if (store.flags['item-axe']) mods.push({ mult: 2 });
                if (store.flags['item-walking-stick']) mods.push({ add: 1 });
            }
            
            if (key === 'stone_yield') {
                if (store.flags['item-pickaxe']) mods.push({ mult: 2 });
            }

            if (key === 'magic_limit_gain') {
                if (store.flags['item-chair']) mods.push({ add: 5 });
                if (store.flags['item-bookshelf']) mods.push({ add: 5 });
                const bookCount = store.resources.books || 0;
                mods.push({ add: bookCount * 2 });
            }

            if (key === 'rest_energy_gain') {
                if (store.flags['item-bed-2']) mods.push({ add: 50 });
                else if (store.flags['item-bed']) mods.push({ add: 25 });
                
                if (store.flags['build-campfire']) mods.push({ add: 10 });
                if (store.flags['build-tent']) mods.push({ add: 15 });
            }

            if (key === 'eat_satiation_gain') {
                if (store.flags['item-stove-2']) mods.push({ add: 50 });
                else if (store.flags['item-stove']) mods.push({ add: 20 });
            }

            // --- STATUS / GLOBAL MODIFIERS ---
            // Satiation efficiency (applies to gathering, work and resource costs)
            if (key === 'resource_efficiency' || ['wood_yield', 'stone_yield', 'meat_yield', 'shards_yield'].includes(key)) {
                const sat = store.stats.satiation;
                let efficiency = 1.0;
                
                if (sat >= 80) efficiency = 1.25; 
                else if (sat <= 20) efficiency = 0.66;
                else {
                    const mult = 1.5 - ((sat - 20) / 60) * 0.7;
                    efficiency = 1 / mult;
                }
                
                mods.push({ mult: efficiency });
            }

            // --- GARDEN MODIFIERS ---
            if (key === 'garden_yield') {
                const ellieProg = store.npcProgress['ellie'] || 0;
                mods.push({ add: ellieProg }); // Level 1-5 adds +1 to +5 herbs
                if (store.flags['build-garden-upgrade']) mods.push({ mult: 1.5 });
            }

            if (key === 'garden_magic_cost') {
                // Costs stay stable but could be reduced by Aris later
                 if (store.flags['item-crystal-mana']) mods.push({ mult: 0.8 });
            }

            return mods;
        }
    };
};
