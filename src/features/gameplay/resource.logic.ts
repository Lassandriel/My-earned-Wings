import { GameState, ResourceId } from '../../types/game';

/**
 * Resource and Stats System Manager - TypeScript Edition
 */
export const createResourceSystem = () => {
  const metadata = {
    id: 'resource',
  };
  const getScaledCost = (state: GameState, type: ResourceId, baseAmount: number): number => {
    const resDef = state.RESOURCE_REGISTRY[type];
    if (resDef?.scalesWithSatiation) {
      // Costs scale inversely with worker efficiency
      const efficiency = state.pipeline.calculate(state, 'resource_efficiency', 1);
      
      // Safety: Ensure efficiency never drops to 0 (minimum 0.4 based on CoreRules)
      const safeEfficiency = Math.max(0.1, efficiency);
      return baseAmount * (1 / safeEfficiency);
    }
    return baseAmount;
  };

  const canAfford = (
    state: GameState,
    typeOrCosts: string | Record<string, number>,
    amount: number = 0
  ): boolean => {
    if (typeof typeOrCosts === 'object') {
      return Object.entries(typeOrCosts).every(([type, amt]) => canAfford(state, type, amt));
    }

    const type = typeOrCosts as ResourceId;
    const finalAmount = getScaledCost(state, type, amount);

    if (state.stats[type] !== undefined) return state.stats[type] >= finalAmount;
    if (state.resources[type] !== undefined) return state.resources[type] >= finalAmount;
    return false;
  };

  const consume = (
    state: GameState,
    typeOrCosts: string | Record<string, number>,
    amount: number = 0,
    silent: boolean = false
  ): boolean => {
    if (!canAfford(state, typeOrCosts, amount)) return false;

    if (typeof typeOrCosts === 'object') {
      Object.entries(typeOrCosts).forEach(([type, amt]) => consume(state, type, amt, silent));
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

    if (consumed && state.bus && !silent) {
      state.bus.emit(state.EVENTS.RESOURCE_SPENT, { type });

      // --- DATA-DRIVEN SATIATION DRAIN ---
      const resDef = state.RESOURCE_REGISTRY[type];
      if (resDef?.satiationDrain && state.stats.satiation > 0) {
        const baseDrain = finalAmount * resDef.satiationDrain;
        const multiplier = state.pipeline.calculate(state, 'satiation_drain_multiplier', 1);
        const finalDrain = baseDrain * multiplier;

        const oldSatiation = state.stats.satiation;
        state.stats.satiation = Math.max(0, state.stats.satiation - finalDrain);
        
        // Warn if falling below 20%
        if (state.stats.satiation < 20 && oldSatiation >= 20) {
          state.addLog('malus_satiation', 'logs', 'var(--accent-red)');
        }
      }
    }
    return consumed;
  };

  return {
    canAfford,
    consume,

    add(state: GameState, type: string, amount: number, silent: boolean = false): boolean {
      if (amount < 0) {
        console.warn(`[RESOURCE] Negative amount passed to add() for ${type}: ${amount}. Use consume() instead.`);
        return false;
      }
      if (amount < 0.001) return false;

      let changed = false;

      if (type.startsWith('max')) {
        const statBase = type.toLowerCase().replace('max', '') as ResourceId;
        if (state.stats[statBase] !== undefined) {
          state.stats[type] = (state.stats[type] || 0) + amount;
          changed = true;
        }
      } else if (state.stats[type] !== undefined) {
        const max = this.getMaxStat(state, type as ResourceId);
        state.stats[type] = Math.min(max, state.stats[type] + amount);
        changed = true;
      } else if (state.resources[type as ResourceId] !== undefined) {
        const resId = type as ResourceId;
        if (state.discoveredResources && !state.discoveredResources.includes(resId)) {
          state.discoveredResources.push(resId);
        }
        const limit = this.getLimit(state, resId);
        const current = state.resources[resId] || 0;
        state.resources[resId] = Math.min(limit, current + amount);
        changed = true;
      }

      if (changed && state.bus && !silent) {
        state.bus.emit(state.EVENTS.RESOURCE_GAINED, { type });
      }
      return changed;
    },

    getLimit(state: GameState, type: ResourceId): number {
      const base = state.limits[type] || 0;

      // Calculate dynamic bonus from pipeline (Buildings + Furniture)
      const bonus = state.pipeline?.calculate(state, type + '_limit', 0) || 0;

      let homeBonus = 0;
      if (state.activeHome) {
        const home = state.content.get(state.activeHome, 'homes');
        homeBonus = home?.baseLimits?.[type] || 0;
      }

      return Math.round(base + bonus + homeBonus);
    },

    getMaxStat(state: GameState, type: ResourceId): number {
      const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
      const base = state.stats[maxKey] || state.stats[type + '_limit'] || 100;

      // Calculate dynamic bonus (e.g., energy_limit)
      const bonus = state.pipeline?.calculate(state, type + '_limit', 0) || 0;

      return base + bonus;
    },

    isFull(state: GameState, type: ResourceId): boolean {
      if (state.resources[type] !== undefined) {
        return state.resources[type] >= (this.getLimit(state, type) || Infinity);
      }
      if (state.stats[type as string] !== undefined) {
        const max = this.getMaxStat(state, type as ResourceId);
        return (state.stats[type as string] || 0) >= max;
      }
      return false;
    },

    getScaledCost,

    /**
     * Calculates the percentage of a stat relative to its maximum.
     */
    getStatPercent(state: GameState, stat: string): number {
      const current = state.stats[stat] || 0;
      const max = this.getMaxStat(state, stat as import('../../types/game').ResourceId) || 100;
      return Math.max(0, Math.min(100, (current / max) * 100));
    },

    metadata,
  };
};
