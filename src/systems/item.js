/**
 * Item Consumption System Manager
 */
export const createItemSystem = () => ({
    consumeItem(store, id) {
    const item = store.itemDb[id];
    if (!item || !item.consumable) return;
    
    // Check if player has the item
    const idx = store.upgrades.indexOf(id);
    if (idx === -1) return;
    
    // Check for effects
    if (item.effect) {
      Object.entries(item.effect).forEach(([stat, value]) => {
        if (store.stats[stat] !== undefined) {
          store.stats[stat] = Math.min(store.stats['max' + stat.charAt(0).toUpperCase() + stat.slice(1)], store.stats[stat] + value);
        }
      });
    }
    
    // Remove from upgrades
    store.upgrades.splice(idx, 1);
    store.addLog(item.title + ' benutzt.', 'custom', 'var(--accent-teal)');
    store.playSound('success');
    
    // Auto-select next item if possible
    if (store.upgrades.length > 0) {
      store.selectedItem = store.upgrades[Math.max(0, idx - 1)];
    } else {
      store.selectedItem = null;
    }
  }
});
