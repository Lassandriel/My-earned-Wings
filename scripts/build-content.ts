#!/usr/bin/env tsx
/**
 * build-content.ts — Phase 1 Content Pipeline
 * Reads all YAML files from content/ and generates src/generated/content.ts
 * Run: npm run build:content
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

const ajv = new Ajv();
const contentSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" }
    },
    required: ["id"],
    additionalProperties: true
  }
};
const validateSchema = ajv.compile(contentSchema);

// Addon manifest schema (v1). Required: name + version. Optional fields
// are documented in docs/ADDON_SYSTEM_PLAN.md.
interface AddonManifest {
  name: string;
  version: string;
  description?: string;
  author?: string;
  enabledByDefault?: boolean;
  requires?: string[];
  /**
   * Names of addons this one wants to override on collision. Affects
   * load order: an addon listed here loads BEFORE this one, so the
   * later (override) writes win deterministically. Soft: missing
   * targets are warned, not fatal — overriding nothing is a no-op.
   */
  overrides?: string[];
}
const manifestSchema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[a-z][a-z0-9_-]*$" },
    version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" },
    description: { type: "string" },
    author: { type: "string" },
    enabledByDefault: { type: "boolean" },
    requires: { type: "array", items: { type: "string" } },
    overrides: { type: "array", items: { type: "string" } },
  },
  required: ["name", "version"],
  additionalProperties: false,
};
const validateManifest = ajv.compile(manifestSchema);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
// Phase 18+ unified loader: every content source — including the
// base game — lives at content/addons/<name>/. The historical
// `content/base/` folder was renamed to `content/addons/core/` so
// the build pipeline has a single code path. Load order is the
// topo-sorted addon list; `core` lands first by name and so still
// runs before vandara / smoke_test / future addons.
const CONTENT_DIR = path.join(ROOT, 'content');
const ADDONS_DIR = path.join(CONTENT_DIR, 'addons');
const OUTPUT_FILE = path.join(ROOT, 'src', 'generated', 'content.ts');

// ─── Helpers ────────────────────────────────────────────────────────────────

function readYaml(filePath: string): any[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = yaml.load(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`[build-content] Expected array in ${filePath}, got ${typeof parsed}`);
  }
  if (!validateSchema(parsed)) {
    console.warn(`⚠️ [build-content] Schema validation failed in ${filePath}:`, ajv.errorsText(validateSchema.errors));
  }
  return parsed;
}

function loadDir(dir: string): any[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
    .flatMap(f => readYaml(path.join(dir, f)));
}

/**
 * Loads a category from every addon (including `core`), tagged with
 * origin so the registry builder can produce useful collision errors.
 * Iteration follows the addon list's topo-sorted order so the
 * resulting record's order is deterministic — `core` lands first by
 * alphabetical name, addons that declare `overrides:` against
 * something land after their target.
 */
type TaggedItem = { item: any; origin: string };
function loadCategoryFromAllSources(category: string): TaggedItem[] {
  const tag = (origin: string) => (item: any): TaggedItem => ({ item, origin });
  const out: TaggedItem[] = [];
  for (const { manifest, dir } of addons) {
    const addonDir = path.join(dir, category);
    out.push(...loadDir(addonDir).map(tag(`addons/${manifest.name}/${category}`)));
  }
  return out;
}

/**
 * Discover addons under content/addons/<name>/. Each addon directory must
 * contain a manifest.yaml matching the v1 schema. Directories starting with
 * `_` are skipped (used for `_example/` and disabled-by-rename addons).
 *
 * Returns the manifest list sorted by name for deterministic build output.
 * Does NOT load addon content — that's step 3.
 */
