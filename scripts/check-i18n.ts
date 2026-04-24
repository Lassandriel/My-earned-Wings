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
// Globals & Helpers
// ---------------------------------------------------------------------------

let missingMap: Record<string, string[]> = {};
let hardcodedWarnings: string[] = [];
let qualityWarnings: string[] = [];
let usedKeys: Set<string> = new Set();
let orphanWarnings: string[] = [];

// Dynamic prefixes used in code like t('ui_' + resId)
const DYNAMIC_PREFIXES = [
    'intro_', 'ellie_tutorial_', 'fail_full_', 'fail_', 'npc_', 
    'ui_', 'act-', 'log_', 'cat_', 'nav_', 'btn_', 'home_', 'settings_'
];

const addMissing = (label: string, lang: string) => {
  if (!missingMap[label]) missingMap[label] = [];
  if (!missingMap[label].includes(lang)) missingMap[label].push(lang);
};

const markKeyUsed = (ns: string, key: string) => {
    usedKeys.add(`${ns}.${key}`);
};

const keyExistsInLang = (
  lang: Record<string, any>,
  context: string | undefined,
  key: string
): boolean => {
  if (context && lang[context]) {
    const exists = lang[context][key] !== undefined;
    if (exists) markKeyUsed(context, key);
    return exists;
  }
  
  let found = false;
  Object.keys(lang).forEach(ns => {
    if (typeof lang[ns] === 'object' && lang[ns] !== null && lang[ns][key] !== undefined) {
      markKeyUsed(ns, key);
      found = true;
    }
  });
  return found;
};

const checkKey = (label: string, context: string | undefined, key: string) => {
  const deExists = keyExistsInLang(de as any, context, key);
  const enExists = keyExistsInLang(en as any, context, key);
  
  if (!deExists) addMissing(label, 'DE');
  if (!enExists) addMissing(label, 'EN');
};

const getAllFiles = (dir: string, exts: string[]): string[] => {
  const result: string[] = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        result.push(...getAllFiles(full, exts));
      } else if (exts.some((e) => entry.name.endsWith(e))) {
        result.push(full);
      }
    }
  } catch (e) {}
  return result;
};

// ---------------------------------------------------------------------------
// Phase 1 – Explicit Registry Audit
// ---------------------------------------------------------------------------

const checkRegistries = () => {
    console.log("Phase 1: Registry Integrity Audit...");
    const reg = registries as any;
    
    Object.keys(reg.actions).forEach(id => {
        const act = reg.actions[id];
        checkKey(`[reg.actions] ID '${id}'`, 'actions', id);
        if (act.logKey) checkKey(`[reg.actions] logKey '${act.logKey}'`, 'logs', act.logKey);
    });

    Object.keys(reg.items).forEach(id => {
        const item = reg.items[id];
        if (item.title) checkKey(`[reg.items] title '${item.title}'`, 'items', item.title);
        if (item.desc)  checkKey(`[reg.items] desc '${item.desc}'`,   'items', item.desc);
    });

    Object.keys(reg.resources).forEach(id => {
        checkKey(`[reg.res] 'ui_${id}'`, 'ui', 'ui_' + id);
        checkKey(`[reg.res] 'fail_${id}'`, 'logs', 'fail_' + id);
        checkKey(`[reg.res] 'fail_full_${id}'`, 'logs', 'fail_full_' + id);
    });
};

// ---------------------------------------------------------------------------
// Phase 2 – Heuristic Pattern Discovery
// ---------------------------------------------------------------------------

const performHeuristicScan = () => {
    console.log("Phase 2: Source Code Pattern Matching...");
    const files = getAllFiles(SRC_DIR, ['.ts', '.html', '.css']);
    
    const KEY_PATTERN = /['"]([a-zA-Z0-9_\-\.]{3,})['"]/g;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        let match;
        while ((match = KEY_PATTERN.exec(content)) !== null) {
            const raw = match[1];
            
            // Try explicit
            keyExistsInLang(de as any, undefined, raw);

            // Handle dynamic pattern markers
            DYNAMIC_PREFIXES.forEach(pref => {
                if (raw === pref || raw === (pref.endsWith('_') ? pref.slice(0,-1) : pref)) {
                    const deObj = de as any;
                    Object.keys(deObj).forEach(ns => {
                        Object.keys(deObj[ns]).forEach(k => {
                            if (k.startsWith(pref)) markKeyUsed(ns, k);
                        });
                    });
                }
            });
        }
    }
}

// ---------------------------------------------------------------------------
// Phase 3 – HTML Hardcode Detection
// ---------------------------------------------------------------------------

const scanForHardcodedHtmlText = () => {
    console.log("Phase 3: HTML Hardcode Detection...");
    const files = getAllFiles(SRC_DIR, ['.html']);
    
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');
        
        lines.forEach((line, idx) => {
            if (line.includes('x-text') || line.includes('x-html') || line.includes('{{')) return;
            
            const match = />\s*([^<>{}$]*[a-zA-ZäöüÄÖÜß]+[^<>{}$]*)\s*</.exec(line);
            if (match) {
                const text = match[1].trim();
                if (text.length < 2 || text === '?' || /^https?:\/\/(www\.)?github\.com(\/|$)/.test(text) || text === '✨') return;
                hardcodedWarnings.push(`[${path.relative(SRC_DIR, file)}:L${idx+1}] Hardcoded text: "${text}"`);
            }
        });
    }
}

