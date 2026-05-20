/**
 * Runtime addon loader (Phase 16).
 *
 * End users of the packaged .exe can drop YAML-only addons into the
 * "addons/" folder that ships next to the .exe. The Electron main
 * process discovers them via IPC; this module merges that payload into
 * the build-time-generated registries + translations + view fragments.
 *
 * Mutation strategy
 * -----------------
 * Every *_REGISTRY_GENERATED export from src/generated/content.ts is a
 * plain object (`Record<string, any>`). The exported binding is `const`
 * but the object itself is mutable, and downstream code holds the same
 * object reference (data/index.ts, content.service.ts, …). So
 * Object.assign-ing onto the imported objects propagates to every
 * consumer without anyone needing to subscribe to a "load complete"
 * event.
 *
 * Translations are the same idea: TRANSLATIONS_GENERATED is mutated
 * in place, and getTranslations() in state.ts returns the same
 * reference, which gets read by the i18n system at every lookup
 * (no copy at boot).
 *
 * Edge cases
 * ----------
 * - This must run before Alpine.start() so the first render sees the
 *   merged content. It cannot block module-load (IPC is async), so
 *   anything that runs at top-of-main.ts (notably buildInitialState
 *   for `dynamicInitialState`) still sees only the build-time data.
 *   That means: brand-new resources/stats introduced by a runtime
 *   addon are not auto-populated into the starting state until the
 *   player clicks "New Game" (which re-runs buildInitialState). New
 *   items, actions, NPCs, translations, and views work immediately
 *   because they're looked up by id at runtime.
 * - No `handlers.ts` support: runtime addons are YAML-only. TS handlers
 *   require a build step; users who need them go through the
 *   build-time addon path (content/addons/<name>/).
 * - Conflict policy: runtime addons LOSE every duplicate-id contest
 *   against base / build-time addons. We don't overwrite. Warning is
 *   surfaced in the console + returned to the caller.
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
  TRANSLATIONS_GENERATED,
} from '../../generated/content';
import { makeLogger } from '../log';

const log = makeLogger('RUNTIME-ADDONS');

const CATEGORY_TO_REGISTRY: Record<string, Record<string, any>> = {
  resources: RESOURCE_REGISTRY_GENERATED,
  modifiers: MODIFIER_REGISTRY_GENERATED,
  actions: ACTION_REGISTRY_GENERATED,
  items: ITEM_REGISTRY_GENERATED,
  npcs: NPC_REGISTRY_GENERATED,
  buffs: BUFF_REGISTRY_GENERATED,
  homes: HOME_REGISTRY_GENERATED,
  milestones: MILESTONE_REGISTRY_GENERATED,
  navigation: NAVIGATION_REGISTRY_GENERATED,
  titles: TITLE_REGISTRY_GENERATED,
};

export interface RuntimeAddonLoadSummary {
  /** Number of runtime addons that contributed at least one entry. */
  addonCount: number;
  /** Number of entries merged across all categories. */
  entryCount: number;
  /** Number of view fragments injected into the DOM. */
  viewCount: number;
  /** Warnings — duplicate ids, parse failures bubbled up from the main process, etc. */
  warnings: string[];
  /** Names of the loaded addons, sorted. */
  addonNames: string[];
}

const EMPTY_SUMMARY: RuntimeAddonLoadSummary = {
  addonCount: 0,
  entryCount: 0,
  viewCount: 0,
  warnings: [],
  addonNames: [],
};

/**
 * Discover runtime addons via Electron IPC and merge them into the
 * shared registries. Safe to call in the browser build — silently
 * resolves to an empty summary if window.electronAPI is missing.
 */
