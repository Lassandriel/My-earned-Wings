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
  SECTION_REGISTRY_GENERATED,
  SUB_TAB_REGISTRY_GENERATED,
  SETTINGS_TAB_REGISTRY_GENERATED,
  TRANSLATIONS_GENERATED,
} from '../../generated/content';
import { makeLogger } from '../log';
import { applyPatches, validatePatchEntry, type PatchEntry } from '../addons/patches';
import { registerRuntimeAddons } from '../addons/active';
import { injectAddonSlots, type SlotBlock } from './addon-slots';

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
  sections: SECTION_REGISTRY_GENERATED,
  subTabs: SUB_TAB_REGISTRY_GENERATED,
  settingsTabs: SETTINGS_TAB_REGISTRY_GENERATED,
};

export interface RuntimeAddonLoadSummary {
  /** Number of runtime addons that contributed at least one entry. */
  addonCount: number;
  /** Number of entries merged across all categories. */
  entryCount: number;
  /** Number of view fragments injected into the DOM. */
  viewCount: number;
  /** Number of CSS files injected into the DOM. */
  styleCount: number;
  /** Number of slot HTML blocks injected into the DOM. */
  slotCount: number;
  /** Number of addon SFX entries registered with the audio engine. */
  sfxCount: number;
  /** Number of patches successfully applied. */
  patchCount: number;
  /** Warnings — duplicate ids, parse failures bubbled up from the main process, etc. */
  warnings: string[];
  /** Names of the loaded addons, sorted. */
  addonNames: string[];
}

