import { HomeId, GameModifier, ResourceId } from '../core/base';

/**
 * Housing & Home Definitions
 */

export interface HomeDefinition {
  id: HomeId;
  nameKey: string;
  descKey: string;
  image: string;
  capacity: number;
  modifiers?: GameModifier[];
  baseLimits?: Partial<Record<ResourceId, number>>;
}
