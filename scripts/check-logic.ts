import fs from 'fs';
import path from 'path';
import { registries } from '../src/data/index';

let errors = 0;
let warnings = 0;

const logError = (msg: string) => {
    console.error(`❌ ERROR: ${msg}`);
    errors++;
};

const logWarning = (msg: string) => {
    console.warn(`⚠️ WARNING: ${msg}`);
    warnings++;
};

const checkFileExists = (relPath: string) => {
    if (!relPath) return true;
    const fullPath = path.join(process.cwd(), 'public', relPath);
    return fs.existsSync(fullPath);
};

// SFX Registry from audio.ts
const validSfx = new Set(['click', 'gather', 'success', 'eat', 'fail', 'magic', 'water', 'craft', 'discovery']);

const checkLogic = () => {
    console.log("=== ULTIMATE LOGIC & ASSET VALIDATION ===\n");

    const providedFlags = new Set<string>();
    const requiredFlags = new Set<string>();
    const requirementsMap: Record<string, string[]> = {}; 

    const itemIds = new Set(Object.keys(registries.items));
    const actionIds = new Set(Object.keys(registries.actions));

    const itemsUnlockedBy = new Map<string, string>(); // itemID -> actionID
    const referencedModifiers = new Set<string>();

    // 1. Validate Items
    console.log("--- Validating Items ---");
    Object.entries(registries.items).forEach(([id, item]: [string, any]) => {
        // Image Check
        if (item.image && !checkFileExists(item.image)) {
            logError(`Item '${id}' refers to missing image: ${item.image}`);
        }

        // Space Cost Check for Crafting
        if (item.category === 'crafting') {
            if (item.spaceCost === undefined || item.spaceCost <= 0) {
                logError(`Crafting item '${id}' has no (or zero) spaceCost! Furniture must occupy space.`);
            }
        }

        // Modifiers
        if (item.modifiers) {
            item.modifiers.forEach((mod: any) => {
                const modKey = mod.key.endsWith('_limit') ? mod.key.replace('_limit', '') : mod.key;
                referencedModifiers.add(modKey);
            });
        }
    });

    // 2. Validate Actions
    console.log("--- Validating Actions ---");
    
    const checkEffects = (effects: any[], source: string) => {
        if (!effects) return;
        effects.forEach((eff: any) => {
            if (eff.type === 'setFlag' && eff.flag) providedFlags.add(eff.flag);
            
            if (eff.type === 'unlockItem' && eff.id) {
                if (!itemIds.has(eff.id)) {
                    logError(`${source} unlocks non-existent item: '${eff.id}'`);
                } else {
                    itemsUnlockedBy.set(eff.id, source);
                }
                providedFlags.add(eff.id);
            }
            
            if (eff.type === 'unlockRecipe' && eff.id) {
                if (!actionIds.has(eff.id)) {
                    logError(`${source} unlocks non-existent action: '${eff.id}'`);
                }
                providedFlags.add(eff.id);
            }
            
            if (eff.type === 'unlockNPC' && eff.id) providedFlags.add(eff.id);
            
            if (eff.type === 'modifyLimit' && eff.resource) {
                referencedModifiers.add(eff.resource);
            }
        });
    };

    Object.entries(registries.actions).forEach(([id, act]: [string, any]) => {
        // Image Check
        if (act.image && !checkFileExists(act.image)) {
            logError(`Action '${id}' refers to missing image: ${act.image}`);
        }

        // SFX Check
        if (act.sfx && !validSfx.has(act.sfx)) {
            logError(`Action '${id}' uses unknown sound effect: '${act.sfx}'`);
        }

        checkEffects(act.onSuccess, `Action '${id}'`);
        
        if (act.steps) {
            act.steps.forEach((step: any, idx: number) => {
                checkEffects(step.onSuccess, `Action '${id}' (Step ${idx})`);
                if (step.reward) {
                    if (!itemIds.has(step.reward)) {
                        logError(`Action '${id}' (Step ${idx}) rewards non-existent item: '${step.reward}'`);
                    } else {
                        itemsUnlockedBy.set(step.reward, `Action '${id}'`);
                    }
                    providedFlags.add(step.reward);
                }
            });
        }

        // Requirements
        if (act.requirements) {
            Object.keys(act.requirements).forEach(reqPath => {
                if (reqPath.startsWith('flags.')) {
                    const flagName = reqPath.replace('flags.', '');
                    requiredFlags.add(flagName);
                    if (!requirementsMap[flagName]) requirementsMap[flagName] = [];
                    requirementsMap[flagName].push(id);
                }
            });
        }
    });

    // 3. The "Smart" Counterpart Check
    console.log("--- Validating Crafting Bridges ---");
    Object.entries(registries.items).forEach(([id, item]: [string, any]) => {
        if (item.category === 'crafting' || item.category === 'tools') {
            if (!itemsUnlockedBy.has(id)) {
                logError(`ORPHANED ITEM: '${id}' (category: ${item.category}) exists in items.ts but is never unlocked by any action!`);
            }
        }
    });

    // 4. Modifier Translation Bridge
    console.log("--- Validating Translation Bridges ---");
    // This part is hard because we can't easily read the TS translation files here without complex parsing
    // but we can warn that these resources should have 'ui_' keys.
    const resourceIds = new Set(Object.keys(registries.resources));
    referencedModifiers.forEach(mod => {
        // Check if it's a known resource or should be one
        if (!resourceIds.has(mod as any)) {
            logWarning(`Modifier refers to key '${mod}' which is not a registered resource. Ensure 'ui_${mod}' exists in lang files.`);
        }
    });

    // 5. Progression Check
    console.log("--- Cross-Checking Progression ---");
    providedFlags.add('build-campfire'); 
    requiredFlags.forEach(flag => {
        if (!providedFlags.has(flag)) {
            logError(`Flag '${flag}' is required but never provided!`);
            console.log(`   -> Required by: ${requirementsMap[flag].join(', ')}`);
        }
    });

    console.log("\n=============================");
    console.log(`Validation completed with ${errors} Errors and ${warnings} Warnings.`);
    
    if (errors > 0) {
        process.exit(1);
    }
};

checkLogic();
