// Custom execute handlers for the _example addon.
//
// The build script imports this file (if present), takes whichever
// handlers you export, and re-exposes them under namespaced keys
// (`_example/<handlerName>`). YAML actions reference them via
//   customExecute: _example/<handlerName>
//
// Type is imported from src/data/actions/custom-handlers.ts. The relative
// path looks long but never changes — addons all sit at the same depth.

import type { CustomExecuteHandler } from '../../../src/data/actions/custom-handlers';

const ping: CustomExecuteHandler = (state, actionId) => {
  // `state` is the live engine state (GameState shape). You can mutate
  // resources, set flags, emit events via state.bus, queue commands, etc.
  state.addLog('Pinged from _example/' + actionId, 'logs');
  return true;
};

// Export style 1: default export with a record (preferred — keeps the
// handler keys in one obvious place).
export default { ping };

// Export style 2 (also accepted): named exports. The build script's
// picker tries `mod.default` first, then falls back to the module's
// named exports.
// export { ping };
