import de from '../src/lang/de';
import en from '../src/lang/en';
import { registries } from '../src/data/index';

const checkLanguage = () => {
    let missingMap: Record<string, string[]> = {};

    const addMissing = (keyInfo: string, lang: string) => {
        if (!missingMap[keyInfo]) {
            missingMap[keyInfo] = [];
        }
        missingMap[keyInfo].push(lang);
    };

    const checkKey = (keyInfo: string, objPath: string, expectedKey: string) => {
        const inDe = (de as any)[objPath] && (de as any)[objPath][expectedKey] !== undefined;
        const inEn = (en as any)[objPath] && (en as any)[objPath][expectedKey] !== undefined;
        
        if (!inDe) addMissing(keyInfo, 'DE');
        if (!inEn) addMissing(keyInfo, 'EN');
    };

    // 1. Check Actions
    Object.keys(registries.actions).forEach(id => {
        const action = registries.actions[id];
        checkKey(`[actions] '${id}' (Titel/Beschreibung)`, 'actions', id);
        if (action.logKey) {
            checkKey(`[logs] action.logKey '${action.logKey}'`, 'logs', action.logKey);
        }
    });

    // 2. Check Items
    Object.values(registries.items).forEach((item: any) => {
        if (item.title) checkKey(`[items] item.title '${item.title}'`, 'items', item.title);
        if (item.desc) checkKey(`[items] item.desc '${item.desc}'`, 'items', item.desc);
    });

    // 3. Check NPCs
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.nameKey) checkKey(`[ui] npc.nameKey '${npc.nameKey}'`, 'ui', npc.nameKey);
        if (npc.steps) {
            npc.steps.forEach((step: any) => {
                if (step.dialogueKey) checkKey(`[npcs] dialogueKey '${step.dialogueKey}'`, 'npcs', step.dialogueKey);
            });
        }
    });

    // 4. Check Resources & Stats
    Object.values(registries.resources).forEach((res: any) => {
        const key = 'ui_' + res.id;
        checkKey(`[ui] resource key '${key}'`, 'ui', key);
    });

    console.log(`\n=== ÜBERSETZUNGS-PRÜFUNG (TypeScript) ===\n`);
    
    const keys = Object.keys(missingMap);
    if (keys.length === 0) {
        console.log(`Perfekt! Alle überprüften Übersetzungs-Schlüssel in Deutsch und Englisch sind vollständig vorhanden.`);
    } else {
        console.log(`Es wurden Fehler bei ${keys.length} Schlüsseln gefunden:\n`);
        keys.forEach(k => {
            const langs = missingMap[k];
            const langStr = langs.length === 2 ? 'Fehlt in BEIDEN Sprachen (DE & EN)' : `Fehlt nur in: ${langs[0]}`;
            console.log(`  - ${k}`);
            console.log(`      -> ${langStr}`);
        });
        console.log(""); 
    }
};

checkLanguage();
