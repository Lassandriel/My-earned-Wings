import { GameState } from '../../types/game';

/**
 * Dynamic Background, Time of Day & Parallax System
 * Synchronizes background sets with the game's totalTime counter.
 */
export const createBackgroundSystem = () => {
  const SET_CONFIG: Record<string, { layers: number; duration: number }> = {
    'background_1': { layers: 6, duration: 150 }, // Morning
    'background_2': { layers: 4, duration: 150 }, // Midday
    'background_3': { layers: 4, duration: 150 }, // Evening
    'background_4': { layers: 3, duration: 150 }, // Night
  };

  return {
    currentSet: '',

    boot(store: GameState) {
      // Listen for time changes to update background cycle
      (window as any).Alpine.effect(() => {
        const totalTime = store.counters.totalTime || 0;
        const cycleTime = totalTime % 600; // 10 minute full cycle
        
        let targetSet = 'background_1';
        if (cycleTime < 150) targetSet = 'background_1';
        else if (cycleTime < 300) targetSet = 'background_2';
        else if (cycleTime < 450) targetSet = 'background_3';
        else targetSet = 'background_4';

        if (this.currentSet !== targetSet) {
          this.updateBackground(targetSet);
          this.currentSet = targetSet;
        }
      });

      let startTime = Date.now();
      let isAnimating = false;
      const animate = () => {
        if (store.view === 'menu' || store.view === 'prologue') {
          isAnimating = false;
          return;
        }

        const elapsed = (Date.now() - startTime) / 1000;
        const layers = document.querySelectorAll('.bg-layer');
        
        layers.forEach((layer, index) => {
          const depth = (index + 1);
          // Front layers move faster and further
          const moveX = Math.sin(elapsed * (0.1 + depth * 0.02)) * (depth * 5);
          const moveY = Math.cos(elapsed * (0.08 + depth * 0.01)) * (depth * 2);
          
          (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
        });

        requestAnimationFrame(animate);
      };
      
      store.bus.on(store.EVENTS.VIEW_CHANGED, () => {
        if (!isAnimating && store.view !== 'menu' && store.view !== 'prologue') {
          isAnimating = true;
          requestAnimationFrame(animate);
        }
      });

      if (store.view !== 'menu' && store.view !== 'prologue') {
        isAnimating = true;
        requestAnimationFrame(animate);
      }
    },

    async updateBackground(setName: string) {
      const container = document.getElementById('background-container');
      const store = (window as any).Alpine.store('game');
      if (!container || !store) return;

      const config = SET_CONFIG[setName] || { layers: 4 };
      const layerCount = config.layers;
      
      // 1. Start Preloading in background
      await store.preloader.preloadBackgroundSet(setName, layerCount);

      // 2. Use transition for smooth fade
      container.style.opacity = '0.5';
      
      setTimeout(() => {
        container.innerHTML = '';
        
        // Add a base layer
        const base = document.createElement('div');
        base.className = 'bg-base-layer';
        container.appendChild(base);

        for (let i = 1; i <= layerCount; i++) {
          const layer = document.createElement('div');
          layer.className = `bg-layer layer-${i}`;
          layer.style.backgroundImage = `url('img/background/${setName}/${i}.webp')`;
          layer.style.zIndex = i.toString();
          container.appendChild(layer);
        }
        
        container.style.opacity = '1';
      }, 500);
    }
  };
};
