import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the build-time constant so tests don't depend on whatever
// addons happen to be compiled into the current bundle.
vi.mock('../../generated/content', () => ({
  BUILD_TIME_ADDONS: [{ name: 'vandara', version: '0.1.0' }],
}));

import {
  registerRuntimeAddons,
  getActiveAddons,
  snapshotActiveAddonsForSave,
  compareAddonsAgainstSave,
} from './active';

describe('active-addons registry', () => {
  beforeEach(() => {
    // Start every test with no runtime addons registered.
    registerRuntimeAddons([]);
  });

  describe('getActiveAddons', () => {
    it('returns build-time addons even when no runtime ones are loaded', () => {
      const active = getActiveAddons();
      expect(active).toHaveLength(1);
      expect(active[0]).toMatchObject({ name: 'vandara', version: '0.1.0', source: 'build' });
    });

    it('merges build + runtime addons, sorted by name', () => {
      registerRuntimeAddons([{ name: 'apricot', version: '0.0.1' }]);
      const active = getActiveAddons();
      expect(active.map((a) => a.name)).toEqual(['apricot', 'vandara']);
      expect(active.find((a) => a.name === 'apricot')?.source).toBe('runtime');
      expect(active.find((a) => a.name === 'vandara')?.source).toBe('build');
    });

    it('clears prior runtime registration when called again', () => {
      registerRuntimeAddons([{ name: 'apricot', version: '0.0.1' }]);
      registerRuntimeAddons([]);
      expect(getActiveAddons()).toHaveLength(1); // only build-time vandara
    });
  });

  describe('snapshotActiveAddonsForSave', () => {
    it('strips source field so saves don\'t leak that internal distinction', () => {
      registerRuntimeAddons([{ name: 'apricot', version: '0.0.1' }]);
      const snap = snapshotActiveAddonsForSave();
      expect(snap).toEqual([
        { name: 'apricot', version: '0.0.1' },
        { name: 'vandara', version: '0.1.0' },
      ]);
    });
  });

  describe('compareAddonsAgainstSave', () => {
    it('returns ok when save matches loaded addons exactly', () => {
      const report = compareAddonsAgainstSave([{ name: 'vandara', version: '0.1.0' }]);
      expect(report.ok).toBe(true);
      expect(report.missing).toHaveLength(0);
      expect(report.added).toHaveLength(0);
      expect(report.versionDelta).toHaveLength(0);
    });

    it('reports missing addons (save needs more than is loaded)', () => {
      const report = compareAddonsAgainstSave([
        { name: 'vandara', version: '0.1.0' },
        { name: 'ghare', version: '0.5.0' }, // not loaded
      ]);
      expect(report.ok).toBe(false);
      expect(report.missing).toEqual([{ name: 'ghare', version: '0.5.0' }]);
    });

    it('reports added addons (loaded since save)', () => {
      registerRuntimeAddons([{ name: 'apricot', version: '0.0.1' }]);
      const report = compareAddonsAgainstSave([{ name: 'vandara', version: '0.1.0' }]);
      // Adding addons is OK (ok stays true) — the player just installed
      // something new. We just record the diff so the load path can
      // optionally log it.
      expect(report.ok).toBe(true);
      expect(report.added).toHaveLength(1);
      expect(report.added[0]?.name).toBe('apricot');
    });

    it('reports version deltas without flipping ok=false', () => {
      // Version delta IS technically a mismatch, but minor version moves
      // usually keep saves compatible. The renderer warns; the player
      // decides whether to keep going. ok still reflects "delta present".
      const report = compareAddonsAgainstSave([{ name: 'vandara', version: '0.0.5' }]);
      expect(report.ok).toBe(false);
      expect(report.versionDelta).toEqual([{ name: 'vandara', saved: '0.0.5', loaded: '0.1.0' }]);
    });

    it('treats missing/empty/non-array saved field as "no addons known"', () => {
      // Old saves predating this feature have no activeAddons field at
      // all. Compat check shouldn't blow up on undefined.
      const reportU = compareAddonsAgainstSave(undefined);
      const reportN = compareAddonsAgainstSave(null as any);
      const reportE = compareAddonsAgainstSave([]);
      for (const r of [reportU, reportN, reportE]) {
        expect(r.missing).toHaveLength(0);
        // The current vandara@0.1.0 counts as "added" relative to a
        // save that lists nothing — load path treats this as info, not
        // error.
        expect(r.added.map((a) => a.name)).toEqual(['vandara']);
        expect(r.ok).toBe(true);
      }
    });
  });
});
