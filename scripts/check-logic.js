import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import registries
import { registries } from '../src/data/index.js';

let errors = 0;

const checkLogic = () => {
    console.log("=== LOGIK & PROGRESSION PRÜFUNG (Advanced) ===\n");

    const providedFlags = new Set();
    const requiredFlags = new Set();
    const requirementsMap = {}; 

    // Helper to collect effects
    const collectEffects = (effects) => {
        if (!effects) return;
        effects.forEach(eff => {
            if (eff.type === 'setFlag' && eff.flag) providedFlags.add(eff.flag);
            if (eff.type === 'unlockItem' && eff.id) {
                providedFlags.add(eff.id);
                // Also provide as item flag
                providedFlags.add('item-' + eff.id.replace('item-', ''));
            }
            if (eff.type === 'unlockRecipe' && eff.id) providedFlags.add(eff.id);
            if (eff.type === 'unlockNPC' && eff.id) providedFlags.add(eff.id);
        });
    };

    // 1. Collect all providers
    Object.values(registries.actions).forEach(act => {
        // Direct Success
        collectEffects(act.onSuccess);
        
        // NPC Steps
        if (act.steps) {
            act.steps.forEach(step => {
                collectEffects(step.onSuccess);
                if (step.reward) providedFlags.add(step.reward);
            });
        }
    });

    // 2. Initial Unlocks or built-in flags
    providedFlags.add('build-campfire'); // Usually start or first action

    // 3. Collect all requirements
    Object.values(registries.actions).forEach(act => {
        if (act.requirements) {
            Object.keys(act.requirements).forEach(reqPath => {
                if (reqPath.startsWith('flags.')) {
                    const flagName = reqPath.replace('flags.', '');
                    requiredFlags.add(flagName);
                    
                    if (!requirementsMap[flagName]) requirementsMap[flagName] = [];
                    requirementsMap[flagName].push(act.id);
                }
            });
        }
    });

    // 4. Milestone requirements
    Object.values(registries.milestones).forEach(stone => {
        if (stone.requirements) {
            Object.keys(stone.requirements).forEach(reqPath => {
                if (reqPath.startsWith('flags.')) {
                    const flagName = reqPath.replace('flags.', '');
                    requiredFlags.add(flagName);
                    if (!requirementsMap[flagName]) requirementsMap[flagName] = [];
                    requirementsMap[flagName].push(`Milestone: ${stone.id}`);
                }
            });
        }
    });

    // Cross-check
    requiredFlags.forEach(flag => {
        if (!providedFlags.has(flag)) {
            // Check if it's an item ID that might be in discoveredItems indirectly
            // but for now let's be strict
            console.error(`[DEAD-END] Flag '${flag}' wird verlangt, ist aber unerreichbar!`);
            console.log(`  -> Benötigt von: ${requirementsMap[flag].join(', ')}`);
            errors++;
        }
    });

    console.log("\n=============================");
    if (errors === 0) {
        console.log("Perfekt! Alle vorausgesetzten Flags sind erreichbar.");
    } else {
        console.log(`Logik-Prüfung abgeschlossen: ${errors} Dead-Ends gefunden.`);
        process.exit(1);
    }
};

checkLogic();
