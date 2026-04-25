import {
  GameState,
  ActionDefinition,
  ResourceId,
  FlagId,
  GameEffect,
  ActionId,
} from '../../types/game';
import { checkRequirement } from '../../core/logicUtils';

/**
 * Action System - TypeScript Edition
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
  const effectHandlers: Record<string, (game: GameState, effect: any) => void> = {};

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

    if (action.counter) {
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

    const yieldType = action.yieldType;
    if (yieldType && game.resource.isFull(game, yieldType)) {
      game.bus.emit(game.EVENTS.LOG_ADDED, {
        id: 'fail_full_' + yieldType,
        color: 'var(--accent-red)',
      });
      return;
    }

    const costType = action.costType;
    if (!costType || costType === 'none') return;

    const effectiveCosts = costType === 'mixed' ? action.costs! : { [costType]: action.cost! };

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

      let costs: Record<string, number> =
        action.costType === 'mixed'
          ? { ...action.costs }
          : action.costType && action.costType !== 'none'
            ? { [action.costType]: action.cost! }
            : {};

      // Safety Guard: Automated loops stop if satiation is too low
      if (game.activeFocus === id && game.stats.satiation < 5) {
        game.addLog('fail_satiation_loop', 'logs', 'var(--accent-red)');
        return { success: false };
      }

      if (game.activeFocus === id && costs.energy) {
        delete costs.energy;
      }

      const isPhysical =
        action.costType === 'energy' ||
        (action.costType === 'mixed' && action.costs && action.costs.energy);
      if (isPhysical) {
        costs.satiation = (costs.satiation || 0) + 1;
      }

      if (!game.resource.canAfford(game, costs)) return { success: false };

      const yieldType = action.yieldType;
      if (yieldType && game.resource.isFull(game, yieldType)) {
        game.addLog('fail_full_' + yieldType, 'logs', 'var(--accent-red)');
        game.playSound('fail');
        return { success: false };
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
          game.activeTasks[id] = {
            actionId: id,
            remaining: action.duration,
            total: action.duration,
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
  };
}
