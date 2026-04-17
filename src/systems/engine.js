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
            // Handles Buffs and NPC progress
            this.tickInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                
                // Process Active Buffs
                if (innerStore.activeBuffs && Object.keys(innerStore.activeBuffs).length > 0) {
                    Object.keys(innerStore.activeBuffs).forEach(id => {
                        innerStore.activeBuffs[id].remaining = Math.max(0, innerStore.activeBuffs[id].remaining - 1);
                        if (innerStore.activeBuffs[id].remaining <= 0) {
                            delete innerStore.activeBuffs[id];
                        }
                    });
                }

                if (innerStore.npc && !innerStore.view.includes('prologue')) {
                    innerStore.npc.processTick(innerStore);
                }
            }, 1000);

            // Task Ticker (every 100ms)
            // Handles smooth progress bars and action finalization
            this.taskInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                const taskIds = Object.keys(innerStore.activeTasks || {});
                if (taskIds.length === 0) return;

                taskIds.forEach(id => {
                    const task = innerStore.activeTasks[id];
                    task.remaining -= 100;
                    if (task.remaining <= 0) {
                        const actionId = task.actionId;
                        const action = innerStore.actionDb[actionId];
                        delete innerStore.activeTasks[id];
                        
                        const result = innerStore.actions.processAction(innerStore, actionId, action, 'finalize');
                        innerStore.actions.handleSuccess(innerStore, actionId, action, result);

                        // LOOP MODE
                        if (innerStore.isLooping && action.isLoopable) {
                            setTimeout(() => {
                                if (innerStore.isLooping && innerStore.view === 'gameplay' && !innerStore.activeTasks[actionId]) {
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
