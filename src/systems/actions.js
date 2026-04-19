/**
 * Action System - Core 3.0
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
    return {
        /**
         * Dynamic Effect Registry
         * Systems can register their own handlers to extend action functionality.
         */
        effectHandlers: {},

        registerEffect(type, handler) {
            this.effectHandlers[type] = handler;
            console.log(`[ACTIONS] Registered effect handler: ${type}`);
        },

        initEffects() {
            this.registerEffect('setFlag', (game, { flag, value }) => { game.flags[flag] = value; });
            this.registerEffect('unlockNPC', (game, { id }) => { 
                if (!game.unlockedNPCs.includes(id)) game.unlockedNPCs.push(id); 
            });
            this.registerEffect('unlockRecipe', (game, { id }) => { 
                if (!game.unlockedRecipes.includes(id)) game.unlockedRecipes.push(id); 
            });
            this.registerEffect('unlockItem', (game, { id }) => {
                if (!game.discoveredItems.includes(id)) game.discoveredItems.push(id);
                game.flags[id] = true;
            });
            this.registerEffect('modifyLimit', (game, { resource, amount }) => { 
                game.limits[resource] = (game.limits[resource] || 0) + amount; 
            });
            this.registerEffect('addBuff', (game, { buffId, override }) => {
                const baseBuff = game.content.get(buffId, 'buffs') || {};
                const finalBuff = { ...baseBuff, ...override };
                game.activeBuffs[buffId] = { 
                    ...finalBuff, 
                    remaining: finalBuff.duration, 
                    total: finalBuff.duration 
                };
            });
            this.registerEffect('setObjective', (game, { id }) => {
                game.currentObjective = id;
            });
            this.registerEffect('playSound', (game, { id }) => {
                game.playSound(id);
            });
            this.registerEffect('log', (game, { id, color }) => {
                game.addLog(id, 'logs', color);
            });
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
            let totalYield = 0;
            let logGain = null;

            if (isPrepare) {
                // 1. Requirements Check (Modular Requirement Engine)
                if (action.requirements) {
                    const met = Object.entries(action.requirements).every(([path, rule]) => {
                        return this.checkRequirement(game, path, rule);
                    });
                    if (!met) return { success: false };
                }

                // 2. Affordability Check
                const costs = action.costType === 'mixed' ? action.costs : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost } : {});
                if (!game.resource.canAfford(game, costs)) return { success: false };
                
                // 3. Storage Check
                if (action.yieldType && game.resource.isFull(game, action.yieldType)) return { success: false };

                // 4. Initial Consumption
                if (costs && Object.keys(costs).length > 0) {
                    game.resource.consume(game, costs);
                }
            }

            if (isFinalize) {
                // 5. Rewards
                if (action.rewards) {
                    Object.entries(action.rewards).forEach(([res, amountOrKey]) => {
                        let amount = typeof amountOrKey === 'string' 
                            ? game.pipeline.calculate(game, amountOrKey, 1) 
                            : amountOrKey;
                        const finalAmount = Math.round(amount);
                        game.resource.add(game, res, finalAmount);
                        
                        // Set log context for first or matching reward
                        if (res === action.yieldType || logGain === null) {
                            logGain = finalAmount;
                            totalYield = finalAmount;
                        }
                    });
                }

                // 6. OnSuccess Effects
                if (action.onSuccess) {
                    action.onSuccess.forEach(effect => {
                        if (this.effectHandlers[effect.type]) {
                            this.effectHandlers[effect.type](game, effect);
                        }
                    });
                }
            }

            return { 
                success: true, 
                logKey: action.logKey, 
                logGain: logGain, 
                logColor: action.logColor,
                yield: totalYield
            };
        },
        
        checkRequirement(game, path, rule) {
            const actual = this.resolvePath(game, path);
            
            // Simple equality check
            if (typeof rule !== 'object' || rule === null) {
                return actual === rule;
            }

            // Operator-based check
            const { op, val } = rule;
            switch (op) {
                case '>=': return actual >= val;
                case '<=': return actual <= val;
                case '>':  return actual > val;
                case '<':  return actual < val;
                case '!=': return actual !== val;
                case 'includes': return Array.isArray(actual) && actual.includes(val);
                case 'not_includes': return Array.isArray(actual) && !actual.includes(val);
                default:   return actual === val;
            }
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

            // 2. Satiation Consumption (Only if defined and > 0)
            if (action.satiationCost > 0) {
                game.resource.consume(game, 'satiation', action.satiationCost);
            }

            if (action.isStory) game.story.recordStoryEntry(game, id, action);

            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
            if (action.particleText) this.spawnParticles(game, action);
            
            if (result && result.logKey) {
                game.bus.emit(game.EVENTS.LOG_ADDED, { 
                    id: result.logKey, 
                    context: 'logs', 
                    color: result.logColor, 
                    params: { gain: result.logGain ?? '', val: result.logGain ?? '' } 
                });
            }

            game.bus.emit(game.EVENTS.SAVE_REQUESTED);
        },

        handleFailure(game, id, action) {
            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
            
            if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: 'fail_full_' + action.yieldType, color: 'var(--accent-red)' });
                return;
            }

            const costType = action.costType;
            if (!costType || costType === 'none') return;

            const effectiveCosts = costType === 'mixed' ? action.costs : { [costType]: action.cost };
            if (!game.resource.canAfford(game, effectiveCosts)) {
                // Generic failure key lookup (e.g., fail_energy, fail_magic)
                // Falls back to fail_resources if specific key doesn't exist
                const specificKey = 'fail_' + costType;
                const logKey = game.t(specificKey) !== specificKey ? specificKey : 'fail_resources';
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: logKey, color: 'var(--accent-red)' });
            }
        },

        spawnParticles(game, action) {
            let pText = action.particleText ? game.t(action.particleText) : null;
            const resKey = action.yieldType || action.costType || action.counter;
            
            if (!pText && resKey) {
                const translated = game.t('ui_' + resKey);
                if (translated && translated !== 'ui_' + resKey) pText = `+ ${translated}`;
            }
            
            if (!pText) pText = action.particleText || '';

            game.bus.emit(game.EVENTS.PARTICLE_TRIGGERED, { 
                x: game.lastMouseX, y: game.lastMouseY, 
                text: pText, 
                type: action.particleType || 'energy' 
            });
        },

        boot(game) {
            // Initialize dynamic effect handlers
            this.initEffects();
        }
    };
}
