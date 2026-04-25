import { GameState } from '../types/game';

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
    t(store: GameState, key: string, context = 'ui', params = {}) {
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
      const finalParams: Record<string, any> = {
        player: `<strong>${playerName}</strong>`,
        ...params
      };

      // NEW: Automatically translate any parameter ending in 'Key'
      const translatedParams: Record<string, any> = {};
      Object.entries(finalParams).forEach(([k, v]) => {
        if (k.endsWith('Key') && typeof v === 'string') {
          const actualKey = k.replace('Key', '');
          const subContext = (params as any).dialogContext || (params as any).context || 'ui';
          translatedParams[actualKey] = this.t(store, v, subContext);
        } else {
          translatedParams[k] = v;
        }
      });

      const replaceRecursive = (val: any): any => {
        if (typeof val === 'string') {
          let replaced = val;
          Object.entries(translatedParams).forEach(([k, v]) => {
            replaced = replaced.replace(new RegExp(`{${k}}`, 'g'), v);
          });
          return replaced;
        } else if (typeof val === 'object' && val !== null) {
          const result: any = Array.isArray(val) ? [] : {};
          for (let k in val) {
            result[k] = replaceRecursive(val[k]);
          }
          return result;
        }
        return val;
      };

      return replaceRecursive(data);
    },
  };
};
