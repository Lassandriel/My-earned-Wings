/**
 * Navigation Registry - CORE 3.5 TypeScript Edition
 * Defines sidebar tabs and main game views.
 */
export interface NavigationItem {
    id: string;
    icon: string;
    label: string;
}

export const NAVIGATION_REGISTRY: Record<string, NavigationItem> = {
    gameplay: { id: 'gameplay', icon: 'story', label: 'nav_story' },
    crafting: { id: 'crafting', icon: 'crafting', label: 'nav_crafting' },
    upgrades: { id: 'upgrades', icon: 'upgrades', label: 'nav_upgrades' },
    village: { id: 'village', icon: 'village', label: 'nav_village' },
    story: { id: 'story', icon: 'chronic', label: 'nav_story_tab' }
};
