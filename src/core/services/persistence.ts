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
    'discoveredItems',
    'discoveredResources',
    'placedItems',
    'unlockedRecipes',
    'unlockedNPCs',
    'discoveredTitles',
    'activeProducers',
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
    
    // Safety: Convert codes to a UTF-16 string that is safe for LocalStorage
    // We use a simple 2-byte-per-code approach to avoid surrogate pair issues
    const buf = new Uint16Array(out);
    const bytes = new Uint8Array(buf.buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  },

  decompress(data: string): string {
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const codes = new Uint16Array(bytes.buffer);

    const dict = new Map<number, string>();
    for (let i = 0; i < 256; i++) dict.set(i, String.fromCharCode(i));
    
    if (codes.length === 0) return "";
    
    let phrase = dict.get(codes[0])!;
    let out = [phrase];
    let code = 256;
    let prevPhrase = phrase;

    for (let i = 1; i < codes.length; i++) {
        const currCode = codes[i];
        let currPhrase: string;
        if (dict.has(currCode)) {
          currPhrase = dict.get(currCode)!;
        } else {
          currPhrase = prevPhrase + prevPhrase[0];
        }
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
   * Validates loaded data against the current initial state to ensure schema integrity.
   */
  const validateAndMigrate = (data: any) => {
    if (!data || typeof data !== 'object') return initialState;

    // 1. Ensure all top-level keys from initialState exist
    Object.keys(initialState).forEach((key) => {
      if (!CONFIG.EXCLUDE.includes(key) && data[key] === undefined) {
        console.warn(`[PERSISTENCE] Missing key "${key}" in save. Applying default.`);
        (data as Record<string, unknown>)[key] = initialState[key as keyof GameState];
      }
    });

    // 2. Specialized migrations
    if (!data.version) data.version = 1;
    
    // Future migrations would go here:
    // if (data.version < 2) { ... data.version = 2; }

    return data;
  };

  /**
   * Sanitizes and clamps state values to their limits
   */
  const clampState = (store: GameState) => {
    if (!store.resource) return;

    // 1. Clamp Stats (Energy, Magic, etc.)
    if (store.stats) {
      const statsToClamp = ['energy', 'magic', 'satiation'] as const;
      
      statsToClamp.forEach((statId) => {
        if (store.stats[statId] !== undefined) {
          const max = store.resource.getMaxStat(store, statId);
          store.stats[statId] = Math.min(max, store.stats[statId]);
        }
      });
    }

    // 2. Clamp Resources
    if (store.resources) {
      Object.keys(store.resources).forEach((r) => {
        const resId = r as ResourceId;
        const limit = store.resource.getLimit(store, resId);
        if (store.resources[resId] !== undefined) {
          store.resources[resId] = Math.min(limit, store.resources[resId] ?? 0);
        }
      });
    }
  };

  /**
   * Maps action IDs that were renamed in newer game versions so old saves keep
   * their unlocks/counters/recipes. Add new entries here whenever you rename
   * an action, item, npc, etc. — silent drop happens otherwise.
   */
  const LEGACY_ID_MAP: Record<string, string> = {
    // 2026-05-14: Phase 1.5 follow-up — primary actions standardised to English,
    //             Sanctum meditation got -sanctum suffix to free up `act-meditate`.
    'act-essen': 'act-eat',
    'act-ausruhen': 'act-rest',
    'act-meditieren': 'act-meditate',
    'act-meditate': 'act-meditate-sanctum',
  };

  const remapLegacyIds = (store: GameState) => {
    const remapArr = (arr: unknown): unknown =>
      Array.isArray(arr) ? arr.map((v) => (typeof v === 'string' && LEGACY_ID_MAP[v]) || v) : arr;
    const remapKeys = (obj: Record<string, unknown> | undefined): Record<string, unknown> | undefined => {
      if (!obj || typeof obj !== 'object') return obj;
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        const newKey = LEGACY_ID_MAP[k] || k;
        if (newKey in out && typeof out[newKey] === 'number' && typeof v === 'number') {
          out[newKey] = (out[newKey] as number) + v;
        } else {
          out[newKey] = v;
        }
      }
      return out;
    };

    if (store.unlockedRecipes) store.unlockedRecipes = remapArr(store.unlockedRecipes) as string[];
    if (store.counters) store.counters = remapKeys(store.counters as any) as any;
  };

  /**
   * Removes legacy/invalid IDs from save arrays.
   * Runs after remapLegacyIds() so renames survive the cleanup.
   */
  const sanitizeSaveArrays = (store: GameState) => {
    remapLegacyIds(store);
    const contentService = store.content as unknown as { registries?: Record<string, Record<string, unknown>> };
    const regs = contentService?.registries;
    if (!regs) return;

    const safeFilter = <T>(arr: T[], predicate: (v: T) => boolean): T[] =>
      Array.isArray(arr) ? arr.filter(predicate) : [];

    store.discoveredItems = safeFilter(store.discoveredItems, (id) => {
      return typeof id === 'string' && id.startsWith('item-') && !!regs.items?.[id];
    });

    store.unlockedRecipes = safeFilter(store.unlockedRecipes, (id) => {
      return typeof id === 'string' && !!regs.actions?.[id];
    });

    store.unlockedNPCs = safeFilter(store.unlockedNPCs, (id) => {
      return typeof id === 'string' && !!regs.npcs?.[id];
    });

    store.discoveredTitles = safeFilter(store.discoveredTitles, (id) => {
      return typeof id === 'string' && !!regs.titles?.[id];
    });
  };

  return {
    metadata: {
      id: 'persistence',
      delegates: { loadGame: 'loadGame' }
    },
    saveGame(store: GameState, isManual = false) {
      const now = Date.now();
      if (!isManual && now - _lastSaveTime < CONFIG.THROTTLE_MS) return;
      _lastSaveTime = now;

      try {
        // Phase 2 Step 8: prefer the engine's plain state if available — it
        // is the source of truth and may have mutations not yet pushed to
        // the Alpine store by UISync.
        const truth =
          (store.engine as unknown as { services?: { gameState?: GameState } })?.services?.gameState ?? store;

        const saveObj: any = {};
        Object.keys(initialState).forEach((key) => {
          if (!CONFIG.EXCLUDE.includes(key)) {
            (saveObj as Record<string, unknown>)[key] = (truth as unknown as Record<string, unknown>)[key];
          }
        });

        saveObj.version = 1;
        saveObj.timestamp = now;

        const json = JSON.stringify(saveObj);

        // Phase 3 Stage 1: localStorage stays the synchronous source of
        // truth (loadGame is still sync). When running inside Electron we
        // ALSO write to SQLite so the file-on-disk save is built up in
        // parallel; when the read path migrates to async we'll flip the
        // truth source. SQLite write is fire-and-forget via IPC.
        localStorage.setItem(CONFIG.SAVE_KEY, 'LZW:' + LZW.compress(json));
        if (window.electronAPI?.dbSave) {
          window.electronAPI.dbSave({
            slot: 0, // single auto-save slot for now
            playerName: (truth as GameState).playerName || '',
            data: json,
            totalPlayTime: ((truth as GameState).counters?.totalTime as number) || 0,
          }).catch((err) => console.error('[PERSISTENCE] SQLite save failed:', err));
        }
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
        settings: store.settings,
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
          Object.assign(store.settings, data.settings);
        }
        store.bus?.emit(store.EVENTS.SETTINGS_UPDATED);
        return true;
      } catch (e) {
        console.warn('[PERSISTENCE] Failed to load settings:', e);
        return false;
      }
    },

    async loadGame(store: GameState): Promise<boolean> {
      // Phase 3 Stage 2: prefer SQLite (Electron). The DB stores the JSON
      // uncompressed (saveGame writes it that way); fall back to the
      // localStorage LZW path so the game still loads in the vite dev
      // browser and during the Electron rollout window.
      let savedJson: string | null = null;

      if (window.electronAPI?.dbLoad) {
        try {
          const row = await window.electronAPI.dbLoad(0);
          if (row && row.data) savedJson = row.data;
        } catch (err) {
          console.warn('[PERSISTENCE] SQLite load failed, falling back to localStorage:', err);
        }
      }

      if (!savedJson) {
        let saved = localStorage.getItem(CONFIG.SAVE_KEY);
        if (!saved) return false;
        if (saved.startsWith('LZW:')) saved = LZW.decompress(saved.slice(4));
        savedJson = saved;
      }

      try {
        const data = JSON.parse(savedJson);
        
        // Validation & Migration logic
        const validatedData = validateAndMigrate(data);

        // Apply data to store
        deepMerge(store, validatedData);

        // Phase 2 Step 8: also push the loaded data into the engine's plain
        // state (separate object) so the engine doesn't keep the pre-load
        // values for resources / flags / etc. Skip if they're identity-equal.
        const engineState =
          (store.engine as unknown as { services?: { gameState?: GameState } })?.services?.gameState;
        if (engineState && engineState !== store) {
          Object.keys(validatedData).forEach((key) => {
            if (!CONFIG.EXCLUDE.includes(key)) {
              (engineState as unknown as Record<string, unknown>)[key] =
                (store as unknown as Record<string, unknown>)[key];
            }
          });
        }
        
        // CRITICAL: Invalidate caches BEFORE clamping, so getMaxStat uses fresh data from loaded flags/items
        if (store.pipeline) store.pipeline.invalidateCache();
        if (store.resource) store.resource.invalidateCache();

        clampState(store);
        sanitizeSaveArrays(store);

        // Rebuild dynamic systems
        if (store.actions?.rebuildProducers) store.actions.rebuildProducers(store);
        store.activeTasks = {};
        
        if (store.pipeline) store.pipeline.invalidateCache();
        if (store.resource) store.resource.invalidateCache();
        
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
      
      // Initialize hasSave state from localStorage
      store.hasSave = !!localStorage.getItem(CONFIG.SAVE_KEY);

      store.bus.on(store.EVENTS.SAVE_REQUESTED, (data: any) => {
        this.saveGame(store, data?.isManual || false);
      });
    },
  };
};
