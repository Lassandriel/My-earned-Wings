import { gatheringActions } from './gathering.js';
import { craftingActions } from './crafting.js';
import { housingActions } from './housing.js';
import { npcActions } from './npcs.js';
import { villageActions } from './village.js';
import { magicActions } from './magic.js';

export const actionDb = {
  ...gatheringActions,
  ...craftingActions,
  ...housingActions,
  ...npcActions,
  ...villageActions,
  ...magicActions
};
