/**
 * Disabled-addon pruning. Runs BEFORE Alpine starts and BEFORE
 * runtime addons load, so:
 *   - the UI never sees about-to-be-removed entries (no flicker)
 *   - a disabled build-time addon can't accidentally re-appear via
 *     a runtime drop (we read disabled-list straight from
 *     localStorage; the settings store hasn't loaded yet at boot)
 *
 * `applyAddonPrune` is a no-op when the disabled list is empty.
 */

import {
  RESOURCE_REGISTRY_GENERATED,
  MODIFIER_REGISTRY_GENERATED,
  ACTION_REGISTRY_GENERATED,
  ITEM_REGISTRY_GENERATED,
  NPC_REGISTRY_GENERATED,
  BUFF_REGISTRY_GENERATED,
  HOME_REGISTRY_GENERATED,
  MILESTONE_REGISTRY_GENERATED,
  NAVIGATION_REGISTRY_GENERATED,
  TITLE_REGISTRY_GENERATED,
  SECTION_REGISTRY_GENERATED,
  SUB_TAB_REGISTRY_GENERATED,
  SETTINGS_TAB_REGISTRY_GENERATED,
} from '../generated/content';
import { ADDON_TICKS } from '../generated/addon-ticks';
import { ADDON_EFFECT_REGISTRARS } from '../generated/addon-effects';
import { ADDON_MIGRATIONS } from '../generated/addon-migrations';
import { ADDON_HANDLERS } from '../generated/addon-handlers';
import { pruneDisabledAddons, pruneDisabledHooks } from '../core/addons/disable';

/**
 * Read the player's disabled-addon list straight from localStorage —
 * the settings store hasn't loaded yet at boot, but we need this BEFORE
 * Alpine reads the registries so the pruning is invisible to the UI
 * (no flash of about-to-be-removed content). The full settings load
 * later in bootstrap() will overwrite settings.disabledAddons with
 * the same value, which is fine — it's the same data.
 */
export function readDisabledAddonsFromStorage(): string[] {
  try {
    const raw = localStorage.getItem('wings_settings');
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { settings?: { disabledAddons?: unknown } };
    const list = parsed?.settings?.disabledAddons;
    if (!Array.isArray(list)) return [];
    return list.filter((n): n is string => typeof n === 'string');
  } catch {
    return [];
  }
}

/**
 * Prune every loaded registry + hook table to drop entries whose
 * source addon is in the disabled list. Mutates the generated maps
 * in place. No-op when the list is empty.
 */
export function applyAddonPrune(disabledAddons: string[]): void {
  if (disabledAddons.length === 0) return;

  pruneDisabledAddons(disabledAddons, {
    RESOURCE_REGISTRY_GENERATED,
    MODIFIER_REGISTRY_GENERATED,
    ACTION_REGISTRY_GENERATED,
    ITEM_REGISTRY_GENERATED,
    NPC_REGISTRY_GENERATED,
    BUFF_REGISTRY_GENERATED,
    HOME_REGISTRY_GENERATED,
    MILESTONE_REGISTRY_GENERATED,
    NAVIGATION_REGISTRY_GENERATED,
    TITLE_REGISTRY_GENERATED,
    SECTION_REGISTRY_GENERATED,
    SUB_TAB_REGISTRY_GENERATED,
    SETTINGS_TAB_REGISTRY_GENERATED,
  });

  // Drop the matching TS hooks too so disabled addons don't run
  // any per-tick / per-effect / per-migration logic.
  pruneDisabledHooks(disabledAddons, ADDON_TICKS);
  pruneDisabledHooks(disabledAddons, ADDON_EFFECT_REGISTRARS);
  pruneDisabledHooks(disabledAddons, ADDON_MIGRATIONS);

  // Handler keys are namespaced as `<addon>/<name>`, so we filter
  // by prefix rather than exact match. Doing it inline keeps the
  // helper signature simple (it's the only namespaced map).
  for (const key of Object.keys(ADDON_HANDLERS)) {
    const addonName = key.split('/')[0];
    if (addonName && disabledAddons.includes(addonName)) {
      delete ADDON_HANDLERS[key];
    }
  }
}
