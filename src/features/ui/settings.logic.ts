import { GameState } from '../../types/game';

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
        applyCheats: 'applyCheats'
      }
    },
    /**
     * Calculates and applies the UI scale based on window size or user preference.
     */
    calculateScale(store: GameState) {
      const setting = store.settings.uiScale || 'auto';

      if (setting === 'auto') {
        // Design Reference: 1440x900
        const refW = 1440;
        const refH = 900;

        const scaleW = window.innerWidth / refW;
        const scaleH = window.innerHeight / refH;

        // Fluid scaling with a slightly protective clamp
        const baseScale = Math.min(scaleW, scaleH);
        store.currentScale = Math.max(0.65, Math.min(1.2, baseScale));
      } else {
        store.currentScale = parseFloat(setting) || 1;
      }

      document.documentElement.style.setProperty(
        '--app-scale',
        store.currentScale.toString()
      );
    },


    /**
     * Changes the window resolution (Electron only).
     */
    setResolution(store: GameState, res: string) {
      store.settings.resolution = res;
      if (res === 'auto') return;

      const parts = res.split('x');
      const w = parseInt(parts[0]);
      const h = parseInt(parts[1]);

      if (w && h && (window as any).electronAPI) {
        (window as any).electronAPI.resizeWindow(w, h);
      }
    },


    /**
     * Switches the game language and saves.
     */
    setLanguage(store: GameState, lang: string) {
      store.language = lang;
      store.saveGame();
    },


    /**
     * Toggles the settings modal visibility.
     */
    toggleSettings(store: GameState) {
      store.settingsOpen = !store.settingsOpen;
      if (!store.settingsOpen && store.ui && store.ui.cleanupHover) {
        store.ui.cleanupHover(store);
      }
      store.playSound('click');
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

      store.saveGame();
      store.ui.showToast('Resources & Stats maximized!', 'success');
      store.settingsOpen = false;
    },

  };
};