// ---------------------------------------------------------------------------
// Phase 4 – Bidirectional Parity
// ---------------------------------------------------------------------------

const checkParity = () => {
    console.log("Phase 4: Cross-Language Parity Check...");
    const deObj = de as any;
    const enObj = en as any;
    const allNamespaces = new Set([...Object.keys(deObj), ...Object.keys(enObj)]);

    allNamespaces.forEach((ns) => {
        const deKeys = deObj[ns] ? Object.keys(deObj[ns]) : [];
        const enKeys = enObj[ns] ? Object.keys(enObj[ns]) : [];

        deKeys.filter(k => !enKeys.includes(k)).forEach(k => {
            addMissing(`[Parity] ns '${ns}' key '${k}' in DE but MISSING in EN`, 'EN');
        });
        enKeys.filter(k => !deKeys.includes(k)).forEach(k => {
            addMissing(`[Parity] ns '${ns}' key '${k}' in EN but MISSING in DE`, 'DE');
        });
    });
};

// ---------------------------------------------------------------------------
// Phase 5 – Orphan Key Detection (Garbage Collection)
// ---------------------------------------------------------------------------

const findOrphans = () => {
    console.log("Phase 5: Orphan Key Detection...");
    const deObj = de as any;
    
    const SYSTEM_WHITELIST = [
        'ui.menu_version', 'ui.ui_unknown', 'logs.npc_dialogue_log'
    ];

    Object.keys(deObj).forEach(ns => {
        const keys = Object.keys(deObj[ns]);
        keys.forEach(key => {
            const fullKey = `${ns}.${key}`;
            if (SYSTEM_WHITELIST.includes(fullKey)) return;
            if (!usedKeys.has(fullKey)) {
                orphanWarnings.push(fullKey);
            }
        });
    });
};

// ---------------------------------------------------------------------------
// Phase 6 – Variable & Quality Integrity (New)
// ---------------------------------------------------------------------------

const checkQualityAndVariables = () => {
    console.log("Phase 6: Variable & Quality Integrity Check...");
    const deObj = de as any;
    const enObj = en as any;
    const allNamespaces = Object.keys(deObj);

    allNamespaces.forEach((ns) => {
        const deNamespace = deObj[ns];
        const enNamespace = enObj[ns] || {};

        Object.keys(deNamespace).forEach((key) => {
            const deVal = String(deNamespace[key]);
            const enVal = String(enNamespace[key] || "");

            // 1. Placeholder Detection
            const patterns = ["TODO", "FIXME", "Placeholder"];
            if (patterns.some(p => deVal.includes(p))) qualityWarnings.push(`[DE] ${ns}.${key} contains placeholder marker.`);
            if (patterns.some(p => enVal.includes(p))) qualityWarnings.push(`[EN] ${ns}.${key} contains placeholder marker.`);

            // 2. Empty Value Detection
            if (deVal.trim() === "") qualityWarnings.push(`[DE] ${ns}.${key} is EMPTY.`);
            if (enVal.trim() === "") qualityWarnings.push(`[EN] ${ns}.${key} is EMPTY.`);

            // 3. Variable Parity ({name}, {val}, etc.)
            const VAR_REGEX = /\{[a-zA-Z0-9_]+\}/g;
            const deVars = (deVal.match(VAR_REGEX) || []).sort();
            const enVars = (enVal.match(VAR_REGEX) || []).sort();

            if (JSON.stringify(deVars) !== JSON.stringify(enVars)) {
                qualityWarnings.push(`[Variable Mismatch] ${ns}.${key}:\n   DE: [${deVars.join(', ')}]\n   EN: [${enVars.join(', ')}]`);
            }
        });
    });
};

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

console.log('\n=== GOD-TIER I18N VALIDATOR 2.3 (TOTAL INTEGRITY) ===\n');

checkRegistries();
performHeuristicScan();
scanForHardcodedHtmlText();
checkParity();
findOrphans();
checkQualityAndVariables();

const totalIssues = Object.keys(missingMap).length + hardcodedWarnings.length + qualityWarnings.length;

if (totalIssues === 0) {
    console.log('✨  FLAWLESS. draconia is fully localized, cleaned and hardened.\n');
    
    if (orphanWarnings.length > 0) {
        console.log(`🧹  Cleanup Suggestions (Orphans: ${orphanWarnings.length}):`);
        orphanWarnings.sort().forEach(w => console.log(`  • ${w}`));
    } else {
        console.log(`🍃  No orphan keys found. The garden is clean.`);
    }
    console.log('');
} else {
    if (Object.keys(missingMap).length > 0) {
        console.log(`❌  Missing Keys Found:\n`);
        Object.keys(missingMap).forEach(k => {
            const status = missingMap[k].length === 2 ? 'BOTH' : missingMap[k][0];
            console.log(`  [${status}] ${k}`);
        });
    }

    if (hardcodedWarnings.length > 0) {
        console.log(`⚠️  Hardcoded HTML Strings Found:\n`);
        hardcodedWarnings.forEach(w => console.log(`  • ${w}`));
    }

    if (qualityWarnings.length > 0) {
        console.log(`💎  Text Quality & Variable Mismatches Found:\n`);
        qualityWarnings.forEach(w => console.log(`  • ${w}`));
    }

    console.log('\n❌ Audit failed. Project integrity not achieved.');
    process.exit(1);
}
