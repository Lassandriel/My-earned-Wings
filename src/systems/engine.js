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
            
            // --- OFFLINE PROGRESS ---
            const now = Date.now();
            const lastTick = store.lastTick || now;
            const deltaMs = now - lastTick;
            const deltaSec = Math.floor(deltaMs / 1000);

            if (deltaSec > 10 && store.npc) {
                // Cap at 8 hours (28800 seconds)
                const clampedSec = Math.min(deltaSec, 28800);
                console.log(`[ENGINE] Simulating ${clampedSec}s of offline progress...`);
                
                // Process ticks in bulk (O(1) calculation)
                store.npc.processBulkTick(store, clampedSec);
                
                if (store.ui?.showToast) {
                    store.ui.showToast(`Willkommen zurück! Du warst ${Math.floor(clampedSec/60)}m weg.`, 'success');
                }
            }
            store.lastTick = now;

            // Main simulation loop (every 1 second)
            this.tickInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                if (innerStore.npc && !innerStore.view.includes('prologue')) {
                    innerStore.npc.processTick(innerStore);
                    innerStore.lastTick = Date.now();
                }
            }, 1000);

            // Autosave loop (every 30 seconds)
            this.saveInterval = setInterval(() => {
                const innerStore = Alpine.store('game');
                innerStore.saveGame();
            }, 30000);

            console.log("[CORE 2.0] Game Engine initialized.");
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
        }
    };
}