function discoverAddons(): Array<{ manifest: AddonManifest; dir: string }> {
  if (!fs.existsSync(ADDONS_DIR)) return [];
  const out: Array<{ manifest: AddonManifest; dir: string }> = [];
  const entries = fs.readdirSync(ADDONS_DIR).sort();
  for (const name of entries) {
    if (name.startsWith('_')) continue;
    const dir = path.join(ADDONS_DIR, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    const manifestPath = path.join(dir, 'manifest.yaml');
    if (!fs.existsSync(manifestPath)) {
      throw new Error(`[addon] ${name}: missing manifest.yaml`);
    }
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = yaml.load(raw) as AddonManifest;
    if (!manifest || typeof manifest !== 'object') {
      throw new Error(`[addon] ${name}: manifest.yaml is not an object`);
    }
    if (!validateManifest(manifest)) {
      throw new Error(
        `[addon] ${name}: manifest validation failed — ${ajv.errorsText(validateManifest.errors)}`,
      );
    }
    if (manifest.name !== name) {
      throw new Error(
        `[addon] folder name "${name}" does not match manifest.name "${manifest.name}"`,
      );
    }
    out.push({ manifest, dir });
  }

  // Topological sort using `overrides`: if A overrides B, A must come
  // AFTER B in the load order so A's writes win deterministically.
  // Base order is alphabetical (the readdirSync().sort() above) so the
  // result is stable across machines.
  const byName = new Map(out.map((e) => [e.manifest.name, e]));
  const visited = new Set<string>();
  const inProgress = new Set<string>();
  const sorted: typeof out = [];
  function visit(name: string, chain: string[]): void {
    if (visited.has(name)) return;
    if (inProgress.has(name)) {
      throw new Error(
        `[addon] override cycle detected: ${[...chain, name].join(' → ')}. ` +
          `Two addons listing each other in overrides creates a contradiction — one of them needs to drop the edge.`,
      );
    }
    const entry = byName.get(name);
    if (!entry) return; // soft: missing override target warned later
    inProgress.add(name);
    for (const dep of entry.manifest.overrides ?? []) {
      visit(dep, [...chain, name]);
    }
    inProgress.delete(name);
    visited.add(name);
    sorted.push(entry);
  }
  for (const e of out) visit(e.manifest.name, []);

  // Soft warning for `overrides:` entries that don't exist. Doesn't
  // abort the build because the override declaration may just be
  // proactive (the addon planned ahead in case the other one is ever
  // installed).
  const allNames = new Set(out.map((e) => e.manifest.name));
  for (const e of out) {
    for (const target of e.manifest.overrides ?? []) {
      if (target === e.manifest.name) {
        throw new Error(`[addon] ${e.manifest.name}: cannot override itself`);
      }
      if (!allNames.has(target)) {
        console.warn(
          `⚠️  [addon] ${e.manifest.name} declares overrides: [${target}] but ${target} isn't installed — no effect`,
        );
      }
    }
  }

  return sorted;
}

/**
 * Convert a tagged-item list to a Record<id, item>. Throws with origin
 * info on duplicate IDs (the whole point of tagging).
 */
function taggedToRecord(items: TaggedItem[], key = 'id'): Record<string, any> {
  const result: Record<string, any> = {};
  const origins: Record<string, string> = {};
  for (const { item, origin } of items) {
    if (!item[key]) {
      console.warn(`[build-content] Item missing "${key}" field in ${origin}:`, JSON.stringify(item).slice(0, 80));
      continue;
    }
    const id = item[key];
    if (result[id]) {
      throw new Error(
        `[build-content] Duplicate ID "${id}": defined in BOTH ${origins[id]} AND ${origin}. ` +
          `Each entry must have a unique id across base + all addons. ` +
          `Either rename one (preferably the addon's; e.g. prefix with the addon name) or remove the dup.`,
      );
    }
    result[id] = item;
    origins[id] = origin;
  }
  return result;
}

// ─── Load all content ───────────────────────────────────────────────────────

console.log('📦 [build-content] Reading YAML files...');

const addons = discoverAddons();

// Enforce manifest.requires across the discovered addon set. Each
// `requires` entry is the name of another addon that must be present
// for this one to load — kept as a strict relationship because half-
// loaded dependency chains lead to "I deleted addon X but addon Y's
// content still references it" mysteries. Fatal here so the build
// fails loud; runtime addons are checked separately in their loader.
{
  const have = new Set(addons.map((a) => a.manifest.name));
  for (const { manifest } of addons) {
    const reqs = manifest.requires ?? [];
    for (const dep of reqs) {
      if (!have.has(dep)) {
        throw new Error(
          `[addon] ${manifest.name}@${manifest.version} requires "${dep}" which isn't installed. ` +
            `Drop the dependency folder into content/addons/, remove the requires entry, or rename it ` +
            `to match an installed addon.`,
        );
      }
      // Self-reference is harmless but obviously a typo; flag it.
      if (dep === manifest.name) {
        throw new Error(`[addon] ${manifest.name}: requires itself — drop the self-reference`);
      }
    }
  }
}

if (addons.length > 0) {
  console.log(
    `🧩 Discovered ${addons.length} addon(s): ${addons.map((a) => `${a.manifest.name}@${a.manifest.version}`).join(', ')}`,
  );
  console.log('   (manifests validated, content + translations merged into base)');
} else if (fs.existsSync(ADDONS_DIR)) {
  console.log('🧩 No active addons found (content/addons/ exists but is empty or all _-prefixed).');
}

const resources = loadCategoryFromAllSources('resources');
const modifiers = loadCategoryFromAllSources('modifiers');
const actions = loadCategoryFromAllSources('actions');
const items = loadCategoryFromAllSources('items');
const npcs = loadCategoryFromAllSources('npcs');
const buffs = loadCategoryFromAllSources('buffs');
const homes = loadCategoryFromAllSources('homes');
const milestones = loadCategoryFromAllSources('milestones');
const navigation = loadCategoryFromAllSources('navigation');
const titles = loadCategoryFromAllSources('titles');
// `sections` is a UI-layout primitive: each entry tells the Main view
// to render a card-list for a given action-category, in a given
// sub-tab, gated by an optional flag. Addons add new production
// stations / lore corners / etc. without ever touching the base view
// markup. See src/features/gameplay/main.view.html for the renderer.
const sections = loadCategoryFromAllSources('sections');
// `subTabs` declare which sub-tab options a parent view (e.g. Main)
// exposes. Each entry: { id, parentView, labelKey, alwaysShown?,
// requiresFlag?, order? }. The Main view iterates this registry to
// render its sub-tab strip, so addons can add new sub-tabs by
// shipping a YAML entry — no view markup to edit. See main.view.html.
const subTabs = loadCategoryFromAllSources('subTabs');
// `settingsTabs` declare which tabs appear in the Settings modal's
// sidebar. Each entry: { id, icon, labelKey, order, requiresFlag? }.
// Base ships its 5 tabs (general/controls/audio/graphics/system) here;
// addons add their own by dropping a YAML entry and filling the
// `settings-content` slot with a `<div x-show="settingsTab === '<id>'">`
// block. See settings.view.html for the renderer.
const settingsTabs = loadCategoryFromAllSources('settingsTabs');

// ─── Translations (special: nested map, not array) ──────────────────────────
//
// Load order: base first, then addons in name order. Within each source
// the structure is i18n/<lang>/<context>.yaml. Per D3 in the addon plan,
// addon keys override base keys with a dev-time warning so accidental
// overrides are visible. Add-only keys silently merge.
function loadTranslationDir(
  i18nDir: string,
  origin: string,
  out: Record<string, Record<string, Record<string, string>>>,
  overrides: Array<{ lang: string; ctx: string; key: string; from: string; to: string }>,
): void {
  if (!fs.existsSync(i18nDir)) return;
  for (const lang of fs.readdirSync(i18nDir)) {
    const langDir = path.join(i18nDir, lang);
    if (!fs.statSync(langDir).isDirectory()) continue;
    (out[lang] ??= {});
    for (const file of fs.readdirSync(langDir).filter((f) => /\.ya?ml$/.test(f))) {
      const ctx = file.replace(/\.ya?ml$/, '');
      const raw = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const parsed = yaml.load(raw);
      if (!parsed || typeof parsed !== 'object') continue;
      const existing = (out[lang][ctx] ??= {});
      for (const [k, v] of Object.entries(parsed as Record<string, string>)) {
        if (k in existing && existing[k] !== v) {
          overrides.push({ lang, ctx, key: k, from: existing[k] as string, to: v });
        }
        existing[k] = v;
      }
    }
  }
}
function loadTranslations(): Record<string, Record<string, Record<string, string>>> {
  const out: Record<string, Record<string, Record<string, string>>> = {};
  const overrides: Array<{ lang: string; ctx: string; key: string; from: string; to: string }> = [];
  for (const { manifest, dir } of addons) {
    loadTranslationDir(path.join(dir, 'i18n'), `addons/${manifest.name}`, out, overrides);
  }
  if (overrides.length > 0) {
    console.log(`⚠️  ${overrides.length} translation override(s) by addons:`);
    for (const o of overrides.slice(0, 10)) {
      console.log(`   [${o.lang}/${o.ctx}] ${o.key}: "${String(o.from).slice(0, 40)}" → "${String(o.to).slice(0, 40)}"`);
    }
    if (overrides.length > 10) console.log(`   …(+${overrides.length - 10} more)`);
  }
  return out;
}
const translations = loadTranslations();

// ─── Patches ────────────────────────────────────────────────────────────────
// Addons can ship patches under content/addons/<name>/patches/*.yaml that
// MODIFY existing base-game entries. v1 supports `appendSteps` for
// multi-step actions. See src/core/addons/patches.ts for the engine.
// Loaded HERE (before taggedToRecord) so the resulting registries reflect
// the patched state; everything downstream sees post-patch data.

import { applyPatches, validatePatchEntry, type PatchEntry } from '../src/core/addons/patches.js';

function loadAddonPatches(): Array<{ entry: PatchEntry; origin: string }> {
  const all: Array<{ entry: PatchEntry; origin: string }> = [];
  for (const { manifest, dir } of addons) {
    const patchesDir = path.join(dir, 'patches');
    if (!fs.existsSync(patchesDir) || !fs.statSync(patchesDir).isDirectory()) continue;
    const files = fs.readdirSync(patchesDir).filter((f) => /\.ya?ml$/.test(f)).sort();
    for (const file of files) {
      const sourceLabel = `addons/${manifest.name}/patches/${file}`;
      const raw = yaml.load(fs.readFileSync(path.join(patchesDir, file), 'utf-8'));
      if (!Array.isArray(raw)) {
        throw new Error(`[build-content] Expected array in ${sourceLabel}, got ${typeof raw}`);
      }
      for (let i = 0; i < raw.length; i++) {
        const err = validatePatchEntry(raw[i], `${sourceLabel}[${i}]`);
        if (err) throw new Error(`[build-content] ${err}`);
        all.push({ entry: raw[i] as PatchEntry, origin: sourceLabel });
      }
    }
  }
  return all;
}

const addonPatches = loadAddonPatches();

// ─── Addon-defined schema validation ────────────────────────────────
// Each addon may ship a `schema.yaml` declaring fields it wants
// enforced on its own content. Shape:
//
//     items:
//       required: [shadowAffinity]
//     npcs:
//       required: [vandaraType]
//
// We only validate entries that originated from THIS addon — we never
// retroactively impose addon requirements on base content. Failures
// throw with the offending file + entry id so the author can fix them.
//
// Why so minimal: most addons don't need this; the base schema +
// tsc on handlers/ticks/effects already catches the meaty cases. But
// some addons want to guarantee "every shadow item declares its
// affinity"; that's the kind of self-enforcement this enables.
function validateAddonSchemas(): void {
  for (const { manifest, dir } of addons) {
    const schemaPath = path.join(dir, 'schema.yaml');
    if (!fs.existsSync(schemaPath)) continue;
    let schema: unknown;
    try {
      schema = yaml.load(fs.readFileSync(schemaPath, 'utf-8'));
    } catch (err) {
      throw new Error(
        `[addon] ${manifest.name}/schema.yaml parse error: ${(err as Error).message}`,
      );
    }
    if (!schema || typeof schema !== 'object') continue;

    for (const [category, rules] of Object.entries(schema as Record<string, unknown>)) {
      const required =
        rules && typeof rules === 'object' && Array.isArray((rules as { required?: unknown }).required)
          ? ((rules as { required: unknown[] }).required as string[])
          : [];
      if (required.length === 0) continue;

      // Load this addon's own content for the category (not the merged
      // registry — we don't want to fail base entries that lack an
      // addon-required field they were never supposed to have).
      const addonCategoryDir = path.join(dir, category);
      const entries = loadDir(addonCategoryDir);
      for (const entry of entries) {
        for (const field of required) {
          if (entry[field] === undefined) {
            throw new Error(
              `[addon] ${manifest.name}/schema.yaml: entry "${entry.id}" in ${category}/ ` +
                `is missing required field "${field}"`,
            );
          }
        }
      }
    }
  }
}
validateAddonSchemas();

// ─── Build registries ───────────────────────────────────────────────────────

const resourceRegistry = taggedToRecord(resources);
const modifierRegistry = taggedToRecord(modifiers);
const actionRegistry = taggedToRecord(actions);
const itemRegistry = taggedToRecord(items);
const npcRegistry = taggedToRecord(npcs);
const buffRegistry = taggedToRecord(buffs);
const homeRegistry = taggedToRecord(homes);
const milestoneRegistry = taggedToRecord(milestones);
const navigationRegistry = taggedToRecord(navigation);
const titleRegistry = taggedToRecord(titles);
const sectionRegistry = taggedToRecord(sections);
const subTabRegistry = taggedToRecord(subTabs);
const settingsTabRegistry = taggedToRecord(settingsTabs);

// Apply addon patches. Fatal on missing targets (build-time addons are
// shipped with the build — a missing reference is an addon bug).
if (addonPatches.length > 0) {
  const patchResult = applyPatches(
    addonPatches,
    {
      action: actionRegistry,
      npc: npcRegistry,
      item: itemRegistry,
      buff: buffRegistry,
      resource: resourceRegistry,
      modifier: modifierRegistry,
      home: homeRegistry,
      navigation: navigationRegistry,
      milestone: milestoneRegistry,
      section: sectionRegistry,
    },
    { missingTarget: 'throw' },
  );
  console.log(`🩹 Applied ${patchResult.applied} addon patch(es)`);
}

// ─── Derive the efficiency keys for the pipeline automatically ───────────────
// Any resource or modifier with scalesWithSatiation: true gets added.
// Reads through the TaggedItem wrapper (.item) since loadCategoryFromAllSources
// returns origin-tagged entries.
const efficiencyKeys: string[] = [
  ...resources
    .filter((t) => t.item.scalesWithSatiation)
    .map((t) => `${t.item.id}_yield`),
  ...modifiers
    .filter((t) => t.item.scalesWithSatiation)
    .map((t) => t.item.id),
  // Always include these base keys
  'garden_yield',
];
// Remove duplicates
const uniqueEfficiencyKeys = [...new Set(efficiencyKeys)];

// ─── Validate ────────────────────────────────────────────────────────────────

console.log(`✅ Resources: ${Object.keys(resourceRegistry).length}`);
console.log(`✅ Modifiers: ${Object.keys(modifierRegistry).length}`);
console.log(`✅ Actions:   ${Object.keys(actionRegistry).length}`);
console.log(`✅ Items:     ${Object.keys(itemRegistry).length}`);
console.log(`✅ NPCs:      ${Object.keys(npcRegistry).length}`);
console.log(`✅ Buffs:     ${Object.keys(buffRegistry).length}`);
console.log(`✅ Homes:     ${Object.keys(homeRegistry).length}`);
console.log(`✅ Milestones:${Object.keys(milestoneRegistry).length}`);
console.log(`✅ Navigation:${Object.keys(navigationRegistry).length}`);
console.log(`✅ Titles:    ${Object.keys(titleRegistry).length}`);
console.log(`✅ Sections:  ${Object.keys(sectionRegistry).length}`);
console.log(`✅ Sub-Tabs:  ${Object.keys(subTabRegistry).length}`);
console.log(`✅ Settings-Tabs: ${Object.keys(settingsTabRegistry).length}`);
const trKeyCount = Object.values(translations).reduce(
  (acc, ctxMap) => acc + Object.values(ctxMap).reduce((a, m) => a + Object.keys(m).length, 0),
  0
);
console.log(`✅ Translations: ${Object.keys(translations).length} langs, ${trKeyCount} total keys`);
console.log(`✅ Pipeline efficiency keys: ${uniqueEfficiencyKeys.length}`);

// ─── Generate output ─────────────────────────────────────────────────────────

const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the version once from package.json so the in-game footer label,
// CHANGELOG, and tag never drift apart. Substituted into the generated
// content as a top-level export. Single source of truth = package.json.
const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'),
) as { version?: string };
const GAME_VERSION = packageJson.version ?? '0.0.0';
console.log(`📦 Embedded GAME_VERSION = ${GAME_VERSION} (from package.json)`);

