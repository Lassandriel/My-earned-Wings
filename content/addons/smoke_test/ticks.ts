/**
 * Smoke-test tick hook — exercises three capabilities at once:
 *
 *   1. Per-second engine hook (runAddonTicks dispatch).
 *   2. addonState namespace (state.addonStateFor<...>('smoke_test')).
 *   3. isAddonLoaded inter-addon check.
 *
 * The hook does nothing observable to the player; it just touches
 * state in ways that a future addon could pattern-match on. Throws
 * are caught by runAddonTicks so a buggy hook here can't freeze the
 * engine.
 */

import type { AddonTickHook } from '../../../src/core/addons/ticks';

interface SmokeBucket {
  ticks?: number;
  vandaraPresent?: boolean;
  lastDelta?: number;
}

export const onTick: AddonTickHook = (state, _services, deltaTime) => {
  // The engine passes its own state object here, which is GameState-
  // shaped but doesn't carry helper methods from the Alpine store
  // (those live on the renderer-facing object). Reach the namespace
  // bucket directly — it's a plain field per the GameState type.
  const addonState = (state.addonState ??= {}) as Record<string, Record<string, unknown>>;
  const s = (addonState.smoke_test ??= {}) as SmokeBucket;
  s.ticks = (s.ticks ?? 0) + 1;
  s.lastDelta = deltaTime;
  // Inter-addon check via the active-addons module. Direct import
  // avoids depending on whether the helper made it onto state.
  // Cheap: O(n) over a tiny addon list. We don't import at top-
  // level because the file lives outside src/ and the build glue
  // resolves at bundle time anyway.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  s.vandaraPresent = !!(globalThis as { Alpine?: { store: (n: string) => any } })
    .Alpine?.store?.('game')?.isAddonLoaded?.('vandara');
};
