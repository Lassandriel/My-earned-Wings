import { GameState, ActionDefinition, MilestoneDefinition, ActionId, FlagId, ActionResult } from '../../types/game';
import { EngineServices } from '../../engine/types';
import { tickBuffs } from '../../engine/systems/buffs';
import { tickFocus } from '../../engine/systems/focus';
import { tickRegen } from '../../engine/systems/regen';
import { tickProducers } from '../../engine/systems/producers';

export type { EngineServices };

declare const Alpine: {
  store: <T = any>(name: string, value?: T) => T;
};

const getStore = (): GameState => Alpine.store<GameState>('game');

interface PerfStore {
  lastTickMs: number;
  lastTaskMs: number;
  fps: number;
}

interface Engine {
  tickInterval: ReturnType<typeof setInterval> | null;
  taskInterval: ReturnType<typeof setInterval> | null;
  saveInterval: ReturnType<typeof setInterval> | null;
  lastTickTime: number;
  lastTaskTime: number;
  productionAccumulator: Record<string, number>;
  timeAccumulator?: number;
  magicAccumulator?: number;
  services: EngineServices | null;
  init: (services: EngineServices) => void;
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
    services: null,

    init(services: EngineServices) {
      if (this.tickInterval) clearInterval(this.tickInterval);
      if (this.taskInterval) clearInterval(this.taskInterval);
      if (this.saveInterval) clearInterval(this.saveInterval);

      this.services = services;
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
        this.processTick(state, this.services!, safeDelta);
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
        this.processTasks(state, this.services!, Math.min(deltaMs, 2000));
        Alpine.store<PerfStore>('perf').lastTaskMs = Math.round(performance.now() - start);
      }, 100);

      // 3. Maintenance Loop: Milestones & Autosave
      this.saveInterval = setInterval(() => {
        const state = getStore();
        if (!state || state.view === 'menu') return;

        this.checkMilestones(state, this.services!);
        this.services!.saveGame();
      }, 5000);

      console.log('[ENGINE] Core initialized.');
    },

    processTick(state: GameState, services: EngineServices, deltaTime: number) {
      tickBuffs(state, deltaTime);
      tickFocus(state, services, deltaTime);
      this.magicAccumulator = tickRegen(state, services, deltaTime, this.magicAccumulator || 0);
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
      tickProducers(state, services, deltaTime, this.productionAccumulator);
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
