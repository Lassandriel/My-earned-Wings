import { GameState } from '../../types/game';
import { EngineServices } from '../types';

/**
 * Data fields that are arrays or plain objects. UISync clones them per tick
 * and assigns the clone to both the engine state and the Alpine store, so:
 * - Alpine sees a fresh reference and fires reactivity (UI re-renders).
 * - The engine state continues to share identity with what Alpine holds, so
 *   in-place mutations by the engine on the next tick remain visible.
 */
const OBJECT_KEYS = [
  'flags',
  'resources',
  'limits',
  'stats',
  'counters',
  'activeBuffs',
  'activeTasks',
  'activeProducers',
  'discoveredResources',
  'discoveredItems',
  'discoveredTitles',
  'unlockedNPCs',
  'unlockedRecipes',
  'placedItems',
  'npcProgress',
  'collectionHistory',
  'upgrades',
  'dialogueChoices',
  'finalStats',
  'confirmModal',
  'addonCompatModal',
  'hoveredAction',
] as const;

/**
 * Primitive / replace-style fields (strings, numbers, booleans, single-value
 * references). Just copy across — Alpine handles primitive equality itself.
 */
const PRIMITIVE_KEYS = [
  'activeFocus',
  'view',
  'prologueStep',
  'demoCompleted',
  'demoCompletedHintSeen',
  'ellieIntroSeen',
  'showEllieIntro',
  'currentObjective',
  'activeHome',
  'activeTitle',
  'currentLocation',
  'currentMainSubTab',
  'dialogueActive',
  'dialogueText',
  'dialogueTitle',
  'dialogueWaiting',
  'dialogueNpcId',
  'selectedItem',
  'selectedStoryNpc',
  'craftingSubView',
  'saveCode',
  'saveInfoText',
  'playerName',
  'language',
  'hasSave',
  'sidebarCollapsed',
  'settingsOpen',
] as const;

/**
 * Fields that HTML view templates mutate directly (via @click handlers)
 * AND that engine code never writes. UISync copies these Alpine→engine
 * BEFORE the regular pass so UI writes are preserved after the Phase 2
 * Stage 2 cutover.
 *
 * Found via grep for `$store.game.X = ` in src/**\/*.html. Two fields
 * from that grep are NOT in this list because the engine also writes
 * them and would otherwise lose its updates to the unconditional
 * writeback:
 *   - `view`: engine sets it via viewManager.{startNewGame,continueGame,
 *     finishPrologue,confirmName,completeDemo,returnToMenu}. The one UI
 *     write (finale → main button in finale.view.html) needs to be
 *     converted to call viewManager.returnToMenu() instead.
 *   - `selectedItem`: engine auto-advances it in items.logic after use.
 *     The UI click in upgrades.view.html needs to be routed through an
 *     action.
 * Both pending conversions tracked in TODO.md.
 */
const UI_WRITEBACK_KEYS = [
  'settingsOpen',
  'selectedStoryNpc',
  'sidebarCollapsed',
  'saveCode',
] as const;

/**
 * UISystem — bridges plain engine state to the Alpine reactive store.
 *
 * Engine writes happen on the plain JS object (services.gameState). They are
 * cheap because no Alpine reactivity fires. At the end of each tick this sync
 * pushes changes to the Alpine store, which causes one batched UI re-render.
 *
 * If engine state and Alpine store are the same object (Stage 1 / pre-Step-8
 * setup), this becomes a no-op.
 */
export function createUISync() {
  const snapshot = { lastSyncedAt: 0 };

  return {
    snapshot,
    sync(state: GameState, _services: EngineServices): void {
      const Alpine = (typeof window !== 'undefined' && (window as any).Alpine)
        ? (window as any).Alpine
        : null;
      if (!Alpine) return;

      const alpineStore = Alpine.store('game') as GameState | null;
      if (!alpineStore || alpineStore === state) {
        snapshot.lastSyncedAt = Date.now();
        return;
      }

      // Pre-pass: UI-writeback. HTML templates mutate a small set of
      // primitive fields on Alpine directly (settingsOpen, view, …).
      // Copy those Alpine→engine BEFORE the regular sync so the engine
      // sees the user's input and the engine→Alpine pass below doesn't
      // clobber it with a stale value.
      for (const key of UI_WRITEBACK_KEYS) {
        (state as any)[key] = (alpineStore as any)[key];
      }

      // Reference-sharing clone pattern — see OBJECT_KEYS comment above.
      // Null/undefined still gets propagated so Alpine sees the clear (e.g.
      // hoveredAction = null after a view switch); without that, stale
      // tooltips and modal-closed states stick around in the UI.
      for (const key of OBJECT_KEYS) {
        const val = (state as any)[key];
        if (val === undefined || val === null) {
          (alpineStore as any)[key] = val;
          continue;
        }
        const clone: any = Array.isArray(val) ? [...val] : { ...val };
        (alpineStore as any)[key] = clone;
        (state as any)[key] = clone;
      }

      for (const key of PRIMITIVE_KEYS) {
        (alpineStore as any)[key] = (state as any)[key];
      }

      snapshot.lastSyncedAt = Date.now();
    },
  };
}
