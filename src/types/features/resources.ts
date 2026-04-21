import { ResourceId, GameModifier } from '../core/base';

/**
 * Resource & Buff Definitions
 */

export interface ResourceDefinition {
  id: ResourceId;
  type: 'resource' | 'stat';
  category: string;
  color: string;
  initial?: number;
  initialMax?: number;
  initialLimit?: number;
  isEssential?: boolean;
  wingSlot?: string;
  scalesWithSatiation?: boolean;
}

export interface BuffDefinition {
  id: string;
  title: string;
  desc: string;
  duration: number; // in seconds
  modifiers?: GameModifier[];
}
