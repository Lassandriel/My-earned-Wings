/**
 * NPC System - Core 3.0
 * Handles companion recruitment and NPC quest progress.
 */
export const createNPCSystem = () => {
    return {
        /**
         * Executes an NPC interaction step (Quest progress).
         */
        execute(game, id) {
            const action = game.content.get(id, 'actions');
            
            if (!action || !action.steps) return false;
            
            const progKey = action.progKey;
            const currentProg = game.npcProgress[progKey] || 0;
            const step = action.steps[currentProg];
            
            if (!step) return false;

            // 1. Costs
            const costs = step.costs || (step.cost ? { [step.costType]: step.cost } : null);
            if (costs && !game.resource.consume(game, costs)) {
                game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
                return false;
            }

            // 2. Progress Logic
            game.npcProgress[progKey]++;
            const newProg = game.npcProgress[progKey];
            
            // Increment Trust
            game.npcTrust[progKey] = (game.npcTrust[progKey] || 0) + 1;

            // 3. Reward Handling (Modular)
            if (step.reward) {
                // Determine if reward is an item or specific flag
                if (step.reward.startsWith('item-')) {
                    game.actions.effectHandlers.unlockItem(game, { id: step.reward });
                } else {
                    // Fallback for named legacy rewards or special cases
                    game.flags[step.reward] = true;
                }
            }

            // 4. Side Effects (using ActionSystem's handlers for consistency)
            if (Array.isArray(step.onSuccess)) {
                step.onSuccess.forEach(effect => {
                    const handler = game.actions.effectHandlers[effect.type];
                    if (handler) handler(game, effect);
                });
            } else if (step.onSuccess && !Array.isArray(step.onSuccess)) {
                // Legacy support during migration if needed
                if (step.onSuccess.unlocks) {
                    step.onSuccess.unlocks.forEach(u => game.actions.effectHandlers.unlockRecipe(game, { id: u }));
                }
            }

            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'success' });
            return { success: true, logKey: `npc_${progKey}_${newProg}` };
        }
    };
};
