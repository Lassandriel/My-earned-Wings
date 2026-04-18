/**
 * Action System - Core 3.0
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
    return {
        /**
         * Modular Effect Handlers
         * These can be extended easily without touching the core logic.
         */
        effectHandlers: {
            setFlag: (game, { flag, value }) => { game.flags[flag] = value; },
            unlockNPC: (game, { id }) => { 
                if (!game.unlockedNPCs.includes(id)) game.unlockedNPCs.push(id); 
            },
            unlockRecipe: (game, { id }) => { 
                if (!game.unlockedRecipes.includes(id)) game.unlockedRecipes.push(id); 
            },
            unlockItem: (game, { id }) => {
                if (!game.discoveredItems.includes(id)) game.discoveredItems.push(id);
                // Also set an item flag for requirements logic
                game.flags[id] = true;
            },
            modifyLimit: (game, { resource, amount }) => { 
                game.limits[resource] = (game.limits[resource] || 0) + amount; 
            },
            addBuff: (game, { buffId, override }) => {
                const baseBuff = game.content.get(buffId, 'buffs') || {};
                const finalBuff = { ...baseBuff, ...override };
                game.activeBuffs[buffId] = { 
                    ...finalBuff, 
                    remaining: finalBuff.duration, 
                    total: finalBuff.duration 
                };
            }
        },

        execute(game, id) {
            const action = game.content.get(id, 'actions');
            if (!action) return false;
            
            if (game.activeTasks[id]) return false;

            if (action.duration) {
                const result = this.processAction(game, id, action, 'prepare'); 
                if (result.success) {
                    game.activeTasks[id] = {
                        actionId: id,
                        remaining: action.duration,
                        total: action.duration
                    };
                    game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
                    return true;
                }
                this.handleFailure(game, id, action);
                return false;
            }

            let result = action.execute ? action.execute(game) : this.processAction(game, id, action);

            if (result === true || (result && result.success)) {
                this.handleSuccess(game, id, action, result);
                return true;
            }
            
            this.handleFailure(game, id, action);
            return false;
        },

        processAction(game, id, action, mode = 'full') {
            const isPrepare = (mode === 'prepare' || mode === 'full');
            const isFinalize = (mode === 'finalize' || mode === 'full');

            if (isPrepare) {
                // 1. Requirements Check (Robust Path Access)
                if (action.requirements) {
                    const met = Object.entries(action.requirements).every(([key, val]) => {
                        return this.resolvePath(game, key) === val;
                    });
                    if (!met) return { success: false };
                }

                // 2. Storage Check
                if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                    return { success: false };
                }

                // 3. Cost Handling
                const costType = action.costType;
                if (costType && costType !== 'none') {
                    const costs = costType === 'mixed' ? action.costs : { [costType]: action.cost };
                    if (game.activeFocus === id && costs.energy) {
                        const { energy, ...otherCosts } = costs;
                        if (!game.resource.consume(game, otherCosts)) return { success: false };
                    } else {
                        if (!game.resource.consume(game, costs)) return { success: false };
                    }
                }
            }

            if (mode === 'prepare') return { success: true };

            let logGain = null;
            if (isFinalize) {
                // 4. Rewards
                if (action.rewards) {
                    Object.entries(action.rewards).forEach(([res, amountOrKey]) => {
                        let amount = typeof amountOrKey === 'string' 
                            ? game.pipeline.calculate(game, amountOrKey, 1) 
                            : amountOrKey;
                        const finalAmount = Math.round(amount);
                        game.resource.add(game, res, finalAmount);
                        if (res === action.yieldType || (Object.keys(action.rewards).length === 1)) {
                            logGain = finalAmount;
                        }
                    });
                }

                // 5. Success Effects (Modular Handlers)
                if (Array.isArray(action.onSuccess)) {
                    action.onSuccess.forEach(effect => {
                        const handler = this.effectHandlers[effect.type];
                        if (handler) handler(game, effect);
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

        resolvePath(obj, path) {
            return path.split('.').reduce((prev, curr) => {
                return prev ? prev[curr] : undefined;
            }, obj);
        },

        handleSuccess(game, id, action, result) {
            game.counters.totalActions++;
            
            if (action.counter) {
                game.counters[action.counter] = (game.counters[action.counter] || 0) + (result.yield || 1);
            }

            if (id !== 'act-essen' && (action.satiationCost !== 0)) {
                game.resource.consume(game, 'satiation', action.satiationCost ?? 2);
            }

            if (action.isStory) game.story.recordStoryEntry(game, id, action);

            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
            if (action.particleText) this.spawnParticles(game, action);
            
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

            const effectiveCosts = costType === 'mixed' ? action.costs : { [costType]: action.cost };
            if (!game.resource.canAfford(game, effectiveCosts)) {
                const failKey = (costType === 'energy' || costType === 'magic') ? 'fail_' + costType : 'fail_resources';
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: failKey, color: 'var(--accent-red)' });
            } else if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: 'fail_full_' + action.yieldType, color: 'var(--accent-red)' });
            }
        },

        spawnParticles(game, action) {
            let pText = action.particleText;
            const resKey = action.yieldType || action.costType || action.counter;
            if (resKey) {
                const translated = game.t('ui_' + resKey);
                if (translated && translated !== 'ui_' + resKey) pText = `+ ${translated}`;
            }
            game.bus.emit(game.EVENTS.PARTICLE_TRIGGERED, { 
                x: game.lastMouseX, y: game.lastMouseY, 
                text: pText, 
                type: action.particleType || 'energy' 
            });
        },

        boot(game) {
            // Integration hooks can go here
        }
    };
}
