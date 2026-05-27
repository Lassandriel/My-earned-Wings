import { LOG_COLOR, ANIM, makeServiceContainer } from '../../core/constants';
import { makeLogger } from '../../core/log';

const log = makeLogger('ACTIONS');
import {
  GameState,
  ActionDefinition,
  ActionId,
  GameEffect,
  ActionResult,
  ResourceId,
  FlagId,
} from '../../types/game';
import { checkRequirement } from '../../core/systems/logicUtils';
import { CUSTOM_EXECUTE_HANDLERS } from '../../data/actions/custom-handlers';
import { registerBuiltinEffects } from './actions.effects';
import { ADDON_EFFECT_REGISTRARS } from '../../generated/addon-effects';


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

const ctx = makeServiceContainer<ActionDeps>('ACTIONS');
const svc = ctx.get;

/**
 * Action System - TypeScript Edition
 * Modular execution of player-triggered actions using EffectHandlers.
 */
export function createActionSystem() {
  const effectHandlers: Record<string, (game: GameState, effect: GameEffect) => void> = {};
  let _lastActionTime = 0;
  const DEBOUNCE_MS = 50;

  /**
   * Apply per-resource cost modifiers. For every entry in `costs`, if a
   * `<resource>_cost` modifier exists (e.g. `magic_cost`), its pipeline value
   * is added to the cost. Negative values discount; floor at 0 so actions
   * never become negative-cost / give resources.
   *
   * Adding a new cost-discountable resource is now zero-code: define a
   * modifier `<resource>_cost` in YAML with `baseValue: 0` and add sources
   * (items, titles, homes, buildings...) that contribute add: -N.
   */
  const applyCostModifiers = (game: GameState, costs: Record<string, number>): Record<string, number> => {
    const pipeline = svc().pipeline;
    const content = svc().content;
    if (!pipeline || !content) return costs;
    const out: Record<string, number> = {};
    for (const [res, amt] of Object.entries(costs)) {
      const key = `${res}_cost`;
      // silent: existence check — most resources don't have a *_cost modifier
      // and that's intentional. Only the ones that do get a discount applied.
      const def = (content as any).get?.(key, 'modifiers', true);
      if (def) {
        const delta = pipeline.calculate(game, key, 0);
        out[res] = Math.max(0, amt + delta);
      } else {
        out[res] = amt;
      }
    }
    return out;
  };

  const metadata = {
    id: 'actions',
    // Delegates removed: executeAction / attemptAction / toggleShadow on the
    // store are no longer needed — all callers now go through
    // services.commands.enqueue({ type: ..., actionId: ... }).
  };

  const registerEffect = <T extends GameEffect['type']>(
    type: T,
    handler: (game: GameState, effect: Extract<GameEffect, { type: T }>) => void
  ) => {
    effectHandlers[type] = handler as (game: GameState, effect: GameEffect) => void;
    log.debug('Registered effect handler:', type);
  };

  // Built-in handlers (setFlag / unlockNPC / unlockItem / addBuff / …) live
  // in actions.effects.ts so this file can focus on action execution flow.
  // Addon-defined effects come from src/generated/addon-effects.ts and run
  // AFTER the built-ins so an addon can override a built-in by registering
  // the same type (we warn on collision via the wrapped registerEffect).
  const initEffects = () => {
    registerBuiltinEffects(registerEffect, svc);
    // Stable, name-sorted invocation so two addons that touch the same
    // type get deterministic last-write-wins behaviour.
    for (const addonName of Object.keys(ADDON_EFFECT_REGISTRARS).sort()) {
      const registrar = ADDON_EFFECT_REGISTRARS[addonName];
      try {
        // Cast the wrapped registerEffect down — addon handlers use the
        // open `{ type: string; ... }` GameEffect variant; the strictly
        // typed built-in registerEffect accepts it via the union update.
        registrar!((type: string, handler) => {
          if (effectHandlers[type]) {
            log.warn(
              `[${addonName}] effect handler "${type}" overrides an earlier registration`,
            );
          }
          effectHandlers[type] = handler as (g: GameState, e: GameEffect) => void;
          log.debug(`[${addonName}] registered effect "${type}"`);
        });
      } catch (err) {
        log.error(`[${addonName}] effects.ts registrar threw:`, err);
      }
    }
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
    game.counters.totalActions = (game.counters.totalActions ?? 0) + 1;

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
      const isAutomated = game.activeShadow === id;
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
      if (game.activeShadow === _id) {
        game.activeShadow = null;
        svc().addLog('ui_shadow_released', 'logs', LOG_COLOR.dim);
      }
      svc().bus.emit(svc().EVENTS.LOG_ADDED, {
        id: 'fail_full_' + fullRes,
        color: LOG_COLOR.failure,
      });
      return;
    }

    const hasCosts = !!(action.costs || (action.costType && action.costType !== 'none'));
    if (!hasCosts) return;

    const rawCosts: Record<string, number> = action.costs ? { ...action.costs } : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost! } : {});
    const effectiveCosts = applyCostModifiers(game, rawCosts);

    const firstMissing = Object.keys(effectiveCosts).find((r) => {
      const amount = effectiveCosts[r] ?? 0;
      return !svc().resource.canAfford(game, r as ResourceId, amount);
    });

    if (firstMissing) {
      const specificKey = 'fail_' + firstMissing;
      const logKey = svc().t(specificKey) !== specificKey ? specificKey : 'fail_resources';
      svc().addLog(logKey, 'logs', LOG_COLOR.failure);

      // If it's a resource that scales with satiation, and efficiency is low, explain why
      const efficiency = svc().pipeline.calculate(game, 'resource_efficiency', 1);
      if (efficiency < 0.9) {
        svc().addLog('fail_low_efficiency', 'logs', LOG_COLOR.failure);
      }
    }

    // NEW: Auto-stop focus if the focused action fails
    if (game.activeShadow === _id) {
      game.activeShadow = null;
      svc().addLog('ui_shadow_released', 'logs', LOG_COLOR.dim);
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

      let costs: Record<string, number> = applyCostModifiers(
        game,
        action.costs
          ? { ...action.costs }
          : (action.costType && action.costType !== 'none' ? { [action.costType]: action.cost! } : {}),
      );

      // Safety Guard: Automated loops stop if satiation is too low
      if (game.activeShadow === id && (game.stats.satiation ?? 0) < 5) {
        svc().addLog('fail_satiation_loop', 'logs', LOG_COLOR.failure);
        return { success: false };
      }

      if (game.activeShadow === id && costs.energy) {
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
          svc().addLog('fail_full_' + fullRes, 'logs', LOG_COLOR.failure);
          svc().playSound('fail');
          return { success: false };
        }
      }

      if (action.onSuccess) {
        const buffEffect = action.onSuccess.find((e) => e.type === 'addBuff');
        if (buffEffect && buffEffect.type === 'addBuff') {
          const existing = game.activeBuffs[buffEffect.buffId];
          if (existing && existing.remaining / existing.total > 0.1) {
            svc().addLog('fail_buff_active', 'logs', LOG_COLOR.failure);
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
          const handler = effectHandlers[effect.type];
          if (handler) {
            handler(game, effect);
          } else {
            // Unknown effect type — most likely a typo, or an addon
            // that ships YAML referring to an effect type whose
            // effects.ts didn't get bundled. Loud-but-survivable:
            // log once per dispatch, skip the effect, action still
            // succeeds. Without this, addon authors used to silently
            // see their effect do nothing.
            log.warn(`Unknown effect type "${effect.type}" — skipped`);
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

    if (isFinalize) {
      // Inline TS execute() — used by hand-written ActionDefinitions.
      if ('execute' in action && typeof (action as any).execute === 'function') {
        const execResult = (action as any).execute(game);
        if (execResult) {
          result = { ...result, ...(execResult as object) };
        }
      }
      // YAML-driven customExecute — looks up handler in CUSTOM_EXECUTE_HANDLERS.
      const customName = (action as any).customExecute;
      if (typeof customName === 'string') {
        const handler = CUSTOM_EXECUTE_HANDLERS[customName];
        if (handler) {
          const execResult = handler(game, id);
          if (execResult && typeof execResult === 'object') {
            result = { ...result, ...(execResult as object) };
          }
        } else if (typeof console !== 'undefined') {
          log.warn(`Unknown customExecute handler: '${customName}' on '${id}'`);
        }
      }
    }

    return result;
  };

  return {
    setServices: ctx.set,

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
    attemptAction(game: GameState, el: HTMLElement, id: ActionId): boolean {
      const now = Date.now();
      if (now - _lastActionTime < DEBOUNCE_MS) return false;
      _lastActionTime = now;

      if (game.activeTasks[id]) return false;
      const res = this.execute(game, id);
      if (res === false) {
        if (el) {
          el.classList.add('btn-shake');
          setTimeout(() => el.classList.remove('btn-shake'), ANIM.shake);
        }
      }
      return res !== false;
    },

    /**
     * Toggles a bound-shadow on a specific action. Replaces the
     * older "arcane focus" framing: a shadow does the action for
     * you while you do other things; magic drains continuously
     * via tickShadow.
     */
    toggleShadow(game: GameState, id: ActionId) {
      const action = svc().content.get<ActionDefinition>(id, 'actions');
      if (game.activeShadow === id) {
        game.activeShadow = null;
        svc().playSound('click');
      } else {
        game.activeShadow = id;
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
      log.debug('Rebuilt active producers:', game.activeProducers.length);
    },

    metadata
  };
}
