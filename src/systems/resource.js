/**
 * Resource and Stats System Manager
 */
export const createResourceSystem = () => {
    const getSatiationMultiplier = (state) => {
        const sat = state.stats.satiation;
        if (sat >= 80) return 0.8;
        if (sat <= 20) return 1.5;
        return 1.5 - ((sat - 20) / 60) * 0.7;
    };

    const canAfford = (state, typeOrCosts, amount) => {
        if (typeof typeOrCosts === 'object') {
            return Object.entries(typeOrCosts).every(([type, amt]) => canAfford(state, type, amt));
        }

        const type = typeOrCosts;
        const resDef = state.RESOURCE_REGISTRY[type];
        let finalAmount = amount;
        
        if (resDef?.isEssential) {
            finalAmount = finalAmount * getSatiationMultiplier(state);
        }

        if (state.stats[type] !== undefined) return state.stats[type] >= finalAmount;
        if (state.resources[type] !== undefined) return state.resources[type] >= finalAmount;
        return false;
    };

    const consume = (state, typeOrCosts, amount) => {
        if (!canAfford(state, typeOrCosts, amount)) return false;

        if (typeof typeOrCosts === 'object') {
            Object.entries(typeOrCosts).forEach(([type, amt]) => consume(state, type, amt));
            return true;
        }
        
        const type = typeOrCosts;
        const resDef = state.RESOURCE_REGISTRY[type];
        let finalAmount = amount;

        if (resDef?.isEssential) {
            finalAmount = finalAmount * getSatiationMultiplier(state);
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
    };

    return {
        canAfford,
        consume,
        
        add(state, type, amount) {
            let finalAmount = amount;
            const resDef = state.RESOURCE_REGISTRY[type];
            
            if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                state.stats[type] = Math.min(state.stats[maxKey] || 100, state.stats[type] + finalAmount);
                return true;
            }
            if (state.resources[type] !== undefined) {
                if (state.discoveredResources && !state.discoveredResources.includes(type)) {
                    state.discoveredResources.push(type);
                }
                const limit = state.limits[type] || Infinity;
                state.resources[type] = Math.min(limit, state.resources[type] + finalAmount);
                return true;
            }
            return false;
        },

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

        getSatiationMultiplier,

        getEfficiency(state) {
            return 1 / getSatiationMultiplier(state);
        }
    };
};
