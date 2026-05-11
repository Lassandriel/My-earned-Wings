import {
  GameState,
  ActionDefinition,
  ResourceId,
  FlagId,
  GameEffect,
  ActionId,
  NPCDefinition,
  ItemDefinition,
  ActionResult,
} from '../../types/game';
import { checkRequirement } from '../../core/systems/logicUtils';

/**
 * Services the action system depends on. Injected via setServices()
 * during boot so action methods can keep `state` parameters pure data.
 */
interface ActionDeps {
  bus: GameState['bus'];
  EVENTS: GameState['EVENTS'];
  content: GameState['content'];
  pipeline: GameState['pipeline'];
  resource: GameState['resource'];
  titles: GameState['titles'];
  collection: GameState['collection'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  t: GameState['t'];
}

let _deps: ActionDeps | null = null;
const svc = (): ActionDeps => {
  if (!_deps) throw new Error('[ACTIONS] services not bound — call setServices() during boot.');
  return _deps;
};

/**
 * Action System - TypeScript Edition
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
  const effectHandlers: Record<string, (game: GameState, effect: GameEffect) => void> = {};
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
    effectHandlers[type] = handler as (game: GameState, effect: GameEffect) => void;
    console.log(`[ACTIONS] Registered effect handler: ${type}`);
  };

  const initEffects = () => {
    registerEffect('setFlag', (game, { flag, value }) => {
      game.flags[flag] = value;
      svc().pipeline.invalidateCache();
      svc().resource.invalidateCache();
      
      // Update active producers if the flag corresponds to a producer action
      const action = svc().content.get(flag as string, 'actions') as ActionDefinition | null;
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
        const npc = svc().content.get<NPCDefinition>(id, 'npcs');
        const name = npc ? svc().t(npc.nameKey) : id;
        svc().addLog('reward_unlock_npc', 'logs', 'var(--gold)', { name });
      }
    });

    registerEffect('unlockRecipe', (game, { id }) => {
      if (!game.unlockedRecipes.includes(id)) {
        game.unlockedRecipes = [...game.unlockedRecipes, id];
        const actionDef = svc().content.get<ActionDefinition>(id, 'actions');
        const title = actionDef?.title ? svc().t(actionDef.title, 'actions') : id;
        svc().addLog('reward_unlock_recipe', 'logs', 'var(--gold)', { title });
      }
    });

    registerEffect('unlockItem', (game, { id }) => {
      if (!game.discoveredItems.includes(id)) {
        game.discoveredItems = [...game.discoveredItems, id];
        const item = svc().content.get<ItemDefinition>(id, 'items');
        const title = item ? svc().t(item.title, 'items') : id;
        svc().addLog('reward_unlock_item', 'logs', 'var(--gold)', { title });
      }
      game.flags[id as FlagId] = true;
      svc().pipeline.invalidateCache();
      svc().resource.invalidateCache();
    });

    registerEffect('modifyLimit', (game, { resource, amount }) => {
      const resId = resource as ResourceId;
      if (game.stats[resId] !== undefined || resId === 'energy' || resId === 'magic') {
        const maxKey = 'max' + resId.charAt(0).toUpperCase() + resId.slice(1);
        game.stats[maxKey] = (game.stats[maxKey] || 0) + amount;
      } else {
        game.limits[resId] = (game.limits[resId] || 0) + amount;
      }
      if (game.pipeline) svc().pipeline.invalidateCache();
      if (game.resource) svc().resource.invalidateCache();
    });

    registerEffect('addBuff', (game, { buffId, override }) => {
      const baseBuff = svc().content.get<{ duration: number; title: string; desc: string; [key: string]: unknown }>(buffId, 'buffs');
      if (!baseBuff) return;
      const finalBuff = { ...baseBuff, ...override };
      game.activeBuffs[buffId] = {
        ...finalBuff,
        id: buffId,
        title: (finalBuff.title as string) || buffId,
        desc: (finalBuff.desc as string) || '',
        remaining: (finalBuff.duration as number) || 0,
        total: (finalBuff.duration as number) || 0,
      };
      svc().pipeline.invalidateCache();
      svc().resource.invalidateCache();
    });

    registerEffect('setObjective', (game, { id }) => {
      game.currentObjective = id;
    });

    registerEffect('playSound', (_game, { id }) => {
      svc().playSound(id);
    });

    registerEffect('log', (_game, { logKey, color, params }) => {
      svc().addLog(logKey, 'logs', color, params);
    });

    registerEffect('modifyResource', (game, { resource, amount }) => {
      svc().resource.add(game, resource, amount);
    });

    registerEffect('setHome', (game, { id }) => {
      game.activeHome = id;
      svc().pipeline.invalidateCache();
      svc().resource.invalidateCache();
    });

    registerEffect('unlockTitle', (game, { id }) => {
      svc().titles.unlockTitle(game, id);
      if (game.pipeline) svc().pipeline.invalidateCache();
      if (game.resource) svc().resource.invalidateCache();
    });
  };


  const spawnParticles = (game: GameState, action: ActionDefinition, isAutomated: boolean = false) => {
    if (isAutomated) return; // Prevention of "ghost particles" at cursor during background loops

    let pText = action.particleText ? svc().t(action.particleText) : null;
    const resKey = action.yieldType || action.costType || action.counter;

    if (!pText && typeof resKey === 'string' && resKey !== 'none' && resKey !== 'mixed') {
      const translated = svc().t('ui_' + resKey);
      if (translated && translated !== 'ui_' + resKey) pText = `+ ${translated}`;
    }

    if (!pText) pText = action.particleText || '';

    svc().bus.emit(svc().EVENTS.PARTICLE_TRIGGERED, {
      x: game.lastMouseX,
      y: game.lastMouseY,
      text: pText,
      type: action.particleType || 'energy',
    });
  };

  const handleSuccess = (game: GameState, id: ActionId, action: ActionDefinition, result: ActionResult) => {
    game.counters.totalActions++;

    if (action.maxCount) {
      game.counters[id] = (game.counters[id] || 0) + 1;
    }

    if (action.counter && game.counters[action.counter] !== undefined) {
      game.counters[action.counter] = (game.counters[action.counter] || 0) + (result.yield || 1);
    }

    const satiationCost = action.satiationCost;
    if (satiationCost && satiationCost > 0) {
      svc().resource.consume(game, 'satiation', satiationCost);
    }

    if (action.isStory) {
      const dialogueKey = (result?.logParams?.textKey as string) || null;
      if (dialogueKey) {
        svc().collection.recordCollectionEntry(game, id, action, dialogueKey);
      }
    }

    svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
    if (action.particleText || action.yieldType) {
      const isAutomated = game.activeFocus === id;
      spawnParticles(game, action, isAutomated);
    }

    if (result && result.logKey) {
      svc().bus.emit(svc().EVENTS.LOG_ADDED, {
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

    svc().bus.emit(svc().EVENTS.SAVE_REQUESTED);
  };

  const handleFailure = (game: GameState, _id: ActionId, action: ActionDefinition) => {
    svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: 'fail' });

    const rewards = action.rewards || (action.yieldType ? { [action.yieldType]: 0 } : null);
    const fullRes = rewards ? Object.keys(rewards).find(resId => svc().resource.isFull(game, resId as ResourceId)) : null;

    if (fullRes) {
      if (game.activeFocus === _id) {
        game.activeFocus = null;
        svc().addLog('ui_focus_stopped', 'logs', 'var(--text-dim)');
      }
      svc().bus.emit(svc().EVENTS.LOG_ADDED, {
        id: 'fail_full_' + fullRes,
        color: 'var(--accent-red)',
      });
      return;
    }

    const hasCosts = !!(action.costs || (action.costType && action.costType !== 'none'));
    if (!hasCosts) return;

    const effectiveCosts: Record<string, number> = action.costs ? { ...action.costs } : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost! } : {});

    const firstMissing = Object.keys(effectiveCosts).find((r) => {
      const amount = effectiveCosts[r] ?? 0;
      return !svc().resource.canAfford(game, r as ResourceId, amount);
    });

    if (firstMissing) {
      const specificKey = 'fail_' + firstMissing;
      const logKey = svc().t(specificKey) !== specificKey ? specificKey : 'fail_resources';
      svc().addLog(logKey, 'logs', 'var(--accent-red)');

      // If it's a resource that scales with satiation, and efficiency is low, explain why
      const efficiency = svc().pipeline.calculate(game, 'resource_efficiency', 1);
      if (efficiency < 0.9) {
        svc().addLog('fail_low_efficiency', 'logs', 'var(--accent-red)');
      }
    }

    // NEW: Auto-stop focus if the focused action fails
    if (game.activeFocus === _id) {
      game.activeFocus = null;
      svc().addLog('ui_focus_stopped', 'logs', 'var(--text-dim)');
    }
  };

  const processAction = (
    game: GameState,
    id: ActionId,
    action: ActionDefinition,
    mode: string = 'full'
  ): ActionResult => {
    const isPrepare = mode === 'prepare' || mode === 'full';
    const isFinalize = mode === 'finalize' || mode === 'full';
    let totalYield = 0;
    let logGain: number | null = null;

    if (isPrepare) {
      if (action.requirements) {
        const met = Object.entries(action.requirements).every(([path, rule]) => {
          return checkRequirement(game, path, rule);
        });
        if (!met) return { success: false };
      }

      // Max Count Check
      if (action.maxCount && (game.counters[id] || 0) >= action.maxCount) {
        return { success: false };
      }

      let costs: Record<string, number> = action.costs 
        ? { ...action.costs } 
        : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost! } : {});

      // Safety Guard: Automated loops stop if satiation is too low
      if (game.activeFocus === id && game.stats.satiation < 5) {
        svc().addLog('fail_satiation_loop', 'logs', 'var(--accent-red)');
        return { success: false };
      }

      if (game.activeFocus === id && costs.energy) {
        delete costs.energy;
      }

      // Satiation drain is handled centrally in resource.logic.ts during consumption of energy.
      // We don't inject it here as a hard requirement anymore.

      if (!svc().resource.canAfford(game, costs)) return { success: false };

      // Check for full storage on all rewards
      const rewards = action.rewards || (action.yieldType ? { [action.yieldType]: 0 } : null);
      if (rewards) {
        const fullRes = Object.keys(rewards).find(resId => svc().resource.isFull(game, resId as ResourceId));
        if (fullRes) {
          svc().addLog('fail_full_' + fullRes, 'logs', 'var(--accent-red)');
          svc().playSound('fail');
          return { success: false };
        }
      }

      if (action.onSuccess) {
        const buffEffect = action.onSuccess.find((e) => e.type === 'addBuff');
        if (buffEffect && buffEffect.type === 'addBuff') {
          const existing = game.activeBuffs[buffEffect.buffId];
          if (existing && existing.remaining / existing.total > 0.1) {
            svc().addLog('fail_buff_active', 'logs', 'var(--accent-red)');
            svc().playSound('fail');
            return { success: false };
          }
        }
      }

      if (costs && Object.keys(costs).length > 0) {
        svc().resource.consume(game, costs);
      }
    }

    if (isFinalize) {
      if (action.rewards) {
        Object.entries(action.rewards).forEach(([res, amountOrKey]) => {
          let amount =
            typeof amountOrKey === 'string'
              ? svc().pipeline.calculate(game, amountOrKey, 1)
              : amountOrKey;
          const finalAmount = Math.round(amount);
          const resId = res as ResourceId;
          svc().resource.add(game, resId, finalAmount);

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

    if (isFinalize && 'execute' in action && typeof action.execute === 'function') {
      const execResult = action.execute(game);
      if (execResult) {
        result = { ...result, ...execResult };
      }
    }

    return result;
  };

  return {
    setServices(deps: ActionDeps) {
      _deps = deps;
    },

    effectHandlers,
    registerEffect,
    initEffects,
    processAction,
    checkRequirement,
    handleSuccess,
    handleFailure,

    execute(game: GameState, id: ActionId): boolean {
      const action = svc().content.get<ActionDefinition>(id, 'actions');
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
          svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: action.sfx || 'click' });
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
      if (res === false) {
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
      const action = svc().content.get<ActionDefinition>(id, 'actions');
      if (game.activeFocus === id) {
        game.activeFocus = null;
        svc().playSound('click');
      } else {
        game.activeFocus = id;
        svc().playSound('magic');
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
          const action = svc().content.get(f, 'actions') as ActionDefinition | null;
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
