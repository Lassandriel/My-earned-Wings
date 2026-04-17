/**
 * NPC System - Handles companion recruitment, execution of NPC quests,
 * and background resource generation (Salary & Yield).
 */
export const createNPCSystem = () => {
    return {
        /**
         * Executes an NPC interaction step (Quest/Dialog progress).
         */
        execute(game, id) {
            const action = game.actionDb[id];
            
            if (!action || !action.steps) return false;
            
            const progKey = action.progKey;
            const currentProg = game.npcProgress[progKey] || 0;
            const step = action.steps[currentProg];
            
            if (!step) return false;

            // Handle costs
            const costs = step.costs || (step.cost ? { [step.costType]: step.cost } : null);
            
            if (costs && !game.resource.consume(game, costs)) {
                game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
                return false;
            }

            // Progress success
            game.npcProgress[progKey]++;
            const newProg = game.npcProgress[progKey];
            
            // Increment Trust (Numerical bond)
            const currentTrust = game.npcTrust[progKey] || 0;
            game.npcTrust[progKey] = currentTrust + 1;

            // Give reward
            if (step.reward) {
                if (!game.upgrades.includes(step.reward)) {
                    game.upgrades.push(step.reward);
                }
                if (!game.discoveredItems.includes(step.reward)) game.discoveredItems.push(step.reward);
                
                if (step.reward === 'Official Land Deed') game.housing.hasLandDeed = true;
            }

            // Logic side-effects (Generified)
            if (step.onSuccess) {
                const os = step.onSuccess;
                // Handle Unlocks
                if (os.unlocks) {
                    os.unlocks.forEach(u => {
                        if (u.startsWith('npc-')) {
                            if (!game.unlockedNPCs.includes(u)) game.unlockedNPCs.push(u);
                        } else {
                            if (!game.unlockedRecipes.includes(u)) game.unlockedRecipes.push(u);
                        }
                    });
                }
                // Handle Flags
                if (os.flags) {
                    Object.entries(os.flags).forEach(([f, v]) => {
                        if (f.includes('.')) {
                            const parts = f.split('.');
                            let target = game;
                            for (let i = 0; i < parts.length - 1; i++) target = target[parts[i]];
                            target[parts[parts.length - 1]] = v;
                        } else game[f] = v;
                    });
                }
            }

            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'success' });
            return { success: true, logKey: `npc_${progKey}_${newProg}` };
        },

    };
};

