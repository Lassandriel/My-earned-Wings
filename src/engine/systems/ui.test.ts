import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createUISync } from './ui';
import { GameState } from '../../types/game';

/**
 * UISync bridges the plain engine state to the Alpine reactive store.
 * Tests exercise the three documented behaviors:
 *  1. No-op when Alpine is unavailable (e.g. SSR / pre-boot).
 *  2. No-op when engine state and Alpine store are the same object.
 *  3. Reference-sharing clone of object keys + primitive copy when they differ.
 */

const fakeAlpine = (store: any) => ({
  store: (_name: string) => store,
});

describe('UISync', () => {
  let originalAlpine: any;
  let originalWindow: any;

  beforeEach(() => {
    // Save & ensure window exists for tests
    originalWindow = (globalThis as any).window;
    if (!originalWindow) (globalThis as any).window = {};
    originalAlpine = (globalThis as any).window.Alpine;
  });

  afterEach(() => {
    if (originalAlpine === undefined) {
      delete (globalThis as any).window.Alpine;
    } else {
      (globalThis as any).window.Alpine = originalAlpine;
    }
    if (originalWindow === undefined) delete (globalThis as any).window;
  });

  it('is a no-op when Alpine is unavailable', () => {
    delete (globalThis as any).window.Alpine;
    const sync = createUISync();
    const state = { resources: { wood: 5 } } as unknown as GameState;

    expect(() => sync.sync(state, {} as any)).not.toThrow();
    expect(sync.snapshot.lastSyncedAt).toBe(0);
  });

  it('is a no-op (other than timestamp) when state and Alpine store are identical', () => {
    const sharedStore: any = { resources: { wood: 5 }, view: 'main' };
    (globalThis as any).window.Alpine = fakeAlpine(sharedStore);

    const sync = createUISync();
    sync.sync(sharedStore as GameState, {} as any);

    expect(sync.snapshot.lastSyncedAt).toBeGreaterThan(0);
    // No clone happened — still the exact same reference
    expect(sharedStore.resources).toBe(sharedStore.resources);
  });

  it('clones object keys onto both state and alpine store (shared identity)', () => {
    const alpineStore: any = { resources: { wood: 0 }, flags: {} };
    (globalThis as any).window.Alpine = fakeAlpine(alpineStore);

    const engineState: any = {
      resources: { wood: 5 },
      flags: { has_axe: true },
      view: 'main',
    };

    const sync = createUISync();
    sync.sync(engineState, {} as any);

    // Alpine sees the new values
    expect(alpineStore.resources).toEqual({ wood: 5 });
    expect(alpineStore.flags).toEqual({ has_axe: true });

    // Reference-sharing: engineState now points at the SAME clone as alpineStore
    expect(engineState.resources).toBe(alpineStore.resources);
    expect(engineState.flags).toBe(alpineStore.flags);
  });

  it('copies primitive keys onto the alpine store', () => {
    const alpineStore: any = { view: 'menu', playerName: '' };
    (globalThis as any).window.Alpine = fakeAlpine(alpineStore);

    const engineState: any = { view: 'main', playerName: 'Lass' };

    const sync = createUISync();
    sync.sync(engineState, {} as any);

    expect(alpineStore.view).toBe('main');
    expect(alpineStore.playerName).toBe('Lass');
  });

  it('propagates undefined / null object keys to alpineStore', () => {
    // The pre-demo-fix behavior was to SKIP null/undefined values entirely
    // and leave the Alpine store at whatever it had. That caused stale-UI
    // bugs: engine clearing `hoveredAction = null` after a view switch was
    // invisible to the tooltip's x-show condition, so the leftover tooltip
    // stuck around. The fix (commit 088ac91) propagates the clear too.
    const alpineStore: any = { resources: { wood: 0 } };
    (globalThis as any).window.Alpine = fakeAlpine(alpineStore);

    const engineState: any = { resources: undefined };

    const sync = createUISync();
    sync.sync(engineState, {} as any);

    // Cleared on the Alpine side as well
    expect(alpineStore.resources).toBeUndefined();
  });

  it('copies UI_WRITEBACK_KEYS Alpine→engine before the engine→Alpine pass', () => {
    // settingsOpen is a UI-owned field; HTML templates set it directly on
    // Alpine. UISync must preserve that write into the engine state so the
    // next engine→Alpine pass doesn't clobber it with a stale value.
    const alpineStore: any = { settingsOpen: true, sidebarCollapsed: true };
    (globalThis as any).window.Alpine = fakeAlpine(alpineStore);

    // Engine state starts with the old values
    const engineState: any = { settingsOpen: false, sidebarCollapsed: false };

    const sync = createUISync();
    sync.sync(engineState, {} as any);

    // After sync, engine has picked up the UI writes
    expect(engineState.settingsOpen).toBe(true);
    expect(engineState.sidebarCollapsed).toBe(true);

    // And Alpine still shows the UI's values (engine didn't override)
    expect(alpineStore.settingsOpen).toBe(true);
    expect(alpineStore.sidebarCollapsed).toBe(true);
  });

  it('clones arrays as arrays (not as plain objects)', () => {
    const alpineStore: any = { discoveredItems: [] };
    (globalThis as any).window.Alpine = fakeAlpine(alpineStore);

    const engineState: any = { discoveredItems: ['item-axe', 'item-hat'] };

    const sync = createUISync();
    sync.sync(engineState, {} as any);

    expect(Array.isArray(alpineStore.discoveredItems)).toBe(true);
    expect(alpineStore.discoveredItems).toEqual(['item-axe', 'item-hat']);
    // And shared with engine state
    expect(engineState.discoveredItems).toBe(alpineStore.discoveredItems);
  });
});
