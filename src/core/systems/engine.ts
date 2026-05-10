import { GameState, ActionDefinition, MilestoneDefinition, ActionId, FlagId, ActionResult } from '../../types/game';

declare const Alpine: {
  store: <T = any>(name: string, value?: T) => T;
};

const getStore = (): GameState => Alpine.store<GameState>('game');

interface PerfStore {
  lastTickMs: number;
  lastTaskMs: number;
  fps: number;
}

/**
 * The engine touches game data on `state` and calls services for all
 * derived/mutating operations. Splitting these out of the state object
 * is the first step of the Phase 2 ECS migration: once `state` is a
 * pure data object, services can live in a separate container and the
 * engine no longer depends on Alpine.js reactivity.
 */
export type EngineServices = Pick<
  GameState,
  | 'pipeline'
  | 'resource'
  | 'actions'
  | 'content'
  | 'addLog'
  | 'playSound'
  | 'executeAction'
  | 'saveGame'
>;

interface Engine {
  tickInterval: ReturnType<typeof setInterval> | null;
  taskInterval: ReturnType<typeof setInterval> | null;
  saveInterval: ReturnType<typeof setInterval> | null;
  lastTickTime: number;
  lastTaskTime: number;
  productionAccumulator: Record<string, number>;
  timeAccumulator?: number;
  magicAccumulator?: number;
  init: () => void;
  stop: () => void;
  metadata?: import('../../types/system').SystemMetadata;
  processTick: (state: GameState, services: EngineServices, deltaTime: number) => void;
  processTasks: (state: GameState, services: EngineServices, deltaMs: number) => void;
  processPassiveProduction: (state: GameState, services: EngineServices, deltaTime: number) => void;
  checkMilestones: (state: GameState, services: EngineServices) => void;
}

/**
 * Engine System - Orchestrates Time, Tasks, and Ticks.
 */
