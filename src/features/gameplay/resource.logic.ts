import { GameState, ResourceId, ResourceDefinition, HomeDefinition } from '../../types/game';
import { LOG_COLOR, makeServiceContainer } from '../../core/constants';
import { makeLogger } from '../../core/log';

const log = makeLogger('RESOURCE');

/**
 * Service handles the resource system needs.
 * Injected via `setServices()` after the GameServices container is built.
 * Internal calls read these from the closure so `state` can be pure data.
 */
interface ResourceDeps {
  bus: GameState['bus'];
  EVENTS: GameState['EVENTS'];
  content: GameState['content'];
  pipeline: GameState['pipeline'];
  addLog: GameState['addLog'];
}

const ctx = makeServiceContainer<ResourceDeps>('RESOURCE');
const requireDeps = ctx.get;

export const createResourceSystem = () => {
  const metadata = { id: 'resource' };

  const _limitCache = new Map<string, number>();
  const _maxStatCache = new Map<string, number>();

  const getScaledCost = (state: GameState, type: ResourceId, baseAmount: number): number => {
    const { content, pipeline } = requireDeps();
    const resDef = content?.get<ResourceDefinition>(type as string, 'resources');
    if (resDef?.scalesWithSatiation) {
      const efficiency = pipeline.calculate(state, 'resource_efficiency', 1);
      const safeEfficiency = Math.max(0.1, efficiency);
      return baseAmount * (1 / safeEfficiency);
    }
    return baseAmount;
  };

  const canAfford = (
    state: GameState,
    typeOrCosts: string | Record<string, number>,
    amount: number = 0,
  ): boolean => {
    if (typeof typeOrCosts === 'object') {
      return Object.entries(typeOrCosts).every(([type, amt]) => canAfford(state, type, amt));
    }
    const type = typeOrCosts as ResourceId;
    const finalAmount = getScaledCost(state, type, amount);
    if (state.stats[type] !== undefined) return state.stats[type] >= finalAmount;
    if (state.resources[type] !== undefined) return (state.resources[type] as number) >= finalAmount;
    return false;
  };

  const consume = (
    state: GameState,
    typeOrCosts: string | Record<string, number>,
    amount: number = 0,
    silent: boolean = false,
  ): boolean => {
    if (!canAfford(state, typeOrCosts, amount)) return false;

    if (typeof typeOrCosts === 'object') {
      Object.entries(typeOrCosts).forEach(([type, amt]) => consume(state, type, amt, silent));
      return true;
    }

    const { bus, EVENTS, content, pipeline, addLog } = requireDeps();
    const type = typeOrCosts as ResourceId;
    const finalAmount = getScaledCost(state, type, amount);

    let consumed = false;
    if (state.stats[type] !== undefined) {
      state.stats[type] = Math.max(0, state.stats[type] - finalAmount);
      consumed = true;
    } else if (state.resources[type] !== undefined) {
      state.resources[type] = Math.max(0, (state.resources[type] as number) - finalAmount);
      consumed = true;
    }

    if (consumed && !silent) {
      bus.emit(EVENTS.RESOURCE_SPENT, { type });

      const resDef = content?.get<ResourceDefinition>(type as string, 'resources');
      const satNow = state.stats.satiation ?? 0;
      if (resDef?.satiationDrain && satNow > 0) {
        const baseDrain = finalAmount * resDef.satiationDrain;
        const multiplier = pipeline.calculate(state, 'satiation_drain_multiplier', 1);
        const finalDrain = baseDrain * multiplier;

        const oldSatiation = satNow;
        state.stats.satiation = Math.max(0, satNow - finalDrain);

        if ((state.stats.satiation ?? 0) < 20 && oldSatiation >= 20) {
          addLog('malus_satiation', 'logs', LOG_COLOR.failure);
        }
      }
    }
    return consumed;
  };

  return {
    setServices: ctx.set,

    canAfford,
    consume,

    add(state: GameState, type: string, amount: number, silent: boolean = false): boolean {
      if (amount < 0) {
        log.warn(`Negative amount passed to add() for ${type}: ${amount}. Use consume() instead.`);
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

      if (changed && !silent) {
        const { bus, EVENTS } = requireDeps();
        bus.emit(EVENTS.RESOURCE_GAINED, { type });
      }
      return changed;
    },

    getLimit(state: GameState, type: ResourceId): number {
      if (_limitCache.has(type)) return _limitCache.get(type)!;

      const { pipeline, content } = requireDeps();
      const base = state.limits[type] || 0;
      const bonus = pipeline?.calculate(state, type + '_limit', 0) || 0;

      let homeBonus = 0;
      if (state.activeHome) {
        const home = content.get<HomeDefinition>(state.activeHome, 'homes');
        homeBonus = home?.baseLimits?.[type] || 0;
      }

      const final = Math.round(base + bonus + homeBonus);
      _limitCache.set(type, final);
      return final;
    },

    getMaxStat(state: GameState, type: ResourceId): number {
      if (_maxStatCache.has(type)) return _maxStatCache.get(type)!;

      const { pipeline } = requireDeps();
      const maxKey = 'max' + type.charAt(0).toUpperCase() + type.slice(1);
      const base = state.stats[maxKey] || state.stats[type + '_limit'] || 100;
      const bonus = pipeline?.calculate(state, type + '_limit', 0) || 0;

      const final = base + bonus;
      _maxStatCache.set(type, final);
      return final;
    },

    invalidateCache() {
      _limitCache.clear();
      _maxStatCache.clear();
    },

    isFull(state: GameState, type: ResourceId): boolean {
      if (state.resources[type] !== undefined) {
        return (state.resources[type] as number) >= (this.getLimit(state, type) || Infinity);
      }
      if (state.stats[type as string] !== undefined) {
        const max = this.getMaxStat(state, type as ResourceId);
        return (state.stats[type as string] || 0) >= max;
      }
      return false;
    },

    getScaledCost,

    getStatPercent(state: GameState, stat: string): number {
      const current = state.stats[stat] || 0;
      const max = this.getMaxStat(state, stat as import('../../types/game').ResourceId) || 100;
      return Math.max(0, Math.min(100, (current / max) * 100));
    },

    metadata,
  };
};
