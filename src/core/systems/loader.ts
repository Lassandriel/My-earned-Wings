import { GameSystem } from '../../types/system';

/**
 * Utility to delegate methods from a system to the store.
 * Expects the first argument of the system method to be the store.
 */
export const delegateMethods = (store: any, systemName: string, methodMapping: Record<string, string>) => {
  const system = store[systemName];
  if (!system) {
    console.error(`[SYSTEM] System ${systemName} not found in store.`);
    return;
  }

  Object.entries(methodMapping).forEach(([storeMethodName, systemMethodName]) => {
    if (typeof system[systemMethodName] !== 'function') {
      console.warn(`[SYSTEM] Method ${systemMethodName} not found in system ${systemName}.`);
      return;
    }

    store[storeMethodName] = function (this: any, ...args: any[]) {
      return system[systemMethodName](this, ...args);
    };
  });
};

/**
 * Automatically registers systems into the store and handles method delegation.
 */
export const autoRegisterSystems = (store: any, systems: Record<string, GameSystem>) => {
  Object.entries(systems).forEach(([id, system]) => {
    // 1. Assign to store
    store[id] = system;

    // 2. Automated Delegation from Metadata
    if (system.metadata?.delegates) {
      if (Array.isArray(system.metadata.delegates)) {
        // Simple array mapping: store.method = system.method
        const mapping: Record<string, string> = {};
        system.metadata.delegates.forEach(method => {
          mapping[method] = method;
        });
        delegateMethods(store, id, mapping);
      } else if (typeof system.metadata.delegates === 'object') {
        // Object mapping: store.key = system.value
        delegateMethods(store, id, system.metadata.delegates);
      }
    }
  });
};
