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
  unlockedAtStart?: boolean;
  isVandara?: boolean;
  dialogues?: Record<string, string>;
  tradeActions?: Array<{
    id: ActionId;
    minProgress: number;
  }>;
}
