import { makeServiceContainer } from '../../core/constants';
import { GameState } from '../../types/game';

interface SettingsDeps {
  ui: GameState['ui'];
  playSound: GameState['playSound'];
  t: GameState['t'];
  saveGame: GameState['saveGame'];
}

const ctx = makeServiceContainer<SettingsDeps>('SETTINGS');
const svc = ctx.get;

/**
 * Settings System - TypeScript Edition
 * Handles resolution, scaling, language, and system actions.
 */
export const createSettingsSystem = () => {
  return {
    metadata: {
      id: 'settingsSystem',
      delegates: {
        setLanguage: 'setLanguage',
        applyCheats: 'applyCheats',
      },
    },

    setServices: ctx.set,

    /**
     * Changes the window resolution (Electron only).
     */
    setResolution(store: GameState, res: string) {
      store.settings.resolution = res;
      if (res === 'auto') return;

      const parts = res.split('x');
      const w = parseInt(parts[0]);
      const h = parseInt(parts[1]);

      if (w && h && window.electronAPI) {
        window.electronAPI.resizeWindow(w, h);
      }
    },

    /**
     * Switches the game language and saves.
     */
    setLanguage(store: GameState, lang: string) {
      store.language = lang;
      svc().saveGame();
    },

    /**
     * Toggles the settings modal visibility.
     */
    toggleSettings(store: GameState) {
      store.settingsOpen = !store.settingsOpen;
      const ui = svc().ui;
      if (!store.settingsOpen && ui && ui.cleanupHover) {
        ui.cleanupHover(store);
      }
      svc().playSound('click');
    },

    /**
     * Development cheats for testing.
     */
    applyCheats(store: GameState) {
      store.stats.energy = 9999;
      store.stats.maxEnergy = 9999;
      store.stats.magic = 9999;
      store.stats.maxMagic = 9999;
      store.stats.satiation = 9999;
      store.stats.maxSatiation = 9999;
      store.stats.shards = 99999;

      Object.keys(store.limits).forEach((k) => (store.limits[k as import('../../types/game').ResourceId] = 9999));
      Object.keys(store.resources).forEach((k) => (store.resources[k as import('../../types/game').ResourceId] = 9999));

      svc().saveGame();
      svc().ui.showToast(svc().t('ui_cheat_toast'), 'success');
      store.settingsOpen = false;
    },
  };
};
