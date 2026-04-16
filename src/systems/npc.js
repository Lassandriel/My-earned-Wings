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
            const store = Alpine.store('game');
            const action = store.actionDb[id];
            const npcDef = store.NPC_REGISTRY[id];
            
            if (!action || !action.steps) return false;
            
            const progKey = action.progKey;
            const currentProg = store.npcProgress[progKey] || 0;
            const step = action.steps[currentProg];
            
            if (!step) return false;

            // Handle costs
            const costs = step.costs || (step.cost ? { [step.costType]: step.cost } : null);
            
            if (costs && !store.resource.consume(store, costs)) {
                store.playSound('fail');
                return false;
            }

            // Progress success
            store.npcProgress[progKey]++;
            const newProg = store.npcProgress[progKey];

            // Give reward
            if (step.reward) {
                if (!store.inventory.includes(step.reward)) {
                    store.inventory.push(step.reward);
                }
                if (!store.discoveredItems.includes(step.reward)) store.discoveredItems.push(step.reward);
                
                // Special syncs (Consider moving these to registry in the future)
                if (step.reward === 'Official Land Deed') store.housing.hasLandDeed = true;
            }

            // Logic side-effects
            this.handleUnlocks(store, id, newProg);

            store.playSound('success');
            return { success: true, logKey: `npc_${progKey}_${newProg}` };
        },

        handleUnlocks(store, id, newProg) {
            if (id === 'npc-flowerGirl' && newProg >= 5) {
                if (!store.unlockedNPCs.includes('npc-blacksmith')) store.unlockedNPCs.push('npc-blacksmith');
            }
            if (id === 'npc-artisan' && newProg >= 3) {
                if (!store.unlockedRecipes.includes('craft-axe')) store.unlockedRecipes.push('craft-axe');
                if (!store.unlockedRecipes.includes('craft-pickaxe')) store.unlockedRecipes.push('craft-pickaxe');
            }
        },

        toggleCompanion(game, npcId) {
            const store = Alpine.store('game');
            if (store.companions[npcId]) {
                delete store.companions[npcId];
                store.playSound('click');
            } else {
                const npc = store.actionDb[npcId];
                const currentProgress = store.npcProgress[npc.progKey] || 0;
                if (currentProgress >= npc.maxProgress) {
                    store.companions[npcId] = true;
                    store.playSound('success');
                }
            }
        },

        /**
         * Processes salaries and resource generation for all active companions.
         */
        processTick(game) {
            const store = Alpine.store('game');
            const activeIds = Object.keys(store.companions);
            if (activeIds.length === 0) return;

            let totalSalary = 0;
            activeIds.forEach(id => {
                const npcAction = store.actionDb[id];
                if (npcAction && npcAction.companion) {
                    totalSalary += npcAction.companion.salary;
                }
            });

            if (store.resource.consume(store, 'shards', totalSalary)) {
                activeIds.forEach(id => {
                    const npcAction = store.actionDb[id];
                    if (npcAction && npcAction.companion) {
                        Object.entries(npcAction.companion.yield).forEach(([res, amount]) => {
                            store.resource.add(store, res, amount);
                        });
                    }
                });
            } else {
                store.companions = {};
                store.addLog('fail_salary', 'logs', 'rgba(239, 68, 68, 0.75)');
                store.playSound('fail');
            }
        }
    };
}
