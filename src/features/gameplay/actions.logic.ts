import {
  GameState,
  ActionDefinition,
  ResourceId,
  FlagId,
  GameEffect,
  ActionId,
} from '../../types/game';
import { checkRequirement } from '../../core/systems/logicUtils';

/**
 * Action System - TypeScript Edition
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
  const effectHandlers: Record<string, (game: GameState, effect: any) => void> = {};
  let _lastActionTime = 0;
  const DEBOUNCE_MS = 50;
  const metadata = {
    id: 'actions',
    delegates: {
      executeAction: 'execute',
      attemptAction: 'attemptAction',
      toggleFocus: 'toggleFocus'
    }
  };

  const registerEffect = <T extends GameEffect['type']>(
    type: T,
    handler: (game: GameState, effect: Extract<GameEffect, { type: T }>) => void
  ) => {
    effectHandlers[type] = handler as (game: GameState, effect: any) => void;
    console.log(`[ACTIONS] Registered effect handler: ${type}`);
  };

  const initEffects = () => {
    registerEffect('setFlag', (game, { flag, value }) => {
      game.flags[flag] = value;
      
      // Update active producers if the flag corresponds to a producer action
      const action = game.content.get(flag as string, 'actions') as ActionDefinition | null;
      if (action && action.passiveProduction) {
        if (value && !game.activeProducers.includes(flag as ActionId)) {
          game.activeProducers.push(flag as ActionId);
          console.log(`[ACTIONS] Registered active producer: ${flag}`);
        } else if (!value) {
          game.activeProducers = game.activeProducers.filter(id => id !== flag);
        }
      }
    });

    registerEffect('unlockNPC', (game, { id }) => {
      if (!game.unlockedNPCs.includes(id)) {
        game.unlockedNPCs = [...game.unlockedNPCs, id];
        const npc = game.content.get(id, 'npcs');
        const name = npc ? game.t(npc.nameKey) : id;
        game.addLog('reward_unlock_npc', 'logs', 'var(--gold)', { name });
      }
    });

    registerEffect('unlockRecipe', (game, { id }) => {
      if (!game.unlockedRecipes.includes(id)) {
        game.unlockedRecipes = [...game.unlockedRecipes, id];
        const action = game.content.get(id, 'actions');
        const title = action ? game.t(action.title, 'actions') : id;
        game.addLog('reward_unlock_recipe', 'logs', 'var(--gold)', { title });
      }
    });

    registerEffect('unlockItem', (game, { id }) => {
      if (!game.discoveredItems.includes(id)) {
        game.discoveredItems = [...game.discoveredItems, id];
        const item = game.content.get(id, 'items');
        const title = item ? game.t(item.title, 'items') : id;
        game.addLog('reward_unlock_item', 'logs', 'var(--gold)', { title });
      }
      game.flags[id as unknown as FlagId] = true;
    });

    registerEffect('modifyLimit', (game, { resource, amount }) => {
      if (game.stats[resource] !== undefined || resource === 'energy' || resource === 'magic') {
        const maxKey = 'max' + resource.charAt(0).toUpperCase() + resource.slice(1);
        game.stats[maxKey] = (game.stats[maxKey] || 0) + amount;
      } else {
        game.limits[resource] = (game.limits[resource] || 0) + amount;
      }
    });

    registerEffect('addBuff', (game, { buffId, override }) => {
      const baseBuff = game.content.get(buffId, 'buffs');
      if (!baseBuff) return;
      const finalBuff = { ...baseBuff, ...override };
      game.activeBuffs[buffId] = {
        ...finalBuff,
        remaining: finalBuff.duration,
        total: finalBuff.duration,
      };
    });

    registerEffect('setObjective', (game, { id }) => {
      game.currentObjective = id;
    });

    registerEffect('playSound', (game, { id }) => {
      game.playSound(id);
    });

    registerEffect('log', (game, { logKey, color, params }) => {
      game.addLog(logKey, 'logs', color, params);
    });

    registerEffect('modifyResource', (game, { resource, amount }) => {
      game.resource.add(game, resource, amount);
    });

    registerEffect('setHome', (game, { id }) => {
      game.activeHome = id;
    });

    registerEffect('unlockTitle', (game, { id }) => {
      game.titles.unlockTitle(game, id);
    });
  };


  const spawnParticles = (game: GameState, action: ActionDefinition, isAutomated: boolean = false) => {
    if (isAutomated) return; // Prevention of "ghost particles" at cursor during background loops

    let pText = action.particleText ? game.t(action.particleText) : null;
    const resKey = action.yieldType || action.costType || action.counter;

    if (!pText && typeof resKey === 'string' && resKey !== 'none' && resKey !== 'mixed') {
      const translated = game.t('ui_' + resKey);
      if (translated && translated !== 'ui_' + resKey) pText = `+ ${translated}`;
    }

    if (!pText) pText = action.particleText || '';

    game.bus.emit(game.EVENTS.PARTICLE_TRIGGERED, {
      x: game.lastMouseX,
      y: game.lastMouseY,
      text: pText,
      type: action.particleType || 'energy',
    });
  };

  const handleSuccess = (game: GameState, id: ActionId, action: ActionDefinition, result: any) => {
    game.counters.totalActions++;

    if (action.counter && game.counters[action.counter] !== undefined) {
      game.counters[action.counter] = (game.counters[action.counter] || 0) + (result.yield || 1);
    }

    const satiationCost = action.satiationCost;
    if (satiationCost && satiationCost > 0) {
      game.resource.consume(game, 'satiation', satiationCost);
    }

    if (action.isStory) {
      const dialogueKey = result?.logParams?.textKey || null;
      if (dialogueKey) {
        game.story.recordStoryEntry(game, id, action, dialogueKey);
      }
    }

    game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
    if (action.particleText || action.yieldType) {
      const isAutomated = game.activeFocus === id;
      spawnParticles(game, action, isAutomated);
    }

    if (result && result.logKey) {
      game.bus.emit(game.EVENTS.LOG_ADDED, {
        id: result.logKey,
        context: 'logs',
        color: result.logColor,
        params: {
          gain: result.logGain ?? '',
          val: result.logGain ?? '',
          ...(result.logParams || {}),
        },
      });
    }

    game.bus.emit(game.EVENTS.SAVE_REQUESTED);
  };

  const handleFailure = (game: GameState, _id: ActionId, action: ActionDefinition) => {
    game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });

    const rewards = action.rewards || (action.yieldType ? { [action.yieldType]: 0 } : null);
    const fullRes = rewards ? Object.keys(rewards).find(resId => game.resource.isFull(game, resId as ResourceId)) : null;

    if (fullRes) {
      if (game.activeFocus === _id) {
        game.activeFocus = null;
        game.addLog('ui_focus_stopped', 'logs', 'var(--text-dim)');
      }
      game.bus.emit(game.EVENTS.LOG_ADDED, {
        id: 'fail_full_' + fullRes,
        color: 'var(--accent-red)',
      });
      return;
    }

    const effectiveCosts: Record<string, number> = action.costs ? { ...action.costs } : {};
    if (action.cost && action.costType && action.costType !== 'none') {
      effectiveCosts[action.costType] = (effectiveCosts[action.costType] || 0) + action.cost;
    }

    const firstMissing = Object.keys(effectiveCosts).find((r) => {
      const resId = r as ResourceId;
      return !game.resource.canAfford(game, resId, (effectiveCosts as any)[resId]);
    });

    if (firstMissing) {
      const specificKey = 'fail_' + firstMissing;
      const logKey = game.t(specificKey) !== specificKey ? specificKey : 'fail_resources';
      game.addLog(logKey, 'logs', 'var(--accent-red)');
    }

    // NEW: Auto-stop focus if the focused action fails
    if (game.activeFocus === _id) {
      game.activeFocus = null;
      game.addLog('ui_focus_stopped', 'logs', 'var(--text-dim)');
    }
  };

  const processAction = (
    game: GameState,
    id: ActionId,
    action: ActionDefinition,
    mode: string = 'full'
  ): any => {
    const isPrepare = mode === 'prepare' || mode === 'full';
    const isFinalize = mode === 'finalize' || mode === 'full';
    let totalYield = 0;
    let logGain: any = null;

    if (isPrepare) {
      if (action.requirements) {
        const met = Object.entries(action.requirements).every(([path, rule]) => {
          return checkRequirement(game, path, rule);
        });
        if (!met) return { success: false };
      }

      const costs: Record<string, number> = action.costs ? { ...action.costs } : {};
      if (action.cost && action.costType && action.costType !== 'none') {
        costs[action.costType] = (costs[action.costType] || 0) + action.cost;
      }

      // Safety Guard: Automated loops stop if satiation is too low
      if (game.activeFocus === id && game.stats.satiation < 5) {
        game.addLog('fail_satiation_loop', 'logs', 'var(--accent-red)');
        return { success: false };
      }

      if (game.activeFocus === id && costs.energy) {
        delete costs.energy;
      }

      // Satiation drain is handled centrally in resource.logic.ts during consumption of energy.
      // We don't inject it here as a hard requirement anymore.

      if (!game.resource.canAfford(game, costs)) return { success: false };

      // Check for full storage on all rewards
      const rewards = action.rewards || (action.yieldType ? { [action.yieldType]: 0 } : null);
      if (rewards) {
        const fullRes = Object.keys(rewards).find(resId => game.resource.isFull(game, resId as ResourceId));
        if (fullRes) {
          game.addLog('fail_full_' + fullRes, 'logs', 'var(--accent-red)');
          game.playSound('fail');
          return { success: false };
        }
      }

      if (action.onSuccess) {
        const buffEffect = action.onSuccess.find((e) => e.type === 'addBuff');
        if (buffEffect && buffEffect.type === 'addBuff') {
          const existing = game.activeBuffs[buffEffect.buffId];
          if (existing && existing.remaining / existing.total > 0.1) {
            game.addLog('fail_buff_active', 'logs', 'var(--accent-red)');
            game.playSound('fail');
            return { success: false };
          }
        }
      }

      if (costs && Object.keys(costs).length > 0) {
        game.resource.consume(game, costs);
      }
    }

    if (isFinalize) {
      if (action.rewards) {
        Object.entries(action.rewards).forEach(([res, amountOrKey]) => {
          let amount =
            typeof amountOrKey === 'string'
              ? game.pipeline.calculate(game, amountOrKey, 1)
              : amountOrKey;
          const finalAmount = Math.round(amount);
          const resId = res as ResourceId;
          game.resource.add(game, resId, finalAmount);

          const yieldType = action.yieldType;
          if (res === yieldType || logGain === null) {
            logGain = finalAmount;
            totalYield = finalAmount;
          }
        });
      }

      if (action.onSuccess) {
        action.onSuccess.forEach((effect) => {
          if (effectHandlers[effect.type]) {
            effectHandlers[effect.type](game, effect);
          }
        });
      }
    }

    let result = {
      success: true,
      logKey: action.logKey,
      logGain: logGain,
      logColor: action.logColor,
      yield: totalYield,
    };

    if (isFinalize && (action as any).execute) {
      const execResult = (action as any).execute(game);
      if (execResult) {
        result = { ...result, ...execResult };
      }
    }

    return result;
  };

  return {
    effectHandlers,
    registerEffect,
    initEffects,
    processAction,
    checkRequirement,
    handleSuccess,
    handleFailure,

    execute(game: GameState, id: ActionId): boolean {
      const action = game.content.get<ActionDefinition>(id, 'actions');
      if (!action) return false;

      if (id in game.activeTasks) return false;

      if (action.duration) {
        const result = processAction(game, id, action, 'prepare');
        if (result.success) {
          game.activeTasks = {
            ...game.activeTasks,
            [id]: {
              actionId: id,
              remaining: action.duration,
              total: action.duration,
            }
          };
          game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
          return true;
        }
        handleFailure(game, id, action);
        return false;
      }

      let result = processAction(game, id, action);

      if (result && result.success) {
        handleSuccess(game, id, action, result);
        return true;
      }

      handleFailure(game, id, action);
      return false;
    },

    /**
     * Attempts to execute an action with UI feedback (shake effect on failure).
     */
    attemptAction(game: GameState, el: HTMLElement, id: ActionId) {
      const now = Date.now();
      if (now - _lastActionTime < DEBOUNCE_MS) return;
      _lastActionTime = now;

      if (game.activeTasks[id]) return;
      const res = this.execute(game, id);
      if (res === false || (res && (res as any).success === false)) {
        if (el) {
          el.classList.add('btn-shake');
          setTimeout(() => el.classList.remove('btn-shake'), 400);
        }
      }
      return res;
    },

    /**
     * Toggles the "magic focus" mode for a specific action.
     */
    toggleFocus(game: GameState, id: ActionId) {
      const action = game.content.get<ActionDefinition>(id, 'actions');
      if (game.activeFocus === id) {
        game.activeFocus = null;
        (game as any).playSound('click');
      } else {
        game.activeFocus = id;
        (game as any).playSound('magic');
        if (action && action.isLoopable) {
          this.execute(game, id);
        }
      }
    },

    boot() {
      initEffects();
    },

    /**
     * Rebuilds the activeProducers list from current flags.
     * Useful after loading a game or major state changes.
     */
    rebuildProducers(game: GameState) {
      game.activeProducers = [];
      Object.keys(game.flags).forEach(f => {
        if (game.flags[f as FlagId]) {
          const action = game.content.get(f, 'actions') as ActionDefinition | null;
          if (action && action.passiveProduction) {
            game.activeProducers.push(f as ActionId);
          }
        }
      });
      console.log(`[ACTIONS] Rebuilt active producers: ${game.activeProducers.length}`);
    },

    metadata
  };
}
