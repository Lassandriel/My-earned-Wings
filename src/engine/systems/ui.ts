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
  'academy_path',
  'currentObjective',
  'activeHome',
  'activeTitle',
  'currentLocation',
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

      // Reference-sharing clone pattern — see OBJECT_KEYS comment above.
      for (const key of OBJECT_KEYS) {
        const val = (state as any)[key];
        if (val === undefined || val === null) continue;
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
