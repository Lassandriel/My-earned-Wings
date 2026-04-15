/**
 * NPC System - Handles companion recruitment, execution of NPC quests,
 * and background resource generation (Salary & Yield).
 */
export function createNPCSystem() {
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
                game.playSound('fail');
                return false;
            }

            // Progress success
            game.npcProgress[progKey]++;
            const newProg = game.npcProgress[progKey];

            // Give reward
            if (step.reward) {
                if (!game.inventory.includes(step.reward)) {
                    game.inventory.push(step.reward);
                }
                if (!game.discoveredItems.includes(step.reward)) game.discoveredItems.push(step.reward);
                
                // Special syncs
                if (step.reward === 'Official Land Deed') game.housing.hasLandDeed = true;
            }

            // Logic side-effects (Direct Unlocks)
            this.handleUnlocks(game, id, newProg);

            game.playSound('success');
            return { success: true, logKey: `npc_${progKey}_${newProg}` };
        },

        handleUnlocks(game, id, newProg) {
            if (id === 'npc-flowerGirl' && newProg >= 5) {
                if (!game.unlockedNPCs.includes('npc-blacksmith')) game.unlockedNPCs.push('npc-blacksmith');
            }
            if (id === 'npc-artisan' && newProg >= 3) {
                if (!game.unlockedRecipes.includes('craft-axe')) game.unlockedRecipes.push('craft-axe');
                if (!game.unlockedRecipes.includes('craft-pickaxe')) game.unlockedRecipes.push('craft-pickaxe');
            }
        },

        toggleCompanion(game, npcId) {
            if (game.companions[npcId]) {
                delete game.companions[npcId];
                game.playSound('click');
            } else {
                const npc = game.actionDb[npcId];
                const currentProgress = game.npcProgress[npc.progKey] || 0;
                if (currentProgress >= npc.maxProgress) {
                    game.companions[npcId] = true;
                    game.playSound('success');
                }
            }
        },

        /**
         * Processes salaries and resource generation for all active companions.
         * Called by the Game Engine Tick.
         */
        processTick(game) {
            const activeIds = Object.keys(game.companions);
            if (activeIds.length === 0) return;

            let totalSalary = 0;
            activeIds.forEach(id => {
                const npc = game.actionDb[id];
                if (npc && npc.companion) {
                    totalSalary += npc.companion.salary;
                }
            });

            if (game.resource.consume(game, 'shards', totalSalary)) {
                activeIds.forEach(id => {
                    const npc = game.actionDb[id];
                    if (npc && npc.companion) {
                        Object.entries(npc.companion.yield).forEach(([res, amount]) => {
                            game.resource.add(game, res, amount);
                        });
                    }
                });
            } else {
                game.companions = {};
                game.addLog('fail_salary', 'logs', 'rgba(239, 68, 68, 0.75)');
                game.playSound('fail');
            }
        }
    };
}