const EMPTY_SUMMARY: RuntimeAddonLoadSummary = {
  addonCount: 0,
  entryCount: 0,
  viewCount: 0,
  styleCount: 0,
  slotCount: 0,
  sfxCount: 0,
  patchCount: 0,
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
    // No runtime addons available (browser build / dev server), but
    // build-time addons may still ship slot HTML — inject them so the
    // slot system isn't a no-op outside Electron.
    const buildOnlySlots = injectAddonSlots({});
    return { ...EMPTY_SUMMARY, slotCount: buildOnlySlots.injected };
  }

  let result: Awaited<ReturnType<typeof api.addonsDiscoverRuntime>>;
  try {
    result = await api.addonsDiscoverRuntime();
  } catch (err) {
    log.warn('discovery IPC failed:', err);
    const buildOnlySlots = injectAddonSlots({});
    return { ...EMPTY_SUMMARY, slotCount: buildOnlySlots.injected };
  }

  const warnings: string[] = [...(result.warnings ?? [])];
  let entryCount = 0;
  let viewCount = 0;
  let styleCount = 0;
  let sfxCount = 0;
  // Collected addon SFX keyed by full sfx key (`<addon>/<basename>`).
  // Applied in one shot after the addon loop so the audio engine only
  // sees one batch and we can report a single count in the summary.
  const collectedSfx: Record<string, string> = {};
  // Slot blocks collected from runtime addons; injected in one pass
  // alongside the build-time slot blocks at the end of loadRuntimeAddons.
  const runtimeSlotBlocks: Record<string, SlotBlock[]> = {};
  // Patches from ALL addons are collected first, then applied once
  // against the current registry state. This makes load order
  // deterministic: addons sorted by name, then each addon's patches
  // in YAML order. Errors are warnings here (vs throw at build time)
  // because a user dropping in an addon shouldn't crash the game if
  // it targets something that has moved in a newer base version.
  const collectedPatches: Array<{ entry: PatchEntry; origin: string }> = [];

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

    // 2b. Collect patches. Validate each entry's shape; bad ones drop
    //     out with a warning, valid ones are applied below.
    if (Array.isArray((addon as any).patches)) {
      for (let i = 0; i < (addon as any).patches.length; i++) {
        const raw = (addon as any).patches[i];
        const label = `${addon.name}/patches[${i}]`;
        const err = validatePatchEntry(raw, label);
        if (err) {
          warnings.push(err);
          continue;
        }
        collectedPatches.push({ entry: raw as PatchEntry, origin: `addons/${addon.name}` });
      }
    }

    // 2c. Inject any CSS the addon ships under styles/*.css. Each
    //     file becomes its own <style data-addon-style="..."> tag so
    //     DevTools shows the source clearly and we can de-dup if a
    //     reload accidentally tries to re-inject. Build-time addons
    //     go through the bundled addon-styles.css instead and skip
    //     this path.
    if (typeof document !== 'undefined' && (addon as any).styles) {
      for (const [fileName, css] of Object.entries((addon as any).styles as Record<string, string>)) {
        const tagId = `${addon.name}/${fileName}`;
        if (document.querySelector(`style[data-addon-style="${tagId}"]`)) {
          warnings.push(`[${addon.name}/styles/${fileName}] style already injected — skipped`);
          continue;
        }
        const styleEl = document.createElement('style');
        styleEl.dataset.addonStyle = tagId;
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
        styleCount++;
      }
    }

    // 2c'. Collect addon SFX (filename → data: URL). The audio engine
    //      keys by `<addon>/<basename-no-ext>` so YAML can reference
    //      sounds without collision risk. We derive the key here from
    //      the IPC payload's filename (extension stripped) so the
    //      main process stays unaware of audio-engine conventions.
    if ((addon as any).sfx) {
      for (const [fileName, url] of Object.entries((addon as any).sfx as Record<string, string>)) {
        if (typeof url !== 'string' || url.length === 0) continue;
        const baseName = fileName.replace(/\.(mp3|ogg|wav|m4a)$/i, '');
        const key = `${addon.name}/${baseName}`;
        if (key in collectedSfx) {
          warnings.push(`[${addon.name}/sfx/${fileName}] duplicate sfx key "${key}" — skipped`);
          continue;
        }
        collectedSfx[key] = url;
      }
    }

    // 2d. Collect slot blocks (HTML to inject into named markers in
    //     base views). Multiple addons can target the same slot id;
    //     the slot service handles ordering + Alpine init at boot.
    if ((addon as any).slots) {
      for (const [slotId, html] of Object.entries((addon as any).slots as Record<string, string>)) {
        if (typeof html !== 'string' || html.length === 0) continue;
        (runtimeSlotBlocks[slotId] ??= []).push({
          addonName: addon.name,
          fileName: `${slotId}.html`,
          html,
        });
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

  // Apply collected patches against the (already-merged) registries.
  // Runtime patches use missingTarget='warn' so a bad addon doesn't
  // break gameplay — the addon's other content can still load.
  let patchCount = 0;
  if (collectedPatches.length > 0) {
    const patchResult = applyPatches(
      collectedPatches,
      {
        action: ACTION_REGISTRY_GENERATED,
        npc: NPC_REGISTRY_GENERATED,
        item: ITEM_REGISTRY_GENERATED,
        buff: BUFF_REGISTRY_GENERATED,
        resource: RESOURCE_REGISTRY_GENERATED,
        modifier: MODIFIER_REGISTRY_GENERATED,
        home: HOME_REGISTRY_GENERATED,
        navigation: NAVIGATION_REGISTRY_GENERATED,
        milestone: MILESTONE_REGISTRY_GENERATED,
        section: SECTION_REGISTRY_GENERATED,
      },
      { missingTarget: 'warn' },
    );
    patchCount = patchResult.applied;
    warnings.push(...patchResult.warnings);
  }

  // Hand collected SFX to the audio engine. We poke through Alpine.store
  // because the audio system is constructed before runtime addons land
  // and there's no service handle reachable from this module without
  // tighter coupling. The store reference is set during main.ts boot
  // (well before this loader runs), so the audio system exists.
  if (Object.keys(collectedSfx).length > 0 && typeof window !== 'undefined') {
    const w = window as unknown as { Alpine?: { store: (n: string) => any } };
    const game = w.Alpine?.store('game');
    if (game?.audio?.registerAddonSfx) {
      game.audio.registerAddonSfx(collectedSfx);
      sfxCount = Object.keys(collectedSfx).length;
    } else {
      warnings.push('audio system not yet ready — runtime addon SFX skipped');
    }
  }

  // Tell the active-addons registry which runtime addons are now live.
  // The save system reads this to embed a compatibility snapshot in
  // every save. Build-time addons are already in the registry via the
  // generated content; we just contribute the runtime side here.
  registerRuntimeAddons(result.addons.map((a) => ({ name: a.name, version: a.version })));

  // Inject build-time + runtime slot blocks in one pass. Build-time
  // payload is read from ADDON_SLOTS_GENERATED inside the service.
  const slotResult = injectAddonSlots(runtimeSlotBlocks);
  if (slotResult.missingSlots.length > 0) {
    warnings.push(
      ...slotResult.missingSlots.map(
        (s) => `slot "${s}" has addon content but no <div data-slot> in the live DOM`,
      ),
    );
  }

  const summary: RuntimeAddonLoadSummary = {
    addonCount: result.addons.length,
    entryCount,
    viewCount,
    styleCount,
    slotCount: slotResult.injected,
    sfxCount,
    patchCount,
    warnings,
    addonNames: result.addons.map((a) => a.name).sort(),
  };

  if (summary.addonCount > 0) {
    log.info(
      `loaded ${summary.addonCount} runtime addon(s): ${summary.addonNames.join(', ')} ` +
        `(${summary.entryCount} entries, ${summary.viewCount} views, ` +
        `${summary.styleCount} stylesheets, ${summary.slotCount} slot blocks, ` +
        `${summary.sfxCount} sfx, ${summary.patchCount} patches)`,
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
