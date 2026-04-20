import fs from 'fs';
import path from 'path';

import de from '../src/lang/de.js';
import en from '../src/lang/en.js';
import { registries } from '../src/data/index.js';

const checkLanguage = () => {
    let missingMap = {};

    const addMissing = (keyInfo, lang) => {
        if (!missingMap[keyInfo]) {
            missingMap[keyInfo] = [];
        }
        missingMap[keyInfo].push(lang);
    };

    // Helper to check both DE and EN
    const checkKey = (keyInfo, objPath, expectedKey) => {
        // Evaluate if missing in DE
        const inDe = de[objPath] && de[objPath][expectedKey] !== undefined;
        // Evaluate if missing in EN
        const inEn = en[objPath] && en[objPath][expectedKey] !== undefined;
        
        if (!inDe) addMissing(keyInfo, 'DE');
        if (!inEn) addMissing(keyInfo, 'EN');
    };

    // 1. Check Actions
    Object.keys(registries.actions).forEach(id => {
        const action = registries.actions[id];
        
        // checking the action itself maps to title in ui
        checkKey(`[actions] '${id}' (Titel/Beschreibung)`, 'actions', id);
        
        if (action.logKey) {
            checkKey(`[logs] action.logKey '${action.logKey}'`, 'logs', action.logKey);
        }
    });

    // 2. Check Items
    Object.values(registries.items).forEach(item => {
        if (item.title) checkKey(`[items] item.title '${item.title}'`, 'items', item.title);
        if (item.desc) checkKey(`[items] item.desc '${item.desc}'`, 'items', item.desc);
    });

    // 3. Check NPCs
    Object.values(registries.npcs).forEach(npc => {
        if (npc.nameKey) checkKey(`[ui] npc.nameKey '${npc.nameKey}'`, 'ui', npc.nameKey);
        if (npc.steps) {
            npc.steps.forEach(step => {
                if (step.dialogueKey) checkKey(`[npcs] dialogueKey '${step.dialogueKey}'`, 'npcs', step.dialogueKey);
            });
        }
    });

    // 4. Check Resources & Stats
    Object.values(registries.resources).forEach(res => {
        const key = 'ui_' + res.id;
        checkKey(`[ui] resource key '${key}'`, 'ui', key);
    });

    console.log(`\n=== ÜBERSETZUNGS-PRÜFUNG ===\n`);
    
    const keys = Object.keys(missingMap);
    if (keys.length === 0) {
        console.log(`Perfekt! Alle überprüften Übersetzungs-Schlüssel in Deutsch und Englisch sind vollständig vorhanden.`);
    } else {
        console.log(`Es wurden Fehler bei ${keys.length} Schlüsseln gefunden:\n`);
        keys.forEach(k => {
            const langs = missingMap[k];
            // Wenn in beiden fehlt
            const langStr = langs.length === 2 ? 'Fehlt in BEIDEN Sprachen (DE & EN)' : `Fehlt nur in: ${langs[0]}`;
            console.log(`  - ${k}`);
            console.log(`      -> ${langStr}`);
        });
        console.log(""); // Empty line for better readability
    }
};

checkLanguage();
