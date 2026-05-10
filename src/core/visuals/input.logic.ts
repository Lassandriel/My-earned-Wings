import { GameState } from '../../types/game';

/**
 * Input System - Handles global event listeners.
 */
export const createInputSystem = () => {
  const _handlers: { event: string; handler: (e: Event) => void; target: EventTarget }[] = [];

  const addTracked = <T extends Event>(target: EventTarget, event: string, handler: (e: T) => void) => {
    target.addEventListener(event, handler as EventListener);
    _handlers.push({ event, handler: handler as (e: Event) => void, target });
  };

  return {
    metadata: {
      id: 'input',
    },

    boot(store: GameState) {
      this.setupGlobalEvents(store);
    },

    destroy() {
      _handlers.forEach(({ target, event, handler }) => {
        target.removeEventListener(event, handler);
      });
      _handlers.length = 0;
    },

    setupGlobalEvents(store: GameState) {
      addTracked(window, 'resize', () => {
        if (store.settingsSystem?.calculateScale) {
          store.settingsSystem.calculateScale(store);
        }
      });

      addTracked(document, 'keydown', (e: KeyboardEvent) => {
        // Skip if typing in an input field
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        const view = store.view;
        const settingsOpen = store.settingsOpen;
        
        // Handle Escape
        if (e.key === 'Escape') {
          if (view === 'prologue' && store.prologue?.skipPrologue) {
            store.prologue.skipPrologue(store);
          } else if (store.settingsSystem?.toggleSettings) {
            store.settingsSystem.toggleSettings(store);
          }
        }

        // Handle Enter for Prologue
        if (e.key === 'Enter' && view === 'prologue' && store.prologue?.advancePrologue) {
          store.prologue.advancePrologue(store);
        }

        // Gameplay Shortcuts
        if (view !== 'menu' && view !== 'prologue' && !settingsOpen) {
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

      addTracked(document, 'mousemove', (e: MouseEvent) => {
        store.lastMouseX = e.clientX;
        store.lastMouseY = e.clientY;
        if (store.ui?.handleMouseMove) {
          store.ui.handleMouseMove(e, store);
        }
        if (store.hoveredAction && store.ui?.reposition) {
          store.ui.reposition(e.clientX, e.clientY);
        }
      });

      addTracked(window, 'mouseleave', () => {
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
      addTracked(document, 'click', startMusicOnce);
    }
  };
};
