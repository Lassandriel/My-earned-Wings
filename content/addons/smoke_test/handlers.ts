/**
 * Smoke-test handlers — proves that build-time addons can ship
 * `handlers.ts` exporting `customExecute` bridges that YAML actions
 * reference via `customExecute: smoke_test/<name>`.
 *
 * The build script's addon-handlers generation namespaces these to
 * the addon name automatically, so picking a generic local name
 * ("noop") here can't collide with another addon's handler.
 *
 * We don't currently reference this handler from the smoke-test
 * YAML (no `customExecute:` field on act-smoke-ping); the export is
 * here purely to prove the build picks it up and the generated
 * src/generated/addon-handlers.ts ends up with `smoke_test/noop`.
 */

import type { CustomExecuteHandler } from '../../../src/data/actions/custom-handlers';

export const noop: CustomExecuteHandler = (state, actionId) => {
  // Touch addonState directly (plain field on GameState) so this
  // works whether base passes the Alpine store or the engine's
  // plain-data clone. Same convention as ticks.ts / effects.ts.
  const addonState = ((state as any).addonState ??= {}) as Record<string, Record<string, unknown>>;
  const s = (addonState.smoke_test ??= {}) as { handlerInvocations?: number };
  s.handlerInvocations = (s.handlerInvocations ?? 0) + 1;
  void actionId; // silence "unused parameter"
  return true;
};