// Header is deterministic on purpose — no timestamp — so re-running
// build:content with unchanged YAML produces a byte-identical output.
// That keeps git status clean across dev sessions and CI runs.
const output = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content

// === Game Version (from package.json at build time) ===

export const GAME_VERSION = ${JSON.stringify(GAME_VERSION)};

// === Resource Registry ===

export const RESOURCE_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(resourceRegistry, null, 2)};

// === Modifier Registry ===

export const MODIFIER_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(modifierRegistry, null, 2)};

// === Action Registry ===

export const ACTION_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(actionRegistry, null, 2)};

// === Item Registry ===

export const ITEM_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(itemRegistry, null, 2)};

// === NPC Registry ===

export const NPC_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(npcRegistry, null, 2)};

// === Buff Registry ===

export const BUFF_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(buffRegistry, null, 2)};

// === Home Registry ===

export const HOME_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(homeRegistry, null, 2)};

// === Milestone Registry ===

export const MILESTONE_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(milestoneRegistry, null, 2)};

// === Navigation Registry ===

export const NAVIGATION_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(navigationRegistry, null, 2)};

// === Title Registry ===

export const TITLE_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(titleRegistry, null, 2)};

// === Section Registry (UI layout primitive — see Main view) ===

export const SECTION_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(sectionRegistry, null, 2)};

