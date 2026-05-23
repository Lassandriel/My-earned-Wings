/**
 * Tests for the `addonState` namespace contract. The actual helper
 * lives inline in src/main.ts (alongside other store helpers like
 * addLog/playSound), so we test the *contract* by re-implementing
 * the helper here and asserting on its behaviour. If the production
 * helper diverges from this shape, the integration test in main.ts
 * (Alpine boot) will catch it.
 */

import { describe, it, expect } from 'vitest';

// Local copy of the helper logic — kept in sync with src/main.ts.
// The cast pattern mirrors production so we test the same guards.
const makeAddonStateFor = (store: { addonState: Record<string, Record<string, unknown>> }) => {
  return <T extends Record<string, unknown>>(name: string): T => {
    if (!store.addonState) store.addonState = {};
    if (!store.addonState[name]) store.addonState[name] = {};
    return store.addonState[name] as T;
  };
};

describe('addonState namespace', () => {
  it('creates a fresh empty bucket on first access', () => {
    const store: { addonState: Record<string, Record<string, unknown>> } = { addonState: {} };
    const addonStateFor = makeAddonStateFor(store);

    const bucket = addonStateFor('vandara');
    expect(bucket).toEqual({});
    expect(store.addonState.vandara).toBe(bucket);
  });

  it('returns the same bucket reference on repeat calls (no overwriting)', () => {
    const store: { addonState: Record<string, Record<string, unknown>> } = { addonState: {} };
    const addonStateFor = makeAddonStateFor(store);

    const first = addonStateFor('vandara');
    first.shadowEnergy = 5;

    const second = addonStateFor('vandara');
    expect(second).toBe(first);
    expect(second.shadowEnergy).toBe(5);
  });

  it('isolates buckets per addon name (no cross-contamination)', () => {
    const store: { addonState: Record<string, Record<string, unknown>> } = { addonState: {} };
    const addonStateFor = makeAddonStateFor(store);

    const vandara = addonStateFor('vandara');
    const foobar = addonStateFor('foobar');
    vandara.x = 1;
    foobar.x = 2;

    expect(vandara.x).toBe(1);
    expect(foobar.x).toBe(2);
    expect(Object.keys(store.addonState).sort()).toEqual(['foobar', 'vandara']);
  });

  it('survives a save → load round-trip via JSON serialisation', () => {
    const storeA: { addonState: Record<string, Record<string, unknown>> } = { addonState: {} };
    const addonStateForA = makeAddonStateFor(storeA);
    const v = addonStateForA<{ shadow: number; flags: Record<string, boolean> }>('vandara');
    v.shadow = 42;
    v.flags = { door_open: true };

    // Round-trip: emulates JSON.stringify on save + JSON.parse on load.
    const restored = JSON.parse(JSON.stringify(storeA));

    const addonStateForB = makeAddonStateFor(restored);
    const v2 = addonStateForB<{ shadow: number; flags: Record<string, boolean> }>('vandara');
    expect(v2.shadow).toBe(42);
    expect(v2.flags.door_open).toBe(true);
  });

  it('handles undefined addonState gracefully (e.g. very old save)', () => {
    // Simulates loading a save written before the addonState field existed:
    // the deepMerge in persistence.ts would leave the field undefined.
    const store = {} as { addonState: Record<string, Record<string, unknown>> };
    const addonStateFor = makeAddonStateFor(store);

    const bucket = addonStateFor('vandara');
    expect(bucket).toEqual({});
    expect(store.addonState).toBeDefined();
    expect(store.addonState.vandara).toBe(bucket);
  });
});
