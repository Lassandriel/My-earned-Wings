/**
 * Resource and Stats System Manager
 */
export const createResourceSystem = () => {
    return {
        /**
         * Checks if the player can afford a specific cost or multiple costs.
         * supports (state, 'wood', 10) OR (state, { wood: 10, stone: 15 })
         */
        canAfford(state, typeOrCosts, amount) {
            if (typeof typeOrCosts === 'object') {
                return Object.entries(typeOrCosts).every(([type, amt]) => this.canAfford(state, type, amt));
            }
            const type = typeOrCosts;
            if (state.stats[type] !== undefined) return state.stats[type] >= amount;
            if (state.resources[type] !== undefined) return state.resources[type] >= amount;
            return false;
        },

        /**
         * Adds resources or stats within their respective limits.
         */
        add(state, type, amount) {
            let finalAmount = amount;
            if (state.getTraitMultiplier) {
                if (type === 'wood') finalAmount *= state.getTraitMultiplier('yield_wood');
                if (type === 'stone') finalAmount *= state.getTraitMultiplier('yield_stone');
                if (type === 'magic') finalAmount *= state.getTraitMultiplier('yield_magic');
                if (type === 'shards') finalAmount *= state.getTraitMultiplier('shards_bonus');
            }

            if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                state.stats[type] = Math.min(state.stats[maxKey] || 100, state.stats[type] + finalAmount);
                return true;
            }
            if (state.resources[type] !== undefined) {
                const limit = state.limits[type] || Infinity;
                state.resources[type] = Math.min(limit, state.resources[type] + finalAmount);
                return true;
            }
            return false;
        },

        /**
         * Consumes stats or resources. Returns true if successful.
         * supports (state, 'wood', 10) OR (state, { wood: 10, stone: 15 })
         */
        consume(state, typeOrCosts, amount) {
            if (!this.canAfford(state, typeOrCosts, amount)) return false;

            if (typeof typeOrCosts === 'object') {
                Object.entries(typeOrCosts).forEach(([type, amt]) => this.consume(state, type, amt));
                return true;
            }
            
            const type = typeOrCosts;
            let finalAmount = amount;
            if (state.getTraitMultiplier && type === 'satiation') {
                finalAmount *= state.getTraitMultiplier('satiation_decay');
            }

            if (state.stats[type] !== undefined) {
                state.stats[type] -= finalAmount;
                return true;
            }
            if (state.resources[type] !== undefined) {
                state.resources[type] -= finalAmount;
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
                return state.resources[type] >= state.limits[type];
            }
            if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                return state.stats[type] >= state.stats[maxKey];
            }
            return false;
        }
    };
};
