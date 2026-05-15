import { GameState, ItemId, ItemDefinition } from '../../types/game';
import { LOG_COLOR } from '../../core/constants';

interface ItemDeps {
  content: GameState['content'];
  actions: GameState['actions'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  t: GameState['t'];
  saveGame: GameState['saveGame'];
}

let _deps: ItemDeps | null = null;
const svc = (): ItemDeps => {
  if (!_deps) throw new Error('[ITEMS] services not bound — call setServices() during boot.');
  return _deps;
};

/**
 * Item System - TypeScript Edition
 * Manages item effects and consumption from the inventory.
 */
export const createItemSystem = () => ({
  metadata: {
    id: 'item',
    delegates: { consumeItem: 'consumeItem' },
  },

  setServices(deps: ItemDeps) {
    _deps = deps;
  },

  consumeItem(store: GameState, id: ItemId) {
    const item = svc().content.get<ItemDefinition>(id, 'items');
    if (!item || !item.consumable) return;

    const idx = store.discoveredItems.indexOf(id);
    if (idx === -1) return;

    // Wastage Protection
    if (item.effect) {
      const statsBenefitted = Object.entries(item.effect).filter(([stat]) => {
        const maxKey = 'max' + stat.charAt(0).toUpperCase() + stat.slice(1);
        const maxValue = store.stats[maxKey] || 100;
        return store.stats[stat] < maxValue;
      });

      if (statsBenefitted.length === 0 && !item.onSuccess) {
        const firstStat = Object.keys(item.effect)[0];
        svc().addLog(`fail_full_${firstStat}`, 'logs', LOG_COLOR.failure);
        svc().playSound('fail');
        return;
      }
    }

    // Apply Effects (Stats)
    if (item.effect) {
      Object.entries(item.effect).forEach(([stat, value]) => {
        if (store.stats[stat] !== undefined) {
          const maxKey = 'max' + stat.charAt(0).toUpperCase() + stat.slice(1);
          const maxValue = store.stats[maxKey] || 100;
          store.stats[stat] = Math.min(maxValue, store.stats[stat] + (value as number));
        }
      });
    }

    // Side-Effects (onSuccess handlers)
    if (Array.isArray(item.onSuccess)) {
      item.onSuccess.forEach((effect: { type: string; [key: string]: any }) => {
        const handler = svc().actions.effectHandlers[effect.type];
        if (handler) handler(store, effect);
      });
    }

    // Remove instance
    store.discoveredItems.splice(idx, 1);

    // Feedback
    const itemName = svc().t(item.title, 'items');
    svc().addLog('item_used', 'logs', LOG_COLOR.success, { item: itemName });
    svc().playSound(item.sfx || 'success');

    // Auto-select next item
    if (store.discoveredItems.length > 0) {
      store.selectedItem = store.discoveredItems[Math.max(0, idx - 1)];
    } else {
      store.selectedItem = null;
    }

    svc().saveGame();
  },
});
