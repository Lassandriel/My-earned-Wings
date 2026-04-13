export const createPersistenceSystem = (initialState) => ({
  saveGame(store) {
    const saveObj = {};
    Object.keys(initialState).forEach(key => {
      saveObj[key] = store[key];
    });
    localStorage.setItem('wings_save', JSON.stringify(saveObj));
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    store.saveInfoText = `${store.t('save_at', 'ui')}${time}`;
  },

  loadGame(store) {
    const saved = localStorage.getItem('wings_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        // Deep merge for second-level objects to preserve new resource/limit keys
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
                store[key] = { ...initialState[key], ...data[key] };
            } else {
                store[key] = data[key];
            }
        });

        // Migration/Backwards compatibility for delayed furniture recipes
        if (store.housing?.hasHouse) {
            ['craft-bed', 'craft-chair', 'craft-stove'].forEach(rec => {
                if (!store.unlockedRecipes.includes(rec)) store.unlockedRecipes.push(rec);
            });
        }
        if (store.housing?.hasTable && !store.unlockedRecipes.includes('craft-bookshelf')) {
            store.unlockedRecipes.push('craft-bookshelf');
        }

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        store.saveInfoText = `Geladen um ${time}`;
        return true;
      } catch (e) {
        console.warn('Save data corrupted, starting fresh.', e);
      }
    }
    return false;
  },

  hardReset(store) {
    if (confirm(store.t('confirm_reset', 'ui'))) {
      localStorage.removeItem('wings_save');
      window.location.reload();
    }
  }
});
