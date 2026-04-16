/**
 * Resource and Stats System Manager
 */
export const createResourceSystem = () => {
    return {
        /**
         * Checks if the player can afford a specific cost or multiple costs.
         */
        canAfford(state, typeOrCosts, amount) {
            if (typeof typeOrCosts === 'object') {
                return Object.entries(typeOrCosts).every(([type, amt]) => this.canAfford(state, type, amt));
            }

            const type = typeOrCosts;
            const resDef = state.RESOURCE_REGISTRY[type];
            let finalAmount = amount;
            
            // APPLY SATIATION MULTIPLIER (Only for types marked as essential or specific logic)
            if (resDef?.isEssential && state.getSatiationMultiplier) {
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
            const resDef = state.RESOURCE_REGISTRY[type];
            

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
            const resDef = state.RESOURCE_REGISTRY[type];
            let finalAmount = amount;

            // APPLY SATIATION MULTIPLIER (Costs)
            if (resDef?.isEssential && state.getSatiationMultiplier) {
                finalAmount = finalAmount * state.getSatiationMultiplier();
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
