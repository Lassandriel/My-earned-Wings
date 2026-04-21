import { GameState, ItemId } from '../types/game';

/**
 * Item System - TypeScript Edition
 * Manages item effects and consumption from the inventory.
 */
export const createItemSystem = () => ({
  consumeItem(store: GameState, id: ItemId) {
    const item = store.content.get(id, 'items');
    if (!item || !item.consumable) return;

    // Find instance in inventory
    const idx = store.discoveredItems.indexOf(id);
    if (idx === -1) return;

    // 1. Wastage Protection: Check if consumption is meaningful
    if (item.effect) {
      const statsBenefitted = Object.entries(item.effect).filter(([stat]) => {
        const maxKey = 'max' + stat.charAt(0).toUpperCase() + stat.slice(1);
        const maxValue = store.stats[maxKey] || 100;
        return store.stats[stat] < maxValue;
      });

      // If the item ONLY provides stats (e.g., Bread) and all regulated stats are full, block it.
      // Items with side-effects (onSuccess/Buffs) like Gourmet Meals are always consumable.
      if (statsBenefitted.length === 0 && !item.onSuccess) {
        const firstStat = Object.keys(item.effect)[0];
        store.addLog(`fail_full_${firstStat}`, 'logs', 'var(--accent-red)');
        store.playSound('fail');
        return;
      }
    }

    // 2. Apply Effects (Stats)
    if (item.effect) {
      Object.entries(item.effect).forEach(([stat, value]) => {
        if (store.stats[stat] !== undefined) {
          const maxKey = 'max' + stat.charAt(0).toUpperCase() + stat.slice(1);
          const maxValue = store.stats[maxKey] || 100;
          store.stats[stat] = Math.min(maxValue, store.stats[stat] + (value as number));
        }
      });
    }

    // 2. Side-Effects (onSuccess handlers)
    if (Array.isArray(item.onSuccess)) {
      item.onSuccess.forEach((effect: { type: string; [key: string]: any }) => {
        const handler = store.actions.effectHandlers[effect.type];
        if (handler) handler(store, effect);
      });
    }

    // 3. Remove instance
    store.discoveredItems.splice(idx, 1);

    // 4. Feedback
    const itemName = store.t(item.title, 'items');
    store.addLog('item_used', 'logs', 'var(--accent-teal)', { item: itemName });
    store.playSound(item.sfx || 'success');

    // Auto-select next item
    if (store.discoveredItems.length > 0) {
      store.selectedItem = store.discoveredItems[Math.max(0, idx - 1)];
    } else {
      store.selectedItem = null;
    }

    store.saveGame();
  },
});