// === Sub-Tab Registry (UI layout primitive — see Main view) ===

export const SUB_TAB_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(subTabRegistry, null, 2)};

// === Settings-Tab Registry (UI layout primitive — see Settings modal) ===

export const SETTINGS_TAB_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(settingsTabRegistry, null, 2)};

// === Loaded Addons (build-time) ===
// List of every build-time addon that contributed to this bundle.
// Used by the save system to track which addons were active when a
// save was written, so the load path can warn when a save needs an
// addon that isn't compiled in. Runtime addons (drop-in folders)
// are tracked separately at boot — the save's full activeAddons
// list is the union of both.

export const BUILD_TIME_ADDONS: Array<{ name: string; version: string; description?: string; author?: string }> = ${JSON.stringify(
  addons.map((a) => ({
    name: a.manifest.name,
    version: a.manifest.version,
    description: a.manifest.description,
    author: a.manifest.author,
  })),
  null,
  2,
)};

// === Translations (lang -> context -> key -> string) ===

// Translation values can be flat strings or nested objects ({title, desc, ...}).
export const TRANSLATIONS_GENERATED: Record<string, Record<string, Record<string, any>>> = ${JSON.stringify(translations, null, 2)};

// === Pipeline Config ===
// Auto-derived from YAML: resources/modifiers with scalesWithSatiation: true

