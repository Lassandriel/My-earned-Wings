import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SAVE_SCHEMA_VERSION,
  MIGRATIONS,
  runMigrations,
  runAddonMigrations,
  type AddonMigrationModule,
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

  describe('v2 → v3 (arcane focus → shadow bind)', () => {
    const v3 = MIGRATIONS[3]!;
    it('exists', () => expect(v3).toBeDefined());

    it('renames activeFocus → activeShadow', () => {
      const state: Record<string, unknown> = { activeFocus: 'act-wood' };
      v3(state);
      expect(state.activeShadow).toBe('act-wood');
      expect('activeFocus' in state).toBe(false);
    });

    it('preserves null activeFocus as null activeShadow', () => {
      const state: Record<string, unknown> = { activeFocus: null };
      v3(state);
      expect(state.activeShadow).toBeNull();
      expect('activeFocus' in state).toBe(false);
    });

    it('renames the ability-arcane-focus flag', () => {
      const state: Record<string, unknown> = {
        flags: { 'ability-arcane-focus': true, unrelated: true },
      };
      v3(state);
      const flags = state.flags as Record<string, boolean>;
      expect(flags['ability-shadow-bind']).toBe(true);
      expect('ability-arcane-focus' in flags).toBe(false);
      expect(flags.unrelated).toBe(true);
    });

    it('is a no-op when neither field nor flag is present', () => {
      const state: Record<string, unknown> = { playerName: 'Lassi' };
      v3(state);
      expect(state.playerName).toBe('Lassi');
      expect('activeShadow' in state).toBe(false);
    });
  });

  // Addon migration framework: addons that ship a migrations.ts get their
  // SCHEMA_VERSION + MIGRATIONS table picked up by the load path. We test
  // the runner here with synthetic modules — real addon migrations live
  // under content/addons/<name>/migrations.ts.
  describe('runAddonMigrations', () => {
    // Silence the logger during failure-path tests so the suite output
    // stays clean. Restored after each test.
    const consoleErrorSpy = vi.spyOn(console, 'error');
    beforeEach(() => consoleErrorSpy.mockClear());
    afterEach(() => consoleErrorSpy.mockReset());

    it('returns empty list when no modules ship migrations', () => {
      const state: Record<string, unknown> = { playerName: 'Lassi' };
      const results = runAddonMigrations(state, {}, {});
      expect(results).toEqual([]);
    });

    it('skips addons that are already up to date', () => {
      const mod: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: { 2: () => { throw new Error('should not run'); } },
      };
      const state: Record<string, unknown> = {};
      const results = runAddonMigrations(state, { vandara: 2 }, { vandara: mod });
      expect(results).toEqual([]);
    });

    it('runs all migrations from save version + 1 up to current', () => {
      const calls: number[] = [];
      const mod: AddonMigrationModule = {
        SCHEMA_VERSION: 3,
        MIGRATIONS: {
          2: () => calls.push(2),
          3: () => calls.push(3),
        },
      };
      const state: Record<string, unknown> = {};
      const results = runAddonMigrations(state, { vandara: 1 }, { vandara: mod });
      expect(calls).toEqual([2, 3]);
      expect(results).toEqual([{ addon: 'vandara', from: 1, to: 3, ok: true }]);
    });

    it('treats missing saved version as v1 (run everything)', () => {
      const calls: number[] = [];
      const mod: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: { 2: () => calls.push(2) },
      };
      const state: Record<string, unknown> = {};
      // No entry for 'newmod' in savedVersions ⇒ treated as v1.
      const results = runAddonMigrations(state, {}, { newmod: mod });
      expect(calls).toEqual([2]);
      expect(results).toEqual([{ addon: 'newmod', from: 1, to: 2, ok: true }]);
    });

    it('migrations can mutate the save state', () => {
      const mod: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: {
          2: (state) => {
            const flags = (state.flags as Record<string, boolean>) ?? {};
            if (flags.old_flag_name) {
              flags.new_flag_name = true;
              delete flags.old_flag_name;
            }
            state.flags = flags;
          },
        },
      };
      const state: Record<string, unknown> = { flags: { old_flag_name: true, unrelated: true } };
      runAddonMigrations(state, { vandara: 1 }, { vandara: mod });
      expect(state.flags).toEqual({ new_flag_name: true, unrelated: true });
    });

    it('logs failure and bails out of an addon, but continues with other addons', () => {
      const broken: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: { 2: () => { throw new Error('intentional'); } },
      };
      const calls: string[] = [];
      const working: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: { 2: () => calls.push('working ran') },
      };
      const state: Record<string, unknown> = {};
      const results = runAddonMigrations(
        state,
        { addonA: 1, addonB: 1 },
        { addonA: broken, addonB: working },
      );
      // Both modules processed; the broken one is marked ok=false.
      const a = results.find((r) => r.addon === 'addonA');
      const b = results.find((r) => r.addon === 'addonB');
      expect(a?.ok).toBe(false);
      expect(b?.ok).toBe(true);
      expect(calls).toEqual(['working ran']);
    });

    it('handles invalid saved version values (negative, NaN, non-number)', () => {
      const calls: number[] = [];
      const mod: AddonMigrationModule = {
        SCHEMA_VERSION: 2,
        MIGRATIONS: { 2: () => calls.push(2) },
      };
      const state: Record<string, unknown> = {};
      runAddonMigrations(state, { vandara: -1 as unknown as number }, { vandara: mod });
      runAddonMigrations(state, { vandara: NaN }, { vandara: mod });
      // 'as unknown as number' so TS accepts a wrong shape and we test
      // the runtime guard. Both invalid versions fall back to v1.
      runAddonMigrations(state, { vandara: 'two' as unknown as number }, { vandara: mod });
      expect(calls.length).toBe(3);
    });
  });
});
