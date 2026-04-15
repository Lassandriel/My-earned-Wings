/**
 * Engine System - Handles the main game loop, periodic ticks, 
 * and autosave management.
 */
export function createEngineSystem() {
    return {
        tickInterval: null,
        saveInterval: null,

        init(game) {
            // Main simulation loop (e.g., resources, NPC work) every 1 second
            this.tickInterval = setInterval(() => {
                if (game.npc && !game.view.includes('prologue')) {
                    game.npc.processTick(game);
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
