import { LOG_COLOR, invalidateCaches } from '../../core/constants';
import {
  GameState,
  ActionDefinition,
  ResourceId,
  FlagId,
  GameEffect,
  ActionId,
  NPCDefinition,
  ItemDefinition,
} from '../../types/game';

/**
 * Built-in effect handlers for the action system.
 *
 * Pulled out of actions.logic.ts so the main file can focus on
 * action-execution flow. The handlers themselves are pure-ish — each takes
 * the live game state plus the typed effect payload, mutates state, and
 * calls back into the injected services via `svc()`.
 *
 * To add a new effect:
 *   1. Add the variant to GameEffect in types/game.ts
 *   2. Register it in registerBuiltinEffects() below
 *   3. (Optional) Add a unit test in actions.logic.test.ts
 *
 * Custom-execute handlers (per-action TS bridges declared in YAML via
 * `customExecute: <handler>`) live in src/data/actions/custom-handlers.ts
 * instead — those are content-specific, not engine built-ins.
 */
export interface EffectDeps {
  content: GameState['content'];
  resource: GameState['resource'];
  titles: GameState['titles'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  t: GameState['t'];
}

/** Strongly-typed wrapper around effectHandlers[type] = handler */
export type RegisterEffect = <T extends GameEffect['type']>(
  type: T,
  handler: (game: GameState, effect: Extract<GameEffect, { type: T }>) => void,
) => void;

/**
 * Wires the built-in effect handlers onto the registry passed in. Called
 * once at boot from actions.logic.ts after the service container is
 * primed.
 */
export function registerBuiltinEffects(
  registerEffect: RegisterEffect,
  svc: () => EffectDeps,
): void {
  registerEffect('setFlag', (game, { flag, value }) => {
    game.flags[flag] = value;
    invalidateCaches(svc());

    // Update active producers if the flag corresponds to a producer action
    const action = svc().content.get(flag as string, 'actions') as ActionDefinition | null;
    if (action && action.passiveProduction) {
      if (value && !game.activeProducers.includes(flag as ActionId)) {
        game.activeProducers.push(flag as ActionId);
      } else if (!value) {
        game.activeProducers = game.activeProducers.filter((id) => id !== flag);
      }
    }
  });

  registerEffect('unlockNPC', (game, { id }) => {
    if (!game.unlockedNPCs.includes(id)) {
      game.unlockedNPCs = [...game.unlockedNPCs, id];
      const npc = svc().content.get<NPCDefinition>(id, 'npcs');
      const name = npc ? svc().t(npc.nameKey) : id;
      svc().addLog('reward_unlock_npc', 'logs', LOG_COLOR.notable, { name });
    }
  });

  registerEffect('unlockRecipe', (game, { id }) => {
    if (!game.unlockedRecipes.includes(id)) {
      game.unlockedRecipes = [...game.unlockedRecipes, id];
      const actionDef = svc().content.get<ActionDefinition>(id, 'actions');
      const title = actionDef?.title ? svc().t(actionDef.title, 'actions') : id;
      svc().addLog('reward_unlock_recipe', 'logs', LOG_COLOR.notable, { title });
    }
  });

  registerEffect('unlockItem', (game, { id }) => {
    if (!game.discoveredItems.includes(id)) {
      game.discoveredItems = [...game.discoveredItems, id];
      const item = svc().content.get<ItemDefinition>(id, 'items');
      const title = item ? svc().t(item.title, 'items') : id;
      svc().addLog('reward_unlock_item', 'logs', LOG_COLOR.notable, { title });
    }
    game.flags[id as FlagId] = true;
    invalidateCaches(svc());
  });

  registerEffect('modifyLimit', (game, { resource, amount }) => {
    const resId = resource as ResourceId;
    if (game.stats[resId] !== undefined || resId === 'energy' || resId === 'magic') {
      const maxKey = 'max' + resId.charAt(0).toUpperCase() + resId.slice(1);
      game.stats[maxKey] = (game.stats[maxKey] || 0) + amount;
    } else {
      game.limits[resId] = (game.limits[resId] || 0) + amount;
    }
    invalidateCaches(svc());
  });

  registerEffect('addBuff', (game, { buffId, override }) => {
    const baseBuff = svc().content.get<{
      duration: number;
      title: string;
      desc: string;
      [key: string]: unknown;
    }>(buffId, 'buffs');
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
    invalidateCaches(svc());
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
    invalidateCaches(svc());
  });

  registerEffect('unlockTitle', (game, { id }) => {
    svc().titles.unlockTitle(game, id);
    invalidateCaches(svc());
  });
}
