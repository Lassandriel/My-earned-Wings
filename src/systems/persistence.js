// Persistence Configuration
const PERSISTENCE_CONFIG = {
  // Fields that should NEVER be stored in the save file
  exclude: ['hoveredAction', 'settingsOpen', 'saveInfoText', 'lastMouseX', 'lastMouseY', 'confirmModal'],
  
  // Arrays that should be fully REPLACED from save data instead of merged.
  // This prevents duplicates and preserving order for history and logs.
  overwriteArrays: new Set([
     'logs', 'storyHistory', 'upgrades', 'discoveredItems',
     'discoveredResources', 'unlockedRecipes', 'unlockedNPCs'
  ])
};

export const createPersistenceSystem = (initialState) => ({
  saveGame(store, isManual = false) {
    const saveObj = {};
    
    Object.keys(initialState).forEach(key => {
      if (key === 'settingsOpen') {
        saveObj[key] = false; 
      } else if (!PERSISTENCE_CONFIG.exclude.includes(key)) {
        saveObj[key] = store[key];
      }
    });
    localStorage.setItem('wings_save', JSON.stringify(saveObj));
    this.saveSettings(store); // Also save settings independently for boot-load
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    store.saveInfoText = `${store.t('save_at', 'ui')} ${time}`;

    if (isManual) {
      store.addLog('save_success', 'logs', 'var(--accent-teal)');
      store.playSound('success');
      if (store.ui.showToast) store.ui.showToast(store.t('save_success', 'logs'), 'success');
    }
  },

  saveSettings(store) {
    const settingsObj = {
        language: store.language,
        settings: store.settings
    };
    localStorage.setItem('wings_settings', JSON.stringify(settingsObj));
  },

  loadSettings(store) {
    const saved = localStorage.getItem('wings_settings');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.language) store.language = data.language;
            if (data.settings) {
                store.settings = { ...store.settings, ...data.settings };
            }
            if (store.bus) store.bus.emit(store.EVENTS.SETTINGS_UPDATED);
            return true;
        } catch (e) {
            console.warn("Failed to load settings at boot", e);
        }
    }
    return false;
  },

  loadGame(store) {
    const saved = localStorage.getItem('wings_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        // --- Lade-Prozess: Merged gespeicherte Daten in den initialisierten Store ---
        // Wir löschen die Objekte NICHT, damit neue Registry-Keys aus buildInitialState() erhalten bleiben.
        
        const deepMerge = (target, source) => {
            Object.keys(source).forEach(key => {
                if (Array.isArray(source[key])) {
                    if (PERSISTENCE_CONFIG.overwriteArrays.has(key)) {
                        target[key] = [...source[key]];
                    } else {
                        target[key] = [...new Set([...(target[key] || []), ...source[key]])];
                    }
                } else if (source[key] && typeof source[key] === 'object' && target[key]) {
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            });
            return target;
        };

        deepMerge(store, data);
        if (store.bus) store.bus.emit(store.EVENTS.SETTINGS_UPDATED);

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

  doHardReset(store) {
    localStorage.removeItem('wings_save');
    window.location.reload();
  },

  boot(store) {
    this.loadSettings(store); // Initial load of global preferences
    store.bus.on(store.EVENTS.SAVE_REQUESTED, (data) => {
      this.saveGame(store, data?.isManual || false);
    });
  }
});
