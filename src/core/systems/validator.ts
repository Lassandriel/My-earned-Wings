import { Registries } from '../../types/game';

/**
 * Registry Validator Service
 * Ensures all game content data follows the required schema at boot time.
 */
export const createValidatorService = () => {
  return {
    /**
     * Validates all registries against standard requirements.
     */
    validateRegistries(registries: Registries) {
      console.log('[Validator] Starting global registry audit...');
      let errorCount = 0;
      let warningCount = 0;

      // 1. Validate Resources
      Object.values(registries.resources).forEach(res => {
        if (!res.id || !res.type || !res.category) {
          console.error(`[Validator] Resource ${res.id || 'unknown'} is missing required fields (id, type, category).`);
          errorCount++;
        }
      });

      // 2. Validate Actions
      Object.values(registries.actions).forEach(action => {
        if (!action.id || !action.category) {
          console.error(`[Validator] Action ${action.id || 'unknown'} is missing required fields (id, category).`);
          errorCount++;
        }
        
        // Logical check: Actions should have some form of output (rewards or specific mechanics)
        if (!action.rewards && !action.onSuccess && !action.steps && !action.passiveProduction) {
          console.warn(`[Validator] Action ${action.id} has no defined success effects or rewards.`);
          warningCount++;
        }
      });

      // 3. Validate Items
      Object.values(registries.items).forEach(item => {
        if (!item.id || !item.title || !item.category) {
          console.error(`[Validator] Item ${item.id || 'unknown'} is missing required fields (id, title, category).`);
          errorCount++;
        }
      });

      // 4. Validate NPCs
      Object.values(registries.npcs).forEach(npc => {
        if (!npc.id || !npc.nameKey || !npc.progKey) {
          console.error(`[Validator] NPC ${npc.id || 'unknown'} is missing required fields (id, nameKey, progKey).`);
          errorCount++;
        }
      });

      if (errorCount > 0) {
        console.error(`[Validator] Audit failed with ${errorCount} errors and ${warningCount} warnings.`);
        return false;
      }

      console.log(`[Validator] Audit successful! Found 0 errors and ${warningCount} warnings.`);
      return true;
    }
  };
};
