import { GameState, ResourceId } from '../types/game';

// Persistence Configuration
const PERSISTENCE_CONFIG = {
  // Fields that should NEVER be stored in the save file
  exclude: [
    'hoveredAction',
    'settingsOpen',
    'saveInfoText',
    'lastMouseX',
    'lastMouseY',
    'confirmModal',
  ],

  // Arrays that should be fully REPLACED from save data instead of merged.
  overwriteArrays: new Set([
    'logs',
    'storyHistory',
    'upgrades',
    'discoveredItems',
    'discoveredResources',
    'unlockedRecipes',
    'unlockedNPCs',
  ]),
};

export const createPersistenceSystem = (initialState: Partial<GameState>) => {
  let _lastSaveTime = 0;
  const _saveThrottleMs = 2000; // 2 seconds

  return {
    saveGame(store: GameState, isManual: boolean = false) {
      const now = Date.now();

      // Throttle check: only skip if not manual and within throttle window
      if (!isManual && now - _lastSaveTime < _saveThrottleMs) {
        return;
      }

      _lastSaveTime = now;
      const saveObj: Record<string, any> = {};

      Object.keys(initialState).forEach((k) => {
        const key = k as keyof GameState;
        if (key === ('settingsOpen' as any)) {
          saveObj[key] = false;
        } else if (!PERSISTENCE_CONFIG.exclude.includes(key)) {
          saveObj[key] = store[key];
        }
      });
      saveObj.version = 1;
      localStorage.setItem('wings_save', JSON.stringify(saveObj));
      store.hasSave = true;
      this.saveSettings(store); // Also save settings independently for boot-load

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      store.saveInfoText = `${store.t('save_at', 'ui')} ${time}`;

      if (isManual) {
        store.addLog('save_success', 'logs', 'var(--accent-teal)');
        store.playSound('success');
        if (store.ui && store.ui.showToast) {
          store.ui.showToast(store.t('save_success', 'logs') as string, 'success');
        }
      }
    },

    saveSettings(store: GameState) {
      const settingsObj = {
        language: store.language,
        settings: (store as any).settings, // settings is still a bit loose
      };
      localStorage.setItem('wings_settings', JSON.stringify(settingsObj));
    },

    loadSettings(store: GameState) {
      const saved = localStorage.getItem('wings_settings');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.language) store.language = data.language;
          if (data.settings) {
            (store as any).settings = { ...(store as any).settings, ...data.settings };
          }
          if (store.bus) store.bus.emit(store.EVENTS.SETTINGS_UPDATED);
          return true;
        } catch (e) {
          console.warn('Failed to load settings at boot', e);
        }
      }
      return false;
    },

    loadGame(store: GameState) {
      const saved = localStorage.getItem('wings_save');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          
          // --- VERSION MIGRATION (Wave 10) ---
          const currentVersion = 1;
          if (!data.version) {
              console.log('[PERSISTENCE] Legacy save detected. Migrating...');
              data.version = currentVersion;
          }

          const deepMerge = (target: any, source: any) => {
            Object.keys(source).forEach((key) => {
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
            Object.keys(store.stats).forEach((statId) => {
              if (statId.startsWith('max')) return;
              const maxKey = 'max' + statId.charAt(0).toUpperCase() + statId.slice(1);
              if (store.stats[maxKey] !== undefined) {
                store.stats[statId] = Math.min(store.stats[maxKey], store.stats[statId]);
              }
            });
          }

          if (store.resources && store.limits) {
            Object.keys(store.resources).forEach((r) => {
              const resId = r as ResourceId;
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
          localStorage.removeItem('wings_save');
          return false;
        }
      }
      return false;
    },

    exportGameData() {
      const saved = localStorage.getItem('wings_save');
      if (!saved) return '';
      try {
        return btoa(unescape(encodeURIComponent(saved)));
      } catch {
        return saved;
      }
    },

    importGameData(_store: GameState, code: string) {
      if (!code) return false;
      try {
        const cleanCode = code.trim().replace(/\s/g, '');
        const decoded = decodeURIComponent(escape(atob(cleanCode)));
        JSON.parse(decoded); // Validation check
        localStorage.setItem('wings_save', decoded);
        window.location.reload();
        return true;
      } catch (e) {
        console.error('Import failed:', e);
        return false;
      }
    },

    doHardReset() {
      localStorage.removeItem('wings_save');
      window.location.reload();
    },

    boot(store: GameState) {
      this.loadSettings(store);
      store.bus.on(store.EVENTS.SAVE_REQUESTED, (data: any) => {
        this.saveGame(store, data?.isManual || false);
      });
    },
  };
};
