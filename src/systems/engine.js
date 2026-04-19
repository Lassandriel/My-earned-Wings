/**
 * Engine System - Handles the main game loop, periodic ticks, 
 * and autosave management.
 */
export function createEngineSystem() {
    return {
        tickInterval: null,
        saveInterval: null,
        lastTickTime: null,
        lastTaskTime: null,

        init(store) {
            this.lastTickTime = Date.now();
            this.lastTaskTime = Date.now();

            // --- 1. Main Simulation Loop (approx every 1s) ---
            this.tickInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                const now = Date.now();
                const deltaTime = (now - this.lastTickTime) / 1000;
                this.lastTickTime = now;

                if (innerStore.view === 'menu') return;

                // A. Update Global Timers
                innerStore.counters.totalTime = (innerStore.counters.totalTime || 0) + 1; // Increment by expected second
                innerStore.counters.totalActions = (innerStore.counters.totalActions || 0) + 1; // Tick for logs

                // B. Passive Stat Drain (Hunger)
                if (innerStore.stats.satiation > 0) {
                    const drain = 0.1 * deltaTime;
                    innerStore.stats.satiation = Math.max(0, innerStore.stats.satiation - drain);
                    
                    if (innerStore.stats.satiation < 20) {
                        if (!this.lastHungerLog || now - this.lastHungerLog > 60000) {
                            innerStore.addLog('malus_satiation', 'logs', 'var(--accent-red)');
                            this.lastHungerLog = now;
                        }
                    }
                }

                // C. Process Active Buffs
                if (innerStore.activeBuffs) {
                    Object.keys(innerStore.activeBuffs).forEach(id => {
                        const buff = innerStore.activeBuffs[id];
                        if (buff) {
                            buff.remaining = Math.max(0, buff.remaining - deltaTime);
                            if (buff.remaining <= 0) delete innerStore.activeBuffs[id];
                        }
                    });
                }

                // D. Arcane Focus (Automation Cost)
                if (innerStore.activeFocus) {
                    const focusCost = 3 * deltaTime;
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
                const innerStore = Alpine.store('game');
                const now = Date.now();
                const deltaMs = now - this.lastTaskTime;
                this.lastTaskTime = now;

                const taskIds = Object.keys(innerStore.activeTasks || {});
                if (taskIds.length === 0) return;

                taskIds.forEach(id => {
                    const task = innerStore.activeTasks[id];
                    task.remaining -= deltaMs;
                    if (task.remaining <= 0) {
                        const actionId = task.actionId;
                        const action = innerStore.content.get(actionId, 'actions');
                        delete innerStore.activeTasks[id];
                        
                        const result = innerStore.actions.processAction(innerStore, actionId, action, 'finalize');
                        innerStore.actions.handleSuccess(innerStore, actionId, action, result);

                        if (innerStore.activeFocus === actionId && action.isLoopable) {
                            setTimeout(() => {
                                if (innerStore.activeFocus === actionId && 
                                     innerStore.view !== 'menu' && !innerStore.activeTasks[actionId]) {
                                    innerStore.executeAction(actionId);
                                }
                            }, 300);
                        }
                    }
                });
            }, 100);

            // --- 3. Save Ticker ---
            this.saveInterval = setInterval(() => {
                this.checkMilestones(Alpine.store('game'));
                Alpine.store('game').saveGame();
            }, 30000);

            console.log("[CORE] High-Precision Engine initialized.");
        },

        processPassiveProduction(store) {
            Object.keys(store.flags).forEach(id => {
                const action = store.content.get(id, 'actions');
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
                            if (store.counters.totalTime % 20 === 0) store.addLog(id + '_fail_log', 'logs', 'var(--accent-red)');
                            return;
                        }
                        store.resource.consume(store, 'magic', cost);
                    }

                    const yieldVal = Math.round(store.pipeline.calculate(store, id + '_yield', prod.baseYield));
                    store.resource.add(store, prod.resource, yieldVal);
                    
                    if (store.counters.totalTime % 20 === 0) {
                        store.addLog(id + '_log', 'logs', 'var(--accent-teal)');
                    }
                }
            });
        },

        checkMilestones(store) {
            Object.values(store.content.registries.milestones).forEach(milestone => {
                if (store.flags[milestone.id]) return;
                const met = Object.entries(milestone.requirements).every(([path, rule]) => {
                    return store.actions.checkRequirement(store, path, rule);
                });
                if (met) {
                    store.flags[milestone.id] = true;
                    if (milestone.onUnlock) {
                        milestone.onUnlock.forEach(effect => {
                            if (effect.type === 'unlockNPC') store.unlockedNPCs.push(effect.id);
                            if (effect.type === 'setObjective') store.currentObjective = effect.id;
                            if (effect.type === 'playSound') store.playSound(effect.id);
                            if (effect.type === 'log') store.addLog(effect.id, 'logs', effect.color);
                        });
                    }
                }
            });
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.taskInterval) clearInterval(this.taskInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
        }
    };
}
