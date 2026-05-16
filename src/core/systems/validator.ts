import { Registries } from '../../types/game';
import { makeLogger } from '../log';

const log = makeLogger('VALIDATOR');

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
      log.info('Starting global registry audit...');
      let errorCount = 0;
      let warningCount = 0;

      // 1. Validate Resources
      Object.values(registries.resources).forEach(res => {
        if (!res.id || !res.type || !res.category) {
          log.error(`Resource ${res.id || 'unknown'} is missing required fields (id, type, category).`);
          errorCount++;
        }
      });

      // 2. Validate Actions
      Object.values(registries.actions).forEach(action => {
        if (!action.id || !action.category) {
          log.error(`Action ${action.id || 'unknown'} is missing required fields (id, category).`);
          errorCount++;
        }

        // Logical check: Actions should have some form of output (rewards or specific mechanics)
        if (!action.rewards && !action.onSuccess && !action.steps && !action.passiveProduction) {
          log.warn(`Action ${action.id} has no defined success effects or rewards.`);
          warningCount++;
        }
      });

      // 3. Validate Items
      Object.values(registries.items).forEach(item => {
        if (!item.id || !item.title || !item.category) {
          log.error(`Item ${item.id || 'unknown'} is missing required fields (id, title, category).`);
          errorCount++;
        }
      });

      // 4. Validate NPCs
      Object.values(registries.npcs).forEach(npc => {
        if (!npc.id || !npc.nameKey || !npc.progKey) {
          log.error(`NPC ${npc.id || 'unknown'} is missing required fields (id, nameKey, progKey).`);
          errorCount++;
        }
      });

      if (errorCount > 0) {
        log.error(`Audit failed with ${errorCount} errors and ${warningCount} warnings.`);
        return false;
      }

      log.info(`Audit successful! Found 0 errors and ${warningCount} warnings.`);
      return true;
    }
  };
};
