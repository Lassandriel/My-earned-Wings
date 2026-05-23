import { GameState } from '../../types/game';
import { PRIMARY_ACTIONS } from '../constants';

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

      // Lazily-built lookup for action hotkeys (e.g. addon-defined "F4",
      // "KeyB"). Populated on first keydown after the action registry
      // is fully loaded (runtime addons mutate the registry once at
      // boot, before any key event can fire post-Alpine.start).
      let hotkeyCache: Record<string, string> | null = null;

      addTracked(document, 'keydown', (e: KeyboardEvent) => {
        // Skip if typing in an input field
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        const view = store.view;
        const settingsOpen = store.settingsOpen;

        // Handle Escape — settings toggle, prologue skip
        if (e.key === 'Escape') {
          if (view === 'prologue' && store.prologue?.skipPrologue) {
            store.prologue.skipPrologue(store);
          } else if (store.settingsSystem?.toggleSettings) {
            store.settingsSystem.toggleSettings(store);
          }
          return;
        }

        // Handle Enter — prologue advance (modal confirms work via auto-focused buttons)
        if (e.key === 'Enter' && view === 'prologue' && store.prologue?.advancePrologue) {
          store.prologue.advancePrologue(store);
          return;
        }

        // Everything below only applies during actual gameplay.
        if (view === 'menu' || view === 'prologue' || view === 'naming' || settingsOpen) return;

        // F1 / F2 / F3 — primary actions (Rest, Meditate, Eat).
        // We preventDefault so browser Help / Find shortcuts don't trigger.
        // Source list is PRIMARY_ACTIONS in core/constants — also used by
        // the top action bar in main.view.html so the order stays in sync.
        const fIndex = e.key.startsWith('F') ? parseInt(e.key.slice(1), 10) : NaN;
        if (!Number.isNaN(fIndex) && fIndex >= 1 && fIndex <= PRIMARY_ACTIONS.length) {
          const actionId = PRIMARY_ACTIONS[fIndex - 1];
          if (actionId && store.commands) {
            e.preventDefault();
            store.commands.enqueue({ type: 'executeAction', actionId });
            return;
          }
        }

        // Addon-defined hotkeys: any action YAML with a `hotkey` field
        // (KeyboardEvent.key OR .code, e.g. "F4", "KeyB") gets dispatched
        // here. The map is built lazily on first keydown after addon load
        // so we don't pay for it at boot, and cached on the closure for
        // O(1) lookups afterwards. Re-entry isn't expected; addons load
        // before any keypress can happen post-Alpine-start.
        let hotkeyMap = hotkeyCache;
        if (!hotkeyMap) {
          hotkeyMap = {};
          const reg = (store.content as any)?.registries?.actions ?? {};
          for (const a of Object.values(reg) as Array<{ id?: string; hotkey?: string }>) {
            if (a && typeof a.hotkey === 'string' && typeof a.id === 'string') {
              hotkeyMap[a.hotkey] = a.id;
            }
          }
          hotkeyCache = hotkeyMap;
        }
        const hotkeyAction = hotkeyMap[e.key] ?? hotkeyMap[e.code];
        if (hotkeyAction && store.commands) {
          e.preventDefault();
          store.commands.enqueue({ type: 'executeAction', actionId: hotkeyAction });
          return;
        }

        // Tab switching: 1-6 select the Nth visible sidebar tab. Up/Down cycle
        // through the visible tabs sequentially with wrap-around.
        const navRegistry = (store.content as any)?.registries?.navigation;
        if (!navRegistry) return;
        const visibleTabs = (Object.values(navRegistry) as Array<{ id: string; requiredFlag?: string }>)
          .filter((t) => !t.requiredFlag || (store.flags as any)[t.requiredFlag]);

        const numKey = parseInt(e.key, 10);
        if (!Number.isNaN(numKey) && numKey >= 1 && numKey <= visibleTabs.length) {
          const target = visibleTabs[numKey - 1];
          if (target && view !== target.id) {
            store.view = target.id;
            store.playSound?.('click');
          }
          return;
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const currentIdx = visibleTabs.findIndex((t) => t.id === view);
          if (currentIdx === -1) return;
          const delta = e.key === 'ArrowDown' ? 1 : -1;
          const nextIdx = (currentIdx + delta + visibleTabs.length) % visibleTabs.length;
          const target = visibleTabs[nextIdx];
          if (target && target.id !== view) {
            e.preventDefault();
            store.view = target.id;
            store.playSound?.('click');
          }
          return;
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