export const PIPELINE_EFFICIENCY_KEYS: readonly string[] = ${JSON.stringify(uniqueEfficiencyKeys, null, 2)} as const;
`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`\n🎉 [build-content] Generated: ${path.relative(ROOT, OUTPUT_FILE)}`);

// ─── Generate addon-handlers.ts ─────────────────────────────────────────────
// For every addon that ships a handlers.ts, import its handler map and
// merge into ADDON_HANDLERS with auto-prefixed keys (<addon>/<name>) so
// addons can never collide on handler names. YAML refers to the handler
// via the prefixed name, e.g. customExecute: vandara/npc_execute.
const ADDON_HANDLERS_FILE = path.join(ROOT, 'src', 'generated', 'addon-handlers.ts');
const addonsWithHandlers = addons.filter((a) =>
  fs.existsSync(path.join(a.dir, 'handlers.ts')),
);
let addonHandlersOutput = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/handlers.ts
// Regenerate: npm run build:content
//
// Handler keys are namespaced to <addon>/<name> so YAML can reference them
// without risk of collision (e.g. customExecute: vandara/npc_execute).

import type { CustomExecuteHandler } from '../data/actions/custom-handlers';
`;

if (addonsWithHandlers.length === 0) {
  addonHandlersOutput += `\nexport const ADDON_HANDLERS: Record<string, CustomExecuteHandler> = {};\n`;
} else {
  // Imports
  for (const a of addonsWithHandlers) {
    addonHandlersOutput += `import * as h_${a.manifest.name} from '../../content/addons/${a.manifest.name}/handlers';\n`;
  }
  addonHandlersOutput += `\nconst prefix = (name: string, hs: Record<string, CustomExecuteHandler>): Record<string, CustomExecuteHandler> => {\n`;
  addonHandlersOutput += `  const out: Record<string, CustomExecuteHandler> = {};\n`;
  addonHandlersOutput += `  for (const k of Object.keys(hs)) out[\`\${name}/\${k}\`] = hs[k]!;\n`;
  addonHandlersOutput += `  return out;\n`;
  addonHandlersOutput += `};\n\n`;
  addonHandlersOutput += `// Each addon's handlers.ts may export a default object or named handlers.\n`;
  addonHandlersOutput += `// We try default first, then fall back to the module's named exports.\n`;
  addonHandlersOutput += `const pick = (mod: any): Record<string, CustomExecuteHandler> =>\n`;
  addonHandlersOutput += `  (mod.default && typeof mod.default === 'object') ? mod.default : mod;\n\n`;
  addonHandlersOutput += `export const ADDON_HANDLERS: Record<string, CustomExecuteHandler> = {\n`;
  for (const a of addonsWithHandlers) {
    addonHandlersOutput += `  ...prefix('${a.manifest.name}', pick(h_${a.manifest.name})),\n`;
  }
  addonHandlersOutput += `};\n`;
}

fs.writeFileSync(ADDON_HANDLERS_FILE, addonHandlersOutput, 'utf-8');
const handlerSummary =
  addonsWithHandlers.length === 0
    ? 'no addons ship handlers.ts'
    : `${addonsWithHandlers.length} addon(s) ship handlers: ${addonsWithHandlers.map((a) => a.manifest.name).join(', ')}`;
console.log(`🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_HANDLERS_FILE)} (${handlerSummary})`);

// ─── Generate addon-effects.ts ──────────────────────────────────────
// Addons that want their own effect types (e.g. `summonShadow`,
// `applyCurse`) ship `effects.ts` exporting `registerEffects`. The
// action engine calls each registrar once during initEffects() so
// YAML can declare `onSuccess: [{ type: <custom>, ... }]` and the
// runtime dispatch finds the handler. See src/core/addons/effects.ts.
const ADDON_EFFECTS_FILE = path.join(ROOT, 'src', 'generated', 'addon-effects.ts');
const addonsWithEffects = addons.filter((a) =>
  fs.existsSync(path.join(a.dir, 'effects.ts')),
);
let addonEffectsOutput =
  '// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n' +
  '// Source: content/addons/<name>/effects.ts (each must export `registerEffects`)\n' +
  '// Regenerate: npm run build:content\n' +
  '//\n' +
  '// One slot per addon. actions.logic.ts calls every registrar during\n' +
  '// initEffects(), right after the built-in handlers. See\n' +
  '// src/core/addons/effects.ts for the contract.\n\n' +
  "import type { RegisterAddonEffects } from '../core/addons/effects';\n";

if (addonsWithEffects.length === 0) {
  addonEffectsOutput +=
    '\nexport const ADDON_EFFECT_REGISTRARS: Record<string, RegisterAddonEffects> = {};\n';
} else {
  for (const a of addonsWithEffects) {
    addonEffectsOutput +=
      `import * as e_${a.manifest.name} from '../../content/addons/${a.manifest.name}/effects';\n`;
  }
  addonEffectsOutput +=
    '\nexport const ADDON_EFFECT_REGISTRARS: Record<string, RegisterAddonEffects> = {\n';
  for (const a of addonsWithEffects) {
    addonEffectsOutput += `  ${a.manifest.name}: e_${a.manifest.name}.registerEffects,\n`;
  }
  addonEffectsOutput += '};\n';
}
fs.writeFileSync(ADDON_EFFECTS_FILE, addonEffectsOutput, 'utf-8');
const effectsSummary =
  addonsWithEffects.length === 0
    ? 'no addons ship effects.ts'
    : `${addonsWithEffects.length} addon(s) ship effects: ${addonsWithEffects.map((a) => a.manifest.name).join(', ')}`;
console.log(`🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_EFFECTS_FILE)} (${effectsSummary})`);

// ─── Generate addon-ticks.ts ────────────────────────────────────────
// Per the AddonTickHook contract in src/core/addons/ticks.ts, every
// addon that wants per-second logic drops a `ticks.ts` exporting
// `onTick`. We collect them into a single registry the engine reads
// from inside processTick(). Runtime addons can't ship ticks (TS
// requires the build) — same limitation as handlers + migrations.
const ADDON_TICKS_FILE = path.join(ROOT, 'src', 'generated', 'addon-ticks.ts');
const addonsWithTicks = addons.filter((a) =>
  fs.existsSync(path.join(a.dir, 'ticks.ts')),
);
let addonTicksOutput =
  '// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n' +
  '// Source: content/addons/<name>/ticks.ts (each must export `onTick`)\n' +
  '// Regenerate: npm run build:content\n' +
  '//\n' +
  '// One slot per addon. The engine calls each hook from processTick()\n' +
  '// once per simulation second after the built-in ticks. See\n' +
  '// src/core/addons/ticks.ts for the contract.\n\n' +
  "import type { AddonTickHook } from '../core/addons/ticks';\n";

