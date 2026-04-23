import { GameState, FlagId, ActionDefinition, MilestoneDefinition, ActionId } from '../types/game';

// Declare Alpine globally for TS
declare const Alpine: {
  store: (name: string) => any;
};

interface Engine {
  tickInterval: ReturnType<typeof setInterval> | null;
  taskInterval: ReturnType<typeof setInterval> | null;
  saveInterval: ReturnType<typeof setInterval> | null;
  lastTickTime: number;
  lastTaskTime: number;
  lastHungerLog: number;
  init: () => void;
  processPassiveProduction: (store: GameState) => void;
  checkMilestones: (store: GameState) => void;
  stop: () => void;
}

/**
 * Engine System - TypeScript Edition
 * Handles the main game loop, periodic ticks, and autosave management.
 */
export function createEngineSystem(): Engine {
  return {
    tickInterval: null,
    taskInterval: null,
    saveInterval: null,
    lastTickTime: 0,
    lastTaskTime: 0,
    lastHungerLog: 0,

    init() {
      this.lastTickTime = Date.now();
      this.lastTaskTime = Date.now();

      // --- 1. Main Simulation Loop (approx every 1s) ---
      this.tickInterval = setInterval(() => {
        const innerStore = Alpine.store('game') as unknown as GameState;
        const now = Date.now();
        const deltaTime = (now - this.lastTickTime) / 1000;
        this.lastTickTime = now;

        if (innerStore.view === 'menu') return;

        // A. Update Global Timers
        innerStore.counters.totalTime = (innerStore.counters.totalTime || 0) + 1;
        innerStore.counters.totalActions = (innerStore.counters.totalActions || 0) + 1;

        // B. Passive Stat Drain (Reserved for future systems)
        // Satiation no longer drains passively (Phase 8.36.23)

        // C. Process Active Buffs
        if (innerStore.activeBuffs) {
          Object.keys(innerStore.activeBuffs).forEach((id) => {
            const buff = innerStore.activeBuffs[id];
            if (buff) {
              buff.remaining = Math.max(0, buff.remaining - deltaTime);
              if (buff.remaining <= 0) delete innerStore.activeBuffs[id];
            }
          });
        }

        // D. Arcane Focus (Automation Cost)
        if (innerStore.activeFocus) {
          const baseFocusCost = innerStore.pipeline.calculate(innerStore, 'arcane_focus_cost', 3);
          const focusCost = baseFocusCost * deltaTime;
          if (innerStore.stats.magic >= focusCost) {
            innerStore.resource.consume(innerStore, 'magic', focusCost);
          } else {
            innerStore.activeFocus = null;
            innerStore.addLog('focus_broken_magic', 'logs', 'var(--accent-red)');
            innerStore.playSound('fail');
          }
        }

        // E. Universal Passive Production
        this.processPassiveProduction(innerStore);
      }, 1000);

      // --- 2. Task Ticker (approx every 100ms) ---
      this.taskInterval = setInterval(() => {
        const innerStore = Alpine.store('game') as unknown as GameState;
        const now = Date.now();
        const deltaMs = now - this.lastTaskTime;
        this.lastTaskTime = now;

        const taskIds = Object.keys(innerStore.activeTasks || {});
        if (taskIds.length === 0) return;

        taskIds.forEach((id) => {
          const task = innerStore.activeTasks[id];
          task.remaining -= deltaMs;
          if (task.remaining <= 0) {
            const actionId = task.actionId as ActionId;
            const action = innerStore.content.get<ActionDefinition>(actionId, 'actions');
            delete innerStore.activeTasks[id];

            if (action) {
              const result = innerStore.actions.processAction(
                innerStore,
                actionId,
                action,
                'finalize'
              );
              innerStore.actions.handleSuccess(innerStore, actionId, action, result);

              if (innerStore.activeFocus === actionId && action.isLoopable) {
                setTimeout(() => {
                  const currentStore = Alpine.store('game') as unknown as GameState;
                  if (
                    currentStore.activeFocus === actionId &&
                    currentStore.view !== 'menu' &&
                    !currentStore.activeTasks[actionId]
                  ) {
                    currentStore.executeAction(actionId);
                  }
                }, 300);
              }
            }
          }
        });
      }, 100);

      // --- 3. Save Ticker ---
      this.saveInterval = setInterval(() => {
        this.checkMilestones(Alpine.store('game') as unknown as GameState);
        (Alpine.store('game') as unknown as GameState).saveGame();
      }, 30000);

      console.log('[CORE] High-Precision Engine initialized.');
    },

    processPassiveProduction(store: GameState) {
      Object.keys(store.flags).forEach((f) => {
        const id = f as ActionId;
        const action = store.content.get<ActionDefinition>(id, 'actions');
        if (action && action.passiveProduction) {
          const prod = action.passiveProduction;
          const intervalSeconds = prod.interval / 1000;

          if (store.counters.totalTime % intervalSeconds !== 0) return;

          if (prod.requirements) {
            const met = Object.entries(prod.requirements).every(([path, rule]) => {
              return store.actions.checkRequirement(store, path, rule);
            });
            if (!met) return;
          }

          if (prod.magicCost) {
            const cost = store.pipeline.calculate(store, id + '_cost', prod.magicCost);
            if (store.stats.magic < cost) {
              if (store.counters.totalTime % 20 === 0)
                store.addLog(id + '_fail_log', 'logs', 'var(--accent-red)');
              return;
            }
            store.resource.consume(store, 'magic', cost);
          }

          const yieldVal = Math.round(
            store.pipeline.calculate(store, id + '_yield', prod.baseYield)
          );
          store.resource.add(store, prod.resource, yieldVal);

          if (store.counters.totalTime % 20 === 0) {
            store.addLog(id + '_log', 'logs', 'var(--accent-teal)');
          }
        }
      });
    },

    checkMilestones(store: GameState) {
      Object.values(store.content.registries.milestones).forEach(
        (milestone: MilestoneDefinition) => {
          const fid = milestone.id as FlagId;
          if (store.flags[fid]) return;
          const met = Object.entries(milestone.requirements).every(([path, rule]) => {
            return store.actions.checkRequirement(store, path, rule);
          });
          if (met) {
            store.flags[fid] = true;
            if (milestone.onUnlock) {
              milestone.onUnlock.forEach((effect) => {
                const handler = store.actions.effectHandlers[effect.type];
                if (handler) {
                  handler(store, effect);
                }
              });
            }
          }
        }
      );
    },

    stop() {
      if (this.tickInterval) clearInterval(this.tickInterval);
      if (this.taskInterval) clearInterval(this.taskInterval);
      if (this.saveInterval) clearInterval(this.saveInterval);
    },
  };
}
