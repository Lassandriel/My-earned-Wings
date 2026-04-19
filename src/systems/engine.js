/**
 * Engine System - Handles the main game loop, periodic ticks, 
 * and autosave management.
 */
export function createEngineSystem() {
    return {
        tickInterval: null,
        saveInterval: null,

        init(store) {
            // Main simulation loop (every 1 second)
            this.tickInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                
                // 1. Process Active Buffs (Safe iteration)
                if (innerStore.activeBuffs) {
                    const buffIds = Object.keys(innerStore.activeBuffs);
                    buffIds.forEach(id => {
                        const buff = innerStore.activeBuffs[id];
                        if (buff) {
                            buff.remaining = Math.max(0, buff.remaining - 1);
                            if (buff.remaining <= 0) delete innerStore.activeBuffs[id];
                        }
                    });
                }

                // 2. Arcane Focus (Magical Automation)
                // Fix: Only consume magic if the focused action is actually running!
                if (innerStore.activeFocus && innerStore.activeTasks[innerStore.activeFocus]) {
                    const focusCost = 3;
                    if (innerStore.stats.magic >= focusCost) {
                        innerStore.resource.consume(innerStore, 'magic', focusCost);
                    } else {
                        // Focus broken
                        innerStore.activeFocus = null;
                        innerStore.addLog('focus_broken_magic', 'logs', 'var(--accent-red)');
                        innerStore.playSound('fail');
                    }
                }
            }, 1000);

            // Task Ticker (every 100ms)
            this.taskInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                const taskIds = Object.keys(innerStore.activeTasks || {});
                if (taskIds.length === 0) return;

                taskIds.forEach(id => {
                    const task = innerStore.activeTasks[id];
                    task.remaining -= 100;
                    if (task.remaining <= 0) {
                        const actionId = task.actionId;
                        const action = innerStore.content.get(actionId, 'actions');
                        delete innerStore.activeTasks[id];
                        
                        const result = innerStore.actions.processAction(innerStore, actionId, action, 'finalize');
                        innerStore.actions.handleSuccess(innerStore, actionId, action, result);

                        // LOOP MODE or ARCANE FOCUS
                        const isAutomationActive = innerStore.isLooping || innerStore.activeFocus === actionId;
                        
                        if (isAutomationActive && action.isLoopable) {
                            setTimeout(() => {
                                if ((innerStore.isLooping || innerStore.activeFocus === actionId) && 
                                     innerStore.view !== 'menu' && !innerStore.activeTasks[actionId]) {
                                    innerStore.executeAction(actionId);
                                }
                            }, 300);
                        }
                    }
                });
            }, 100);

            // 3. UNIVERSAL PRODUCTION TICKER (Run every 1s, check intervals)
            this.productionInterval = setInterval(() => {
                const store = Alpine.store('game');
                
                // Identify all active sources that might have passive production
                // (Currently scans all unlocked buildings/actions flags)
                Object.keys(store.flags).forEach(id => {
                    const action = store.content.get(id, 'actions');
                    if (action && action.passiveProduction) {
                        const prod = action.passiveProduction;
                        
                        // Check custom interval (e.g. 10s)
                        if (store.counters.totalTime % (prod.interval / 1000) !== 0) return;
                        
                        // Check Requirements
                        if (prod.requirements) {
                            const met = Object.entries(prod.requirements).every(([path, rule]) => {
                                return store.actions.checkRequirement(store, path, rule);
                            });
                            if (!met) return;
                        }

                        // Magic Cost Logic (Optional scaling)
                        if (prod.magicCost) {
                            const cost = store.pipeline.calculate(store, id + '_cost', prod.magicCost);
                            if (store.stats.magic < cost) {
                                if (store.counters.totalActions % 5 === 0) {
                                    store.addLog(id + '_fail_log', 'logs', 'var(--accent-red)');
                                }
                                return;
                            }
                            store.resource.consume(store, 'magic', cost);
                        }

                        // Add Reward
                        const yieldVal = Math.round(store.pipeline.calculate(store, id + '_yield', prod.baseYield));
                        store.resource.add(store, prod.resource, yieldVal);
                        
                        // Periodic log
                        if (store.counters.totalActions % 5 === 0) {
                            store.addLog(id + '_log', 'logs', 'var(--accent-teal)');
                        }
                    }
                });
            }, 1000);

            // 4. UNIVERSAL MILESTONE & SAVE TICKER (every 30 seconds)
            this.saveInterval = setInterval(() => {
                const store = Alpine.store('game');
                
                // --- MILESTONE CHECK ---
                Object.values(store.content.registries.milestones).forEach(milestone => {
                    // Skip if already unlocked or flag already exists (e.g. treeOfLife)
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

                store.saveGame();
            }, 30000);

            console.log("[CORE] Game Engine initialized (Full Ticker Mode).");
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.taskInterval) clearInterval(this.taskInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
            if (this.gardenInterval) clearInterval(this.gardenInterval);
        }
    };
}