export const loadRuntimeAddons = async (): Promise<RuntimeAddonLoadSummary> => {
  const api = (typeof window !== 'undefined' ? window.electronAPI : undefined);
  if (!api || typeof api.addonsDiscoverRuntime !== 'function') {
    return EMPTY_SUMMARY;
  }

  let result: Awaited<ReturnType<typeof api.addonsDiscoverRuntime>>;
  try {
    result = await api.addonsDiscoverRuntime();
  } catch (err) {
    log.warn('discovery IPC failed:', err);
    return EMPTY_SUMMARY;
  }

  const warnings: string[] = [...(result.warnings ?? [])];
  let entryCount = 0;
  let viewCount = 0;

  for (const addon of result.addons) {
    // 1. Merge each category's YAML entries by id. Skip duplicates so
    //    base + build-time addons always win — runtime addons are
    //    advisory content.
    for (const [category, entries] of Object.entries(addon.data ?? {})) {
      const registry = CATEGORY_TO_REGISTRY[category];
      if (!registry) {
        warnings.push(`[${addon.name}] unknown category "${category}" — ignored`);
        continue;
      }
      if (!Array.isArray(entries)) continue;
      for (const entry of entries) {
        if (!entry || typeof entry !== 'object') continue;
        const id = (entry as { id?: unknown }).id;
        if (typeof id !== 'string') continue;
        if (id in registry) {
          warnings.push(
            `[${addon.name}/${category}] duplicate id "${id}" already provided by base or another addon — runtime addon entry ignored`,
          );
          continue;
        }
        registry[id] = entry;
        entryCount++;
      }
    }

    // 2. Merge translations. Same rule: runtime addons cannot overwrite
    //    existing keys. Adding new keys is silent (only collisions warn).
    const trGen: Record<string, Record<string, Record<string, any>>> =
      TRANSLATIONS_GENERATED as any;
    for (const [lang, contexts] of Object.entries(addon.translations ?? {})) {
      trGen[lang] ??= {};
      for (const [ctx, keys] of Object.entries(contexts)) {
        trGen[lang]![ctx] ??= {};
        for (const [k, v] of Object.entries(keys)) {
          if (k in trGen[lang]![ctx]!) {
            warnings.push(
              `[${addon.name}/i18n/${lang}/${ctx}] key "${k}" already exists — runtime override ignored`,
            );
            continue;
          }
          trGen[lang]![ctx]![k] = v;
        }
      }
    }

    // 3. Inject view fragments into the live DOM. The page has a host
    //    container (#addon-views-runtime, created on demand) where we
    //    append each section. Alpine processes new x-show nodes the
    //    next time the reactive state changes after Alpine.start().
    if (typeof document !== 'undefined') {
      const host = ensureRuntimeViewsHost();
      for (const [viewName, html] of Object.entries(addon.views ?? {})) {
        const viewId = `${addon.name}/${viewName}`;
        if (host.querySelector(`[data-runtime-view="${viewId}"]`)) {
          warnings.push(`[${addon.name}/views/${viewName}] view id "${viewId}" already injected — skipped`);
          continue;
        }
        const wrap = document.createElement('div');
        wrap.dataset.runtimeView = viewId;
        wrap.innerHTML = html;
        // Move children out of the wrapper so Alpine sees the
        // <section> directly rather than a div wrapping it. Tag the
        // section itself with the data attribute for later dedup.
        const first = wrap.firstElementChild as HTMLElement | null;
        if (first) {
          first.dataset.runtimeView = viewId;
          host.appendChild(first);
          viewCount++;
        } else {
          warnings.push(`[${addon.name}/views/${viewName}] empty view, skipped`);
        }
      }
    }
  }

  const summary: RuntimeAddonLoadSummary = {
    addonCount: result.addons.length,
    entryCount,
    viewCount,
    warnings,
    addonNames: result.addons.map((a) => a.name).sort(),
  };

  if (summary.addonCount > 0) {
    log.info(
      `loaded ${summary.addonCount} runtime addon(s): ${summary.addonNames.join(', ')} ` +
        `(${summary.entryCount} entries, ${summary.viewCount} views)`,
    );
  }
  if (result.scannedDirs?.length) {
    log.debug('scanned dirs:', result.scannedDirs);
  }
  if (warnings.length > 0) {
    log.warn(`${warnings.length} runtime-addon warning(s):`);
    for (const w of warnings.slice(0, 20)) log.warn(`  - ${w}`);
    if (warnings.length > 20) log.warn(`  …(+${warnings.length - 20} more)`);
  }

  return summary;
};

const ensureRuntimeViewsHost = (): HTMLElement => {
  let host = document.getElementById('addon-views-runtime');
  if (!host) {
    host = document.createElement('div');
    host.id = 'addon-views-runtime';
    // Place near the build-time addon-views host so we share Alpine
    // scope and styling. If neither anchor exists, fall back to body.
    const anchor = document.querySelector('#addon-views') ?? document.body;
    anchor.parentElement?.insertBefore(host, anchor.nextSibling) ?? document.body.appendChild(host);
  }
  return host;
};
