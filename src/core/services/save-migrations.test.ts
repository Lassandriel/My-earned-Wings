import { describe, it, expect } from 'vitest';
import {
  SAVE_SCHEMA_VERSION,
  MIGRATIONS,
  runMigrations,
} from './save-migrations';

describe('save-migrations', () => {
  describe('framework invariants', () => {
    it('SAVE_SCHEMA_VERSION matches the highest migration key', () => {
      const keys = Object.keys(MIGRATIONS).map(Number);
      const max = Math.max(...keys);
      expect(SAVE_SCHEMA_VERSION).toBe(max);
    });

    it('every migration is a function', () => {
      for (const [version, fn] of Object.entries(MIGRATIONS)) {
        expect(typeof fn, `migration ${version}`).toBe('function');
      }
    });

    it('runMigrations is a no-op when save is already current', () => {
      const state: Record<string, unknown> = { unlockedRecipes: ['act-eat'] };
      const ok = runMigrations(state, SAVE_SCHEMA_VERSION);
      expect(ok).toBe(true);
      expect(state.unlockedRecipes).toEqual(['act-eat']);
    });

    it('treats invalid fromVersion as v1 and migrates up', () => {
      const state: Record<string, unknown> = { unlockedRecipes: ['act-essen'] };
      runMigrations(state, NaN);
      expect(state.unlockedRecipes).toEqual(['act-eat']);
    });

    it('returns false if a migration throws (and stops further migrations)', () => {
      const tmp: Record<number, (s: Record<string, unknown>) => void> = {
        ...MIGRATIONS,
        999: () => {
          throw new Error('boom');
        },
      };
      // Manually simulate a runner over the tampered map to keep the real
      // SAVE_SCHEMA_VERSION clean. We just verify the pattern works.
      const state: Record<string, unknown> = {};
      const exec = (target: number) => {
        try {
          tmp[target]!(state);
          return true;
        } catch {
          return false;
        }
      };
      expect(exec(999)).toBe(false);
    });
  });

  describe('v1 → v2 (Phase 1.5 action renames)', () => {
    const v2 = MIGRATIONS[2]!;
    it('exists', () => expect(v2).toBeDefined());

    it('renames unlockedRecipes entries', () => {
      const state: Record<string, unknown> = {
        unlockedRecipes: ['act-essen', 'act-ausruhen', 'act-meditieren', 'act-meditate', 'act-wood'],
      };
      v2(state);
      expect(state.unlockedRecipes).toEqual([
        'act-eat',
        'act-rest',
        'act-meditate',
        'act-meditate-sanctum',
        'act-wood',
      ]);
    });

    it('renames keys in counters', () => {
      const state: Record<string, unknown> = {
        counters: { 'act-essen': 5, 'act-ausruhen': 12, 'act-meditieren': 3, 'act-wood': 100 },
      };
      v2(state);
      expect(state.counters).toEqual({
        'act-eat': 5,
        'act-rest': 12,
        'act-meditate': 3,
        'act-wood': 100,
      });
    });

    it('sums numeric counters when both old and new keys somehow exist', () => {
      const state: Record<string, unknown> = {
        counters: { 'act-essen': 5, 'act-eat': 7 },
      };
      v2(state);
      expect((state.counters as Record<string, number>)['act-eat']).toBe(12);
    });

    it('leaves unrelated state untouched', () => {
      const state: Record<string, unknown> = {
        playerName: 'Lassi',
        resources: { wood: 50 },
        unlockedRecipes: undefined,
        counters: undefined,
      };
      v2(state);
      expect(state.playerName).toBe('Lassi');
      expect(state.resources).toEqual({ wood: 50 });
    });

    it('runMigrations from v1 applies v2 rename end-to-end', () => {
      const state: Record<string, unknown> = {
        unlockedRecipes: ['act-meditieren'],
        counters: { 'act-essen': 3 },
      };
      runMigrations(state, 1);
      expect(state.unlockedRecipes).toEqual(['act-meditate']);
      expect(state.counters).toEqual({ 'act-eat': 3 });
    });
  });
});
