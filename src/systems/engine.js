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
                
                // 1. Process Active Buffs
                if (innerStore.activeBuffs && Object.keys(innerStore.activeBuffs).length > 0) {
                    Object.keys(innerStore.activeBuffs).forEach(id => {
                        innerStore.activeBuffs[id].remaining = Math.max(0, innerStore.activeBuffs[id].remaining - 1);
                        if (innerStore.activeBuffs[id].remaining <= 0) delete innerStore.activeBuffs[id];
                    });
                }

                // 2. Arcane Focus (Magical Automation)
                if (innerStore.activeFocus && !innerStore.view.includes('prologue')) {
                    const focusCost = 3;
                    if (innerStore.stats.magic >= focusCost) {
                        innerStore.resource.consume(innerStore, 'magic', focusCost);
                    } else {
                        // Focus broken
                        const oldFocus = innerStore.activeFocus;
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

            // Autosave loop (every 30 seconds)
            this.saveInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                innerStore.saveGame();
            }, 30000);

            console.log("[CORE] Game Engine initialized (Full Ticker Mode).");
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.taskInterval) clearInterval(this.taskInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
        }
    };
}
