/**
 * Action System - Handles the execution of player-triggered actions,
 * successes, failures, and stat updates.
 */
export function createActionSystem() {
    return {
        /**
         * The core execution logic for ANY action by ID.
         */
        execute(game, id) {
            const action = game.actionDb[id];
            if (!action) return false;
            
            // Prevent double-execution if task is already active
            if (game.activeTasks[id]) return false;

            if (action.duration) {
                // 1. Validate & Consume Costs immediately
                const result = this.processAction(game, id, action, true); // 'true' for startOnly
                if (result.success) {
                    game.activeTasks[id] = {
                        actionId: id,
                        remaining: action.duration,
                        total: action.duration,
                        result: result
                    };
                    // Feedback for starting
                    game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
                    return true;
                }
                this.handleFailure(game, id, action);
                return false;
            }

            let result = null;
            if (action.execute) {
                result = action.execute(game);
            } else {
                result = this.processAction(game, id, action);
            }

            if (result === true || (result && result.success)) {
                this.handleSuccess(game, id, action, result);
                return true;
            }
            
            this.handleFailure(game, id, action);
            return false;
        },

        /**
         * Generic effect runner for data-driven actions.
         */
        processAction(game, id, action, startOnly = false) {
            // 1. Check Requirements
            if (action.requirements) {
                const met = Object.entries(action.requirements).every(([key, val]) => {
                    if (key.includes('.')) {
                        const parts = key.split('.');
                        let target = game;
                        for (let i = 0; i < parts.length - 1; i++) target = target[parts[i]];
                        return target[parts[parts.length - 1]] === val;
                    }
                    if (key === 'upgrades') return game.upgrades.includes(val);
                    return game[key] === val;
                });
                if (!met) return { success: false };
            }

            // 2. Check Yield Limits (Prevent action if storage is full)
            if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                return { success: false };
            }

            // 3. Handle Costs
            const costType = action.costType;
            if (costType && costType !== 'none') {
                const costs = costType === 'mixed' ? action.costs : { [costType]: action.cost };
                if (!game.resource.consume(game, costs)) {
                    return { success: false };
                }
            }

            // Return early if we only want to start a timed task
            if (startOnly) {
                return { success: true };
            }

            // 4. Handle Rewards
            let logGain = null;
            if (action.rewards) {
                Object.entries(action.rewards).forEach(([res, amountOrKey]) => {
                    let amount = amountOrKey;
                    if (typeof amountOrKey === 'string') {
                        amount = game.pipeline.calculate(game, amountOrKey, 1);
                    }
                    game.resource.add(game, res, amount);
                    if (res === action.yieldType || (Object.keys(action.rewards).length === 1)) {
                        logGain = amount;
                    }
                });
            }

            // 5. Side Effects (Upgrades, Flags, Limits, Unlocks)
            if (action.onSuccess) {
                const os = action.onSuccess;
                if (os.upgrades) {
                    os.upgrades.forEach(u => { if (!game.upgrades.includes(u)) game.upgrades.push(u); });
                }
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
                if (os.limits) {
                    Object.entries(os.limits).forEach(([r, a]) => { game.limits[r] = (game.limits[r] || 0) + a; });
                }
                if (os.unlocks) {
                    os.unlocks.forEach(u => {
                        if (u.startsWith('npc-')) {
                            if (!game.unlockedNPCs.includes(u)) game.unlockedNPCs.push(u);
                        } else {
                            if (!game.unlockedRecipes.includes(u)) game.unlockedRecipes.push(u);
                        }
                    });
                }
            }

            return { 
                success: true, 
                logKey: action.logKey, 
                logGain: logGain, 
                logColor: action.logColor 
            };
        },

        handleSuccess(game, id, action, result) {
            // Discovery tracking
            game.upgrades.forEach(itemId => {
                if (!game.discoveredItems.includes(itemId)) game.discoveredItems.push(itemId);
            });

            game.counters.totalActions++;

            // Counters and resources
            if (action.counter) {
                if (!game.counters[action.counter]) game.counters[action.counter] = 0;
                
                if (action.counter === 'shards' && result.logGain) {
                    const amount = parseInt(result.logGain.toString().replace(/[^0-9]/g, '')) || 0;
                    game.counters.shards += amount;
                } else {
                    game.counters[action.counter] += (result.yield || 1);
                }
            }

            // Immediately check for new titles


            // Satiation reduction
            if (id !== 'action-essen') {
                const satCost = action.satiationCost ?? 2;
                game.resource.consume(game, 'satiation', satCost);
            }

            // Record history
            if (action.isStory) {
                game.story.recordStoryEntry(game, id, action);
            }

            // Feedback (SFX, Particles)
            const sfxKey = action.sfx || 'click';
            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: sfxKey });

            if (action.particleText) {
                this.spawnParticles(game, action);
            }
            
            // Logging
            if (result && result.logKey) {
                game.bus.emit(game.EVENTS.LOG_ADDED, { 
                    id: result.logKey, 
                    context: 'logs', 
                    color: result.logColor, 
                    params: { gain: result.logGain ?? '' } 
                });
            }

            game.bus.emit(game.EVENTS.SAVE_REQUESTED);
        },

        handleFailure(game, id, action) {
            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
            const costType = action.costType;
            if (!costType) return;

            const effectiveCosts = costType === 'mixed' ? action.costs : costType;

            // Check if can't afford
            if (!game.resource.canAfford(game, effectiveCosts, action.cost)) {
                const failKey = (costType === 'energy' || costType === 'magic') ? 'fail_' + costType : 'fail_resources';
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: failKey, color: 'var(--accent-red)' });
            } 
            // Check if full (applies to both single and mixed costs if yieldType is defined)
            else {
                const yieldCheck = action.yieldType || (costType !== 'mixed' ? costType : null);
                if (yieldCheck && game.resource.isFull(game, yieldCheck)) {
                    game.bus.emit(game.EVENTS.LOG_ADDED, { id: 'fail_full_' + yieldCheck, color: 'var(--accent-red)' });
                }
            }
        },

        spawnParticles(game, action) {
            let pText = action.particleText;
            if (pText.startsWith('+ ')) {
                const resKey = action.yieldType || action.costType || action.counter;
                if (resKey) {
                    const translated = game.t('ui_' + resKey);
                    if (translated && translated !== 'ui_' + resKey) pText = `+ ${translated}`;
                }
            }
            game.bus.emit(game.EVENTS.PARTICLE_TRIGGERED, { 
                x: game.lastMouseX, 
                y: game.lastMouseY, 
                text: pText, 
                type: action.particleType || 'energy' 
            });
        }
    };
}
