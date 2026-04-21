import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import de from '../src/lang/de';
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

const runUnusedCheck = () => {
    console.log("\n🔍 ORPHAN FINDER v3 (Ultra Smart Scan)\n");

    const usedKeys = new Set<string>();
    const usedAssets = new Set<string>();

    // 1. Collect from registries
    Object.values(registries.actions).forEach((act: any) => {
        usedKeys.add(act.id);
        if (act.logKey) usedKeys.add(act.logKey);
        if (act.image) usedAssets.add(act.image);
    });
    Object.values(registries.items).forEach((item: any) => {
        if (item.title) usedKeys.add(item.title);
        if (item.desc) usedKeys.add(item.desc);
        if (item.image) usedAssets.add(item.image);
    });
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) usedKeys.add(npc.nameKey);
        if (npc.image) usedAssets.add(npc.image);
        if (npc.images) Object.values(npc.images).forEach((p: any) => usedAssets.add(p));
        if (npc.steps) npc.steps.forEach((s: any) => s.dialogueKey && usedKeys.add(s.dialogueKey));
    });
    Object.values(registries.navigation).forEach((nav: any) => {
        usedKeys.add(nav.label);
        // Special case for menu icons constructed like 'img/menu_' + icon + '.webp'
        if (nav.icon) usedAssets.add(`img/menu_${nav.icon}.webp`);
    });
    Object.values(registries.resources).forEach((res: any) => usedKeys.add('ui_' + res.id));
    Object.values(registries.milestones).forEach((m: any) => m.icon && usedAssets.add(m.icon));

    // 2. SMART SCAN: Check HTML & TS files
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];

    const imgDir = path.join(rootDir, 'public', 'img');
    const allKnownImages = getAllFiles(imgDir).map(p => path.relative(path.join(rootDir, 'public'), p).replace(/\\/g, '/'));

    codeFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Scan for keys
        const i18nSections = ['ui', 'actions', 'items', 'npcs', 'logs'];
        i18nSections.forEach(section => {
            const keys = Object.keys((de as any)[section] || {});
            keys.forEach(key => {
                if (content.includes(`'${key}'`) || content.includes(`"${key}"`) || content.includes(`>${key}<`)) {
                    usedKeys.add(key);
                }
            });
        });

        // Scan for assets
        allKnownImages.forEach(img => {
            const fileName = path.basename(img);
            if (content.includes(img) || content.includes(fileName)) {
                usedAssets.add(img);
            }
        });
    });

    // 3. Check Translations (de.ts)
    let unusedKeysList: string[] = [];
    const i18nSections = ['ui', 'actions', 'items', 'npcs', 'logs'];
    i18nSections.forEach(section => {
        const keys = Object.keys((de as any)[section] || {});
        keys.forEach(key => {
            if (!usedKeys.has(key)) {
                unusedKeysList.push(`Section: ${section.padEnd(8)} | Key: ${key}`);
            }
        });
    });

    // 4. Check Assets (public/img)
    let unusedAssetsList: string[] = [];
    allKnownImages.forEach(relPath => {
        const ignored = [
            'background/',
            'Game_icon',
            'Stat_head',
            'img/menu_housing.webp',
            'img/menu_traits.webp',
            'img/prologue/Gemini_Lunara_Dragon.webp'
        ];
        if (!usedAssets.has(relPath) && !ignored.some(i => relPath.includes(i))) {
            unusedAssetsList.push(relPath);
        }
    });

    if (unusedKeysList.length > 0) {
        console.log("--- UNUSED KEYS ---");
        unusedKeysList.slice(0, 50).forEach(k => console.log(`[UNUSED KEY] ${k}`));
        if (unusedKeysList.length > 50) console.log(`... and ${unusedKeysList.length - 50} more.`);
    }
    
    if (unusedAssetsList.length > 0) {
        console.log("\n--- UNUSED ASSETS ---");
        unusedAssetsList.forEach(a => console.log(`[UNUSED ASSET] ${a}`));
    }

    console.log("\n-----------------------------------------");
    console.log(`Summary:`);
    console.log(`   - Unused Keys   : ${unusedKeysList.length}`);
    console.log(`   - Unused Assets : ${unusedAssetsList.length}`);
    console.log("-----------------------------------------");
};

runUnusedCheck();
