import { GameState, Translations } from '../types/game';
import { createEventBus, GAME_EVENTS } from '../core/events/bus';
import { createContentService } from '../core/services/content';
import { createBootSystem } from '../core/systems/boot';
import { getSystems } from '../core/systems/registry';
import { registries } from '../data';
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

  const services = {
    commands: createCommandQueue(),
    content: createContentService(registries),
    bus: createEventBus(),
    EVENTS: GAME_EVENTS,
    bootstrapper: opts.bootSystem,
    translations: opts.translations,
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

  // t needs the current state (for `language`); look it up via Alpine at call time.
  const tShim: GameState['t'] = (key: string, context?: string, params?: any) => {
    const store = (typeof window !== 'undefined' && (window as any).Alpine)
      ? (window as any).Alpine.store('game')
      : null;
    return (systems.i18n as any).t(store, key, context, params);
  };

  const saveGameShim: GameState['saveGame'] = (isManual = false) => {
    services.bus.emit(services.EVENTS.SAVE_REQUESTED, { isManual });
  };

  if (typeof (systems.resource as any).setServices === 'function') {
    (systems.resource as any).setServices({
      bus: services.bus,
      EVENTS: services.EVENTS,
      content: services.content,
      pipeline: (services as any).pipeline,
      addLog: addLogShim,
    });
  }

  if (typeof (systems.actions as any).setServices === 'function') {
    (systems.actions as any).setServices({
      bus: services.bus,
      EVENTS: services.EVENTS,
      content: services.content,
      pipeline: (services as any).pipeline,
      resource: (services as any).resource,
      titles: (services as any).titles,
      collection: (services as any).collection,
      addLog: addLogShim,
      playSound: playSoundShim,
      t: tShim,
    });
  }

  if (typeof (systems.titles as any).setServices === 'function') {
    (systems.titles as any).setServices({
      content: services.content,
      actions: (services as any).actions,
      addLog: addLogShim,
      playSound: playSoundShim,
      t: tShim,
      saveGame: saveGameShim,
    });
  }

  if (typeof (systems.item as any).setServices === 'function') {
    (systems.item as any).setServices({
      content: services.content,
      actions: (services as any).actions,
      addLog: addLogShim,
      playSound: playSoundShim,
      t: tShim,
      saveGame: saveGameShim,
    });
  }

  return { services, systems };
}

export type GameServices = ReturnType<typeof createGameServices>['services'];
