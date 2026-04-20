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
            const effects = {
                setFlag: (game, { flag, value }) => { game.flags[flag] = value; },
                unlockNPC: (game, { id }) => { 
                    if (!game.unlockedNPCs.includes(id)) game.unlockedNPCs.push(id); 
                },
                unlockRecipe: (game, { id }) => { 
                    if (!game.unlockedRecipes.includes(id)) game.unlockedRecipes.push(id); 
                },
                unlockItem: (game, { id }) => {
                    if (!game.discoveredItems.includes(id)) game.discoveredItems.push(id);
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
                },
                setObjective: (game, { id }) => {
                    game.currentObjective = id;
                },
                playSound: (game, { id }) => {
                    game.playSound(id);
                },
                log: (game, { id, color }) => {
                    game.addLog(id, 'logs', color);
                }
            };
            Object.entries(effects).forEach(([type, handler]) => this.registerEffect(type, handler));
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
                let costs = action.costType === 'mixed' ? { ...action.costs } : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost } : {});
                
                // ARCANE FOCUS: Substitution Logic (Energy is skipped if magic focus ✨ is active for THIS action)
                if (game.activeFocus === id && costs.energy) {
                    delete costs.energy;
                }

                // ACTION SATIATION: Physical effort consumes food (1 point)
                const isPhysical = action.costType === 'energy' || (action.costType === 'mixed' && action.costs && action.costs.energy);
                if (isPhysical) {
                    costs.satiation = (costs.satiation || 0) + 1;
                }

                if (!game.resource.canAfford(game, costs)) return { success: false };
                
                // 3. Storage Check (Prevent yielding resources into full storage)
                if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                    game.addLog('fail_full_' + action.yieldType, 'logs', 'var(--accent-red)');
                    game.playSound('fail');
                    return { success: false };
                }

                // 4. Buff Wastage Check (Prevent overwriting still-active buffs)
                if (action.onSuccess) {
                    const buffEffect = action.onSuccess.find(e => e.type === 'addBuff');
                    if (buffEffect) {
                        const existing = game.activeBuffs[buffEffect.buffId];
                        if (existing && (existing.remaining / existing.total) > 0.1) {
                            game.addLog('fail_buff_active', 'logs', 'var(--accent-red)');
                            game.playSound('fail');
                            return { success: false };
                        }
                    }
                }

                // 5. Initial Consumption
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
                        const finalAmount = amount;
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
                    params: { 
                        gain: result.logGain ?? '', 
                        val: result.logGain ?? '',
                        ...(result.logParams || {}) 
                    } 
                });
            }

            game.bus.emit(game.EVENTS.SAVE_REQUESTED);
        },

        handleFailure(game, id, action) {
            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
            
            // 1. Check Storage Failure (Highest Priority)
            if (action.yieldType && game.resource.isFull(game, action.yieldType)) {
                game.bus.emit(game.EVENTS.LOG_ADDED, { id: 'fail_full_' + action.yieldType, color: 'var(--accent-red)' });
                return;
            }

            // 2. Diagnose Cost Failure (Identify first missing resource)
            const costType = action.costType;
            if (!costType || costType === 'none') return;

            const effectiveCosts = costType === 'mixed' ? action.costs : { [costType]: action.cost };
            
            // Find the first resource we can't afford
            const firstMissing = Object.keys(effectiveCosts).find(resId => {
                return !game.resource.canAfford(game, resId, effectiveCosts[resId]);
            });

            if (firstMissing) {
                const specificKey = 'fail_' + firstMissing;
                // Fallback mechanism: check if translation exists, otherwise use fail_resources
                const logKey = game.t(specificKey) !== specificKey ? specificKey : 'fail_resources';
                game.addLog(logKey, 'logs', 'var(--accent-red)');
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

        boot() {
            // Initialize dynamic effect handlers
            this.initEffects();
        }
    };
}
