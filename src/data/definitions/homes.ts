import { HomeDefinition } from '../../types/game';

/**
 * Home Registry - CORE 3.5 TypeScript Edition
 * Defines living locations with capacities and unique bonuses.
 */
export const HOME_REGISTRY: Record<string, HomeDefinition> = {
  'home-tent': {
    id: 'home-tent',
    nameKey: 'home_tent_title',
    descKey: 'home_tent_desc',
    image: 'img/housing/tent.webp',
    capacity: 4,
  },
  'home-house': {
    id: 'home-house',
    nameKey: 'home_house_title',
    descKey: 'home_house_desc',
    image: 'img/housing/house.webp',
    capacity: 12,
  },
  'home-lake': {
    id: 'home-lake',
    nameKey: 'home_lake_title',
    descKey: 'home_lake_desc',
    image: 'img/housing/lake_house.webp',
    capacity: 8,
    baseLimits: { water: 50 },
    modifiers: [{ key: 'garden_yield', mult: 1.2 }],
  },
  'home-tower': {
    id: 'home-tower',
    nameKey: 'home_tower_title',
    descKey: 'home_tower_desc',
    image: 'img/housing/island_tower.webp',
    capacity: 8,
    baseLimits: { magic: 100 },
    modifiers: [{ key: 'magic_cost', mult: 0.8 }],
  },
};
