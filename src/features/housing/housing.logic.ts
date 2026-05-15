import { GameState, ItemId, ItemDefinition, HomeDefinition } from '../../types/game';
import { LOG_COLOR, invalidateCaches, makeServiceContainer } from '../../core/constants';

interface HousingDeps {
  content: GameState['content'];
  pipeline: GameState['pipeline'];
  resource: GameState['resource'];
  ui: GameState['ui'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  t: GameState['t'];
  saveGame: GameState['saveGame'];
}

const ctx = makeServiceContainer<HousingDeps>('HOUSING');
const svc = ctx.get;

/**
 * Housing System - TypeScript Edition
 * Handles furniture placement, home capacity, and shelter management.
 */
export const createHousingSystem = () => {
  return {
    metadata: {
      id: 'housing',
      delegates: [
        'toggleFurniture', 'getUsedFurnitureSpace',
        'getHomeCapacity', 'getAvailableFurniture',
        'getPlacedFurnitureList',
      ],
    },

    setServices: ctx.set,

    /**
     * Toggles a piece of furniture in the current home.
     */
    toggleFurniture(store: GameState, id: string) {
      const item = svc().content.get<ItemDefinition>(id, 'items');
      if (!item || item.category !== 'furniture') return;

      const placedIdx = store.placedItems.indexOf(id as ItemId);
      const isPlaced = placedIdx !== -1;

      if (isPlaced) {
        store.placedItems.splice(placedIdx, 1);
        svc().playSound('click');
        svc().addLog(svc().t(item.title, 'items') + svc().t('ui_removed_log'), 'custom', LOG_COLOR.muted);
      } else {
        const invIdx = store.discoveredItems.indexOf(id as ItemId);
        if (invIdx === -1) return;

        // Exclusive: only one bed at a time
        if (id.includes('bed')) {
          store.placedItems = store.placedItems.filter((i: string) => !i.includes('bed'));
        }

        const spaceRequired = item.spaceCost || 1;
        const currentSpace = this.getUsedFurnitureSpace(store);
        const capacity = this.getHomeCapacity(store);

        if (currentSpace + spaceRequired > capacity) {
          svc().playSound('fail');
          svc().ui.showToast(svc().t('fail_furniture_space'), 'error');
          return;
        }

        store.placedItems.push(id as ItemId);
        svc().playSound('magic');
        svc().addLog(svc().t(item.title, 'items') + svc().t('ui_placed_log'), 'custom', LOG_COLOR.success);
      }

      invalidateCaches(svc());

      svc().saveGame();
    },

    getUsedFurnitureSpace(store: GameState): number {
      let total = 0;
      store.placedItems.forEach((id: ItemId) => {
        const item = svc().content.get<ItemDefinition>(id, 'items');
        if (item && item.category === 'furniture') {
          total += item.spaceCost || 1;
        }
      });
      return total;
    },

    getHomeCapacity(store: GameState): number {
      if (!store.activeHome) return 0;
      const home = svc().content.get<HomeDefinition>(store.activeHome, 'homes');
      return home ? home.capacity : 0;
    },

    getAvailableFurniture(store: GameState) {
      const placedCopy = [...store.placedItems];
      const result: string[] = [];

      store.discoveredItems.forEach((id) => {
        const item = svc().content.get<ItemDefinition>(id, 'items');
        if (item?.category === 'furniture') {
          const pIdx = placedCopy.indexOf(id as ItemId);
          if (pIdx !== -1) {
            placedCopy.splice(pIdx, 1);
          } else {
            result.push(id);
          }
        }
      });
      return result;
    },

    getPlacedFurnitureList(store: GameState) {
      return store.placedItems.filter((id: string) => {
        const item = svc().content.get<ItemDefinition>(id, 'items');
        return item?.category === 'furniture';
      });
    },
  };
};
