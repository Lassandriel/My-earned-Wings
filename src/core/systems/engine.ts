import { GameState } from '../../types/game';
import { EngineServices } from '../../engine/types';
import { tickBuffs } from '../../engine/systems/buffs';
import { tickFocus } from '../../engine/systems/focus';
import { tickRegen } from '../../engine/systems/regen';
import { tickProducers } from '../../engine/systems/producers';
import { tickTasks } from '../../engine/systems/tasks';
import { tickMilestones } from '../../engine/systems/milestones';
import { createUISync } from '../../engine/systems/ui';

export type { EngineServices };

declare const Alpine: {
  store: <T = any>(name: string, value?: T) => T;
};

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
  uiSync: ReturnType<typeof createUISync>;
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
    uiSync: createUISync(),

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
        const state = this.services!.gameState;
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
        const state = this.services!.gameState;
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
        const state = this.services!.gameState;
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
      this.uiSync.sync(state, services);
    },

    processTasks(state: GameState, services: EngineServices, deltaMs: number) {
      services.commands.drain(state, services);
      tickTasks(state, services, deltaMs);
    },

    processPassiveProduction(state: GameState, services: EngineServices, deltaTime: number) {
      tickProducers(state, services, deltaTime, this.productionAccumulator);
    },

    checkMilestones(state: GameState, services: EngineServices) {
      tickMilestones(state, services);
    },

    stop() {
      if (this.tickInterval) clearInterval(this.tickInterval);
      if (this.taskInterval) clearInterval(this.taskInterval);
      if (this.saveInterval) clearInterval(this.saveInterval);
      this.tickInterval = this.taskInterval = this.saveInterval = null;
    },
  };
}