if (addonsWithTicks.length === 0) {
  addonTicksOutput += '\nexport const ADDON_TICKS: Record<string, AddonTickHook> = {};\n';
} else {
  for (const a of addonsWithTicks) {
    addonTicksOutput +=
      `import * as t_${a.manifest.name} from '../../content/addons/${a.manifest.name}/ticks';\n`;
  }
  addonTicksOutput += '\nexport const ADDON_TICKS: Record<string, AddonTickHook> = {\n';
  for (const a of addonsWithTicks) {
    // The addon's module must export `onTick`. If it doesn't, tsc
    // catches it at the next compile — no runtime guard needed.
    addonTicksOutput += `  ${a.manifest.name}: t_${a.manifest.name}.onTick,\n`;
  }
  addonTicksOutput += '};\n';
}
fs.writeFileSync(ADDON_TICKS_FILE, addonTicksOutput, 'utf-8');
const tickSummary =
  addonsWithTicks.length === 0
    ? 'no addons ship ticks.ts'
    : `${addonsWithTicks.length} addon(s) ship ticks: ${addonsWithTicks.map((a) => a.manifest.name).join(', ')}`;
console.log(`🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_TICKS_FILE)} (${tickSummary})`);

// ─── Generate addon-migrations.ts ───────────────────────────────────
// Every addon that ships `migrations.ts` exports SCHEMA_VERSION +
// MIGRATIONS. We collect them into ADDON_MIGRATIONS so the load path
// can advance an old save's per-addon shape without forking
// src/core/services/save-migrations.ts. Runtime addons can't do this
// — TS source needs the build step.
const ADDON_MIGRATIONS_FILE = path.join(ROOT, 'src', 'generated', 'addon-migrations.ts');
const addonsWithMigrations = addons.filter((a) =>
  fs.existsSync(path.join(a.dir, 'migrations.ts')),
);
let addonMigrationsOutput =
  '// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n' +
  '// Source: content/addons/<name>/migrations.ts\n' +
  '// Regenerate: npm run build:content\n' +
  '//\n' +
  '// Each addon that ships migrations contributes one entry below. The\n' +
  '// load path reads this map and calls runAddonMigrations() so addon\n' +
  '// authors can upgrade their slice of an old save (renamed flags,\n' +
  '// restructured items, etc.) without forking the base save-migrations\n' +
  '// file. Runtime addons (drop-in folders) cannot ship migrations —\n' +
  '// TS code requires the build step.\n\n' +
  "import type { AddonMigrationModule } from '../core/services/save-migrations';\n";

if (addonsWithMigrations.length === 0) {
  addonMigrationsOutput +=
    '\nexport const ADDON_MIGRATIONS: Record<string, AddonMigrationModule> = {};\n';
} else {
  for (const a of addonsWithMigrations) {
    addonMigrationsOutput +=
      `import * as mig_${a.manifest.name} from '../../content/addons/${a.manifest.name}/migrations';\n`;
  }
  addonMigrationsOutput +=
    '\nexport const ADDON_MIGRATIONS: Record<string, AddonMigrationModule> = {\n';
  for (const a of addonsWithMigrations) {
    // Cast: each migrations module is statically validated by tsc
    // (SCHEMA_VERSION + MIGRATIONS shape) — runtime check is the
    // tsc build, not the build script.
    addonMigrationsOutput +=
      `  ${a.manifest.name}: mig_${a.manifest.name} as unknown as AddonMigrationModule,\n`;
  }
  addonMigrationsOutput += '};\n';
}
fs.writeFileSync(ADDON_MIGRATIONS_FILE, addonMigrationsOutput, 'utf-8');
const migSummary =
  addonsWithMigrations.length === 0
    ? 'no addons ship migrations.ts'
    : `${addonsWithMigrations.length} addon(s) ship migrations: ${addonsWithMigrations.map((a) => a.manifest.name).join(', ')}`;
console.log(`🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_MIGRATIONS_FILE)} (${migSummary})`);

// ─── Generate addon-views.html ──────────────────────────────────────────────
// For every addon that ships HTML files under views/, wrap each in a
// <section x-show="$store.game.view === '<addon>/<viewname>'"> and write
// them all to src/generated/addon-views.html. index.html includes that
// single file via EJS, so addons can introduce brand-new view tabs
// without touching base templates.
//
// Naming convention: `content/addons/<addon>/views/<viewname>.html` ⇒
// the view is selectable as `$store.game.view === '<addon>/<viewname>'`,
// and the corresponding navigation YAML entry should use the same id
// (matches the same '<addon>/<name>' namespacing rule as handlers).
const ADDON_VIEWS_FILE = path.join(ROOT, 'src', 'generated', 'addon-views.html');
const viewSections: string[] = [];
for (const a of addons) {
  const viewsDir = path.join(a.dir, 'views');
  if (!fs.existsSync(viewsDir) || !fs.statSync(viewsDir).isDirectory()) continue;
  const files = fs
    .readdirSync(viewsDir)
    .filter((f) => f.endsWith('.html'))
    .sort();
  for (const file of files) {
    const viewName = file.replace(/\.html$/, '');
    const viewId = `${a.manifest.name}/${viewName}`;
    const body = fs.readFileSync(path.join(viewsDir, file), 'utf-8');
    // Single quotes inside the double-quoted HTML attribute (avoid nested
    // double-quote attribute breakage). The view id is restricted to
    // [a-z0-9_/-] by the manifest pattern + file naming, so it never needs
    // to contain a literal single quote.
    viewSections.push(
      `<!-- ${viewId} (from content/addons/${a.manifest.name}/views/${file}) -->\n` +
        `<section class="view-section" x-show="$store.game.view === '${viewId}'" x-transition:enter="view-enter">\n` +
        body.trim() +
        `\n</section>`,
    );
  }
}
const viewsHeader =
  '<!-- THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY -->\n' +
  '<!-- Source: content/addons/*/views/*.html -->\n' +
  '<!-- Regenerate: npm run build:content -->\n\n';
