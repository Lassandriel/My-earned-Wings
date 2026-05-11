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
  // The store also exposes `addLog` as a method, but that's only available
  // once the gameStoreObject is registered — so we wire it via a tiny shim
  // that re-emits LOG_ADDED through the bus we already have.
  const addLogShim: GameState['addLog'] = (id, context = 'logs', color = null, params = {}) => {
    services.bus.emit(services.EVENTS.LOG_ADDED, { id, context, color, params });
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
      playSound: (id: string) => services.bus.emit(services.EVENTS.SOUND_TRIGGERED, { key: id }),
      t: (services as any).i18n?.t ?? ((k: string) => k),
    });
  }

  return { services, systems };
}

export type GameServices = ReturnType<typeof createGameServices>['services'];
