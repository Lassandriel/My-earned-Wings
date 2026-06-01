/**
 * Factory for the giant gameStoreObject that lands as Alpine.store('game').
 *
 * Owns:
 *   - state slot defaults (view, hoveredAction, modals, fullscreen flag, …)
 *   - service spread (content/bus/EVENTS/persistence/audio/… via createGameServices)
 *   - the ~30 methods Alpine templates call: bootstrap, startNewGame,
 *     saveGame, addLog, setHovered, helpHover, getTooltipRequirements,
 *     toggleSidebar, toggleFullscreen, addon-helpers (addonStateFor,
 *     isAddonLoaded, getActiveAddons, toggleAddonDisabled,
 *     reenableAllAddons), and stat-getter shortcuts (energyPercent,
 *     getMaxStat, …).
 *
 * Pulled out of main.ts so the entry stays slim — main.ts now only
 * has to build deps, call createGameStoreObject, and register it.
 */

import Alpine from 'alpinejs';
import type { GameState, HoverActionData } from '../types/game';
import { GAME_VERSION } from '../generated/content';
import { makeLogger } from '../core/log';
import { initialState } from '../state';
import {
  isAddonLoaded as isAddonLoadedImpl,
  getActiveAddons as getActiveAddonsImpl,
} from '../core/addons/active';
import type { createBootSystem } from '../core/systems/boot';
import type { createGameServices } from '../engine/services';

const log = makeLogger('STORE');

export interface GameStoreDeps {
  bootSystem: ReturnType<typeof createBootSystem>;
  services: ReturnType<typeof createGameServices>['services'];
  dynamicInitialState: GameState;
}

/** The Alpine store-shaped object. Loose-typed because Alpine + the
 *  spread services widen things enough that GameState itself doesn't
 *  fit exactly. Consumers cast to GameState at use sites. */
export type GameStoreObject = Partial<GameState> & Record<string, unknown>;

/**
 * Phase 2 Stage 2: getStore() returns services.gameState (the engine-
 * owned state object) instead of Alpine.store('game'). In Stage 1 these
 * are identity-equal so the change is invisible; at cutover
 * services.gameState becomes a separate plain-data clone and every TS
 * writer that flows through this helper transparently mutates engine
 * state.
 *
 * Initial null check: services.gameState is assigned just below
 * Alpine.store('game', ...) but if a caller somehow runs before that
 * assignment, fall through to the Alpine store to avoid a null deref.
 */
const makeGetStore = (services: GameStoreDeps['services']) => (): GameState =>
  (services.gameState ?? (Alpine.store('game') as GameState));

const getSettings = (): GameState['settings'] => Alpine.store('settings') as GameState['settings'];

