import { FlagId } from '../../types/game';

export interface NavigationItem {
  id: string;
  icon: string;
  label: string;
  requiredFlag?: FlagId;
}

export const NAVIGATION_REGISTRY: Record<string, NavigationItem> = {
  main: { id: 'main', icon: 'story', label: 'nav_main' },
  crafting: { id: 'crafting', icon: 'crafting', label: 'nav_crafting' },
  village: { id: 'village', icon: 'village', label: 'nav_locations' },
  upgrades: { id: 'upgrades', icon: 'upgrades', label: 'nav_upgrades' },
  housing: { id: 'housing', icon: 'housing', label: 'nav_housing', requiredFlag: 'build-house' },
  collection: { id: 'collection', icon: 'chronic', label: 'nav_collection' },
};
