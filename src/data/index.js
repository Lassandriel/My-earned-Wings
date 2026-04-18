import { actionDb } from './actions/index.js';
import { itemDb } from './definitions/items.js';
import { NPC_REGISTRY } from './definitions/npcs.js';
import { RESOURCE_REGISTRY } from './definitions/resources.js';
import { BUFF_REGISTRY } from './definitions/buffs.js';

/**
 * Organized registries for the ContentService
 */
export const registries = {
    actions: actionDb,
    items: itemDb,
    npcs: NPC_REGISTRY,
    resources: RESOURCE_REGISTRY,
    buffs: BUFF_REGISTRY
};

export {
    actionDb,
    itemDb,
    NPC_REGISTRY,
    RESOURCE_REGISTRY,
    BUFF_REGISTRY
};
