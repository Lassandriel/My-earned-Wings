import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS_GENERATED } from '../src/generated/content';
import { registries } from '../src/data/index';
const de = TRANSLATIONS_GENERATED.de as any;
const en = TRANSLATIONS_GENERATED.en as any;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const getAllFiles = (dir: string, extension?: string): string[] => {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, extension));
        } else if (!extension || file.endsWith(extension)) {
            results.push(fullPath);
        }
    });
    return results;
};

const checkAll = () => {
    console.log("\n🚀 STARTING GLOBAL VALIDATION...\n");

    let results = {
        i18n: { success: true, count: 0, errors: [] as string[] },
        assets: { success: true, count: 0, errors: [] as string[] },
        logic: { success: true, count: 0, errors: [] as string[] },
        unused: { success: true, count: 0, errors: [] as string[] },
        ids: { success: true, count: 0, errors: [] as string[] },
        save: { success: true, count: 0, errors: [] as string[] }
    };

    const usedAssets = new Set<string>();
    const usedKeySet = new Set<string>();

    // ---------------------------------------------------------------------------
    // Globals & Constants
    // ---------------------------------------------------------------------------
    const DYNAMIC_PREFIXES = [
        'intro_', 'ellie_tutorial_', 'fail_full_', 'fail_', 'npc_', 
        'ui_', 'act-', 'log_', 'cat_', 'nav_', 'btn_', 'home_', 'settings_', 'loc_'
    ];

    const SYSTEM_WHITELIST = [
        'ui.menu_version', 'ui.ui_unknown', 'logs.npc_dialogue_log', 'ui.menu_traits',
        'ui.ui_materials', 'ui.ui_provisions', 'ui.ui_knowledge'
    ];

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    const keyExistsInLang = (
        lang: Record<string, any>,
        context: string | undefined,
        key: string
    ): boolean => {
        if (context) {
            const exists = lang[context] !== undefined && lang[context][key] !== undefined;
            if (exists) return true;
            // Fallback to 'ui' if not found in specific context
            if (context !== 'ui' && lang['ui'] && lang['ui'][key] !== undefined) return true;
            return false;
        }
        return Object.values(lang).some((ns) => typeof ns === 'object' && ns !== null && ns[key] !== undefined);
    };

    const checkI18nKey = (label: string, context: string | undefined, key: string) => {
        const inDe = keyExistsInLang(de as any, context, key);
        const inEn = keyExistsInLang(en as any, context, key);
        if (!inDe || !inEn) {
            results.i18n.success = false;
            results.i18n.errors.push(`${label} – missing in: ${!inDe ? 'DE ' : ''}${!inEn ? 'EN' : ''}`);
        }
        
        if (inDe) {
            if (context) {
                usedKeySet.add(`${context}.${key}`);
            } else {
                Object.keys(de).forEach(ns => {
                    if ((de as any)[ns][key] !== undefined) usedKeySet.add(`${ns}.${key}`);
                });
            }
        }
        results.i18n.count++;
    };

    const validateAsset = (context: string, imgPath: string) => {
        if (!imgPath) return;
        const isPath = imgPath.includes('/') || imgPath.includes('.');
        if (!isPath) return; // Ignore emojis/text placeholders

        usedAssets.add(imgPath);
        const fullPath = path.join(rootDir, 'public', imgPath);
        if (!fs.existsSync(fullPath)) {
            results.assets.success = false;
            results.assets.errors.push(`${context} missing asset: public/${imgPath}`);
        }
        results.assets.count++;
    };

    const getPlaceholders = (val: any): Set<string> => {
        const out = new Set<string>();
        const walk = (v: any) => {
            if (typeof v === 'string') {
                const re = /\{([a-zA-Z0-9_]+)\}/g;
                let m: RegExpExecArray | null;
                while ((m = re.exec(v)) !== null) out.add(m[1]);
                return;
            }
            if (Array.isArray(v)) return v.forEach(walk);
            if (v && typeof v === 'object') return Object.values(v).forEach(walk);
        };
        walk(val);
        return out;
    };

    const isSameKeyShape = (a: any, b: any): boolean => {
        const ta = typeof a;
        const tb = typeof b;
        if (ta !== tb) return false;
        if (a === null || b === null) return a === b;
        if (ta !== 'object') return true;
        if (Array.isArray(a) || Array.isArray(b)) return Array.isArray(a) === Array.isArray(b);
        const aKeys = Object.keys(a).sort();
        const bKeys = Object.keys(b).sort();
        if (aKeys.length !== bKeys.length) return false;
        for (let i = 0; i < aKeys.length; i++) if (aKeys[i] !== bKeys[i]) return false;
        return true;
    };

    // ---------------------------------------------------------------------------
    // 1. Registry Audit (i18n & Assets)
    // ---------------------------------------------------------------------------
    console.log("Phase 1: Registry Audit...");
    
    Object.keys(registries.actions).forEach(id => {
        const act = (registries.actions as any)[id];
        checkI18nKey(`Action '${id}'`, 'actions', id);
        if (act.image) validateAsset(`Action '${id}'`, act.image);
    });

    Object.values(registries.items).forEach((item: any) => {
        if (item.title) checkI18nKey(`Item title '${item.title}'`, 'items', item.title);
        if (item.desc)  checkI18nKey(`Item desc  '${item.desc}'`,  'items', item.desc);
        if (item.image) validateAsset(`Item '${item.id}'`, item.image);
    });

    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) checkI18nKey(`NPC nameKey '${npc.nameKey}'`, 'ui', npc.nameKey);
        if (npc.image)  validateAsset(`NPC '${npc.id}'`, npc.image);
        if (npc.images) Object.values(npc.images).forEach((p: any) => validateAsset(`NPC '${npc.id}' layer`, p));
        if (npc.steps)  npc.steps.forEach((s: any) => s.dialogueKey && checkI18nKey(`Dialogue '${s.dialogueKey}'`, 'npcs', s.dialogueKey));
    });

    Object.values(registries.navigation).forEach((nav: any) => {
        if (nav.icon) validateAsset(`Nav '${nav.id}'`, `img/menu/menu_${nav.icon}.webp`);
    });

    Object.values(registries.resources).forEach((res: any) => {
        checkI18nKey(`Resource 'ui_${res.id}'`, 'ui', 'ui_' + res.id);
    });

    Object.values(registries.homes).forEach((home: any) => {
        if (home.nameKey) checkI18nKey(`Home '${home.id}' name`, 'ui', home.nameKey);
        if (home.descKey) checkI18nKey(`Home '${home.id}' desc`, 'ui', home.descKey);
        if (home.image) validateAsset(`Home '${home.id}'`, home.image);
    });

    Object.values(registries.milestones || {}).forEach((m: any) => {
        if (m.icon) validateAsset(`Milestone '${m.id}'`, m.icon);
        checkI18nKey(`Milestone '${m.id}' log`, 'logs', 'milestone_' + m.id.replace('milestone-', ''));
    });

    Object.values(registries.modifiers || {}).forEach((mod: any) => {
        if (mod.title) checkI18nKey(`Modifier title '${mod.title}'`, 'modifiers', mod.title);
        if (mod.desc)  checkI18nKey(`Modifier desc  '${mod.desc}'`,  'modifiers', mod.desc);
    });

    // ---------------------------------------------------------------------------
    // 2. Source Scan (Heuristics)
    // ---------------------------------------------------------------------------
    console.log("Phase 2: Source Code Scan...");
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];
    const allImages = getAllFiles(path.join(rootDir, 'public', 'img'))
        .map(p => path.relative(path.join(rootDir, 'public'), p).replace(/\\/g, '/'));

    const REGEX_T = /\bt\(\s*['"]([$`{}()[\]]*[^'"$`{}()[\]]+)['"]\s*(?:,\s*['"]([^'"]+)['"])?\s*\)/g;
    const STR_REGEX = /['"]([a-zA-Z0-9_\-\.\/]{3,})['"]/g; // Min 3 chars to catch 'ui_', 'act' etc.
    const REGEX_CONTENT_GET = /\bcontent\.get\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
    const VALID_REGISTRY_TYPES = new Set(Object.keys(registries) as Array<keyof typeof registries>);

    codeFiles.forEach(file => {
        if (!fs.existsSync(file)) return;
        const content = fs.readFileSync(file, 'utf8');

        // Extract t() calls
        REGEX_T.lastIndex = 0;
        let match;
        while ((match = REGEX_T.exec(content)) !== null) {
            checkI18nKey(`t('${match[1]}') in ${path.basename(file)}`, match[2], match[1]);
        }

        // Extract literal content.get('id', 'type') calls (prevents runtime fallback spam)
        REGEX_CONTENT_GET.lastIndex = 0;
        while ((match = REGEX_CONTENT_GET.exec(content)) !== null) {
            const id = match[1];
            const type = match[2] as any;
            if (!VALID_REGISTRY_TYPES.has(type)) continue;
            const reg = (registries as any)[type];
            results.ids.count++;
            if (!reg || reg[id] === undefined) {
                results.ids.success = false;
                results.ids.errors.push(`[StaticID] Missing '${id}' in registry '${type}' (in ${path.relative(rootDir, file).replace(/\\/g, '/')})`);
            }
        }

        // Heuristic scan for strings
        STR_REGEX.lastIndex = 0;
        while ((match = STR_REGEX.exec(content)) !== null) {
            const raw = match[1];
            // Mark as used if it's an image path
            if (allImages.includes(raw)) usedAssets.add(raw);
            
            // Mark as used if it's a known i18n key
            Object.keys(de).forEach(ns => {
                if ((de as any)[ns][raw] !== undefined) usedKeySet.add(`${ns}.${raw}`);
                
                // Handle dynamic pattern markers
                DYNAMIC_PREFIXES.forEach(pref => {
                    if (raw === pref || raw === (pref.endsWith('_') ? pref.slice(0,-1) : pref)) {
                        Object.keys((de as any)[ns]).forEach(k => {
                            if (k.startsWith(pref)) usedKeySet.add(`${ns}.${k}`);
                        });
                    }
                });
            });
        }
    });

    // ---------------------------------------------------------------------------
    // 3. Logic Check
    // ---------------------------------------------------------------------------
    console.log("Phase 3: Logic Simulation...");
    const provided = new Set<string>(['build-campfire']);
    const required = new Set<string>();
    const collect = (effs: any[]) => {
        if (!effs) return;
        effs.forEach(e => {
            if (e.type === 'setFlag') provided.add(e.flag);
            if (['unlockItem','unlockRecipe','unlockNPC'].includes(e.type)) provided.add(e.id);
        });
    };
    Object.values(registries.actions).forEach((act: any) => {
        collect(act.onSuccess);
        if (act.steps) act.steps.forEach((s: any) => { collect(s.onSuccess); if (s.reward) provided.add(s.reward); });
        if (act.requirements) Object.keys(act.requirements).forEach(r => r.startsWith('flags.') && required.add(r.replace('flags.', '')));
    });
    required.forEach(f => { 
        if (!provided.has(f)) { 
            results.logic.success = false; 
            results.logic.errors.push(`Flag '${f}' reachable check failed (never set by onSuccess)`); 
        } 
        results.logic.count++; 
    });

    // ---------------------------------------------------------------------------
    // 4. Orphan Check
    // ---------------------------------------------------------------------------
    console.log("Phase 4: Cleanup Analysis...");
    const ASSET_IGNORE = [
        'background/',
        'Game_icon',
        'Stat_head',
        'img/prologue/',
        'img/menu/menu_housing.webp',
        'img/menu/menu_traits.webp'
    ];
    
    allImages.forEach(img => {
        if (!usedAssets.has(img) && !ASSET_IGNORE.some(i => img.includes(i))) {
            results.unused.errors.push(`Unused Asset: ${img}`);
        }
    });

    ['ui', 'actions', 'items', 'npcs', 'logs', 'modifiers'].forEach(sec => {
        Object.keys((de as any)[sec] || {}).forEach(k => { 
            const fullKey = `${sec}.${k}`;
            if (SYSTEM_WHITELIST.includes(fullKey)) return;
            if (!usedKeySet.has(fullKey)) results.unused.errors.push(`Unused Key: ${fullKey}`); 
        });
    });
    if (results.unused.errors.length > 0) results.unused.success = false;

    // ---------------------------------------------------------------------------
    // 5. Parity Check
    // ---------------------------------------------------------------------------
    console.log("Phase 5: Parity Check...");
    const deObj = de as any;
    const enObj = en as any;
    const allNamespaces = new Set([...Object.keys(deObj), ...Object.keys(enObj)]);

    allNamespaces.forEach((ns) => {
        const deKeys = deObj[ns] ? Object.keys(deObj[ns]) : [];
        const enKeys = enObj[ns] ? Object.keys(enObj[ns]) : [];

        deKeys.filter(k => !enKeys.includes(k)).forEach(k => {
            results.i18n.success = false;
            results.i18n.errors.push(`[Parity] ns '${ns}' key '${k}' in DE but MISSING in EN`);
        });
        enKeys.filter(k => !deKeys.includes(k)).forEach(k => {
            results.i18n.success = false;
            results.i18n.errors.push(`[Parity] ns '${ns}' key '${k}' in EN but MISSING in DE`);
        });
    });

    // ---------------------------------------------------------------------------
    // 6. Effect Reference Audit (Registry IDs)
    // ---------------------------------------------------------------------------
    console.log("Phase 6: Effect Reference Audit...");
    const hasReg = (type: keyof typeof registries, id: string) => {
        const reg = (registries as any)[type];
        return !!(reg && reg[id] !== undefined);
    };
    const checkRef = (label: string, type: keyof typeof registries, id: string) => {
        results.ids.count++;
        if (!hasReg(type, id)) {
            results.ids.success = false;
            results.ids.errors.push(`[Ref] ${label} references missing ${String(type)}:'${id}'`);
        }
    };
    const scanAction = (actionId: string, act: any) => {
        const scanStep = (owner: string, step: any) => {
            if (!step) return;
            if (typeof step.reward === 'string') {
                if (step.reward.startsWith('item-')) checkRef(`${owner}.reward`, 'items', step.reward);
                else if (step.reward.startsWith('act-') || step.reward.startsWith('build-')) checkRef(`${owner}.reward`, 'actions', step.reward);
                else if (step.reward.startsWith('npc-')) checkRef(`${owner}.reward`, 'npcs', step.reward);
                else if (step.reward.startsWith('home-')) checkRef(`${owner}.reward`, 'homes', step.reward);
                else if (step.reward.startsWith('buff-')) checkRef(`${owner}.reward`, 'buffs', step.reward);
            }
            const effs = step.onSuccess || [];
            if (Array.isArray(effs)) {
                effs.forEach((e: any, idx: number) => {
                    if (!e || typeof e !== 'object') return;
                    const eLabel = `${owner}.onSuccess[${idx}]`;
                    if (e.type === 'unlockItem') checkRef(eLabel, 'items', e.id);
                    else if (e.type === 'unlockRecipe') checkRef(eLabel, 'actions', e.id);
                    else if (e.type === 'unlockNPC') checkRef(eLabel, 'npcs', e.id);
                    else if (e.type === 'setHome') checkRef(eLabel, 'homes', e.id);
                    else if (e.type === 'addBuff') checkRef(eLabel, 'buffs', e.buffId);
                    else if (e.type === 'log' && e.logKey) checkI18nKey(`${eLabel}.logKey`, 'logs', e.logKey);
                });
            }
        };

        // Top-level onSuccess
        scanStep(`Action '${actionId}'`, act);

        // Steps
        if (Array.isArray(act.steps)) {
            act.steps.forEach((s: any, i: number) => scanStep(`Action '${actionId}'.steps[${i}]`, s));
        }
    };
    Object.entries(registries.actions).forEach(([id, act]) => scanAction(id, act));

    // ---------------------------------------------------------------------------
    // 7. i18n Placeholder + Shape Parity (DE vs EN)
    // ---------------------------------------------------------------------------
    console.log("Phase 7: i18n Placeholder/Shape Parity...");
    Object.keys(deObj).forEach((ns) => {
        const deNs = deObj[ns] || {};
        const enNs = enObj[ns] || {};
        const keys = new Set([...Object.keys(deNs), ...Object.keys(enNs)]);
        keys.forEach((k) => {
            const a = deNs[k];
            const b = enNs[k];
            results.i18n.count++;
            if (a === undefined || b === undefined) return; // already handled by Phase 5
            if (!isSameKeyShape(a, b)) {
                results.i18n.success = false;
                results.i18n.errors.push(`[Shape] ns '${ns}' key '${k}' has different value shape DE vs EN`);
                return;
            }
            const pa = getPlaceholders(a);
            const pb = getPlaceholders(b);
            const onlyA = [...pa].filter(x => !pb.has(x));
            const onlyB = [...pb].filter(x => !pa.has(x));
            if (onlyA.length || onlyB.length) {
                results.i18n.success = false;
                results.i18n.errors.push(`[Placeholders] ns '${ns}' key '${k}' mismatch: missing in EN=[${onlyA.join(',')}], missing in DE=[${onlyB.join(',')}]`);
            }
        });
    });

    // ---------------------------------------------------------------------------
    // 8. Save Fixture Validation (optional)
    // ---------------------------------------------------------------------------
    console.log("Phase 8: Save Fixture Validation...");
    const fixturesDir = path.join(rootDir, 'scripts', 'fixtures', 'saves');
    const fixtureFiles = fs.existsSync(fixturesDir)
        ? fs.readdirSync(fixturesDir).filter(f => f.endsWith('.json'))
        : [];
    if (fixtureFiles.length === 0) {
        results.save.count++;
        // Nothing to validate; keep it green.
    } else {
        fixtureFiles.forEach((f) => {
            const full = path.join(fixturesDir, f);
            try {
                const obj = JSON.parse(fs.readFileSync(full, 'utf8'));
                results.save.count++;

                const bad: string[] = [];
                const arr = (v: any) => (Array.isArray(v) ? v : []);

                arr(obj.discoveredItems).forEach((id: any) => {
                    if (typeof id !== 'string' || !id.startsWith('item-') || !hasReg('items', id)) bad.push(`discoveredItems:${id}`);
                });
                arr(obj.unlockedRecipes).forEach((id: any) => {
                    if (typeof id !== 'string' || !hasReg('actions', id)) bad.push(`unlockedRecipes:${id}`);
                });
                arr(obj.unlockedNPCs).forEach((id: any) => {
                    if (typeof id !== 'string' || !hasReg('npcs', id)) bad.push(`unlockedNPCs:${id}`);
                });
                arr(obj.discoveredTitles).forEach((id: any) => {
                    if (typeof id !== 'string' || !hasReg('titles', id)) bad.push(`discoveredTitles:${id}`);
                });

                if (bad.length) {
                    results.save.success = false;
                    results.save.errors.push(`[SaveFixture] ${f} contains invalid IDs: ${bad.slice(0, 25).join(', ')}${bad.length > 25 ? ' ...' : ''}`);
                }
            } catch (e: any) {
                results.save.success = false;
                results.save.errors.push(`[SaveFixture] Failed to parse ${f}: ${e?.message || String(e)}`);
            }
        });
    }

    // ---------------------------------------------------------------------------
    // Summary
    // ---------------------------------------------------------------------------
    console.log("\n-----------------------------------------");
    console.log(`${results.i18n.success ? '✅' : '❌'} TRANSLATIONS : ${results.i18n.success ? 'Perfect' : results.i18n.errors.length + ' Errors'}`);
    console.log(`${results.assets.success ? '✅' : '❌'} ASSETS       : ${results.assets.success ? 'Perfect' : results.assets.errors.length + ' Errors'}`);
    console.log(`${results.logic.success ? '✅' : '❌'} LOGIC        : ${results.logic.success ? 'Perfect' : results.logic.errors.length + ' Errors'}`);
    console.log(`${results.ids.success ? '✅' : '❌'} CONTENT IDs  : ${results.ids.success ? 'Perfect' : results.ids.errors.length + ' Errors'}`);
    console.log(`${results.save.success ? '✅' : '❌'} SAVE FIXTURES: ${results.save.success ? (fixtureFiles.length ? 'Perfect' : 'Skipped') : results.save.errors.length + ' Errors'}`);
    console.log(`${results.unused.success ? '✅' : '⚠️'} UNUSED       : ${results.unused.success ? 'None' : results.unused.errors.length + ' found'}`);
    console.log("-----------------------------------------");

    if (!results.i18n.success || !results.assets.success || !results.logic.success || !results.ids.success || !results.save.success) {
        console.log("\n⚠️  CRITICAL ISSUE DETAILS:");
        [...results.i18n.errors, ...results.assets.errors, ...results.logic.errors, ...results.ids.errors, ...results.save.errors].forEach(e => console.log(`  - ${e}`));
        process.exit(1);
    } else {
        if (!results.unused.success) {
            console.log(`\n💡 Detected ${results.unused.errors.length} unused items. Consider cleaning up:`);
            results.unused.errors.slice(0, 10).forEach(e => console.log(`  - ${e}`));
            if (results.unused.errors.length > 10) console.log(`    ... and ${results.unused.errors.length - 10} more.`);
        }
        console.log("\n✨ EVERYTHING LOOKS GOOD!");
    }
};

checkAll();