export function createEngineSystem(): Engine {
  return {
    metadata: { id: 'engine' },
    tickInterval: null,
    taskInterval: null,
    saveInterval: null,
    lastTickTime: 0,
    lastTaskTime: 0,
    productionAccumulator: {},

    init() {
      if (this.tickInterval) clearInterval(this.tickInterval);
      if (this.taskInterval) clearInterval(this.taskInterval);
      if (this.saveInterval) clearInterval(this.saveInterval);

      this.lastTickTime = Date.now();
      this.lastTaskTime = Date.now();

      Alpine.store('perf', {
        lastTickMs: 0,
        lastTaskMs: 0,
        fps: 60,
      });

      // 1. Simulation Heartbeat (1s)
      this.tickInterval = setInterval(() => {
        const state = getStore();
        if (!state || state.view === 'menu') return;

        const now = Date.now();
        const deltaTime = Math.max(0, (now - this.lastTickTime) / 1000);
        this.lastTickTime = now;

        const safeDelta = Math.min(deltaTime, 60);

        this.timeAccumulator = (this.timeAccumulator || 0) + safeDelta;
        if (this.timeAccumulator >= 1) {
          const fullSecs = Math.floor(this.timeAccumulator);
          state.counters.totalTime = (state.counters.totalTime || 0) + fullSecs;
          this.timeAccumulator -= fullSecs;
        }

        const start = performance.now();
        // The Alpine store currently contains both data and services, so it
        // satisfies GameState (data) and EngineServices (services) at once.
        this.processTick(state, state, safeDelta);
        Alpine.store<PerfStore>('perf').lastTickMs = Math.round(performance.now() - start);
      }, 1000);

      // 2. High-Frequency Task Ticker (100ms)
      this.taskInterval = setInterval(() => {
        const state = getStore();
        if (!state || state.view === 'menu') return;

        const now = Date.now();
        const deltaMs = now - this.lastTaskTime;
        this.lastTaskTime = now;

        const start = performance.now();
        this.processTasks(state, state, Math.min(deltaMs, 2000));
        Alpine.store<PerfStore>('perf').lastTaskMs = Math.round(performance.now() - start);
      }, 100);

      // 3. Maintenance Loop: Milestones & Autosave
      this.saveInterval = setInterval(() => {
        const state = getStore();
        if (!state || state.view === 'menu') return;

        this.checkMilestones(state, state);
        state.saveGame();
      }, 5000);

      console.log('[ENGINE] Core initialized.');
    },

    processTick(state: GameState, services: EngineServices, deltaTime: number) {
      // Buff lifecycles
      if (state.activeBuffs) {
        Object.keys(state.activeBuffs).forEach((id) => {
          const buff = state.activeBuffs[id];
          if (buff) {
            buff.remaining = Math.max(0, buff.remaining - deltaTime);
            if (buff.remaining <= 0) {
              const newBuffs = { ...state.activeBuffs };
              delete newBuffs[id];
              state.activeBuffs = newBuffs;
            }
          }
        });
      }

      // Arcane Focus
      if (state.activeFocus) {
        const cost = services.pipeline.calculate(state, 'arcane_focus_cost', 3) * deltaTime;
        if (state.stats.magic >= cost) {
          services.resource.consume(state, 'magic', cost, true);
        } else {
          state.activeFocus = null;
          services.addLog('focus_broken_magic', 'logs', 'var(--accent-red)');
          services.playSound('fail');
        }
      }

      // Passive Magic Regeneration
      const magicRegen = services.pipeline.calculate(state, 'magic_regen_passive', 0);
      if (magicRegen > 0) {
        const gain = magicRegen * deltaTime;
        this.magicAccumulator = (this.magicAccumulator || 0) + gain;

        if (this.magicAccumulator >= 0.1) {
          services.resource.add(state, 'magic', this.magicAccumulator, true);
          this.magicAccumulator = 0;
        }
      }

      // Passive Yields
      this.processPassiveProduction(state, services, deltaTime);
    },

    processTasks(state: GameState, services: EngineServices, deltaMs: number) {
      const taskIds = Object.keys(state.activeTasks || {});
      if (taskIds.length === 0) return;

      taskIds.forEach((id) => {
        const task = state.activeTasks[id];
        task.remaining -= deltaMs;

        if (task.remaining <= 0) {
          const actionId = task.actionId as ActionId;
          const action = services.content.get<ActionDefinition>(actionId, 'actions');

          const newTasks = { ...state.activeTasks };
          delete newTasks[id];
          state.activeTasks = newTasks;

          if (action) {
            const result = services.actions.processAction(state, actionId, action, 'finalize') as ActionResult;
            services.actions.handleSuccess(state, actionId, action, result);

            // AUTO-RESTART (Focus Loop)
            if (state.activeFocus === actionId && action.isLoopable) {
              setTimeout(() => {
                const refreshed = getStore();
                if (refreshed.activeFocus === actionId &&
                    refreshed.view !== 'menu' &&
                    !refreshed.activeTasks[actionId] &&
                    action.isLoopable) {
                  refreshed.executeAction(actionId);
                }
              }, 300);
            }
          }
        }
      });
    },

    processPassiveProduction(state: GameState, services: EngineServices, deltaTime: number) {
      state.activeProducers.forEach((id) => {
        const action = services.content.get<ActionDefinition>(id, 'actions');
        if (!action?.passiveProduction) return;

        const prod = action.passiveProduction;
        const intervalSec = prod.interval / 1000;

        if (prod.requirements) {
          const met = Object.entries(prod.requirements).every(
            ([p, r]) => services.actions.checkRequirement(state, p, r),
          );
          if (!met) return;
        }

        // Magic maintenance cost
        if (prod.magicCost) {
          const tickCost = (services.pipeline.calculate(state, id + '_cost', prod.magicCost) / intervalSec) * deltaTime;
          if (state.stats.magic < tickCost) {
            if (state.counters.totalTime % 20 === 0) services.addLog(id + '_fail_log', 'logs', 'var(--accent-red)');
            return;
          }
          services.resource.consume(state, 'magic', tickCost, true);
        }

        // Production accumulation
        const baseYield = services.pipeline.calculate(state, id + '_yield', prod.baseYield);
        const yieldPerSec = baseYield / intervalSec;
        const currentYield = yieldPerSec * deltaTime;

        this.productionAccumulator[id] = (this.productionAccumulator[id] || 0) + currentYield;

        if (this.productionAccumulator[id] >= 1) {
          const amount = Math.floor(this.productionAccumulator[id]);
          services.resource.add(state, prod.resource, amount, true);
          this.productionAccumulator[id] -= amount;

          if (state.counters.totalTime % 20 === 0) {
            services.addLog(id + '_log', 'logs', 'var(--accent-teal)');
          }
        }
      });
    },

    checkMilestones(state: GameState, services: EngineServices) {
      (Object.values(services.content.registries.milestones) as MilestoneDefinition[]).forEach((milestone: MilestoneDefinition) => {
        const flagId = milestone.id as FlagId;
        if (state.flags[flagId]) return;

        const met = Object.entries(milestone.requirements).every(
          ([p, r]) => services.actions.checkRequirement(state, p, r),
        );
        if (met) {
          state.flags[flagId] = true;
          milestone.onUnlock?.forEach((effect) => {
            const handler = services.actions.effectHandlers[effect.type];
            if (handler) handler(state, effect);
          });

          if (services.pipeline) services.pipeline.invalidateCache();
          if (services.resource) services.resource.invalidateCache();
        }
      });
    },

    stop() {
      if (this.tickInterval) clearInterval(this.tickInterval);
      if (this.taskInterval) clearInterval(this.taskInterval);
      if (this.saveInterval) clearInterval(this.saveInterval);
      this.tickInterval = this.taskInterval = this.saveInterval = null;
    },
  };
}