export function createGameStoreObject({
  bootSystem,
  services,
  dynamicInitialState,
}: GameStoreDeps): GameStoreObject {
  const getStore = makeGetStore(services);

  const store: GameStoreObject = {
    ...dynamicInitialState,
    saveInfoText: '',

    // Build-time version label (read from package.json). HTML templates
    // bind `$store.game.version` directly — no i18n key, no risk of
    // forgetting to bump it when package.json moves.
    version: GAME_VERSION,

    // UI State
    view: 'menu',
    hoveredAction: null,
    confirmModal: { open: false, message: '', onConfirm: null },
    addonCompatModal: { open: false, missing: [], added: [], versionDelta: [], _resolve: null },
    settingsOpen: false,
    lastMouseX: 0,
    lastMouseY: 0,
    currentScale: 1,
    isFullscreen: false,

    // All services (content, bus, EVENTS, bootstrapper, translations, +systems).
    // Cast to `any` because the concrete subsystem types are stricter than the
    // GameState slots they slot into (e.g. actions.effectHandlers uses GameEffect
    // discriminated unions, but the GameState alias widens to {type:string,...}).
    // The runtime objects are correct — only the structural typing diverges.
    ...(services as any),

    get settings() { return getSettings(); },

    bootstrap() {
      log.info('Unified Bootstrap Executing...');
      const s = getStore();

      s.bootstrapper.bootSystems(s);
      s.content.validate(s);
      s.persistence.loadSettings(s);
      if (s.audio) s.audio.init(s.settings);
      // juice.boot is already called by bootSystems above (it's in the
      // contentSystems list in boot.ts). Calling it again here registered
      // a second PARTICLE_TRIGGERED bus listener, so every action spawned
      // two stacked "+ Water" particles instead of one.

      // Alpine.effect tracks reads through Alpine's reactive proxy, not via
      // the engine state (which is a plain object after Phase 2 Stage 2).
      // Read from Alpine.store('game') inside the callback so the effect
      // re-fires when language / translations change.
      Alpine.effect(() => {
        const ui = Alpine.store('game') as GameState;
        document.documentElement.lang = ui.language || 'de';
        document.title = ui.t('menu_title');
      });

      if (s.settings?.calculateScale) {
        s.settings.calculateScale(s);
      }

      // Sync Fullscreen State
      document.addEventListener('fullscreenchange', () => {
        s.isFullscreen = !!document.fullscreenElement;
      });
    },

    // --- EXPLICIT DELEGATIONS ---
    startNewGame() {
      const s = getStore();
      s.viewManager.startNewGame(s, () => bootSystem.buildInitialState(initialState));
    },
    continueGame() { getStore().viewManager.continueGame(getStore()); },
    returnToMenu() { getStore().viewManager.returnToMenu(getStore()); },
    quit() { if (window.electronAPI) window.electronAPI.quitApp(); else getStore().returnToMenu(); },
    saveGame(isManual = false) {
      const s = getStore();
      s.bus.emit(s.EVENTS.SAVE_REQUESTED, { isManual });
    },
    setLanguage(lang: string) { getStore().settingsSystem.setLanguage(getStore(), lang); },
    playSound(k: string) {
      const s = getStore();
      s.bus.emit(s.EVENTS.SOUND_TRIGGERED, { key: k });
    },

    isTaskActive(id: string) { return !!getStore().activeTasks[id]; },

    /**
     * Returns the addon's namespaced state bucket, creating it on first
     * access. Idiomatic usage from addon code:
     *   const s = store.addonStateFor<{shadowEnergy: number}>('vandara');
     *   s.shadowEnergy = (s.shadowEnergy ?? 0) + 1;
     * The cast at call-site documents the addon's own schema without
     * polluting the GameState type.
     */
    addonStateFor<T extends Record<string, unknown>>(name: string): T {
      const s = getStore() as unknown as { addonState: Record<string, Record<string, unknown>> };
      if (!s.addonState) s.addonState = {};
      if (!s.addonState[name]) s.addonState[name] = {};
      return s.addonState[name] as T;
    },

    isAddonLoaded(name: string): boolean {
      return isAddonLoadedImpl(name);
    },

    /**
     * Snapshot of every active addon (core + build-time + runtime),
     * sorted by name. Recomputed on each call so the Addons settings
     * tab picks up runtime addons that arrived after Alpine boot.
     * Cheap — the underlying lists are small (<10 entries in practice).
     */
    getActiveAddons() {
      return getActiveAddonsImpl();
    },

    /**
     * Toggle whether a given addon is disabled. Persists to localStorage
     * via the settings store + saveSettings. Required addons (manifest
     * `required: true`) are refused — UI should already prevent the
     * toggle from being clicked, but we guard here too in case the call
     * came from an eval or future code path.
     *
     * Returns the new disabled state (true = now disabled, false = now
     * enabled) or null if the call was refused.
     *
     * Does NOT mutate the live registries — the change takes effect on
     * the next boot. The Addons settings view shows a "Restart required"
     * notice next to any addon whose disabled flag changed in-session.
     */
    toggleAddonDisabled(addonName: string): boolean | null {
      const s = getStore();
      const allAddons = getActiveAddonsImpl();
      const target = allAddons.find((a) => a.name === addonName);
      if (!target) {
        log.warn(`toggleAddonDisabled: unknown addon "${addonName}"`);
        return null;
      }
      if (target.required) {
        log.warn(`toggleAddonDisabled: "${addonName}" is required — refused`);
        return null;
      }
      const settings = s.settings as unknown as { disabledAddons?: string[] };
      const current = Array.isArray(settings.disabledAddons) ? settings.disabledAddons : [];
      const isDisabled = current.includes(addonName);
      settings.disabledAddons = isDisabled
        ? current.filter((n) => n !== addonName)
        : [...current, addonName];
      // Trigger a settings save so the new list reaches localStorage.
      s.bus?.emit(s.EVENTS.SETTINGS_UPDATED);
      if (typeof s.persistence?.saveSettings === 'function') {
        s.persistence.saveSettings(s);
      }
      return !isDisabled;
    },

    /**
     * Clear every disabled-addon entry — equivalent to flipping every
     * non-required addon back to "on". Useful when the player wants to
     * undo experimental toggles without restarting first. Persists via
     * the settings save path; takes effect on next boot like a per-row
     * toggle would. The Addons tab hides the button when no addons are
     * disabled so it doesn't add clutter in the common case.
     */
    reenableAllAddons(): void {
      const s = getStore();
      const settings = s.settings as unknown as { disabledAddons?: string[] };
      if (!settings.disabledAddons || settings.disabledAddons.length === 0) return;
      settings.disabledAddons = [];
      s.bus?.emit(s.EVENTS.SETTINGS_UPDATED);
      if (typeof s.persistence?.saveSettings === 'function') {
        s.persistence.saveSettings(s);
      }
    },

    addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
      const s = getStore();
      s.bus.emit(s.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
    },

    setHovered(id: string | null, extra: HoverActionData | null = null) {
      const s = getStore();
      if (id && s.hoveredAction?.id === id) return;
      if (!id) {
        s.hoveredAction = null;
      } else if (extra) {
        s.hoveredAction = { ...extra, id };
      } else {
        s.hoveredAction = { id, data: s.content.get(id) || undefined };
      }
      if (id && s.ui?.reposition) {
        s.ui.reposition(s.lastMouseX, s.lastMouseY, true);
      }
    },

    /**
     * Shortcut for the very common help-tooltip pattern. Call from a view as
     *   @mouseenter="$store.game.helpHover('cat_crafting', 'nav_crafting_desc')"
     *   @mouseleave="$store.game.setHovered(null)"
     * The two strings are translation keys (resolved via t()), not literal text.
     */
    helpHover(titleKey: string, descKey: string, hoverId: string = 'help') {
      const s = getStore();
      s.setHovered(hoverId, {
        id: hoverId,
        isHelp: true,
        title: s.t(titleKey),
        desc: s.t(descKey),
      } as HoverActionData);
    },

    getTooltipRequirements(hAction: HoverActionData) {
      const s = getStore();
      return s.ui.getRequirements(s, hAction);
    },

    // Resource & NPC Helpers
    getUsedFurnitureSpace() { return getStore().housing.getUsedFurnitureSpace(getStore()); },
    getHomeCapacity() { return getStore().housing.getHomeCapacity(getStore()); },
    // Defensive getters — these are called by Alpine while it sets up the
    // reactive store, including during property enumeration *before* the
    // subsystems (resource/story/housing/npc) have been attached. Without
    // the optional chaining, the very first enumeration crashes module
    // load and the renderer ends up stuck with x-show never evaluated.
    get energyPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'energy') ?? 0; },
    get magicPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'magic') ?? 0; },
    get satiationPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'satiation') ?? 0; },
    get maxEnergy() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'energy') ?? 0; },
    get maxMagic() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'magic') ?? 0; },
    get maxSatiation() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'satiation') ?? 0; },
    getMaxStat(id: string) { const s = getStore(); return s?.resource?.getMaxStat?.(s, id as 'energy' | 'magic' | 'satiation') ?? 0; },
    getLimit(id: string) { const s = getStore(); return s?.resource?.getLimit?.(s, id as any) ?? 0; },
    get canAccessTreeOfLife() { const s = getStore(); return s?.npc?.canAccessTreeOfLife?.(s) ?? false; },
    get groupedHistory() { const s = getStore(); return s?.story?.getGroupedHistory?.(s) ?? []; },
    get availableFurniture() { const s = getStore(); return s?.housing?.getAvailableFurniture?.(s) ?? []; },
    get placedFurnitureList() { const s = getStore(); return s?.housing?.getPlacedFurnitureList?.(s) ?? []; },
    toggleSidebar() {
      const s = getStore();
      s.sidebarCollapsed = !s.sidebarCollapsed;
      s.playSound('click');
    },

    toggleFullscreen() {
      const s = getStore();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          log.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
      s.playSound('click');
    },
  };

  return store;
}

/** Re-exported so main.ts can use the same getter consistently. */
export { makeGetStore };
