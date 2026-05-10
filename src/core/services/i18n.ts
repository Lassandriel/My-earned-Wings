import { GameState } from '../../types/game';

/**
 * Localization System - TypeScript Edition
 * Uses global TRANSLATIONS for speed and reliability.
 */
export const createI18nSystem = () => {
  const missingOnce = new Set<string>();
  const warnMissing = (language: string, context: string, key: string) => {
    const id = `${language}:${context}:${key}`;
    if (missingOnce.has(id)) return;
    missingOnce.add(id);

    // Vite defines import.meta.env on the client; Electron main/preload do not use this module.
    const isDev =
      typeof import.meta !== 'undefined' &&
      (import.meta as any).env &&
      (import.meta as any).env.DEV;

    if (!isDev) return;

    // Expose enough info to fix quickly; keep it non-fatal by default.
    // If you want it to hard-fail in dev, set: window.__I18N_STRICT__ = true
    const strict = Boolean((window as any).__I18N_STRICT__);
    const msg = `[i18n] Missing key '${context}.${key}' (lang='${language}')`;
    if (strict) throw new Error(msg);
    console.warn(msg);
  };

  return {
    metadata: {
      id: 'i18n',
      delegates: ['t']
    },

    /**
     * Translates a key based on context and current language.
     */
    t(store: GameState, key: string, context = 'ui', params = {}, depth = 0) {
      if (depth > 5 || !key) return key || '';

      // Access global translations to avoid proxy overhead
      const translations = (window as any).TRANSLATIONS || {};
      const language = (store && store.language) ? store.language : 'en';
      const langData = (translations[language] || translations['en'] || translations['de'] || {});
      const contextData = (langData[context] || {});
      let data = contextData[key];
      
      // Fallback if key is missing
      if (data === undefined || data === null) {
          warnMissing(language, context, key);
          return context === 'ui' ? `[${key}]` : key;
      }
      
      const escapeHtml = (str: string): string =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

      const playerName = (store && store.playerName) ? escapeHtml(store.playerName) : 'Wanderer';
      const playerBold = `<strong>${playerName}</strong>`;
      
      const finalParams: Record<string, any> = {
        ...params,
        player: playerBold,
        playerName: playerBold,
      };

      // Process parameters (Recursive translation for keys)
      const translatedParams: Record<string, any> = {};
      Object.entries(finalParams).forEach(([k, v]) => {
        if (k.endsWith('Key') && typeof v === 'string') {
          const actualKey = k.replace('Key', '');
          const subContext = (params as any).dialogContext || (params as any).context || 'ui';
          let translated = this.t(store, v, subContext, params, depth + 1);
          
          if ((translated === `[${v}]` || translated === v) && subContext !== 'ui') {
             translated = this.t(store, v, 'ui', params, depth + 1);
          }
          translatedParams[actualKey] = translated;
        } else {
          translatedParams[k] = v;
        }
      });

      // Replacement Logic
      const replaceRecursive = (val: any, rDepth = 0): any => {
        if (rDepth > 10) return val;
        if (typeof val === 'string') {
          let replaced = val;
          if (!replaced.includes('{')) return replaced;

          for (let pass = 0; pass < 2; pass++) {
            Object.entries(translatedParams).forEach(([k, v]) => {
              if (replaced.includes(`{${k}}`)) {
                replaced = replaced.split(`{${k}}`).join(v);
              }
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
