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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
// Phase 15+ addon system step 1: base content moved from `content/` to
// `content/base/`. Addons will live at `content/addons/<name>/` and get
// merged in by later build-script changes. Keeping BASE_DIR named
// explicitly so the next steps (addon discovery) read cleanly.
const CONTENT_DIR = path.join(ROOT, 'content');
const BASE_DIR = path.join(CONTENT_DIR, 'base');
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

function arrayToRecord(items: any[], key = 'id'): Record<string, any> {
  const result: Record<string, any> = {};
  for (const item of items) {
    if (!item[key]) {
      console.warn(`[build-content] Item missing "${key}" field:`, JSON.stringify(item).slice(0, 80));
      continue;
    }
    if (result[item[key]]) {
      throw new Error(`[build-content] Duplicate ID: "${item[key]}"`);
    }
    result[item[key]] = item;
  }
  return result;
}

// ─── Load all content ───────────────────────────────────────────────────────

console.log('📦 [build-content] Reading YAML files...');

const resources = [
  ...loadDir(path.join(BASE_DIR, 'resources')),
];

const modifiers = [
  ...loadDir(path.join(BASE_DIR, 'modifiers')),
];

const actions = [
  ...loadDir(path.join(BASE_DIR, 'actions')),
];

const items = [
  ...loadDir(path.join(BASE_DIR, 'items')),
];

const npcs = [
  ...loadDir(path.join(BASE_DIR, 'npcs')),
];

const buffs = [
  ...loadDir(path.join(BASE_DIR, 'buffs')),
];

const homes = [
  ...loadDir(path.join(BASE_DIR, 'homes')),
];

const milestones = [
  ...loadDir(path.join(BASE_DIR, 'milestones')),
];

const navigation = [
  ...loadDir(path.join(BASE_DIR, 'navigation')),
];

const titles = [
  ...loadDir(path.join(BASE_DIR, 'titles')),
];

// ─── Translations (special: nested map, not array) ──────────────────────────
function loadTranslations(): Record<string, Record<string, Record<string, string>>> {
  const i18nDir = path.join(BASE_DIR, 'i18n');
  // (function body unchanged — addon i18n merging comes in a later step)
  const out: Record<string, Record<string, Record<string, string>>> = {};
  if (!fs.existsSync(i18nDir)) return out;
  for (const lang of fs.readdirSync(i18nDir)) {
    const langDir = path.join(i18nDir, lang);
    if (!fs.statSync(langDir).isDirectory()) continue;
    out[lang] = {};
    for (const file of fs.readdirSync(langDir).filter(f => /\.ya?ml$/.test(f))) {
      const ctx = file.replace(/\.ya?ml$/, '');
      const raw = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const parsed = yaml.load(raw);
      out[lang][ctx] = (parsed && typeof parsed === 'object') ? parsed as any : {};
    }
  }
  return out;
}
const translations = loadTranslations();

// ─── Build registries ───────────────────────────────────────────────────────

const resourceRegistry = arrayToRecord(resources);
const modifierRegistry = arrayToRecord(modifiers);
const actionRegistry = arrayToRecord(actions);
const itemRegistry = arrayToRecord(items);
const npcRegistry = arrayToRecord(npcs);
const buffRegistry = arrayToRecord(buffs);
const homeRegistry = arrayToRecord(homes);
const milestoneRegistry = arrayToRecord(milestones);
const navigationRegistry = arrayToRecord(navigation);
const titleRegistry = arrayToRecord(titles);

// ─── Derive the efficiency keys for the pipeline automatically ───────────────
// Any resource or modifier with scalesWithSatiation: true gets added
const efficiencyKeys: string[] = [
  // From resources: resource_id + '_yield'
  ...resources
    .filter(r => r.scalesWithSatiation)
    .map(r => `${r.id}_yield`),
  // From modifiers: direct modifier ids
  ...modifiers
    .filter(m => m.scalesWithSatiation)
    .map(m => m.id),
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

// Header is deterministic on purpose — no timestamp — so re-running
// build:content with unchanged YAML produces a byte-identical output.
// That keeps git status clean across dev sessions and CI runs.
const output = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content

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

// === Translations (lang -> context -> key -> string) ===

// Translation values can be flat strings or nested objects ({title, desc, ...}).
export const TRANSLATIONS_GENERATED: Record<string, Record<string, Record<string, any>>> = ${JSON.stringify(translations, null, 2)};

// === Pipeline Config ===
// Auto-derived from YAML: resources/modifiers with scalesWithSatiation: true

export const PIPELINE_EFFICIENCY_KEYS: readonly string[] = ${JSON.stringify(uniqueEfficiencyKeys, null, 2)} as const;
`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`\n🎉 [build-content] Generated: ${path.relative(ROOT, OUTPUT_FILE)}`);
console.log('   Run "npm run dev" to use the new content.\n');
