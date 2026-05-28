import { GameState, Translations } from '../types/game';
import { createEventBus, GAME_EVENTS } from '../core/events/bus';
import { createContentService } from '../core/services/content';
import { createBootSystem } from '../core/systems/boot';
import { getSystems } from '../core/systems/registry';
import { bindServices } from '../core/constants';
import { registries } from '../core/services/registries';
import { createCommandQueue } from './commands';

/**
 * Bundles every service the game uses into a single container.
 *
 * Today the container is merged into the Alpine game store so existing
 * `$store.game.bus.emit(...)` style consumers keep working. Future
 * Phase 2 steps will route engine/system code through the container
 * directly so `state` can become a pure-data object independent of
 * Alpine reactivity.
 */
export interface CreateServicesOpts {
  bootSystem: ReturnType<typeof createBootSystem>;
  dynamicInitialState: unknown;
  translations: Translations;
}

export function createGameServices(opts: CreateServicesOpts) {
  const systems = getSystems(opts.dynamicInitialState);

  // gameState is filled in by main.ts after Alpine.store('game', ...) registers,
  // so the engine reads it through services.gameState rather than calling
  // Alpine.store('game') directly. Stage 1 of Phase 2 Step 8 — Stage 2 will
  // point this at a separate plain-data object and add UISync forwarding.
  const services = {
    commands: createCommandQueue(),
    content: createContentService(registries),
    bus: createEventBus(),
    EVENTS: GAME_EVENTS,
    bootstrapper: opts.bootSystem,
    translations: opts.translations,
    gameState: null as unknown as GameState,
    ...systems,
  };

  // Late-bind services into systems that injected dependencies via closure.
  // Several "services" are really store methods (addLog, playSound, t, saveGame).
  // We can't reference store.* at this point because the Alpine store isn't
  // registered yet — so we wire each via a tiny shim that fans out through
  // the bus / runs the underlying system at call time.

  const addLogShim: GameState['addLog'] = (id, context = 'logs', color = null, params = {}) => {
    services.bus.emit(services.EVENTS.LOG_ADDED, { id, context, color, params });
  };

  const playSoundShim: GameState['playSound'] = (key: string) => {
    services.bus.emit(services.EVENTS.SOUND_TRIGGERED, { key });
  };

  // t needs the current state (for `language`); read it through services.gameState
  // so it tracks the engine-owned state after Phase 2 Stage 2 cutover. Falls
  // back to Alpine if services.gameState hasn't been assigned yet (early boot).
  const tShim: GameState['t'] = (key: string, context?: string, params?: any) => {
    const store =
      services.gameState ??
      ((typeof window !== 'undefined' && (window as any).Alpine)
        ? (window as any).Alpine.store('game')
        : null);
    return systems.i18n.t(store, key, context, params);
  };

  const saveGameShim: GameState['saveGame'] = (isManual = false) => {
    services.bus.emit(services.EVENTS.SAVE_REQUESTED, { isManual });
  };

  // Wire each subsystem to its dependencies via the shared bindServices()
  // helper. Order doesn't matter — every module reads its deps lazily.
  bindServices(systems.resource, {
    bus: services.bus,
    EVENTS: services.EVENTS,
    content: services.content,
    pipeline: services.pipeline,
    addLog: addLogShim,
  });

  bindServices(systems.actions, {
    bus: services.bus,
    EVENTS: services.EVENTS,
    content: services.content,
    pipeline: services.pipeline,
    resource: services.resource,
    titles: services.titles,
    collection: services.collection,
    addLog: addLogShim,
    playSound: playSoundShim,
    t: tShim,
  });

  bindServices(systems.titles, {
    content: services.content,
    actions: services.actions,
    addLog: addLogShim,
    playSound: playSoundShim,
    t: tShim,
    saveGame: saveGameShim,
  });

  bindServices(systems.item, {
    content: services.content,
    actions: services.actions,
    addLog: addLogShim,
    playSound: playSoundShim,
    t: tShim,
    saveGame: saveGameShim,
  });

  bindServices(systems.settingsSystem, {
    ui: services.ui,
    playSound: playSoundShim,
    t: tShim,
    saveGame: saveGameShim,
  });

  bindServices(systems.prologue, {
    collection: services.collection,
    addLog: addLogShim,
    playSound: playSoundShim,
    getLogStore: () => {
      const Alpine = (typeof window !== 'undefined' && (window as any).Alpine) || null;
      return Alpine ? Alpine.store('logs') : { list: [] };
    },
  });

  bindServices(systems.collection, {
    bus: services.bus,
    EVENTS: services.EVENTS,
    content: services.content,
    t: tShim,
  });

  bindServices(systems.npc, {
    bus: services.bus,
    EVENTS: services.EVENTS,
    content: services.content,
    actions: services.actions,
    resource: services.resource,
    addLog: addLogShim,
  });

  bindServices(systems.housing, {
    content: services.content,
    pipeline: services.pipeline,
    resource: services.resource,
    ui: services.ui,
    addLog: addLogShim,
    playSound: playSoundShim,
    t: tShim,
    saveGame: saveGameShim,
  });

  return { services, systems };
}

export type GameServices = ReturnType<typeof createGameServices>['services'];
