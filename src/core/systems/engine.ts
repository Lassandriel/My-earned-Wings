import { GameState, ActionDefinition, MilestoneDefinition, ActionId, FlagId } from '../../types/game';

// Declare Alpine globally for TS
declare const Alpine: {
  store: (name: string, value?: any) => any;
};

interface Engine {
  tickInterval: ReturnType<typeof setInterval> | null;
  taskInterval: ReturnType<typeof setInterval> | null;
  saveInterval: ReturnType<typeof setInterval> | null;
  lastTickTime: number;
  lastTaskTime: number;
  productionAccumulator: Record<string, number>;
  init: () => void;
  stop: () => void;
  metadata?: import('../../types/system').SystemMetadata;
  // Sub-modules
  processTick: (store: GameState, deltaTime: number) => void;
  processTasks: (store: GameState, deltaMs: number) => void;
  processPassiveProduction: (store: GameState, deltaTime: number) => void;
  checkMilestones: (store: GameState) => void;
}

/**
 * Engine System - TypeScript Edition
 * Orchestrates the heart of the game: Time, Tasks, and Ticks.
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
      // Clear any existing intervals to prevent leaks
      if (this.tickInterval) clearInterval(this.tickInterval as any);
      if (this.taskInterval) clearInterval(this.taskInterval as any);
      if (this.saveInterval) clearInterval(this.saveInterval as any);

      this.lastTickTime = Date.now();
      this.lastTaskTime = Date.now();

      // Initialize Perf Store
      Alpine.store('perf', {
        lastTickMs: 0,
        lastTaskMs: 0,
        fps: 60,
      });

      // 1. Simulation Heartbeat (1s)
      this.tickInterval = setInterval(() => {
        const store = Alpine.store('game') as unknown as GameState;
        if (!store || store.view === 'menu' || (store as any).isGameOver) return;

        const now = Date.now();
        const deltaTime = Math.max(0, (now - this.lastTickTime) / 1000);
        this.lastTickTime = now;

        // Safety: Prevent extreme deltas (e.g. from hibernation/tabs)
        const safeDelta = Math.min(deltaTime, 60); 
        
        // Update counters based on actual time passed (Accumulator prevents precision loss)
        (this as any).timeAccumulator = ((this as any).timeAccumulator || 0) + safeDelta;
        if ((this as any).timeAccumulator >= 1) {
          const fullSecs = Math.floor((this as any).timeAccumulator);
          store.counters.totalTime = (store.counters.totalTime || 0) + fullSecs;
          (this as any).timeAccumulator -= fullSecs;
        }
        
        const start = performance.now();
        this.processTick(store, safeDelta);
        (Alpine.store('perf') as any).lastTickMs = Math.round(performance.now() - start);
      }, 1000);

      // 2. High-Frequency Task Ticker (100ms)
      this.taskInterval = setInterval(() => {
        const store = Alpine.store('game') as unknown as GameState;
        if (!store || store.view === 'menu') return;

        const now = Date.now();
        const deltaMs = now - this.lastTaskTime;
        this.lastTaskTime = now;

        const start = performance.now();
        this.processTasks(store, Math.min(deltaMs, 2000));
        (Alpine.store('perf') as any).lastTaskMs = Math.round(performance.now() - start);
      }, 100);

      // 3. Maintenance Loop (30s): Milestones & Autosave
      this.saveInterval = setInterval(() => {
        const store = Alpine.store('game') as unknown as GameState;
        if (!store || store.view === 'menu') return;

        this.checkMilestones(store);
        store.saveGame();
      }, 5000);

      console.log('[ENGINE] Core initialized.');
    },

    /**
     * Processes standard simulation logic (Stats, Buffs, Focus, Production)
     */
    processTick(store: GameState, deltaTime: number) {
      // A. Timer Update - Now handled in heartbeat loop

      // B. Buff Lifecycles
      if (store.activeBuffs) {
        Object.keys(store.activeBuffs).forEach((id) => {
          const buff = store.activeBuffs[id];
          if (buff) {
            buff.remaining = Math.max(0, buff.remaining - deltaTime);
            if (buff.remaining <= 0) {
              const newBuffs = { ...store.activeBuffs };
              delete newBuffs[id];
              store.activeBuffs = newBuffs;
            }
          }
        });
      }

      // C. Arcane Focus (Automation)
      if (store.activeFocus) {
        const cost = store.pipeline.calculate(store, 'arcane_focus_cost', 3) * deltaTime;
        if (store.stats.magic >= cost) {
          store.resource.consume(store, 'magic', cost, true);

          // AUTO-EXECUTE for Instant actions (every 2s)
          const actionId = store.activeFocus;
          const action = store.content.get<ActionDefinition>(actionId, 'actions');
          if (action && !action.duration && action.isLoopable) {
            (this as any).focusAccumulator = ((this as any).focusAccumulator || 0) + deltaTime;
            if ((this as any).focusAccumulator >= 2) {
              store.executeAction(actionId);
              (this as any).focusAccumulator = 0;
            }
          }
        } else {
          store.activeFocus = null;
          store.addLog('focus_broken_magic', 'logs', 'var(--accent-red)');
          store.playSound('fail');
        }
      }

      // D. Passive Regeneration
      const magicRegen = store.pipeline.calculate(store, 'magic_regen_passive', 0);
      if (magicRegen > 0) {
        const gain = magicRegen * deltaTime;
        (this as any).magicAccumulator = ((this as any).magicAccumulator || 0) + gain;
        
        if ((this as any).magicAccumulator >= 0.1) {
          store.resource.add(store, 'magic', (this as any).magicAccumulator, true);
          (this as any).magicAccumulator = 0;
        }
      }

      // E. Passive Yields
      this.processPassiveProduction(store, deltaTime);
    },

    /**
     * Handles active progress bars and task completion.
     */
    processTasks(store: GameState, deltaMs: number) {
      const taskIds = Object.keys(store.activeTasks || {});
      if (taskIds.length === 0) return;

      taskIds.forEach((id) => {
        const task = store.activeTasks[id];
        task.remaining -= deltaMs;

        if (task.remaining <= 0) {
          const actionId = task.actionId as ActionId;
          const action = store.content.get<ActionDefinition>(actionId, 'actions');
          
          const newTasks = { ...store.activeTasks };
          delete newTasks[id];
          store.activeTasks = newTasks;

          if (action) {
            const result = store.actions.processAction(store, actionId, action, 'finalize');
            store.actions.handleSuccess(store, actionId, action, result);

            // AUTO-RESTART (Focus Loop)
            if (store.activeFocus === actionId && action.isLoopable) {
              setTimeout(() => {
                const refreshedStore = Alpine.store('game') as unknown as GameState;
                if (refreshedStore.activeFocus === actionId && 
                    refreshedStore.view !== 'menu' && 
                    !refreshedStore.activeTasks[actionId] &&
                    action.isLoopable) {
                  refreshedStore.executeAction(actionId);
                }
              }, 300);
            }
          }
        }
      });
    },

    /**
     * Handles buildings and passive earners
     */
    processPassiveProduction(store: GameState, deltaTime: number) {
      store.activeProducers.forEach((id) => {
        const action = store.content.get<ActionDefinition>(id, 'actions');
        if (!action?.passiveProduction) return;

        const prod = action.passiveProduction;
        const intervalSec = prod.interval / 1000;

        // Check Requirements
        if (prod.requirements) {
          const met = Object.entries(prod.requirements).every(([p, r]) => store.actions.checkRequirement(store, p, r));
          if (!met) return;
        }

        // Magic Maintenance Cost
        if (prod.magicCost) {
          const tickCost = (store.pipeline.calculate(store, id + '_cost', prod.magicCost) / intervalSec) * deltaTime;
          if (store.stats.magic < tickCost) {
            if (store.counters.totalTime % 20 === 0) store.addLog(id + '_fail_log', 'logs', 'var(--accent-red)');
            return;
          }
          store.resource.consume(store, 'magic', tickCost, true);
        }

        // Production Accumulation
        const baseYield = store.pipeline.calculate(store, id + '_yield', prod.baseYield);
        const yieldPerSec = baseYield / intervalSec;
        const currentYield = yieldPerSec * deltaTime;
        
        this.productionAccumulator[id] = (this.productionAccumulator[id] || 0) + currentYield;

        // Commit full units
        if (this.productionAccumulator[id] >= 1) {
          const amount = Math.floor(this.productionAccumulator[id]);
          store.resource.add(store, prod.resource, amount, true);
          this.productionAccumulator[id] -= amount;

          if (store.counters.totalTime % 20 === 0) {
            store.addLog(id + '_log', 'logs', 'var(--accent-teal)');
          }
        }
      });
    },

    checkMilestones(store: GameState) {
      (Object.values(store.content.registries.milestones) as MilestoneDefinition[]).forEach((milestone: MilestoneDefinition) => {
        const flagId = milestone.id as unknown as FlagId;
        if (store.flags[flagId]) return;

        const met = Object.entries(milestone.requirements).every(([p, r]) => store.actions.checkRequirement(store, p, r));
        if (met) {
          store.flags[flagId] = true;
          milestone.onUnlock?.forEach((effect) => {
            const handler = store.actions.effectHandlers[effect.type];
            if (handler) handler(store, effect);
          });
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
