import { GameState, ItemId, ItemDefinition, HomeDefinition } from '../../types/game';

/**
 * Housing System - TypeScript Edition
 * Handles furniture placement, home capacity, and shelter management.
 */
export const createHousingSystem = () => {
  return {
    /**
     * Toggles a piece of furniture in the current home.
     */
    toggleFurniture(store: GameState, id: string) {
      const item = store.content.get<ItemDefinition>(id, 'items');
      if (!item || item.category !== 'crafting') return;

      const placedIdx = store.placedItems.indexOf(id as ItemId);
      const isPlaced = placedIdx !== -1;

      if (isPlaced) {
        // Remove one instance
        store.placedItems.splice(placedIdx, 1);
        (store as any).playSound('click');
        (store as any).addLog(store.t(item.title, 'items') + ' entfernt.', 'custom', 'var(--text-muted)');
      } else {
        // Check if we actually have it in inventory
        const invIdx = store.discoveredItems.indexOf(id as ItemId);
        if (invIdx === -1) return;

        // Place item - Exclusive Rule: Only one bed at a time
        if (id.includes('bed')) {
          store.placedItems = store.placedItems.filter((i: string) => !i.includes('bed'));
        }

        const spaceRequired = item.spaceCost || 1;
        const currentSpace = this.getUsedFurnitureSpace(store);
        const capacity = this.getHomeCapacity(store);

        if (currentSpace + spaceRequired > capacity) {
          (store as any).playSound('fail');
          store.ui.showToast(store.t('fail_furniture_space') || 'Nicht genug Platz!', 'error');
          return;
        }

        store.placedItems.push(id as ItemId);
        (store as any).playSound('magic');
        (store as any).addLog(store.t(item.title, 'items') + ' platziert.', 'custom', 'var(--accent-teal)');
      }
      (store as any).saveGame();
    },

    /**
     * Calculates the total space used by placed furniture.
     */
    getUsedFurnitureSpace(store: GameState): number {
      let total = 0;
      store.placedItems.forEach((id: ItemId) => {
        const item = store.content.get<ItemDefinition>(id, 'items');
        if (item && item.category === 'crafting') {
          total += item.spaceCost || 1;
        }
      });
      return total;
    },

    /**
     * Returns the capacity of the current active home.
     */
    getHomeCapacity(store: GameState): number {
      if (!store.activeHome) return 0;
      const home = store.content.get<HomeDefinition>(store.activeHome, 'homes');
      return home ? home.capacity : 0;
    },

    /**
     * Returns a list of discovered furniture items that are not yet placed.
     */
    getAvailableFurniture(store: GameState) {
      const placedCopy = [...store.placedItems];
      const result: string[] = [];

      store.discoveredItems.forEach((id) => {
        const item = store.content.get<ItemDefinition>(id, 'items');
        if (item?.category === 'crafting') {
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

    /**
     * Returns a list of currently placed furniture items.
     */
    getPlacedFurnitureList(store: GameState) {
      return store.placedItems.filter((id: string) => {
        const item = store.content.get<ItemDefinition>(id, 'items');
        return item?.category === 'crafting';
      });
    },
  };
};
