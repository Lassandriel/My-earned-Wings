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

            // --- UPGRADE MODIFIERS ---
            if (key === 'wood_yield') {
                if (store.upgrades.includes('craft-axe')) mods.push({ mult: 2 });
                if (store.upgrades.includes('craft-wanderstock')) mods.push({ add: 1 });
            }
            
            if (key === 'stone_yield') {
                if (store.upgrades.includes('craft-pickaxe')) mods.push({ mult: 2 });
            }

            if (key === 'magic_limit_gain') {
                if (store.upgrades.includes('craft-chair')) mods.push({ add: 7 });
                const bookCount = store.resources.books || 0;
                mods.push({ add: bookCount * 2 });
                mods.push({ add: 9 }); // Total base gain becomes 1+9 = 10
            }

            if (key === 'rest_energy_gain') {
                if (store.upgrades.includes('craft-bed')) mods.push({ add: 25 });
                if (store.housing.hasCampfire) mods.push({ add: 10 });
                if (store.housing.hasTent) mods.push({ add: 15 });
            }

            if (key === 'eat_satiation_gain') {
                if (store.upgrades.includes('craft-stove')) mods.push({ add: 15 });
            }

            // --- STATUS / GLOBAL MODIFIERS ---
            // Satiation efficiency (applies to gathering, work and resource costs)
            if (key === 'resource_efficiency' || ['wood_yield', 'stone_yield', 'meat_yield', 'shards_yield'].includes(key)) {
                const sat = store.stats.satiation;
                let efficiency = 1.0;
                
                if (sat >= 80) efficiency = 1.25; // 1 / 0.8
                else if (sat <= 20) efficiency = 0.66; // 1 / 1.5
                else {
                    // Linear interpolation between 20-80
                    const mult = 1.5 - ((sat - 20) / 60) * 0.7;
                    efficiency = 1 / mult;
                }
                
                mods.push({ mult: efficiency });
            }

            return mods;
        }
    };
};
