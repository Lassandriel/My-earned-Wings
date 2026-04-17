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

