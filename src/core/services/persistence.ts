import { GameState, ResourceId } from '../../types/game';

/**
 * Persistence Configuration
 */
const CONFIG = {
  SAVE_KEY: 'wings_save',
  SETTINGS_KEY: 'wings_settings',
  THROTTLE_MS: 2000,
  
  // Fields that should NEVER be stored in the save file
  EXCLUDE: [
    'hoveredAction',
    'settingsOpen',
    'saveInfoText',
    'lastMouseX',
    'lastMouseY',
    'confirmModal',
  ],

  // Arrays that should be fully REPLACED instead of merged.
  OVERWRITE_ARRAYS: new Set([
    'logs',
    'storyHistory',
  ]),
};

/**
 * LZW Compression System
 * Dependency-free compression for LocalStorage limits.
 */
const LZW = {
  compress(data: string): string {
    const dict = new Map<string, number>();
    for (let i = 0; i < 256; i++) dict.set(String.fromCharCode(i), i);
    
    let phrase = "";
    const out: number[] = [];
    let code = 256;

    for (const char of data) {
      const combined = phrase + char;
      if (dict.has(combined)) {
        phrase = combined;
      } else {
        out.push(dict.get(phrase)!);
        dict.set(combined, code++);
        phrase = char;
      }
    }
    if (phrase !== "") out.push(dict.get(phrase)!);
    return out.map(c => String.fromCharCode(c)).join('');
  },

  decompress(data: string): string {
    const dict = new Map<number, string>();
    for (let i = 0; i < 256; i++) dict.set(i, String.fromCharCode(i));
    
    let phrase = data[0];
    let out = [phrase];
    let code = 256;
    let prevPhrase = phrase;

    for (let i = 1; i < data.length; i++) {
        const currCode = data.charCodeAt(i);
        const currPhrase = dict.has(currCode) ? dict.get(currCode)! : prevPhrase + prevPhrase[0];
        out.push(currPhrase);
        dict.set(code++, prevPhrase + currPhrase[0]);
        prevPhrase = currPhrase;
    }
    return out.join('');
  }
};

/**
 * Persistence Logic
 */
