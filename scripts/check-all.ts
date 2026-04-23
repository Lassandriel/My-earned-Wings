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

    const usedAssets = new Set<string>();

    // ---------------------------------------------------------------------------
    // Helpers for i18n checking (same logic as check-i18n.ts)
    // ---------------------------------------------------------------------------
    const keyExistsInLang = (
        lang: Record<string, any>,
        context: string | undefined,
        key: string
    ): boolean => {
        if (context) return lang[context] !== undefined && lang[context][key] !== undefined;
        return Object.values(lang).some((ns) => typeof ns === 'object' && ns !== null && ns[key] !== undefined);
    };

    const checkI18nKey = (label: string, context: string | undefined, key: string) => {
        const inDe = keyExistsInLang(de as any, context, key);
        const inEn = keyExistsInLang(en as any, context, key);
        if (!inDe || !inEn) {
            results.i18n.success = false;
            results.i18n.errors.push(`${label} – missing in: ${!inDe ? 'DE ' : ''}${!inEn ? 'EN' : ''}`);
        }
        results.i18n.count++;
    };

    // ---------------------------------------------------------------------------
    // 1. Registry-based i18n checks
    // ---------------------------------------------------------------------------
    Object.keys(registries.actions).forEach(id => {
        const act = (registries.actions as any)[id];
        checkI18nKey(`Action '${id}'`, 'actions', id);
        if (act.image) usedAssets.add(act.image);
    });
    Object.values(registries.items).forEach((item: any) => {
        if (item.title) checkI18nKey(`Item title '${item.title}'`, 'items', item.title);
        if (item.desc)  checkI18nKey(`Item desc  '${item.desc}'`,  'items', item.desc);
        if (item.image) usedAssets.add(item.image);
    });
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) checkI18nKey(`NPC nameKey '${npc.nameKey}'`, 'ui', npc.nameKey);
        if (npc.image)  usedAssets.add(npc.image);
        if (npc.images) Object.values(npc.images).forEach((p: any) => usedAssets.add(p));
        if (npc.steps)  npc.steps.forEach((s: any) => s.dialogueKey && checkI18nKey(`Dialogue '${s.dialogueKey}'`, 'npcs', s.dialogueKey));
    });
    Object.values(registries.navigation).forEach((nav: any) => {
        if (nav.icon) usedAssets.add(`img/menu_${nav.icon}.webp`);
    });
    Object.values(registries.resources).forEach((res: any) => {
        checkI18nKey(`Resource 'ui_${res.id}'`, 'ui', 'ui_' + res.id);
    });
    Object.values(registries.milestones || {}).forEach((m: any) => m.icon && usedAssets.add(m.icon));

    // ---------------------------------------------------------------------------
    // 2. Source-file scan for t('...') calls  (same regex as check-i18n.ts)
    // ---------------------------------------------------------------------------
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];
    const allImages = getAllFiles(path.join(rootDir, 'public', 'img'))
        .map(p => path.relative(path.join(rootDir, 'public'), p).replace(/\\/g, '/'));

    const REGEX = /\bt\(\s*['"]([$`{}()[\]]*[^'"$`{}()[\]]+)['"]\s*(?:,\s*['"]([^'"]+)['"])?\s*\)/g;
    // mapKey → { context, key, files[] }
    const sourceKeys = new Map<string, { ctx: string | undefined; key: string; files: string[] }>();

    codeFiles.forEach(file => {
        if (!fs.existsSync(file)) return;
        const content = fs.readFileSync(file, 'utf8');

        // Collect used assets
        allImages.forEach(img => {
            if (content.includes(img) || content.includes(path.basename(img))) usedAssets.add(img);
        });

        // Extract t('key', 'ctx') calls
        REGEX.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = REGEX.exec(content)) !== null) {
            const key = match[1];
            const ctx = match[2];
            const mapKey = `${ctx ?? '__any__'}::${key}`;
            if (!sourceKeys.has(mapKey)) sourceKeys.set(mapKey, { ctx, key, files: [] });
            const rel = path.relative(path.join(rootDir, 'src'), file);
            if (!sourceKeys.get(mapKey)!.files.includes(rel)) sourceKeys.get(mapKey)!.files.push(rel);
        }
    });

    // Check all collected source keys
    sourceKeys.forEach(({ ctx, key, files }) => {
        const fileHint = files.slice(0, 2).join(', ') + (files.length > 2 ? ` +${files.length - 2} more` : '');
        const label = `t('${key}'${ctx ? `, '${ctx}'` : ''}) in ${fileHint}`;
        checkI18nKey(label, ctx, key);
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
    // A key is "used" if it appears in the sourceKeys map (found via t() scan)
    const usedKeySet = new Set<string>();
    sourceKeys.forEach(({ key }) => usedKeySet.add(key));
    ['ui', 'actions', 'items', 'npcs', 'logs', 'modifiers'].forEach(sec => {
        Object.keys((de as any)[sec] || {}).forEach(k => { if (!usedKeySet.has(k)) results.unused.errors.push(`Key: ${sec}/${k}`); });
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
