import { gatheringActions } from './gathering';
import { constructionActions } from './construction';
import { npcActions } from './npcs';
import { villageActions } from './village';
import { magicActions } from './magic';

/**
 * Action Registry Index - TypeScript Version
 */
export const actionDb: Record<string, any> = {
  ...gatheringActions,
  ...constructionActions,
  ...npcActions,
  ...villageActions,
  ...magicActions
};
