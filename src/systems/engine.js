/**
 * Engine System - Handles the main game loop, periodic ticks, 
 * and autosave management.
 */
export function createEngineSystem() {
    return {
        tickInterval: null,
        saveInterval: null,

        init() {
            const store = Alpine.store('game');
            
            // --- OFFLINE PROGRESS REMOVED PER USER REQUEST ---
            // Game state is persistent and static when closed.

            // Main simulation loop (every 1 second)
            this.tickInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                if (innerStore.npc && !innerStore.view.includes('prologue')) {
                    innerStore.npc.processTick(innerStore);
                }
            }, 1000);

            // Autosave loop (every 30 seconds)
            this.saveInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                innerStore.saveGame();
            }, 30000);

            console.log("[CORE] Game Engine initialized (Static Mode).");
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
        }
    };
}
