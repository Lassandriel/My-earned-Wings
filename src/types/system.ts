import { GameState } from './game';

/**
 * Metadata for a game system.
 */
export interface SystemMetadata {
  id: string;
  bootPriority?: number; // Lower number = earlier boot
  delegates?: string[] | Record<string, string>; // Methods to expose on the main store (array for identity, object for alias)
}

/**
 * Interface for all game systems.
 */
export interface GameSystem {
  metadata?: SystemMetadata;
  boot?: (store: GameState) => void;
  init?: (store: GameState) => void;
  [key: string]: any; // Allow for other methods
}
