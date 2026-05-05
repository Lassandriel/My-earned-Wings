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

const fixI18n = () => {
    console.log("\n🔍 I18N ANALYZER & SUGGESTION TOOL\n");

    const usedKeys = new Set<string>();

    // 1. Registry Scan (Comprehensive)
    Object.keys(registries.actions).forEach(id => {
        usedKeys.add(id);
        const act = registries.actions[id];
        if (act.logKey) usedKeys.add(act.logKey);
    });
    Object.values(registries.items).forEach((item: any) => {
        if (item.title) usedKeys.add(item.title);
        if (item.desc) usedKeys.add(item.desc);
    });
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) usedKeys.add(npc.nameKey);
        if (npc.steps) npc.steps.forEach((s: any) => s.dialogueKey && usedKeys.add(s.dialogueKey));
    });
    Object.values(registries.navigation).forEach((nav: any) => nav.label && usedKeys.add(nav.label));
    Object.values(registries.resources).forEach((res: any) => {
        usedKeys.add('ui_' + res.id);
        usedKeys.add('fail_' + res.id);
        usedKeys.add('fail_full_' + res.id);
    });

    // 2. Source Scan
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];
    
    const T_REGEX = /\bt\(\s*['"]([^'"$`{}()[\]]+)['"]/g;

    codeFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = T_REGEX.exec(content)) !== null) {
            usedKeys.add(match[1]);
        }
    });

    // 3. Identification
    const sections = ['ui', 'actions', 'items', 'npcs', 'logs', 'modifiers'];
    const orphans: string[] = [];
    const missing: Record<string, string[]> = { DE: [], EN: [] };

    sections.forEach(sec => {
        const deKeys = Object.keys((de as any)[sec] || {});
        const enKeys = Object.keys((en as any)[sec] || {});
        const allKeysInSec = new Set([...deKeys, ...enKeys]);

        allKeysInSec.forEach(k => {
            const fullKey = `${sec}.${k}`;
            if (!usedKeys.has(k) && !usedKeys.has(fullKey)) {
                orphans.push(fullKey);
            }
            if (!(de as any)[sec][k]) missing.DE.push(fullKey);
            if (!(en as any)[sec][k]) missing.EN.push(fullKey);
        });
    });

    // 4. Report
    console.log(`--- ANALYSIS COMPLETE ---`);
    console.log(`Found ${orphans.length} potential orphan keys.`);
    console.log(`Found ${missing.DE.length} missing German keys.`);
    console.log(`Found ${missing.EN.length} missing English keys.`);
    
    if (missing.DE.length > 0 || missing.EN.length > 0) {
        console.log("\n⚠️  MISSING KEYS (Action required):");
        [...missing.DE, ...missing.EN].forEach(m => console.log(`   [MISSING] ${m}`));
    }

    if (orphans.length > 0) {
        console.log("\n🧹 ORPHAN KEYS (Suggested for removal):");
        orphans.forEach(o => console.log(`   [ORPHAN]  ${o}`));
        console.log("\nNOTE: Automatic deletion is disabled to prevent data loss.");
    }

    console.log("\n✨ Analysis finished. No files were modified.");
};

fixI18n();

