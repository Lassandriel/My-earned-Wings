import { NPCId, ActionId } from '../core/base';

/**
 * NPC & Village Definitions
 */

export interface NPCDefinition {
  id: NPCId;
  nameKey: string;
  icon: string;
  color?: string;
  image?: string;
  progKey: string;
  maxProgress: number;
  chapter?: string;
  /**
   * Physical location the NPC lives in. Drives the "Orte" sub-tab
   * grouping in village.view. Defaults to 'village' when missing —
   * existing village NPCs don't need to declare it. Addons add new
   * values (e.g. 'vandara'); each value also needs a translation
   * key `location_<id>_name` and an optional `nav_location_<id>_desc`.
   */
  location?: string;
  unlockedAtStart?: boolean;
  /** @deprecated legacy from pre-addon Vandara. Use `location: 'vandara'` instead. */
  isVandara?: boolean;
  dialogues?: Record<string, string>;
  tradeActions?: Array<{
    id: ActionId;
    minProgress: number;
  }>;
}
