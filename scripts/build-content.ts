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
const CONTENT_DIR = path.join(ROOT, 'content');
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
  ...loadDir(path.join(CONTENT_DIR, 'resources')),
];

const modifiers = [
  ...loadDir(path.join(CONTENT_DIR, 'modifiers')),
];

const actions = [
  ...loadDir(path.join(CONTENT_DIR, 'actions')),
];

// Note: NPCs, Items, Homes, Buffs, Milestones, Navigation, Titles
// are still loaded from TypeScript until they are fully migrated.
// They will be added to this pipeline in subsequent iterations.

// ─── Build registries ───────────────────────────────────────────────────────

const resourceRegistry = arrayToRecord(resources);
const modifierRegistry = arrayToRecord(modifiers);
const actionRegistry = arrayToRecord(actions);

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
console.log(`✅ Pipeline efficiency keys: ${uniqueEfficiencyKeys.length}`);

// ─── Generate output ─────────────────────────────────────────────────────────

const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const output = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content
// Generated: ${new Date().toLocaleString('de-DE').replace(/,/g, '')}

// === Resource Registry ===

export const RESOURCE_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(resourceRegistry, null, 2)};

// === Modifier Registry ===

export const MODIFIER_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(modifierRegistry, null, 2)};

// === Action Registry ===

export const ACTION_REGISTRY_GENERATED: Record<string, any> = ${JSON.stringify(actionRegistry, null, 2)};

// === Pipeline Config ===
// Auto-derived from YAML: resources/modifiers with scalesWithSatiation: true

export const PIPELINE_EFFICIENCY_KEYS: readonly string[] = ${JSON.stringify(uniqueEfficiencyKeys, null, 2)} as const;
`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`\n🎉 [build-content] Generated: ${path.relative(ROOT, OUTPUT_FILE)}`);
console.log('   Run "npm run dev" to use the new content.\n');
