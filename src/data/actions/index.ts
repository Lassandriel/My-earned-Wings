import { coreActions } from './core';
import { constructionActions } from './construction';
import { npcActions } from './npcs';
import { villageActions } from './village';
import { magicActions } from './magic';
import { schoolActions } from '../../features/school/school.data';
import { vandaraActions } from '../../features/vandara/vandara.data';
import { loreActions } from './lore';

/**
 * Action Registry Index - TypeScript Version
 */
export const actionDb: Record<string, any> = {
  ...coreActions,
  ...constructionActions,
  ...npcActions,
  ...villageActions,
  ...magicActions,
  ...schoolActions,
  ...vandaraActions,
  ...loreActions,
};
