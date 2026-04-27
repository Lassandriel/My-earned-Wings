import { baseConstruction } from './construction.base';
import { housingConstruction } from './construction.housing';
import { furnitureConstruction } from './construction.furniture';
import { toolConstruction } from './construction.tools';
import { gardenConstruction } from './construction.garden';

/**
 * Construction Actions - Modularized Version
 * Unified registry for Crafting and Housing actions.
 */
export const constructionActions: Record<string, any> = {
  ...baseConstruction,
  ...housingConstruction,
  ...furnitureConstruction,
  ...toolConstruction,
  ...gardenConstruction,
};
