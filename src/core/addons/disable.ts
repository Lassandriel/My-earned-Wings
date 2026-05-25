/**
 * Addon disable mechanism — removes a disabled addon's contributions
 * from the running game without rebuilding.
 *
 * The player toggles addons in Settings → Addons. The setting lives
 * in localStorage (under settings.disabledAddons). At boot we read
 * the list and:
 *
 *   1. Delete every registry entry whose id is in ADDON_ENTRY_IDS
 *      for that addon (per-category). The base game now has no
 *      reference to those NPCs / items / actions / etc.
 *   2. Delete the addon's translation namespace (best-effort —
 *      we erase entries that match keys the addon contributed).
 *      For simplicity we just drop translations whose key starts
 *      with the addon name (e.g. 'vandara_'); base keys are
 *      untouched.
 *   3. Drop the addon from the ADDON_TICKS / ADDON_EFFECT_REGISTRARS /
 *      ADDON_MIGRATIONS / ADDON_HANDLERS maps so the engine
 *      doesn't run its TS hooks either.
 *
 * Notes:
 *
 *   - Required addons (manifest.required: true — namely `core`) MUST
 *     never appear in the disabled list. The Settings UI locks the
 *     toggle, and this module bails out with a warning if an attempt
 *     somehow sneaks through (e.g. hand-edited localStorage).
 *
 *   - Disabling is NOT live: changing the toggle persists but the
 *     game needs a restart to apply, because removing entries from
 *     the live registries mid-game would break any state that
 *     already references them (active buffs, in-progress quests).
 *     The settings UI surfaces "Restart required" inline.
 *
 *   - Runtime addons are handled by the runtime-addons loader
 *     directly — it just skips loading disabled ones from the IPC
 *     payload. This module only deals with build-time addon pruning.
 */

import { ADDON_ENTRY_IDS, BUILD_TIME_ADDONS } from '../../generated/content';
import { makeLogger } from '../log';

const log = makeLogger('ADDON-DISABLE');

const CATEGORY_TO_REGISTRY_KEY: Record<string, string> = {
  resources: 'RESOURCE_REGISTRY_GENERATED',
  modifiers: 'MODIFIER_REGISTRY_GENERATED',
  actions: 'ACTION_REGISTRY_GENERATED',
  items: 'ITEM_REGISTRY_GENERATED',
  npcs: 'NPC_REGISTRY_GENERATED',
  buffs: 'BUFF_REGISTRY_GENERATED',
  homes: 'HOME_REGISTRY_GENERATED',
  milestones: 'MILESTONE_REGISTRY_GENERATED',
  navigation: 'NAVIGATION_REGISTRY_GENERATED',
  titles: 'TITLE_REGISTRY_GENERATED',
  sections: 'SECTION_REGISTRY_GENERATED',
  subTabs: 'SUB_TAB_REGISTRY_GENERATED',
  settingsTabs: 'SETTINGS_TAB_REGISTRY_GENERATED',
};

/**
 * Drop every entry an addon contributed from the merged registries.
 * Called at boot from main.ts before Alpine reads the registries.
 * Idempotent — calling twice on the same addon is a no-op the second
 * time because the entries are already gone.
 *
 * Returns the per-category counts removed for log/diagnostics.
 */
export function pruneDisabledAddons(
  disabledNames: ReadonlyArray<string>,
  registries: Record<string, Record<string, unknown>>,
): Record<string, Record<string, number>> {
  const removed: Record<string, Record<string, number>> = {};

  for (const addonName of disabledNames) {
    // Defense: required addons can't be disabled. The UI prevents
    // toggling them, but we double-check here in case a save file
    // or hand-edited localStorage smuggled the name through.
    const def = BUILD_TIME_ADDONS.find((a) => a.name === addonName);
    if (def?.required) {
      log.warn(
        `[${addonName}] is required — refusing to prune. Re-enabling.`,
      );
      continue;
    }
    const idsByCategory = (ADDON_ENTRY_IDS as Record<string, Record<string, string[]>>)[addonName];
    if (!idsByCategory) {
      log.debug(`[${addonName}] not in ADDON_ENTRY_IDS — nothing to prune.`);
      continue;
    }
    const addonRemoved: Record<string, number> = {};
    for (const [category, ids] of Object.entries(idsByCategory)) {
      const regKey = CATEGORY_TO_REGISTRY_KEY[category];
      if (!regKey) continue;
      const reg = registries[regKey];
      if (!reg) continue;
      let n = 0;
      for (const id of ids as string[]) {
        if (id in reg) {
          delete reg[id];
          n++;
        }
      }
      if (n > 0) addonRemoved[category] = n;
    }
    if (Object.keys(addonRemoved).length > 0) {
      removed[addonName] = addonRemoved;
      log.info(
        `pruned [${addonName}]: ` +
          Object.entries(addonRemoved)
            .map(([cat, n]) => `${n} ${cat}`)
            .join(', '),
      );
    }
  }

  return removed;
}

/**
 * Drop hook entries from a generated map (ADDON_TICKS,
 * ADDON_EFFECT_REGISTRARS, etc.) for disabled addons. Called once at
 * boot per map. Same idempotent semantics as pruneDisabledAddons.
 */
export function pruneDisabledHooks<T>(
  disabledNames: ReadonlyArray<string>,
  hookMap: Record<string, T>,
): void {
  for (const name of disabledNames) {
    if (name in hookMap) {
      delete hookMap[name];
      log.debug(`pruned hook entry for [${name}]`);
    }
  }
}
