import Alpine from 'alpinejs';
import { GameState } from '../../types/game';

/**
 * Input System - Handles global event listeners.
 */
export const createInputSystem = () => {
  return {
    metadata: {
      id: 'input',
    },

    boot(store: GameState) {
      this.setupGlobalEvents(store);
    },

    setupGlobalEvents(store: GameState) {
      window.addEventListener('resize', () => {
        if (store.settingsSystem?.calculateScale) {
          store.settingsSystem.calculateScale(store);
        }
      });

      document.addEventListener('keydown', (e) => {
        const ui = Alpine.store('ui') as any;
        
        // Handle Escape
        if (e.key === 'Escape') {
          if (ui.view === 'prologue' && store.prologue?.skipPrologue) {
            store.prologue.skipPrologue(store);
          } else if (store.settingsSystem?.toggleSettings) {
            store.settingsSystem.toggleSettings(store);
          }
        }

        // Handle Enter for Prologue
        if (e.key === 'Enter' && ui.view === 'prologue' && store.prologue?.advancePrologue) {
          store.prologue.advancePrologue(store);
        }

        // Gameplay Shortcuts
        if (ui.view !== 'menu' && ui.view !== 'prologue' && !ui.settingsOpen) {
          const SHORTCUTS: Record<string, string> = { 
            '1': 'act-ausruhen', 
            '2': 'act-meditieren', 
            '3': 'act-essen' 
          };
          if (SHORTCUTS[e.key] && store.executeAction) {
            store.executeAction(SHORTCUTS[e.key]);
          }
        }
      });

      document.addEventListener('mousemove', (e) => {
        const uiStore = Alpine.store('ui') as any;
        uiStore.lastMouseX = e.clientX;
        uiStore.lastMouseY = e.clientY;
        if (store.ui?.handleMouseMove) {
          store.ui.handleMouseMove(e, store);
        }
      });

      window.addEventListener('mouseleave', () => {
        if (store.ui?.cleanupHover) {
          store.ui.cleanupHover(store);
        }
      });

      const startMusicOnce = () => {
        if (store.audio?.startMusic) {
          store.audio.startMusic();
        }
        document.removeEventListener('click', startMusicOnce);
      };
      document.addEventListener('click', startMusicOnce);
    }
  };
};
