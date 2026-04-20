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
  _lastSaveTime: 0,
  _saveThrottleMs: 2000, // 2 seconds

  saveGame(store, isManual = false) {
    const now = Date.now();
    
    // Throttle check: only skip if not manual and within throttle window
    if (!isManual && (now - this._lastSaveTime < this._saveThrottleMs)) {
        return; 
    }
    
    this._lastSaveTime = now;
    const saveObj = {};
    
    Object.keys(initialState).forEach(key => {
      if (key === 'settingsOpen') {
        saveObj[key] = false; 
      } else if (!PERSISTENCE_CONFIG.exclude.includes(key)) {
        saveObj[key] = store[key];
      }
    });
    localStorage.setItem('wings_save', JSON.stringify(saveObj));
    store.hasSave = true;
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

        // --- SANITY CHECK: Clamp stats and resources to their respective limits ---
        if (store.stats) {
            Object.keys(store.stats).forEach(statId => {
                if (statId.startsWith('max')) return; // Ignore limits themselves
                const maxKey = 'max' + statId.charAt(0).toUpperCase() + statId.slice(1);
                if (store.stats[maxKey] !== undefined) {
                    store.stats[statId] = Math.min(store.stats[maxKey], store.stats[statId]);
                }
            });
        }

        if (store.resources && store.limits) {
            Object.keys(store.resources).forEach(resId => {
                if (store.limits[resId] !== undefined) {
                    store.resources[resId] = Math.min(store.limits[resId], store.resources[resId]);
                }
            });
        }

        if (store.bus) store.bus.emit(store.EVENTS.SETTINGS_UPDATED);

        // --- TASK CLEANUP: Clear any orphan task bars on load ---
        store.activeTasks = {};

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        store.saveInfoText = `${store.t('ui_load_at', 'ui')} ${time}`;
        return true;
      } catch (e) {
        console.error('[PERSISTENCE] Critical failure loading save data:', e);
        // Clear corrupt data to allow a clean restart
        localStorage.removeItem('wings_save');
        return false;
      }
    }
    return false;
  },

  exportGameData() {
    const saved = localStorage.getItem('wings_save');
    if (!saved) return "";
    try {
        // Simple Base64 "Save Code"
        return btoa(unescape(encodeURIComponent(saved)));
    } catch {
        return saved; // Fallback to raw JSON if encoding fails
    }
  },

  importGameData(store, code) {
    if (!code) return false;
    try {
        // CLEANUP: Remove whitespace and line breaks that often break atob
        const cleanCode = code.trim().replace(/\s/g, '');
        const decoded = decodeURIComponent(escape(atob(cleanCode)));
        JSON.parse(decoded); // Validation check
        localStorage.setItem('wings_save', decoded);
        window.location.reload();
        return true;
    } catch (e) {
        console.error("Import failed:", e);
        return false;
    }
  },

  doHardReset() {
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