fs.writeFileSync(
  ADDON_VIEWS_FILE,
  viewsHeader + (viewSections.length === 0 ? '<!-- no addon views -->\n' : viewSections.join('\n\n') + '\n'),
  'utf-8',
);
console.log(
  `🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_VIEWS_FILE)} (${viewSections.length} addon view(s))`,
);

// ─── Generate addon-slots.ts ────────────────────────────────────────
// Addons can inject custom HTML at named slots in base views by
// shipping `slots/<slot-id>.html`. Base views declare slots via
// `<div data-slot="<id>">` markers — addon HTML is appended into
// the matching marker at boot. Multiple addons can target the same
// slot; their HTML blocks are appended in load order (base addons
// alphabetically, then runtime drops). Renderer side lives in
// src/core/services/addon-slots.ts.
const ADDON_SLOTS_FILE = path.join(ROOT, 'src', 'generated', 'addon-slots.ts');
const slotsBySlotId: Record<string, Array<{ addonName: string; fileName: string; html: string }>> = {};
for (const a of addons) {
  const slotsDir = path.join(a.dir, 'slots');
  if (!fs.existsSync(slotsDir) || !fs.statSync(slotsDir).isDirectory()) continue;
  const files = fs
    .readdirSync(slotsDir)
    .filter((f) => f.endsWith('.html'))
    .sort();
  for (const file of files) {
    const slotId = file.replace(/\.html$/, '');
    const html = fs.readFileSync(path.join(slotsDir, file), 'utf-8').trim();
    (slotsBySlotId[slotId] ??= []).push({ addonName: a.manifest.name, fileName: file, html });
  }
}
const slotsCount = Object.values(slotsBySlotId).reduce((acc, arr) => acc + arr.length, 0);
const addonSlotsOutput =
  '// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n' +
  '// Source: content/addons/<name>/slots/<slot-id>.html\n' +
  '// Regenerate: npm run build:content\n\n' +
  '/**\n' +
  ' * Build-time addon slot-injection payload. Keyed by slot id; each\n' +
  ' * entry is an ordered list of HTML blocks contributed by addons.\n' +
  ' * Consumed by src/core/services/addon-slots.ts at boot.\n' +
  ' */\n' +
  'export const ADDON_SLOTS_GENERATED: Record<string, Array<{ addonName: string; fileName: string; html: string }>> = ' +
  JSON.stringify(slotsBySlotId, null, 2) + ';\n';
fs.writeFileSync(ADDON_SLOTS_FILE, addonSlotsOutput, 'utf-8');
console.log(
  `🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_SLOTS_FILE)} (${slotsCount} addon slot block(s) across ${Object.keys(slotsBySlotId).length} slot(s))`,
);

// ─── Generate addon-styles.css ──────────────────────────────────────
// Every addon that ships `styles/*.css` contributes to a single
// concatenated stylesheet, with each block prefixed by a comment
// naming the addon + file so debugging in DevTools points at the
// source clearly. main.ts imports the generated file so Vite bundles
// it into the build output. Runtime addons ship CSS strings via the
// IPC payload and the renderer injects them as <style> tags (see
// src/core/services/runtime-addons.ts).
const ADDON_STYLES_FILE = path.join(ROOT, 'src', 'generated', 'addon-styles.css');
const styleBlocks: string[] = [];
for (const a of addons) {
  const stylesDir = path.join(a.dir, 'styles');
  if (!fs.existsSync(stylesDir) || !fs.statSync(stylesDir).isDirectory()) continue;
  const files = fs
    .readdirSync(stylesDir)
    .filter((f) => f.endsWith('.css'))
    .sort();
  for (const file of files) {
    const css = fs.readFileSync(path.join(stylesDir, file), 'utf-8');
    styleBlocks.push(
      `/* --- ${a.manifest.name} / ${file} --- */\n` + css.trimEnd() + '\n',
    );
  }
}
const stylesHeader =
  '/* THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY */\n' +
  '/* Source: content/addons/<name>/styles/*.css */\n' +
  '/* Regenerate: npm run build:content */\n\n';
fs.writeFileSync(
  ADDON_STYLES_FILE,
  stylesHeader + (styleBlocks.length === 0 ? '/* no addon styles */\n' : styleBlocks.join('\n')),
  'utf-8',
);
console.log(
  `🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_STYLES_FILE)} (${styleBlocks.length} addon style file(s))`,
);

// ─── Copy addon images to public/ ───────────────────────────────────
// Addons drop images in `content/addons/<name>/resources/img/*.{webp,png,jpg,jpeg}`
// — same "everything for the addon lives in one folder" principle as
// SFX. Vite only serves files under `public/`, so build copies them
// to `public/img/addons/<name>/` (the SUBDIRECTORY is gitignored —
// rebuilt every time). YAML refers to them as
// `image: img/addons/<name>/<file>` which matches the served URL.
//
// Important: base game already uses `public/img/addons/` (flat) for
// "building add-on" upgrade tiles (wood_1.webp, garden.webp, etc.) —
// totally unrelated to the addon SYSTEM, just shared dirname. We
// only delete per-addon SUBDIRECTORIES here so base's flat files at
// the root stay untouched. Naming collision is unfortunate but
// renaming either side would be churn for no real gain.
//
// Lower-cases the filename on copy to dodge case-mismatch bugs on
// case-sensitive filesystems (Linux CI, packaged builds) when the
// author capitalised the source filename.
const ADDON_IMG_PUBLIC_DIR = path.join(ROOT, 'public', 'img', 'addons');
const IMG_EXT = /\.(webp|png|jpg|jpeg)$/i;

