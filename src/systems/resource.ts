import { GameState, ResourceId } from '../types/game';

/**
 * Resource and Stats System Manager - TypeScript Edition
 */
export const createResourceSystem = () => {
    const getScaledCost = (state: GameState, type: ResourceId, baseAmount: number): number => {
        const resDef = state.RESOURCE_REGISTRY[type];
        if (resDef?.scalesWithSatiation) {
            // Costs scale inversely with worker efficiency
            const efficiency = state.pipeline?.calculate(state, 'resource_efficiency', 1) || 1;
            return baseAmount * (1 / efficiency);
        }
        return baseAmount;
    };

    const canAfford = (state: GameState, typeOrCosts: string | Record<string, number>, amount: number = 0): boolean => {
        if (typeof typeOrCosts === 'object') {
            return Object.entries(typeOrCosts).every(([type, amt]) => canAfford(state, type, amt));
        }

        const type = typeOrCosts as ResourceId;
        const finalAmount = getScaledCost(state, type, amount);

        if (state.stats[type] !== undefined) return state.stats[type] >= finalAmount;
        if (state.resources[type] !== undefined) return state.resources[type] >= finalAmount;
        return false;
    };

    const consume = (state: GameState, typeOrCosts: string | Record<string, number>, amount: number = 0): boolean => {
        if (!canAfford(state, typeOrCosts, amount)) return false;

        if (typeof typeOrCosts === 'object') {
            Object.entries(typeOrCosts).forEach(([type, amt]) => consume(state, type, amt));
            return true;
        }
        
        const type = typeOrCosts as ResourceId;
        const finalAmount = getScaledCost(state, type, amount);

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
        
        add(state: GameState, type: string, amount: number): boolean {
            const finalAmount = amount;
            if (finalAmount <= 0) return false;
            
            let changed = false;
            
            // Handle maxStat rewards (e.g. maxMagic)
            if (type.startsWith('max')) {
                const statBase = type.toLowerCase().replace('max', '') as ResourceId;
                if (state.stats[statBase] !== undefined) {
                    state.stats[type] = (state.stats[type] || 0) + finalAmount;
                    changed = true;
                }
            } else if (state.stats[type] !== undefined) {
                const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
                state.stats[type] = Math.min(state.stats[maxKey] || 100, state.stats[type] + finalAmount);
                changed = true;
            } else if (state.resources[type as ResourceId] !== undefined) {
                const resId = type as ResourceId;
                if (state.discoveredResources && !state.discoveredResources.includes(resId)) {
                    state.discoveredResources.push(resId);
                }
                const limit = state.limits[resId] || Infinity;
                state.resources[resId] = Math.min(limit, state.resources[resId] + finalAmount);
                changed = true;
            }

            if (changed && state.bus) {
                state.bus.emit(state.EVENTS.RESOURCE_GAINED, { type });
            }
            return changed;
        },

        getLimit(state: GameState, type: ResourceId): number {
            return state.limits[type] || 0;
        },

        isFull(state: GameState, type: ResourceId): boolean {
            if (state.resources[type] !== undefined) {
                return state.resources[type] >= (state.limits[type] || Infinity);
            }
            if (state.stats[type as string] !== undefined) {
                const maxKey = 'max' + (type as string).charAt(0).toUpperCase() + (type as string).slice(1);
                return (state.stats[type as string] || 0) >= (state.stats[maxKey] || 100);
            }
            return false;
        },

        getScaledCost
    };
};
