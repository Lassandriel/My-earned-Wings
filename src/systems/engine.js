/**
 * Engine System - Handles the main game loop, periodic ticks, 
 * and autosave management.
 */
export function createEngineSystem() {
    return {
        tickInterval: null,
        saveInterval: null,

        init(game) {
            // --- OFFLINE PROGRESS ---
            const now = Date.now();
            const lastTick = game.lastTick || now;
            const deltaMs = now - lastTick;
            const deltaSec = Math.floor(deltaMs / 1000);

            if (deltaSec > 10 && game.npc) {
                // Cap at 8 hours (28800 seconds)
                const clampedSec = Math.min(deltaSec, 28800);
                console.log(`Simulating ${clampedSec} seconds of offline progress...`);
                
                // Process ticks in bulk (more efficient than 28800 timeouts)
                for (let i = 0; i < clampedSec; i++) {
                    game.npc.processTick(game);
                }
                
                if (game.ui.showToast) {
                    game.ui.showToast(`Willkommen zurück! Du warst ${Math.floor(clampedSec/60)}m weg.`, 'success');
                }
            }
            game.lastTick = now;

            // Main simulation loop (e.g., resources, NPC work) every 1 second
            this.tickInterval = setInterval(() => {
                if (game.npc && !game.view.includes('prologue')) {
                    game.npc.processTick(game);
                    game.lastTick = Date.now(); // Update heartbeat
                }
            }, 1000);

            // Autosave every 30 seconds
            this.saveInterval = setInterval(() => {
                game.saveGame();
            }, 30000);

            console.log("Game Engine initialized.");
        },

        stop() {
            if (this.tickInterval) clearInterval(this.tickInterval);
            if (this.saveInterval) clearInterval(this.saveInterval);
        }
    };
}
