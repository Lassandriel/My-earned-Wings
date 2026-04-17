export const createPersistenceSystem = (initialState) => ({
  saveGame(store, isManual = false) {
    const saveObj = {};
    const excludeFromSave = ['hoveredAction', 'settingsOpen', 'saveInfoText', 'lastMouseX', 'lastMouseY'];
    
    Object.keys(initialState).forEach(key => {
      if (key === 'settingsOpen') {
        saveObj[key] = false; // Explicitly force to closed in save file
      } else if (!excludeFromSave.includes(key)) {
        saveObj[key] = store[key];
      }
    });
    localStorage.setItem('wings_save', JSON.stringify(saveObj));
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    store.saveInfoText = `${store.t('save_at', 'ui')} ${time}`;

    if (isManual) {
      store.addLog('save_success', 'logs', 'var(--accent-teal)');
      store.playSound('success');
      if (store.ui.showToast) store.ui.showToast(store.t('save_success', 'logs'), 'success');
    }
  },

  loadGame(store) {
    const saved = localStorage.getItem('wings_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        // --- CLEANUP: Clear dynamic objects before loading to avoid key-bloat ---
        store.resources = {};
        store.limits = {};
        store.npcProgress = {};

        // Use recursive deep merge to preserve new keys in nested objects
        const deepMerge = (target, source) => {
            Object.keys(source).forEach(key => {
                // Skip 'inventory' key if it exists in old saves (ignored due to new game policy)
                if (key === 'inventory') return;

                if (Array.isArray(source[key])) {
                    target[key] = [...new Set([...(target[key] || []), ...source[key]])];
                } else if (source[key] && typeof source[key] === 'object') {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            });
            return target;
        };

        deepMerge(store, data);

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        store.saveInfoText = `${store.t('ui_load_at', 'ui')} ${time}`;
        return true;
      } catch (e) {
        console.warn('Save data corrupted, starting fresh.', e);
      }
    }
    return false;
  },

  exportGameData(store) {
    const saved = localStorage.getItem('wings_save');
    if (!saved) return "";
    try {
        // Simple Base64 "Save Code"
        return btoa(unescape(encodeURIComponent(saved)));
    } catch (e) {
        return saved; // Fallback to raw JSON if encoding fails
    }
  },

  importGameData(store, code) {
    if (!code) return false;
    try {
        const decoded = decodeURIComponent(escape(atob(code.trim())));
        JSON.parse(decoded); // Validation check
        localStorage.setItem('wings_save', decoded);
        window.location.reload();
        return true;
    } catch (e) {
        console.error("Import failed:", e);
        return false;
    }
  },

  hardReset(store) {
    if (confirm(store.t('confirm_reset', 'ui'))) {
      localStorage.removeItem('wings_save');
      window.location.reload();
    }
  },

  boot(store) {
    store.bus.on(store.EVENTS.SAVE_REQUESTED, (data) => {
      this.saveGame(store, data?.isManual || false);
    });
  }
});