export const createPersistenceSystem = (initialState: Partial<GameState>) => {
  let _lastSaveTime = 0;

  /**
   * Safe Deep Merge Utility
   */
  const deepMerge = (target: any, source: any) => {
    Object.keys(source).forEach((key) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;

      const sourceVal = source[key];
      const targetVal = target[key];

      if (Array.isArray(sourceVal)) {
        target[key] = CONFIG.OVERWRITE_ARRAYS.has(key) 
          ? [...sourceVal] 
          : [...new Set([...(targetVal || []), ...sourceVal])];
      } else if (sourceVal && typeof sourceVal === 'object' && targetVal) {
        deepMerge(targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }
    });
    return target;
  };

  /**
   * Sanitizes and clamps state values to their limits
   */
  const clampState = (store: GameState) => {
    // 1. Clamp Stats (Energy, Magic, etc.)
    if (store.stats) {
      const STAT_MAP: Record<string, string> = {
        energy: 'maxEnergy',
        magic: 'maxMagic',
        satiation: 'maxSatiation'
      };
      
      Object.entries(STAT_MAP).forEach(([curr, max]) => {
        if (store.stats[curr] !== undefined && store.stats[max] !== undefined) {
          store.stats[curr] = Math.min(store.stats[max], store.stats[curr]);
        }
      });
    }

    // 2. Clamp Resources
    if (store.resources && store.limits) {
      Object.keys(store.resources).forEach((r) => {
        const resId = r as ResourceId;
        if (store.limits[resId] !== undefined) {
          store.resources[resId] = Math.min(store.limits[resId], store.resources[resId] ?? 0);
        }
      });
    }
  };

  return {
    saveGame(store: GameState, isManual = false) {
      const now = Date.now();
      if (!isManual && now - _lastSaveTime < CONFIG.THROTTLE_MS) return;
      _lastSaveTime = now;

      try {
        const saveObj: any = {};
        Object.keys(initialState).forEach((key) => {
          if (!CONFIG.EXCLUDE.includes(key)) {
            saveObj[key] = (store as any)[key];
          }
        });

        saveObj.version = 1;
        saveObj.timestamp = now;
        
        const json = JSON.stringify(saveObj);
        localStorage.setItem(CONFIG.SAVE_KEY, 'LZW:' + LZW.compress(json));
        localStorage.setItem('hasSave', 'true');
        store.hasSave = true;

        this.saveSettings(store);
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        store.saveInfoText = `${store.t('save_at', 'ui')} ${time}`;

        if (isManual) {
          store.addLog('save_success', 'logs', 'var(--accent-teal)');
          store.playSound('success');
          store.ui?.showToast?.(store.t('save_success', 'logs') as string, 'success');
        }
      } catch (err) {
        console.error('[PERSISTENCE] Save failed:', err);
      }
    },

    saveSettings(store: GameState) {
      const settings = {
        language: store.language,
        settings: (store as any).settings,
      };
      localStorage.setItem(CONFIG.SETTINGS_KEY, JSON.stringify(settings));
    },

    loadSettings(store: GameState) {
      const saved = localStorage.getItem(CONFIG.SETTINGS_KEY);
      if (!saved) return false;
      try {
        const data = JSON.parse(saved);
        if (data.language) store.language = data.language;
        if (data.settings) {
          (store as any).settings = { ...(store as any).settings, ...data.settings };
        }
        store.bus?.emit(store.EVENTS.SETTINGS_UPDATED);
        return true;
      } catch (e) {
        console.warn('[PERSISTENCE] Failed to load settings:', e);
        return false;
      }
    },

    loadGame(store: GameState) {
      let saved = localStorage.getItem(CONFIG.SAVE_KEY);
      if (!saved) return false;

      try {
        if (saved.startsWith('LZW:')) saved = LZW.decompress(saved.slice(4));
        const data = JSON.parse(saved);
        
        // Migration logic
        if (!data.version) data.version = 1;

        // Apply data to store
        deepMerge(store, data);
        clampState(store);

        // Rebuild dynamic systems
        if (store.actions?.rebuildProducers) store.actions.rebuildProducers(store);
        store.activeTasks = {};
        store.bus?.emit(store.EVENTS.SETTINGS_UPDATED);

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        store.saveInfoText = `${store.t('ui_load_at', 'ui')} ${time}`;
        return true;
      } catch (e) {
        console.error('[PERSISTENCE] Failed to load game:', e);
        return false;
      }
    },

    exportGameData() {
      const saved = localStorage.getItem(CONFIG.SAVE_KEY);
      if (!saved) return '';
      try {
        const payload = saved.startsWith('LZW:') ? saved : 'LZW:' + LZW.compress(saved);
        return btoa(unescape(encodeURIComponent(payload)));
      } catch {
        return saved;
      }
    },

    importGameData(_store: GameState, code: string) {
      if (!code) return false;
      try {
        const decoded = decodeURIComponent(escape(atob(code.trim().replace(/\s/g, ''))));
        const finalData = decoded.startsWith('LZW:') ? decoded : 'LZW:' + LZW.compress(decoded);
        
        // Verify JSON integrity before storing
        const verify = decoded.startsWith('LZW:') ? LZW.decompress(decoded.slice(4)) : decoded;
        JSON.parse(verify); 

        localStorage.setItem(CONFIG.SAVE_KEY, finalData);
        window.location.reload();
        return true;
      } catch (e) {
        console.error('[PERSISTENCE] Import failed:', e);
        return false;
      }
    },

    doHardReset() {
      localStorage.removeItem(CONFIG.SAVE_KEY);
      localStorage.removeItem('hasSave');
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
