import { makeLogger } from '../log';

const log = makeLogger('PRELOADER');

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
      
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          _cache.add(url);
          // Optional: decode() ensures the image is ready for the GPU
          if ('decode' in img) {
            img.decode()
              .then(() => resolve())
              .catch(() => resolve()); // Still resolve even if decode fails
          } else {
            resolve();
          }
        };
        img.onerror = () => {
          log.warn(`Failed to load: ${url}`);
          resolve(); // Resolve anyway to not block the chain
        };
        img.src = url;
      });
    },

    /**
     * Bootstrapper entry point.
     */
    boot() {
      this.preloadEssential();
    },

    /**
     * Preloads a list of essential game assets.
     */
    async preloadEssential() {
      log.info('Starting essential asset preload...');
      
      const assets = [
        'img/menu/logo_wings.webp',
        'img/npcs/Ellie.webp',
        'img/npcs/teacher_aria.webp',
        'img/npcs/baker_gara.webp',
        'img/npcs/hunter_nyx.webp',
        'img/Game_icon.webp',
        'img/Stat_head.webp',
        // Background sets (Initial)
        'img/background/background 1/1.webp',
        'img/background/background 1/2.webp',
        'img/background/background 1/3.webp',
        'img/background/background 1/4.webp',
        'img/background/background 1/5.webp',
        'img/background/background 1/6.webp',
        // Common Menu Icons
        'img/menu/menu_village.webp',
        'img/menu/menu_crafting.webp',
        'img/menu/menu_housing.webp',
        'img/menu/menu_story.webp'
      ];

      // Add common UI elements if needed
      
      const promises = assets.map(url => this.preloadImage(url));
      await Promise.allSettled(promises);
      
      log.info('Essential assets preloaded.');
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
