import { GameState } from '../types/game';

/**
 * Alpine.js Store for Settings
 */
export const createSettingsStore = (initialSettings: any) => ({
  ...initialSettings,
  
  system: null as any,

  /**
   * Bootstraps the store with the logic system.
   * Named 'boot' instead of 'init' to avoid Alpine.js auto-init conflicts.
   */
  boot(system: any) {
    console.log('[SETTINGS] Bootstrapping with system:', system);
    this.system = system;
  },

  toggleSettings(store: GameState) {
    if (!this.system) return;
    this.system.toggleSettings(store);
  },

  calculateScale(store: GameState) {
    if (!this.system) {
      console.warn('[SETTINGS] Cannot calculate scale: system not booted.');
      return;
    }
    this.system.calculateScale(store);
  },

  setLanguage(store: GameState, lang: string) {
    if (!this.system) return;
    this.system.setLanguage(store, lang);
  },

  applyCheats(store: GameState) {
    if (!this.system) return;
    this.system.applyCheats(store);
  }
});
