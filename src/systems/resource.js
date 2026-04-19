/**
 * Resource and Stats System Manager
 */
export const createResourceSystem = () => {
    const getSatiationMultiplier = (state) => {
        // Essential costs use a multiplier that is the inverse of efficiency
        return 1 / (state.pipeline?.calculate(state, 'resource_efficiency', 1) || 1);
    };

    const getScaledCost = (state, type, baseAmount) => {
        const resDef = state.RESOURCE_REGISTRY[type];
        if (resDef?.scalesWithSatiation) {
            return baseAmount * getSatiationMultiplier(state);
        }
        return baseAmount;
    };

    const canAfford = (state, typeOrCosts, amount) => {
        if (typeof typeOrCosts === 'object') {
            return Object.entries(typeOrCosts).every(([type, amt]) => canAfford(state, type, amt));
        }

        const type = typeOrCosts;
        let finalAmount = getScaledCost(state, type, amount);

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
        let finalAmount = getScaledCost(state, type, amount);

        let consumed = false;
        if (state.stats[type] !== undefined) {
            state.stats[type] = Math.max(0, state.stats[type] - finalAmount);
            consumed = true;
        } else if (state.resources[type] !== undefined) {
            state.resources[type] = Math.max(0, state.resources[type] - finalAmount);
            consumed = true;
        }

        if (consumed && state.bus) {
            state.bus.emit(state.EVENTS.RESOURCE_SPENT, { type });
        }
        return consumed;
    };

    return {
        canAfford,
        consume,
        
        add(state, type, amount) {
            let finalAmount = amount;
            if (finalAmount <= 0) return false;
            
            const resDef = state.RESOURCE_REGISTRY[type];
            let changed = false;
            
            // Handle maxStat rewards (e.g. maxMagic)
            if (type.startsWith('max')) {
                const statBase = type.toLowerCase().replace('max', '');
                if (state.stats[statBase] !== undefined) {
                    state.stats[type] = (state.stats[type] || 0) + finalAmount;
                    changed = true;
                }
            } else if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                state.stats[type] = Math.min(state.stats[maxKey] || 100, state.stats[type] + finalAmount);
                changed = true;
            } else if (state.resources[type] !== undefined) {
                if (state.discoveredResources && !state.discoveredResources.includes(type)) {
                    state.discoveredResources.push(type);
                }
                const limit = state.limits[type] || Infinity;
                state.resources[type] = Math.min(limit, state.resources[type] + finalAmount);
                changed = true;
            }

            if (changed && state.bus) {
                state.bus.emit(state.EVENTS.RESOURCE_GAINED, { type });
            }
            return changed;
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
        getScaledCost,

        getEfficiency(state) {
            return state.pipeline?.calculate(state, 'resource_efficiency', 1) || 1;
        }
    };
};
