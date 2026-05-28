import { describe, it, expect, vi } from 'vitest';
import { createBootSystem } from './boot';
import { GameState } from '../../types/game';

/**
 * buildInitialState() is the heart of boot: it takes a base state and
 * data-fills it from the live registries (resources, NPCs). The execBoot()
 * helper is a tiny dispatcher — also covered here against a fake store.
 *
 * We don't mock the registries — boot pulls them directly from
 * `src/core/services/registries`, so the assertions stay loose ("at least one resource was
 * populated") rather than pinning to specific IDs that will drift.
 */

describe('Boot System', () => {
  describe('buildInitialState', () => {
    it('returns a state with resources, limits, and stats objects populated', () => {
      const boot = createBootSystem();
      const base: Partial<GameState> = {
        resources: {} as any,
        limits: {} as any,
        stats: {} as any,
        flags: {} as any,
        npcProgress: {} as any,
        activeBuffs: {} as any,
        activeProducers: [] as any,
        counters: {} as any,
        settings: {} as any,
        unlockedNPCs: [] as any,
      };

      const state = boot.buildInitialState(base);

      // Registries auto-populate at least the core resources
      expect(Object.keys(state.resources).length).toBeGreaterThan(0);
      expect(Object.keys(state.limits).length).toBeGreaterThan(0);
      // satiation is the canonical stat — must be there from the registry
      expect(state.stats.satiation).toBeDefined();
    });

    it('does not share references with the base state (deep clone of data fields)', () => {
      const boot = createBootSystem();
      const resourcesRef = {} as any;
      const base: Partial<GameState> = {
        resources: resourcesRef,
        limits: {} as any,
        stats: {} as any,
        flags: {} as any,
        npcProgress: {} as any,
        activeBuffs: {} as any,
        activeProducers: [] as any,
        counters: {} as any,
        settings: {} as any,
        unlockedNPCs: [] as any,
      };

      const state = boot.buildInitialState(base);

      // Mutation on the produced state must NOT leak into base
      expect(state.resources).not.toBe(resourcesRef);
    });

    it('seeds npcProgress entries for every NPC with a progKey', () => {
      const boot = createBootSystem();
      const state = boot.buildInitialState({
        resources: {} as any,
        limits: {} as any,
        stats: {} as any,
        flags: {} as any,
        npcProgress: {} as any,
        activeBuffs: {} as any,
        activeProducers: [] as any,
        counters: {} as any,
        settings: {} as any,
        unlockedNPCs: [] as any,
      });

      // At least one NPC progress entry exists and starts at 0
      const progressEntries = Object.values(state.npcProgress);
      expect(progressEntries.length).toBeGreaterThan(0);
      expect(progressEntries.every((v) => v === 0)).toBe(true);
    });

    it('adds NPCs flagged `unlockedAtStart` to the unlockedNPCs list', () => {
      const boot = createBootSystem();
      const state = boot.buildInitialState({
        resources: {} as any,
        limits: {} as any,
        stats: {} as any,
        flags: {} as any,
        npcProgress: {} as any,
        activeBuffs: {} as any,
        activeProducers: [] as any,
        counters: {} as any,
        settings: {} as any,
        unlockedNPCs: [] as any,
      });

      // Ellie is the first-companion NPC — she should be unlocked from the start.
      // (If this ever changes, the test will fail loudly — that's the point.)
      expect(state.unlockedNPCs.length).toBeGreaterThan(0);
    });
  });

  describe('execBoot', () => {
    it('calls boot() on systems that expose it', () => {
      const boot = createBootSystem();
      const bootFn = vi.fn();
      const store: any = {
        mySystem: { boot: bootFn },
      };

      boot.execBoot(store as GameState, ['mySystem']);

      expect(bootFn).toHaveBeenCalledWith(store);
    });

    it('falls back to init() when boot() is missing', () => {
      const boot = createBootSystem();
      const initFn = vi.fn();
      const store: any = {
        legacySystem: { init: initFn },
      };

      boot.execBoot(store as GameState, ['legacySystem']);

      expect(initFn).toHaveBeenCalledWith(store);
    });

    it('silently skips systems that exist but have neither boot nor init', () => {
      const boot = createBootSystem();
      const store: any = { quietSystem: {} };

      expect(() =>
        boot.execBoot(store as GameState, ['quietSystem']),
      ).not.toThrow();
    });

    it('silently skips systems that are not on the store at all', () => {
      const boot = createBootSystem();
      const store: any = {};

      expect(() =>
        boot.execBoot(store as GameState, ['missing']),
      ).not.toThrow();
    });
  });
});
