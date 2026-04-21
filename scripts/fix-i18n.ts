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
    console.log("\n🧹 STARTING I18N PURGE & RECOVERY...\n");

    const usedKeys = new Set<string>();

    // 1. Registry Scan
    Object.keys(registries.actions).forEach(id => {
        const act = registries.actions[id];
        usedKeys.add(id);
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
    Object.values(registries.navigation).forEach((nav: any) => usedKeys.add(nav.label));
    Object.values(registries.resources).forEach((res: any) => usedKeys.add('ui_' + res.id));

    // 2. Smart Scan (Code & HTML)
    const codeFiles = [
        ...getAllFiles(path.join(rootDir, 'src'), '.html'),
        ...getAllFiles(path.join(rootDir, 'src'), '.ts'),
        path.join(rootDir, 'index.html')
    ];
    codeFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        ['ui', 'actions', 'items', 'npcs', 'logs'].forEach(sec => {
            const sectionKeys = Object.keys((de as any)[sec] || {});
            sectionKeys.forEach(k => {
                if (content.includes(`'${k}'`) || content.includes(`"${k}"`) || content.includes(`>${k}<`)) usedKeys.add(k);
            });
        });
    });

    // 3. Purge Objects
    const cleanObject = (orig: any) => {
        const cleaned: any = {};
        Object.keys(orig).forEach(section => {
            cleaned[section] = {};
            Object.keys(orig[section]).forEach(key => {
                if (usedKeys.has(key)) {
                    let val = orig[section][key];
                    // Special Fix: Ellie -> Mina
                    if (typeof val === 'string') {
                      val = val.replace(/Ellie/g, 'Mina');
                    }
                    cleaned[section][key] = val;
                }
            });
        });
        return cleaned;
    };

    const cleanDe = cleanObject(de);
    const cleanEn = cleanObject(en);

    // 4. Save back to files
    const saveFile = (filePath: string, data: any, lang: string) => {
        const header = `/**\n * ${lang} Translations - CLEANED & OPTIMIZED\n */\n`;
        const content = `${header}const lang: Record<string, any> = ${JSON.stringify(data, null, 2)};\n\nexport default lang;\n`;
        fs.writeFileSync(filePath, content);
    };

    saveFile(path.join(rootDir, 'src', 'lang', 'de.ts'), cleanDe, 'German');
    saveFile(path.join(rootDir, 'src', 'lang', 'en.ts'), cleanEn, 'English');

    console.log("✅ I18n Purge Complete! Files rewritten and placeholders removed.");
};

fixI18n();
