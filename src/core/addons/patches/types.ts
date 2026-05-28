/**
 * Shared types for the patch engine. Each per-category file extends
 * BasePatchEntry with its own op fields and exports them; the union
 * `PatchEntry` lives in index.ts so the directory has one obvious
 * public-API entry point.
 */

export type PatchTargetType =
  | 'action'
  | 'npc'
  | 'item'
  | 'buff'
  | 'resource'
  | 'modifier'
  | 'home'
  | 'navigation'
  | 'milestone'
  | 'section';

export interface BasePatchEntry {
  targetType: PatchTargetType;
  targetId: string;
}

export interface PatchApplyContext {
  /** Where the patch came from — included in error messages. */
  origin: string;
  /**
   * What to do when a patch references something that doesn't exist.
   * `'throw'` for build time (loud failure, addon author sees it);
   * `'warn'` for runtime (the dropped-in addon may target a future
   * version of base; don't crash the game).
   */
  missingTarget: 'throw' | 'warn';
}

export interface PatchApplyResult {
  /** Total entries successfully applied (across all patches passed in). */
  applied: number;
  /** Human-readable warnings (only meaningful when missingTarget='warn'). */
  warnings: string[];
}

/**
 * The registry bag passed into applyPatches. Only `action` and `npc`
 * are required (they're the most common targets and the earliest in
 * the patch system's history); everything else is optional. When an
 * entry targets a category whose registry isn't in the bag, the
 * patch is reported as a missing-target rather than crashing.
 */
export interface PatchRegistries {
  action: Record<string, any>;
  npc: Record<string, any>;
  item?: Record<string, any>;
  buff?: Record<string, any>;
  resource?: Record<string, any>;
  modifier?: Record<string, any>;
  home?: Record<string, any>;
  navigation?: Record<string, any>;
  milestone?: Record<string, any>;
  section?: Record<string, any>;
}
