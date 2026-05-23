import { GameState } from '../../types/game';
import { makeLogger } from '../log';

const log = makeLogger('JUICE');

// DOM element cache
let container: HTMLElement | null = null;

declare const Alpine: {
  store: <T = any>(name: string, value?: T) => T;
};

/**
 * Juice System - TypeScript Edition
 * Handles visual feedback, particles, and haptics.
 */
export const createJuiceSystem = () => {
  return {
    metadata: {
      id: 'juice',
    },

    boot(store: GameState) {
      container = document.getElementById('juice-container');
      if (!container) {
        log.warn('Juice container not found. Particles disabled.');
      }
      store.bus.on(store.EVENTS.PARTICLE_TRIGGERED, (data: any) => {
        this.spawnParticle(data.x, data.y, data.text, data.type);
      });
    },

    /**
     * Particles are CSS-driven: `type` becomes the class suffix
     * `p-<type>` and the stylesheet decides how it looks. That makes
     * the system trivially extensible — addons just ship their own
     * `styles/<file>.css` with rules like:
     *   .juice-particle.p-shadow { color: #6b21a8; }
     * Unknown types still render via the base `.juice-particle` rule
     * (font, animation, fallback color in feedback.css), so a typo or
     * a stripped-out addon doesn't produce invisible effects.
     */
    spawnParticle(x: number, y: number, text: string, type: string = 'normal') {
      const store = Alpine.store<GameState>('game');
      const settings = store.settings || {};
      if (!container || !settings.showJuice) return;

      const el = document.createElement('div');
      el.className = `juice-particle p-${type}`;
      el.style.animation = 'float-up-fade-juice 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      el.innerText = text;

      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 10;
      el.style.left = `${x + offsetX}px`;
      el.style.top = `${y - 20 + offsetY}px`;

      container.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 1300);
    },
  };
};
