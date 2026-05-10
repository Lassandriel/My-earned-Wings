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
    const setting = this.uiScale || 'auto';

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

  setLanguage(store: GameState, lang: string) {
    if (!this.system) return;
    this.system.setLanguage(store, lang);
  },

  applyCheats(store: GameState) {
    if (!this.system) return;
    this.system.applyCheats(store);
  }
});
