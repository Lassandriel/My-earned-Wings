/**
 * Asset Preloader Service
 * Ensures critical images are loaded in the browser cache before display.
 * Prevents UI flickering during scenery transitions.
 */
export const createPreloaderSystem = () => {
  const _cache = new Set<string>();

  return {
    /**
     * Preloads a single image URL.
     */
    preloadImage(url: string): Promise<void> {
      if (_cache.has(url)) return Promise.resolve();
      
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          _cache.add(url);
          resolve();
        };
        img.onerror = () => {
          console.warn(`[PRELOADER] Failed to load: ${url}`);
          reject();
        };
        img.src = url;
      });
    },

    /**
     * Preloads a list of essential game assets.
     */
    async preloadEssential() {
      console.log('[PRELOADER] Starting essential asset preload...');
      
      const assets = [
        'img/menu/logo_wings.webp',
        'img/npcs/Ellie.webp',
        // Background sets (Initial)
        'img/background/background 1/1.webp',
        'img/background/background 1/2.webp',
        'img/background/background 1/3.webp',
      ];

      // Add common UI elements if needed
      
      const promises = assets.map(url => this.preloadImage(url));
      await Promise.allSettled(promises);
      
      console.log('[PRELOADER] Essential assets preloaded.');
    },

    /**
     * Preloads a background set dynamically.
     */
    async preloadBackgroundSet(setName: string, layerCount: number) {
      const promises = [];
      for (let i = 1; i <= layerCount; i++) {
        promises.push(this.preloadImage(`img/background/${setName}/${i}.webp`));
      }
      await Promise.allSettled(promises);
    }
  };
};
