// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/handlers.ts
// Regenerate: npm run build:content
//
// Handler keys are namespaced to <addon>/<name> so YAML can reference them
// without risk of collision (e.g. customExecute: vandara/npc_execute).

import type { CustomExecuteHandler } from '../data/actions/custom-handlers';
import * as h_smoke_test from '../../content/addons/smoke_test/handlers';

const prefix = (name: string, hs: Record<string, CustomExecuteHandler>): Record<string, CustomExecuteHandler> => {
  const out: Record<string, CustomExecuteHandler> = {};
  for (const k of Object.keys(hs)) out[`${name}/${k}`] = hs[k]!;
  return out;
};

// Each addon's handlers.ts may export a default object or named handlers.
// We try default first, then fall back to the module's named exports.
const pick = (mod: any): Record<string, CustomExecuteHandler> =>
  (mod.default && typeof mod.default === 'object') ? mod.default : mod;

export const ADDON_HANDLERS: Record<string, CustomExecuteHandler> = {
  ...prefix('smoke_test', pick(h_smoke_test)),
};
