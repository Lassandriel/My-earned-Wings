import { gatheringActions } from './gathering.js';
import { constructionActions } from './construction.js';
import { npcActions } from './npcs.js';
import { villageActions } from './village.js';
import { magicActions } from './magic.js';

export const actionDb = {
  ...gatheringActions,
  ...constructionActions,
  ...npcActions,
  ...villageActions,
  ...magicActions
};
