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
  },
  required: ["name", "version"],
  additionalProperties: false,
};
const validateManifest = ajv.compile(manifestSchema);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
// Phase 15+ addon system: base content lives at content/base/, opt-in
// addons at content/addons/<name>/. Step 1 moved base; step 2 (this
// commit) discovers addons and validates their manifests but does NOT
// yet merge addon content into the registries — that's step 3.
const CONTENT_DIR = path.join(ROOT, 'content');
const BASE_DIR = path.join(CONTENT_DIR, 'base');
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
 * Loads a category from base + every addon, tagged with origin so the
 * registry builder can produce useful collision errors. Sort is by
 * source order (base first, then addons in name order) so the resulting
 * record's iteration order matches load order — deterministic.
 */
type TaggedItem = { item: any; origin: string };
function loadCategoryFromAllSources(category: string): TaggedItem[] {
  const tag = (origin: string) => (item: any): TaggedItem => ({ item, origin });
  const out: TaggedItem[] = loadDir(path.join(BASE_DIR, category)).map(tag(`base/${category}`));
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
  return out;
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
  loadTranslationDir(path.join(BASE_DIR, 'i18n'), 'base', out, overrides);
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

// === Loaded Addons (build-time) ===
// List of every build-time addon that contributed to this bundle.
// Used by the save system to track which addons were active when a
// save was written, so the load path can warn when a save needs an
// addon that isn't compiled in. Runtime addons (drop-in folders)
// are tracked separately at boot — the save's full activeAddons
// list is the union of both.

export const BUILD_TIME_ADDONS: Array<{ name: string; version: string }> = ${JSON.stringify(
  addons.map((a) => ({ name: a.manifest.name, version: a.manifest.version })),
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

console.log('   Run "npm run dev" to use the new content.\n');