// Clear stale per-addon subdirs from previous builds. Leave flat
// base-game files (wood_1.webp, garden.webp, …) untouched — they're
// versioned in git and aren't ours to wipe.
if (fs.existsSync(ADDON_IMG_PUBLIC_DIR)) {
  for (const entry of fs.readdirSync(ADDON_IMG_PUBLIC_DIR, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      fs.rmSync(path.join(ADDON_IMG_PUBLIC_DIR, entry.name), {
        recursive: true,
        force: true,
      });
    }
  }
}

let imgCount = 0;
let imgAddonCount = 0;
for (const a of addons) {
  const imgDir = path.join(a.dir, 'resources', 'img');
  if (!fs.existsSync(imgDir) || !fs.statSync(imgDir).isDirectory()) continue;
  const files = fs.readdirSync(imgDir).filter((f) => IMG_EXT.test(f)).sort();
  if (files.length === 0) continue;
  imgAddonCount++;
  const destDir = path.join(ADDON_IMG_PUBLIC_DIR, a.manifest.name);
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of files) {
    // Always lowercase the destination filename. Authors occasionally
    // capitalise (e.g. "Kalre.webp"); a YAML reference to the
    // lowercase canonical form keeps working regardless.
    const dest = file.toLowerCase();
    fs.copyFileSync(path.join(imgDir, file), path.join(destDir, dest));
    imgCount++;
  }
}
console.log(
  `🎉 [build-content] Copied ${imgCount} addon image(s) from ${imgAddonCount} addon(s) → public/img/addons/`,
);

// ─── Generate addon-sfx.ts + copy audio files ───────────────────────
// Addons drop SFX in `content/addons/<name>/sfx/*.{mp3,ogg,wav,m4a}`
// and reference them in YAML as `sfx: <name>/<basename>` (no ext).
// The build script copies each file into `public/sfx/addons/<name>/`
// so Vite serves them at the same prefix as base SFX (`sfx/...`).
// The generated registry below maps every key to its served URL; the
// audio engine merges that into its sfxSources map at boot. Runtime
// addons add their entries later via IPC + registerAddonSfx().
const ADDON_SFX_FILE = path.join(ROOT, 'src', 'generated', 'addon-sfx.ts');
const ADDON_SFX_PUBLIC_DIR = path.join(ROOT, 'public', 'sfx', 'addons');
const SFX_EXT = /\.(mp3|ogg|wav|m4a)$/i;
type SfxEntry = { key: string; addonName: string; fileName: string; url: string };
const sfxEntries: Record<string, SfxEntry> = {};

// Clear stale addon SFX from previous builds so renamed/removed files
// don't keep getting served. Only touches the addons subtree, never
// base `public/sfx/*.mp3`.
if (fs.existsSync(ADDON_SFX_PUBLIC_DIR)) {
  fs.rmSync(ADDON_SFX_PUBLIC_DIR, { recursive: true, force: true });
}

for (const a of addons) {
  const sfxDir = path.join(a.dir, 'sfx');
  if (!fs.existsSync(sfxDir) || !fs.statSync(sfxDir).isDirectory()) continue;
  const files = fs.readdirSync(sfxDir).filter((f) => SFX_EXT.test(f)).sort();
  if (files.length === 0) continue;
  const destDir = path.join(ADDON_SFX_PUBLIC_DIR, a.manifest.name);
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of files) {
    const baseName = file.replace(SFX_EXT, '');
    const key = `${a.manifest.name}/${baseName}`;
    if (sfxEntries[key]) {
      throw new Error(
        `[build-content] Duplicate SFX key "${key}" — pick unique basenames per addon`,
      );
    }
    fs.copyFileSync(path.join(sfxDir, file), path.join(destDir, file));
    sfxEntries[key] = {
      key,
      addonName: a.manifest.name,
      fileName: file,
      // Served as /sfx/addons/<name>/<file> — same prefix Vite uses
      // for everything under public/. Audio elements load it via
      // `new Audio('sfx/addons/...')` (relative URL → site root).
      url: `sfx/addons/${a.manifest.name}/${file}`,
    };
  }
}

const addonSfxOutput =
  '// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n' +
  '// Source: content/addons/<name>/sfx/*.{mp3,ogg,wav,m4a}\n' +
  '// Regenerate: npm run build:content\n\n' +
  '/**\n' +
  ' * Build-time addon SFX registry. Each entry is keyed by the sfx key\n' +
  ' * that YAML refers to (`<addon>/<basename-no-ext>`) and carries the\n' +
  ' * physical url + provenance metadata for DevTools / debugging.\n' +
  ' *\n' +
  ' * The audio engine (src/core/visuals/audio.ts) reads this at boot and\n' +
  ' * merges every url into its sfxSources map. Runtime addons add to the\n' +
  ' * same map later via the IPC payload + registerAddonSfx().\n' +
  ' *\n' +
  ' * Audio files are copied into public/sfx/addons/<name>/ during build\n' +
  ' * so Vite serves them at the same path as base SFX. The public/sfx/\n' +
  ' * addons/ directory is .gitignored — re-running build:content\n' +
  ' * recreates it from content/addons/<name>/sfx/.\n' +
  ' */\n' +
  'export interface AddonSfxEntry {\n' +
  '  key: string;\n' +
  '  addonName: string;\n' +
  '  fileName: string;\n' +
  '  url: string;\n' +
  '}\n\n' +
  'export const ADDON_SFX_GENERATED: Record<string, AddonSfxEntry> = ' +
  JSON.stringify(sfxEntries, null, 2) + ';\n';
fs.writeFileSync(ADDON_SFX_FILE, addonSfxOutput, 'utf-8');
const sfxAddonCount = new Set(Object.values(sfxEntries).map((e) => e.addonName)).size;
console.log(
  `🎉 [build-content] Generated: ${path.relative(ROOT, ADDON_SFX_FILE)} (${Object.keys(sfxEntries).length} sfx file(s) across ${sfxAddonCount} addon(s))`,
);

console.log('   Run "npm run dev" to use the new content.\n');
