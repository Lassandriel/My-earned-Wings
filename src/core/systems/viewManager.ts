import { LOG_COLOR } from '../constants';
import Alpine from 'alpinejs';
import { GameState } from '../../types/game';
import { makeLogger } from '../log';

const log = makeLogger('VIEW');

/**
 * View Manager System - Draconia Core 3.5 - TypeScript Edition
 * Handles scene transitions, state resets, and confirmation modals.
 */
export const createViewManagerSystem = () => ({
  metadata: {
    id: 'viewManager',
    delegates: [
      'continueGame', 'finishPrologue',
      'confirmName', 'resolveConfirm', 'hardReset',
      'returnToMenu', 'completeDemo',
      'requestAddonCompatConfirm', 'resolveAddonCompat'
    ]
  },
  /** Keys excluded from state reset so player preferences are preserved. */
  RESET_EXCLUDES: new Set([
    'settings',
    'language',
    'prologueStep',
    'hasSave',
    'view',
    'confirmModal',
    'addonCompatModal',
  ]),

  _doStartNewGame(store: GameState, buildInitialState: () => any) {
    log.info('Starting new game, resetting state...');

    const cleanState = buildInitialState();
    localStorage.removeItem('wings_save');

    store.prologueStep = 1;
    (Alpine.store('logs') as { clear: () => void }).clear();
    store.hasSave = false;

    Object.keys(cleanState).forEach((key) => {
      if (!this.RESET_EXCLUDES.has(key)) {
        const val = cleanState[key];
        // If it's a function, we want to keep the one from the prototype/cleanState if possible,
        // but Alpine stores usually keep their own methods. We only reset data.
        if (typeof val !== 'function') {
          (store as unknown as Record<string, unknown>)[key] = Array.isArray(val) ? [...val] : (typeof val === 'object' && val !== null ? JSON.parse(JSON.stringify(val)) : val);
        }
      }
    });

    store.view = 'prologue';

    if (store.prologue && typeof store.prologue.playIntro === 'function') {
      store.prologue.playIntro(store);
    } else {
      store.addLog('intro_1', 'logs', LOG_COLOR.success);
    }

    try {
      store.audio?.startMusic();
    } catch {
      log.warn('Music failed to start');
    }
    store.saveGame();
  },

  startNewGame(store: GameState, buildInitialState: () => any) {
    store.playSound('click');
    if (store.hasSave) {
      this.showConfirm(store, store.t('confirm_reset', 'ui'), () => {
        this._doStartNewGame(store, buildInitialState);
      });
    } else {
      this._doStartNewGame(store, buildInitialState);
    }
  },

  /** Shows a styled in-game confirm dialog. Callback is called only on confirmation. */
  showConfirm(store: GameState, message: string, onConfirm: () => void) {
    store.confirmModal = { open: true, message, onConfirm };
  },

  /** Resolves the confirm dialog. Called from the confirm.html template. */
  resolveConfirm(store: GameState, confirmed: boolean) {
    store.playSound('click');
    const cb = store.confirmModal.onConfirm;
    store.confirmModal = { open: false, message: '', onConfirm: null };
    if (confirmed && typeof cb === 'function') cb();
  },

  /**
   * Open the addon-compatibility modal with a report and return a
   * Promise that resolves to the player's choice. Used by the load
   * path to block the load until the player decides. Multiple calls
   * while the modal is open would clobber `_resolve`; we guard against
   * that by only opening if not already open, returning a resolved
   * `true` for nested calls so they don't deadlock the load flow.
   */
  requestAddonCompatConfirm(
    store: GameState,
    report: {
      missing: Array<{ name: string; version: string }>;
      added: Array<{ name: string; version: string; source: 'build' | 'runtime' }>;
      versionDelta: Array<{ name: string; saved: string; loaded: string }>;
    },
  ): Promise<boolean> {
    if (store.addonCompatModal.open) {
      log.warn('addon-compat modal already open — auto-resolving nested request to "yes"');
      return Promise.resolve(true);
    }
    return new Promise<boolean>((resolve) => {
      store.addonCompatModal = {
        open: true,
        missing: report.missing.map((m) => ({ name: m.name, version: m.version })),
        added: report.added.map((a) => ({ name: a.name, version: a.version, source: a.source })),
        versionDelta: report.versionDelta.map((d) => ({ ...d })),
        _resolve: resolve,
      };
    });
  },

  /** Resolve the addon-compat modal. Called from the modal's buttons. */
  resolveAddonCompat(store: GameState, loadAnyway: boolean) {
    store.playSound('click');
    const resolve = store.addonCompatModal._resolve;
    store.addonCompatModal = {
      open: false,
      missing: [],
      added: [],
      versionDelta: [],
      _resolve: null,
    };
    if (typeof resolve === 'function') resolve(loadAnyway);
  },

  /** Triggers a styled confirm before performing a hard reset. */
  hardReset(store: GameState) {
    this.showConfirm(store, store.t('confirm_reset', 'ui'), () => {
      store.persistence.doHardReset(store);
    });
  },

  async continueGame(store: GameState) {
    store.playSound('click');
    const ok = await store.persistence.loadGame(store);
    if (ok) {
      store.view = 'main';
      if (store.audio) store.audio.startMusic();

      // --- AUTO-RESUME SHADOW: If a shadow was bound when the save
      // was written, restart its automation loop on load. ---
      if (store.activeShadow) {
        setTimeout(() => {
          if (store.activeShadow && store.commands) {
            store.commands.enqueue({ type: 'executeAction', actionId: store.activeShadow });
          }
        }, 500);
      }
    }
  },

  finishPrologue(store: GameState) {
    if (store.view !== 'prologue') return;
    store.view = 'naming';
  },

  confirmName(store: GameState, name: string) {
    store.playSound('click');
    if (!name || name.trim().length === 0) return;
    store.playerName = name.trim().substring(0, 16); // Safety limit
    store.view = 'main';

    // Visual Intro
    if (store.ellie && !store.ellieIntroSeen) {
      store.ellie.showIntro(store);
      store.ellieIntroSeen = true;
    }

    store.addLog('intro_welcome', 'logs', LOG_COLOR.success);
    store.addLog('npc_dialogue_log', 'logs', LOG_COLOR.success, {
      name: store.t('npc_ellie_name'),
      text: store.t('ellie_tutorial_1', 'logs'),
    });
    store.addLog('npc_dialogue_log', 'logs', LOG_COLOR.success, {
      name: store.t('npc_ellie_name'),
      text: store.t('ellie_tutorial_2', 'logs'),
    });
    store.addLog('npc_dialogue_log', 'logs', LOG_COLOR.success, {
      name: store.t('npc_ellie_name'),
      text: store.t('ellie_tutorial_3', 'logs'),
    });
    store.saveGame();
  },

  completeDemo(store: GameState) {
    log.info('Demo completed! Preparing summary...');

    // 1. Calculate Stats
    const counters = store.counters || {};
    const totalItemsAvailable = Object.keys(store.content.registries.items || {}).length;
    const totalNpcsAvailable = Object.keys(store.content.registries.npcs || {}).length;

    store.finalStats = {
      shards: Math.round(counters.shards || 0),
      actions: counters.totalActions || 0,
      energySpent: Math.round(counters.totalEnergySpent || 0),
      npcs: store.t('ui_stat_fraction', 'ui')
        .replace('{val}', store.unlockedNPCs.length.toString())
        .replace('{max}', totalNpcsAvailable.toString()),
      items: store.t('ui_stat_fraction', 'ui')
        .replace('{val}', store.discoveredItems.length.toString())
        .replace('{max}', totalItemsAvailable.toString()),
    };

    // 2. Clear auto-loops and ongoing tasks
    (store as { isLooping?: boolean }).isLooping = false;
    store.activeShadow = null;
    store.activeTasks = {};

    // 3. Set View
    store.view = 'finale';
    store.demoCompleted = true;

    store.playSound('success');

    store.saveGame();
  },

  returnToMenu(store: GameState) {
    store.playSound('click');
    store.saveGame();
    store.view = 'menu';
    if (store.ui && store.ui.cleanupHover) store.ui.cleanupHover(store);
    if (store.audio) store.audio.startMusic();
  },
});
