import { GameState } from '../types/game';

/**
 * Ellie System - TypeScript Edition
 * Specific logic for the tutorial companion.
 */
export const createEllieSystem = () => ({
  showIntro(store: GameState) {
    store.showEllieIntro = true;
  },

  close(store: GameState) {
    store.showEllieIntro = false;
  },
});
