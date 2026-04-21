import de from '../src/lang/de';
import en from '../src/lang/en';
import { registries } from '../src/data/index';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, '../src');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let missingMap: Record<string, string[]> = {};

const addMissing = (label: string, lang: string) => {
  if (!missingMap[label]) missingMap[label] = [];
  if (!missingMap[label].includes(lang)) missingMap[label].push(lang);
};

const keyExistsInLang = (
  lang: Record<string, any>,
  context: string | undefined,
  key: string
): boolean => {
  if (context) {
    return lang[context] !== undefined && lang[context][key] !== undefined;
  }
  return Object.values(lang).some(
    (ns) => typeof ns === 'object' && ns !== null && ns[key] !== undefined
  );
};

const checkKey = (label: string, context: string | undefined, key: string) => {
  if (!keyExistsInLang(de as any, context, key)) addMissing(label, 'DE');
  if (!keyExistsInLang(en as any, context, key)) addMissing(label, 'EN');
};

// ---------------------------------------------------------------------------
// Phase 1 – Registry-based checks (structured data)
// ---------------------------------------------------------------------------

const checkRegistries = () => {
  // Actions
  Object.keys(registries.actions).forEach((id) => {
    const action = (registries.actions as any)[id];
    checkKey(`[actions] '${id}'`, 'actions', id);
    if (action.logKey) {
      checkKey(`[logs] action.logKey '${action.logKey}'`, 'logs', action.logKey);
    }
  });

  // Items
  Object.values(registries.items).forEach((item: any) => {
    if (item.title) checkKey(`[items] title '${item.title}'`, 'items', item.title);
    if (item.desc)  checkKey(`[items] desc '${item.desc}'`,   'items', item.desc);
    if (item.modifiers) {
      item.modifiers.forEach((mod: any) => {
        const modId = mod.key.replace('_limit', '');
        checkKey(`[ui] item modifier '${modId}'`, 'ui', 'ui_' + modId);
      });
    }
  });

  // NPCs
  Object.values(registries.npcs).forEach((npc: any) => {
    if (npc.nameKey)
      checkKey(`[ui] npc.nameKey '${npc.nameKey}'`, 'ui', npc.nameKey);
    if (npc.steps) {
      npc.steps.forEach((step: any) => {
        if (step.dialogueKey)
          checkKey(`[npcs] dialogueKey '${step.dialogueKey}'`, 'npcs', step.dialogueKey);
      });
    }
  });

  // Resources & Stats
  Object.values(registries.resources).forEach((res: any) => {
    const key = 'ui_' + res.id;
    checkKey(`[ui] resource '${key}'`, 'ui', key);
    checkKey(`[logs] fail '${res.id}'`, 'logs', 'fail_' + res.id);
    checkKey(`[logs] fail_full '${res.id}'`, 'logs', 'fail_full_' + res.id);
  });

  // Buffs
  Object.values(registries.buffs).forEach((buff: any) => {
    if (buff.title) checkKey(`[buffs] title '${buff.title}'`, 'buffs', buff.title);
    if (buff.desc)  checkKey(`[buffs] desc '${buff.desc}'`,   'buffs', buff.desc);
    if (buff.modifiers) {
      buff.modifiers.forEach((mod: any) => {
        const modId = mod.key.replace('_limit', '');
        checkKey(`[ui] buff modifier '${modId}'`, 'ui', 'ui_' + modId);
      });
    }
  });

  // Homes
  Object.values(registries.homes).forEach((home: any) => {
    if (home.nameKey) checkKey(`[ui] home.nameKey '${home.nameKey}'`, 'ui', home.nameKey);
    if (home.descKey) checkKey(`[ui] home.descKey '${home.descKey}'`, 'ui', home.descKey);
  });
};

// ---------------------------------------------------------------------------
// Phase 2 – Static source-file scan for t('...') calls
// ---------------------------------------------------------------------------

const getAllFiles = (dir: string, exts: string[]): string[] => {
  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...getAllFiles(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      result.push(full);
    }
  }
  return result;
};

const scanSourceFiles = () => {
  const files = getAllFiles(SRC_DIR, ['.html', '.ts']);
  const found = new Map<string, Set<string>>();
  // Optimized Regex to prevent false positives and catch context
  const REGEX = /\bt\(\s*['"]([^'"$`{}()[\]]+)['"]\s*(?:,\s*['"]([^'"]+)['"])?\s*\)/g;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    REGEX.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = REGEX.exec(content)) !== null) {
      const key     = match[1];
      const context = match[2];
      const mapKey  = `${context ?? '__any__'}::${key}`;
      if (!found.has(mapKey)) found.set(mapKey, new Set());
      found.get(mapKey)!.add(path.relative(SRC_DIR, file));
    }
  }
  return found;
};

const checkSourceKeys = () => {
  const found = scanSourceFiles();
  for (const [mapKey, files] of found) {
    const sepIdx  = mapKey.indexOf('::');
    const context = mapKey.slice(0, sepIdx);
    const key     = mapKey.slice(sepIdx + 2);
    const ctx     = context === '__any__' ? undefined : context;

    const fileArr  = [...files];
    const fileHint = fileArr.slice(0, 2).join(', ') + (fileArr.length > 2 ? ` +${fileArr.length - 2} more` : '');
    const label    = `[source] t('${key}'${ctx ? `, '${ctx}'` : ''})  ← ${fileHint}`;

    checkKey(label, ctx, key);
  }
};

// ---------------------------------------------------------------------------
// Phase 3 – Indirect parity checks (comparing DE vs EN directly)
// ---------------------------------------------------------------------------

const checkParity = () => {
  const deObj = de as any;
  const enObj = en as any;
  const allNamespaces = new Set([...Object.keys(deObj), ...Object.keys(enObj)]);

  allNamespaces.forEach((ns) => {
    const deKeys = deObj[ns] ? Object.keys(deObj[ns]) : [];
    const enKeys = enObj[ns] ? Object.keys(enObj[ns]) : [];

    deKeys.filter((k) => !enKeys.includes(k)).forEach((k) => {
      addMissing(`[parity] Namespace '${ns}' has key '${k}' in DE but missing in EN`, 'EN');
    });

    enKeys.filter((k) => !deKeys.includes(k)).forEach((k) => {
      addMissing(`[parity] Namespace '${ns}' has key '${k}' in EN but missing in DE`, 'DE');
    });
  });
};

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

console.log('\n=== I18N VALIDATION ===\n');

console.log('Phase 1  Checking registries (actions / items / NPCs / resources / buffs / homes)...');
checkRegistries();

console.log('Phase 2  Scanning source files for t() calls...');
checkSourceKeys();

console.log('Phase 3  Comparing DE and EN parity directly...\n');
checkParity();

const keys = Object.keys(missingMap);
if (keys.length === 0) {
  console.log('✅  All translation keys are present and synced in DE and EN.\n');
} else {
  console.log(`❌  ${keys.length} inconsistency issues found:\n`);
  keys.forEach((k) => {
    const langs   = missingMap[k];
    const langStr = langs.length === 2 ? 'Missing in BOTH (DE & EN)' : `Missing only in: ${langs[0]}`;
    console.log(`  • ${k}`);
    console.log(`      → ${langStr}`);
  });
  console.log('');
  process.exit(1);
}
