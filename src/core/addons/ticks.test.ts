import { describe, it, expect, vi } from 'vitest';
import { runAddonTicks, type AddonTickHook } from './ticks';
import type { GameState } from '../../types/game';
import type { EngineServices } from '../../engine/types';

// Minimal mock — runAddonTicks doesn't introspect state/services
// (it just forwards them), so an empty cast is enough.
const fakeState = {} as GameState;
const fakeServices = {} as EngineServices;

describe('runAddonTicks', () => {
  it('returns 0 when there are no hooks', () => {
    const count = runAddonTicks(fakeState, fakeServices, 1, {});
    expect(count).toBe(0);
  });

  it('invokes every hook exactly once with (state, services, deltaTime)', () => {
    const a = vi.fn();
    const b = vi.fn();
    const count = runAddonTicks(fakeState, fakeServices, 0.5, { a, b });
    expect(count).toBe(2);
    expect(a).toHaveBeenCalledOnce();
    expect(a).toHaveBeenCalledWith(fakeState, fakeServices, 0.5);
    expect(b).toHaveBeenCalledOnce();
    expect(b).toHaveBeenCalledWith(fakeState, fakeServices, 0.5);
  });

  it('iterates hooks in name-sorted order (deterministic ordering)', () => {
    const calls: string[] = [];
    const hooks: Record<string, AddonTickHook> = {
      zeta: () => calls.push('zeta'),
      alpha: () => calls.push('alpha'),
      middle: () => calls.push('middle'),
    };
    runAddonTicks(fakeState, fakeServices, 1, hooks);
    expect(calls).toEqual(['alpha', 'middle', 'zeta']);
  });

  it('skips non-function entries silently', () => {
    const a = vi.fn();
    const hooks = {
      a,
      // Cast: simulating a broken generated file where some addon
      // exported a non-function — we want runtime resilience.
      busted: 'not a function' as unknown as AddonTickHook,
    };
    const count = runAddonTicks(fakeState, fakeServices, 1, hooks);
    expect(count).toBe(1);
    expect(a).toHaveBeenCalledOnce();
  });

  it("a throwing hook doesn't stop other hooks", () => {
    const before = vi.fn();
    const after = vi.fn();
    const broken: AddonTickHook = () => {
      throw new Error('addon bug');
    };
    // Sorted order = a-broken, b-after, ?-before. Use prefixes to
    // place 'broken' between 'before' and 'after' so we prove the
    // loop continues past a failure.
    const count = runAddonTicks(fakeState, fakeServices, 1, {
      a_before: before,
      m_broken: broken,
      z_after: after,
    });
    expect(before).toHaveBeenCalled();
    expect(after).toHaveBeenCalled();
    expect(count).toBe(2); // broken doesn't count as ok
  });

  it('passes the actual deltaTime through (varying values)', () => {
    const seen: number[] = [];
    runAddonTicks(fakeState, fakeServices, 0.016, { a: (_s, _sv, d) => seen.push(d) });
    runAddonTicks(fakeState, fakeServices, 2.5, { a: (_s, _sv, d) => seen.push(d) });
    expect(seen).toEqual([0.016, 2.5]);
  });
});
