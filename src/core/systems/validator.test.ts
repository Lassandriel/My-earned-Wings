import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createValidatorService } from './validator';
import { Registries } from '../../types/game';

/**
 * Registry validator: schema audit at boot time. We feed it deliberately
 * broken registries and assert that:
 *  - it returns false on hard errors
 *  - it returns true (warnings allowed) on soft issues
 *  - it logs the right thing (silenced via console spies to keep tests quiet)
 */

// Tests deliberately feed malformed/sparse data — using `any` here is the point.
const makeRegistries = (overrides: Record<string, any> = {}): Registries =>
  ({
    resources: {},
    actions: {},
    items: {},
    npcs: {},
    homes: {},
    buffs: {},
    modifiers: {},
    titles: {},
    milestones: {},
    ...overrides,
  } as unknown as Registries);

describe('Registry Validator', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
    logSpy.mockRestore();
  });

  it('returns true on a fully empty registry (no errors, no warnings)', () => {
    const v = createValidatorService();
    expect(v.validateRegistries(makeRegistries())).toBe(true);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('returns false when a resource is missing required fields', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        resources: {
          broken: { id: 'broken' } as any, // missing type + category
        },
      }),
    );
    expect(ok).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('returns false when an action is missing id or category', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        actions: {
          ghost: { id: 'ghost' } as any, // missing category
        },
      }),
    );
    expect(ok).toBe(false);
  });

  it('warns (but still returns true) on actions with no rewards / effects', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        actions: {
          noop: {
            id: 'noop',
            category: 'gathering',
          } as any,
        },
      }),
    );
    expect(ok).toBe(true);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('returns false when an item is missing required fields', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        items: {
          shard: { id: 'shard' } as any, // missing title + category
        },
      }),
    );
    expect(ok).toBe(false);
  });

  it('returns false when an NPC is missing nameKey or progKey', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        npcs: {
          'npc-ghost': { id: 'npc-ghost', nameKey: 'x' } as any, // missing progKey
        },
      }),
    );
    expect(ok).toBe(false);
  });

  it('passes on a well-formed minimal registry of each kind', () => {
    const v = createValidatorService();
    const ok = v.validateRegistries(
      makeRegistries({
        resources: {
          wood: { id: 'wood', type: 'resource', category: 'material' } as any,
        },
        actions: {
          chop: {
            id: 'chop',
            category: 'gathering',
            rewards: { wood: 1 },
          } as any,
        },
        items: {
          'item-axe': {
            id: 'item-axe',
            title: 'item_axe_title',
            category: 'tool',
          } as any,
        },
        npcs: {
          'npc-ellie': {
            id: 'npc-ellie',
            nameKey: 'npc_ellie_name',
            progKey: 'ellie',
          } as any,
        },
      }),
    );
    expect(ok).toBe(true);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
