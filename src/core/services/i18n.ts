import { GameState } from '../../types/game';

/**
 * Localization System - TypeScript Edition
 * Handles translation lookups and parameter replacement.
 */
export const createI18nSystem = () => {
  return {
    /**
     * Translates a key based on context and current language.
     * Supports parameter replacement and recursive object translation.
     */
    t(store: GameState, key: string, context = 'ui', params = {}, depth = 0) {
      if (depth > 5) return key; // Prevent infinite recursion

      const translations = (store as any).translations || {};
      const langData = translations[store.language] || {};
      const contextData = langData[context] || {};
      let data = contextData[key];
      
      if (data === undefined) {
          if (key && key !== 'undefined' && key !== 'null') {
              console.warn(`[I18N] Missing key: "${key}" in context: "${context}" (${store.language})`);
          }
          data = context === 'ui' ? `[${key}]` : key;
      }
      
      const playerName = store.playerName || 'Wandler';
      const playerBold = `<strong>${playerName}</strong>`;
      
      const finalParams: Record<string, any> = {
        ...params,
        player: playerBold,
        playerName: playerBold, // Ensure both are bolded and take precedence
      };

      // NEW: Automatically translate any parameter ending in 'Key'
      const translatedParams: Record<string, any> = {};
      Object.entries(finalParams).forEach(([k, v]) => {
        if (k.endsWith('Key') && typeof v === 'string') {
          const actualKey = k.replace('Key', '');
          const subContext = (params as any).dialogContext || (params as any).context || 'ui';
          // RECURSIVE CALL: Pass the same params down to allow {player} in dialogue lines
          let translated = this.t(store, v, subContext, params, depth + 1);
          
          // FALLBACK: If not found in subContext, try 'ui' (good for names)
          if ((translated === `[${v}]` || translated === v) && subContext !== 'ui') {
             translated = this.t(store, v, 'ui', params, depth + 1);
          }
          translatedParams[actualKey] = translated;
        } else {
          translatedParams[k] = v;
        }
      });

      const replaceRecursive = (val: any, rDepth = 0): any => {
        if (rDepth > 10) return val; // Safety for nested objects
        if (typeof val === 'string') {
          let replaced = val;
          // Run up to 3 passes to handle nested tags like {item} -> {player}
          for (let pass = 0; pass < 3; pass++) {
            if (!replaced.includes('{')) break;
            Object.entries(translatedParams).forEach(([k, v]) => {
              const escapedK = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              replaced = replaced.replace(new RegExp(`{${escapedK}}`, 'g'), () => v);
            });
          }
          return replaced;
        } else if (typeof val === 'object' && val !== null) {
          const result: any = Array.isArray(val) ? [] : {};
          for (let k in val) {
            result[k] = replaceRecursive(val[k], rDepth + 1);
          }
          return result;
        }
        return val;
      };

      return replaceRecursive(data);
    },
  };
};
