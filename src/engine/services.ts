import { Translations } from '../types/game';
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

  return { services, systems };
}

export type GameServices = ReturnType<typeof createGameServices>['services'];
