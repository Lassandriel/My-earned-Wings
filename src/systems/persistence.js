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
        Object.assign(store, data);
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
