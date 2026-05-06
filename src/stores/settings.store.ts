import { GameState } from '../types/game';
import { SettingsSystemRef } from '../types/stores';

/**
 * Settings store initial values type
 */
interface InitialSettings {
  volumeGlobal: number;
  volumeMusic: number;
  volumeSfx: number;
  mute: boolean;
  showParticles: boolean;
  showJuice: boolean;
  uiScale: 'auto' | string;
  resolution: 'auto' | string;
}

/**
 * Alpine.js Store for Settings
 */
export const createSettingsStore = (initialSettings: InitialSettings) => ({
  ...initialSettings,
  
  system: null as SettingsSystemRef | null,

  /**
   * Bootstraps the store with the logic system.
   * Named 'boot' instead of 'init' to avoid Alpine.js auto-init conflicts.
   */
  boot(system: SettingsSystemRef) {
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
