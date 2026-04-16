/**
 * Item Consumption System Manager
 */
export const createItemSystem = () => ({
    consumeItem(store, id) {
        const item = store.itemDb[id];
        if (!item || !item.consumable) return;
        const index = store.inventory.indexOf(id);
        if (index === -1) return;

        if (item.effect) {
            Object.entries(item.effect).forEach(([key, val]) => {
                if (['energy', 'magic', 'satiation'].includes(key)) {
                    store.resource.add(store, key, val);
                }
            });
        }
        store.inventory.splice(index, 1);
        if (store.selectedItem === id) store.selectedItem = null;
        store.addLog('item_consumed', 'logs', 'rgba(16, 185, 129, 0.9)', { name: store.t(id, 'items') || item.title });
        store.playSound('eat');
    }
});
