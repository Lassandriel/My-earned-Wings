/**
 * Resource and Stats System Manager
 */
export const createResourceSystem = () => {
    return {
        /**
         * Checks if the player can afford a specific cost or multiple costs.
         * supports (state, 'wood', 10) OR (state, { wood: 10, stone: 15 })
         */
        /**
         * Checks if the player can afford a specific cost or multiple costs.
         */
        canAfford(state, typeOrCosts, amount) {
            if (typeof typeOrCosts === 'object') {
                return Object.entries(typeOrCosts).every(([type, amt]) => this.canAfford(state, type, amt));
            }
            const type = typeOrCosts;
            let finalAmount = amount;
            
            // APPLY SATIATION MULTIPLIER (Only for Energy/Magic costs)
            if ((type === 'energy' || type === 'magic') && state.getSatiationMultiplier) {
                finalAmount = finalAmount * state.getSatiationMultiplier();
            }

            if (state.stats[type] !== undefined) return state.stats[type] >= finalAmount;
            if (state.resources[type] !== undefined) return state.resources[type] >= finalAmount;
            return false;
        },

        /**
         * Adds resources or stats within their respective limits.
         */
        add(state, type, amount) {
            let finalAmount = amount;
            
            // APPLY YIELD MULTIPLIERS (Traits)
            if (state.getTraitMultiplier) {
                if (type === 'wood') finalAmount *= state.getTraitMultiplier('yield_wood');
                if (type === 'stone') finalAmount *= state.getTraitMultiplier('yield_stone');
                if (type === 'magic') finalAmount *= state.getTraitMultiplier('yield_magic');
                if (type === 'shards') finalAmount *= state.getTraitMultiplier('shards_bonus');
            }

            // Remove Math.floor to allow small amounts (e.g. 0.2) to accumulate
            // finalAmount = Math.floor(finalAmount); 

            if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                state.stats[type] = Math.min(state.stats[maxKey] || 100, state.stats[type] + finalAmount);
                return true;
            }
            if (state.resources[type] !== undefined) {
                // DISCOVERY TRACKING
                if (state.discoveredResources && !state.discoveredResources.includes(type)) {
                    state.discoveredResources.push(type);
                }
                const limit = state.limits[type] || Infinity;
                state.resources[type] = Math.min(limit, state.resources[type] + finalAmount);
                return true;
            }
            return false;
        },

        /**
         * Consumes stats or resources. Returns true if successful.
         */
        consume(state, typeOrCosts, amount) {
            if (!this.canAfford(state, typeOrCosts, amount)) return false;

            if (typeof typeOrCosts === 'object') {
                Object.entries(typeOrCosts).forEach(([type, amt]) => this.consume(state, type, amt));
                return true;
            }
            
            const type = typeOrCosts;
            let finalAmount = amount;

            // APPLY SATIATION MULTIPLIER (Only for Energy/Magic costs)
            if ((type === 'energy' || type === 'magic') && state.getSatiationMultiplier) {
                finalAmount = finalAmount * state.getSatiationMultiplier();
            }

            // Satiation decay scaling (Traits)
            if (state.getTraitMultiplier && type === 'satiation') {
                finalAmount *= state.getTraitMultiplier('satiation_decay');
            }

            if (state.stats[type] !== undefined) {
                state.stats[type] = Math.max(0, state.stats[type] - finalAmount);
                return true;
            }
            if (state.resources[type] !== undefined) {
                state.resources[type] = Math.max(0, state.resources[type] - finalAmount);
                return true;
            }
            return false;
        },

        /**
         * Get current limit for a resource
         */
        getLimit(state, type) {
            return state.limits[type] || 0;
        },

        /**
         * Checks if a resource is at its limit.
         */
        isFull(state, type) {
            if (state.resources[type] !== undefined) {
                return state.resources[type] >= (state.limits[type] || Infinity);
            }
            if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                return state.stats[type] >= (state.stats[maxKey] || 100);
            }
            return false;
        },

        /**
         * Satiation Impact Calculation
         */
        getSatiationMultiplier(state) {
            const sat = state.stats.satiation;
            if (sat >= 80) return 0.8;
            if (sat <= 20) return 1.5;
            return 1.5 - ((sat - 20) / 60) * 0.7; // Linear interpolation
        },

        getEfficiency(state) {
            return 1 / this.getSatiationMultiplier(state);
        }
    };
};
