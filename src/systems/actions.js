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
            
            const result = action.execute(game);
            if (result === true || (result && result.success)) {
                this.handleSuccess(game, id, action, result);
                return true;
            }
            
            this.handleFailure(game, id, action);
            return false;
        },

        handleSuccess(game, id, action, result) {
            // Discovery tracking
            game.inventory.forEach(itemId => {
                if (!game.discoveredItems.includes(itemId)) game.discoveredItems.push(itemId);
            });

            game.counters.totalActions++;

            // Counters and resources
            if (action.counter) {
                if (action.counter === 'shards' && result.logGain) {
                    const amount = parseInt(result.logGain.toString().replace(/[^0-9]/g, '')) || 0;
                    game.counters.shards += amount;
                } else {
                    game.counters[action.counter] += (result.yield || 1);
                }
            }

            // Immediately check for new titles
            game.checkTraits();

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
            if (action.sfx) game.playSound(action.sfx);
            else game.playSound('click');

            if (action.particleText) {
                this.spawnParticles(game, action);
            }
            
            // Logging
            if (result && result.logKey) {
                game.addLog(result.logKey, 'logs', result.logColor, { gain: result.logGain ?? '' });
            }

            game.saveGame();
        },

        handleFailure(game, id, action) {
            game.playSound('fail');
            const costType = action.costType;
            if (!costType) return;

            const effectiveCosts = costType === 'mixed' ? action.costs : costType;

            if (!game.resource.canAfford(game, effectiveCosts, action.cost)) {
                const failKey = (costType === 'energy' || costType === 'magic') ? 'fail_' + costType : 'fail_resources';
                game.addLog(failKey, 'logs', 'rgba(239, 68, 68, 0.75)');
            } else if (costType !== 'mixed' && game.resource.isFull(game, action.yieldType || costType)) {
                game.addLog('fail_full_' + (action.yieldType || costType), 'logs', 'rgba(239, 68, 68, 0.75)');
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
            game.juice.spawnParticle(game.lastMouseX, game.lastMouseY, pText, action.particleType || 'energy');
        }
    };
}
