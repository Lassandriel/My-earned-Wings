import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import de from '../src/lang/de';
import en from '../src/lang/en';
import { registries } from '../src/data/index';

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
        unused: { success: true, count: 0, errors: [] as string[] }
    };

    const usedKeys = new Set<string>();
    const usedAssets = new Set<string>();

    const checkKey = (keyInfo: string, objPath: string, expectedKey: string) => {
        usedKeys.add(expectedKey);
        const inDe = (de as any)[objPath] && (de as any)[objPath][expectedKey] !== undefined;
        const inEn = (en as any)[objPath] && (en as any)[objPath][expectedKey] !== undefined;
        if (!inDe || !inEn) {
            results.i18n.success = false;
            results.i18n.errors.push(`${keyInfo} missing in: ${!inDe ? 'DE ' : ''}${!inEn ? 'EN' : ''}`);
        }
        results.i18n.count++;
    };

    // 1. Registry Scan
    Object.keys(registries.actions).forEach(id => {
        const act = registries.actions[id];
        checkKey(`Action '${id}'`, 'actions', id);
        if (act.logKey) usedKeys.add(act.logKey);
        if (act.image) usedAssets.add(act.image);
    });
    Object.values(registries.items).forEach((item: any) => {
        if (item.title) checkKey(`Item Title '${item.title}'`, 'items', item.title);
        if (item.desc) checkKey(`Item Desc '${item.desc}'`, 'items', item.desc);
        if (item.image) usedAssets.add(item.image);
    });
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) checkKey(`NPC Name '${npc.nameKey}'`, 'ui', npc.nameKey);
        if (npc.image) usedAssets.add(npc.image);
        if (npc.images) Object.values(npc.images).forEach((p: any) => usedAssets.add(p));
        if (npc.steps) npc.steps.forEach((s: any) => s.dialogueKey && checkKey(`Dialogue '${s.dialogueKey}'`, 'npcs', s.dialogueKey));
    });
    Object.values(registries.navigation).forEach((nav: any) => {
        usedKeys.add(nav.label);
        if (nav.icon) usedAssets.add(`img/menu_${nav.icon}.webp`);
    });
    Object.values(registries.resources).forEach((res: any) => usedKeys.add('ui_' + res.id));
    Object.values(registries.milestones).forEach((m: any) => m.icon && usedAssets.add(m.icon));

    // 2. Smart Asset & Key Scan
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];
    const allImages = getAllFiles(path.join(rootDir, 'public', 'img')).map(p => path.relative(path.join(rootDir, 'public'), p).replace(/\\/g, '/'));

    codeFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        ['ui', 'actions', 'items', 'npcs', 'logs'].forEach(sec => {
            Object.keys((de as any)[sec] || {}).forEach(k => {
                if (content.includes(`'${k}'`) || content.includes(`"${k}"`) || content.includes(`>${k}<`)) usedKeys.add(k);
            });
        });
        allImages.forEach(img => {
            if (content.includes(img) || content.includes(path.basename(img))) usedAssets.add(img);
        });
    });

    // 3. Logic Check
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
    required.forEach(f => { if (!provided.has(f)) { results.logic.success = false; results.logic.errors.push(`Flag '${f}' unreachable`); } results.logic.count++; });

    // 4. Summarize Unused
    ['ui', 'actions', 'items', 'npcs', 'logs'].forEach(sec => {
        Object.keys((de as any)[sec] || {}).forEach(k => { if (!usedKeys.has(k)) results.unused.errors.push(`Key: ${sec}/${k}`); });
    });
    allImages.forEach(img => {
        const ignored = [
            'background/',
            'Game_icon',
            'Stat_head',
            'img/menu_housing.webp',
            'img/menu_traits.webp',
            'img/prologue/Gemini_Lunara_Dragon.webp'
        ];
        if (!usedAssets.has(img) && !ignored.some(i => img.includes(i))) {
            results.unused.errors.push(`Asset: ${img}`);
        }
    });
    if (results.unused.errors.length > 0) results.unused.success = false;

    console.log("-----------------------------------------");
    console.log(`${results.i18n.success ? '✅' : '❌'} TRANSLATIONS : ${results.i18n.success ? 'Perfect' : results.i18n.errors.length + ' Errors'}`);
    console.log(`${results.assets.success ? '✅' : '❌'} ASSETS       : ${results.assets.success ? 'Perfect' : results.assets.errors.length + ' Errors'}`);
    console.log(`${results.logic.success ? '✅' : '❌'} LOGIC        : ${results.logic.success ? 'Perfect' : results.logic.errors.length + ' Errors'}`);
    console.log(`${results.unused.success ? '✅' : '⚠️'} UNUSED       : ${results.unused.success ? 'None' : results.unused.errors.length + ' found'}`);
    console.log("-----------------------------------------");

    if (!results.i18n.success || !results.assets.success || !results.logic.success) {
        console.log("\n⚠️  ERROR DETAILS:");
        [...results.i18n.errors, ...results.assets.errors, ...results.logic.errors].forEach(e => console.log(`  - ${e}`));
        process.exit(1);
    } else {
        if (!results.unused.success) {
            console.log(`\n💡 Detected ${results.unused.errors.length} unused items. Some might be leftovers.`);
        }
        console.log("\n✨ EVERYTHING LOOKS GOOD!");
    }
};
checkAll();
