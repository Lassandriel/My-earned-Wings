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
                        const isFocused = innerStore.activeFocus === actionId;
                        if ((innerStore.isLooping || isFocused) && action.isLoopable) {
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

            // 3. Passive Garden Ticker (every 10 seconds)
            this.gardenInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                if (!innerStore.flags['build-garden'] || (innerStore.npcProgress['ellie'] || 0) < 2) return;

                const magicCost = innerStore.pipeline.calculate(innerStore, 'garden_magic_cost', 5);
                if (innerStore.stats.magic >= magicCost) {
                    innerStore.resource.consume(innerStore, 'magic', magicCost);
                    
                    const yieldVal = Math.round(innerStore.pipeline.calculate(innerStore, 'garden_yield', 3));
                    innerStore.resource.add(innerStore, 'herbs', yieldVal);
                    
                    // Periodic log to avoid spamming
                    if (innerStore.counters.totalActions % 5 === 0) {
                        innerStore.addLog('garden_harvest_log', 'logs', 'var(--accent-teal)');
                    }
                } else {
                    // Not enough magic for garden
                    if (innerStore.counters.totalActions % 5 === 0) {
                        innerStore.addLog('garden_magic_fail_log', 'logs', 'var(--accent-red)');
                    }
                }
            }, 10000);

            // Autosave loop & Finale Check (every 30 seconds)
            this.saveInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                
                // --- FINALE CHECK ---
                if (!innerStore.unlockedNPCs.includes('npc-treeOfLife')) {
                    if (innerStore.story && innerStore.story.canAccessTreeOfLife(innerStore)) {
                        innerStore.bus.emit(innerStore.EVENTS.SOUND_TRIGGERED, { key: 'success' });
                        innerStore.addLog('tree_unlocked_log', 'logs', 'var(--gold)');
                        innerStore.unlockedNPCs.push('npc-treeOfLife');
                        innerStore.currentObjective = 'obj_tree_of_life';
                    }
                }

                innerStore.saveGame();
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
