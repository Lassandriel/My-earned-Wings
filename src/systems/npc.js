/**
 * NPC System - Handles companion recruitment, execution of NPC quests,
 * and background resource generation (Salary & Yield).
 */
export const createNPCSystem = () => {
    const handleUnlocks = (store, id, newProg) => {
        if (id === 'npc-flowerGirl' && newProg >= 5) {
            if (!store.unlockedNPCs.includes('npc-blacksmith')) store.unlockedNPCs.push('npc-blacksmith');
        }
        if (id === 'npc-artisan' && newProg >= 3) {
            if (!store.unlockedRecipes.includes('craft-axe')) store.unlockedRecipes.push('craft-axe');
            if (!store.unlockedRecipes.includes('craft-pickaxe')) store.unlockedRecipes.push('craft-pickaxe');
        }
    };

    return {
        /**
         * Executes an NPC interaction step (Quest/Dialog progress).
         */
        execute(game, id) {
            const store = Alpine.store('game');
            const action = store.actionDb[id];
            
            if (!action || !action.steps) return false;
            
            const progKey = action.progKey;
            const currentProg = store.npcProgress[progKey] || 0;
            const step = action.steps[currentProg];
            
            if (!step) return false;

            // Handle costs
            const costs = step.costs || (step.cost ? { [step.costType]: step.cost } : null);
            
            if (costs && !store.resource.consume(store, costs)) {
                store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
                return false;
            }

            // Progress success
            store.npcProgress[progKey]++;
            const newProg = store.npcProgress[progKey];
            
            // Increment Trust (Numerical bond)
            const currentTrust = store.npcTrust[progKey] || 0;
            store.npcTrust[progKey] = currentTrust + 1;

            // Give reward
            if (step.reward) {
                if (!store.upgrades.includes(step.reward)) {
                    store.upgrades.push(step.reward);
                }
                if (!store.discoveredItems.includes(step.reward)) store.discoveredItems.push(step.reward);
                
                if (step.reward === 'Official Land Deed') store.housing.hasLandDeed = true;
            }

            // Logic side-effects
            handleUnlocks(store, id, newProg);

            store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
            return { success: true, logKey: `npc_${progKey}_${newProg}` };
        },

        toggleCompanion(game, npcId) {
            const store = Alpine.store('game');
            if (store.companions[npcId]) {
                delete store.companions[npcId];
                store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'click' });
            } else {
                const npc = store.actionDb[npcId];
                const currentProgress = store.npcProgress[npc.progKey] || 0;
                if (currentProgress >= npc.maxProgress) {
                    store.companions[npcId] = true;
                    store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
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
            const currentYields = {};

            activeIds.forEach(id => {
                const npcAction = store.actionDb[id];
                if (npcAction && npcAction.companion) {
                    totalSalary += npcAction.companion.salary;
                    Object.entries(npcAction.companion.yield).forEach(([res, amount]) => {
                        currentYields[res] = (currentYields[res] || 0) + amount;
                    });
                }
            });

            const currentShards = store.resources.shards || 0;
            
            if (totalSalary > 0 && currentShards >= totalSalary) {
                // Consume salary
                store.resource.consume(store, 'shards', totalSalary);
                
                // Add yields
                Object.entries(currentYields).forEach(([res, amount]) => {
                    store.resource.add(store, res, amount);
                });
            } else if (totalSalary > 0) {
                // Can't afford
                store.companions = {};
                store.bus.emit(store.EVENTS.LOG_ADDED, { id: 'fail_salary', color: 'var(--accent-red)' });
                store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
            }
        }
    };
};

