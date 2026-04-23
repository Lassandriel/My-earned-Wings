import fs from 'fs';
import path from 'path';
import { registries } from '../src/data/index';
import { checkRequirement } from '../src/core/logicUtils';

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
    console.log("=== ULTIMATE LOGIC & ASSET VALIDATION 2.6 (ULTIMATE) ===\n");

    const itemIds = new Set(Object.keys(registries.items));
    const actionIds = new Set(Object.keys(registries.actions));

    // 1. Validate Basic Integrity
    console.log("--- Integrity Check ---");
    Object.entries(registries.items).forEach(([id, item]: [string, any]) => {
        if (item.image && !checkFileExists(item.image)) logError(`Item '${id}' missing image: ${item.image}`);
    });
    Object.entries(registries.actions).forEach(([id, act]: [string, any]) => {
        if (act.image && !checkFileExists(act.image)) logError(`Action '${id}' missing image: ${act.image}`);
        if (act.sfx && !validSfx.has(act.sfx)) logError(`Action '${id}' unknown SFX: '${act.sfx}'`);
    });

    // 2. REACHABILITY SIMULATION
    console.log("--- Simulating Progression Reachability ---");
    const reachableFlags = new Map<string, any>();
    const unlockedActions = new Set<string>();
    const processedActions = new Set<string>();
    const unlockedItems = new Set<string>();
    const unlockedNPCs = new Set<string>();

    // Seed with starting NPCs
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.unlockedAtStart) {
            unlockedNPCs.add(npc.id);
            unlockedActions.add(`act-${npc.id}`); // NPCs usually have a corresponding action
        }
    });

    let changed = true;
    let iteration = 0;
    while (changed && iteration < 100) {
        changed = false;
        iteration++;
        
        Object.entries(registries.actions).forEach(([id, act]: [string, any]) => {
            if (processedActions.has(id)) return;

            // Actions are available if they are global OR explicitly unlocked
            const isAvailable = unlockedActions.has(id) || !id.startsWith('act-npc-');
            if (!isAvailable) return;

            // Create a mock game state for the requirement checker
            const mockGame = {
                flags: Object.fromEntries(reachableFlags),
                discoveredItems: Array.from(unlockedItems),
                unlockedRecipes: Array.from(unlockedActions)
            };

            // Check if requirements are met using SHARED REAL LOGIC
            let met = true;
            if (act.requirements) {
                met = Object.entries(act.requirements).every(([path, rule]) => {
                    return checkRequirement(mockGame, path, rule);
                });
            }

            if (met) {
                processedActions.add(id);
                unlockedActions.add(id);
                changed = true;

                const processEffects = (effects: any[]) => {
                    if (!effects) return;
                    effects.forEach(eff => {
                        if (eff.type === 'setFlag') {
                            const current = reachableFlags.get(eff.flag);
                            if (current !== eff.value) {
                                reachableFlags.set(eff.flag, eff.value);
                                changed = true;
                            }
                        }
                        if (eff.type === 'unlockItem') {
                            if (!unlockedItems.has(eff.id)) {
                                unlockedItems.add(eff.id);
                                reachableFlags.set(eff.id, true); 
                                reachableFlags.set(`item-${eff.id}`, true); 
                                changed = true;
                            }
                        }
                        if (eff.type === 'unlockRecipe') {
                            if (!unlockedActions.has(eff.id)) {
                                unlockedActions.add(eff.id);
                                reachableFlags.set(eff.id, true);
                                changed = true;
                            }
                        }
                        if (eff.type === 'unlockNPC') {
                            if (!unlockedNPCs.has(eff.id)) {
                                unlockedNPCs.add(eff.id);
                                unlockedActions.add(`act-${eff.id}`); // FIX: Unlock the story action too
                                reachableFlags.set(eff.id, true);
                                changed = true;
                            }
                        }
                        if (eff.type === 'setHome') {
                            if (reachableFlags.get(eff.id) !== true) {
                                reachableFlags.set(eff.id, true);
                                changed = true;
                            }
                        }
                    });
                };

                processEffects(act.onSuccess);
                if (act.steps) act.steps.forEach((s: any) => {
                    processEffects(s.onSuccess);
                    if (s.reward) {
                        if (!unlockedItems.has(s.reward)) {
                            unlockedItems.add(s.reward);
                            reachableFlags.set(s.reward, true);
                            reachableFlags.set(`item-${s.reward}`, true);
                            changed = true;
                        }
                    }
                });
            }
        });
    }

    // 3. IDENTIFY ORPHANS & UNREACHABLES
    console.log("--- Analyzing Unreachables ---");
    Object.keys(registries.actions).forEach(id => {
        if (!processedActions.has(id)) {
            const act = registries.actions[id];
            logWarning(`Action '${id}' is unreachable. Requirements: ${JSON.stringify(act.requirements)}`);
        }
    });

    Object.entries(registries.items).forEach(([id, item]: [string, any]) => {
        if (item.category === 'crafting' || item.category === 'tools') {
            if (!unlockedItems.has(id)) {
                logError(`ORPHANED ITEM: '${id}' is never unlocked or rewarded! (Simulation did not reach it)`);
            }
        }
    });

    // 4. RESOURCE LIMIT VS COST CHECK
    console.log("--- Validating Economic Feasibility ---");
    const maxLimits: Record<string, number> = {};
    
    // Fill with initial values from resources
    Object.values(registries.resources).forEach((res: any) => {
        maxLimits[res.id] = res.initialLimit !== undefined ? res.initialLimit : (res.initialMax || 0);
    });

    // Fill modifiers (but DON'T overwrite existing resource limits if they are already higher)
    Object.values(registries.modifiers || {}).forEach((mod: any) => {
        const val = mod.baseValue !== undefined ? mod.baseValue : 0;
        if (maxLimits[mod.id] === undefined || val > maxLimits[mod.id]) {
            maxLimits[mod.id] = val;
        }
    });

    maxLimits['shards'] = Infinity;
    maxLimits['astral_shards'] = Infinity;
    // Energy/Magic limits are stats, usually 100-200
    if (maxLimits['energy'] < 200) maxLimits['energy'] = 200; 
    if (maxLimits['magic'] < 200) maxLimits['magic'] = 200;

    // Calculate absolute max possible limits from PROCESSED actions
    processedActions.forEach(id => {
        const act = registries.actions[id];
        const multiplier = act.maxCount || 1; // Simulate repeatability
        
        const collectLimits = (effects: any[]) => {
            if (!effects) return;
            effects.forEach(eff => {
                if (eff.type === 'modifyLimit') {
                    if (maxLimits[eff.resource] !== undefined) maxLimits[eff.resource] += (eff.amount * multiplier);
                }
            });
        };
        collectLimits(act.onSuccess);
        if (act.steps) act.steps.forEach((s: any) => collectLimits(s.onSuccess));
        if (act.modifiers) act.modifiers.forEach((m: any) => {
            if (m.key.endsWith('_limit')) {
                const res = m.key.replace('_limit', '');
                if (maxLimits[res] !== undefined) maxLimits[res] += ((m.add || 0) * multiplier);
            }
        });
    });

    // Add home base limits from REACHABLE homes
    Object.values(registries.homes).forEach((home: any) => {
        if (reachableFlags.get(home.id) === true && home.baseLimits) {
            Object.entries(home.baseLimits).forEach(([res, amt]: [string, any]) => {
                if (maxLimits[res] !== undefined) maxLimits[res] += amt;
            });
        }
    });

    // Check costs
    Object.entries(registries.actions).forEach(([id, act]: [string, any]) => {
        const checkCosts = (costs: any, source: string) => {
            if (!costs) return;
            Object.entries(costs).forEach(([res, amt]: [string, any]) => {
                const limit = maxLimits[res];
                if (limit !== undefined && amt > limit) {
                    logError(`${source} costs ${amt} ${res}, but max possible limit is ${limit}! (Impossible to build)`);
                }
            });
        };

        if (act.cost && act.costType) checkCosts({ [act.costType]: act.cost }, `Action '${id}'`);
        if (act.costs) checkCosts(act.costs, `Action '${id}'`);
        if (act.steps) act.steps.forEach((s: any, i: number) => {
            if (s.cost && s.costType) checkCosts({ [s.costType]: s.cost }, `Action '${id}' (Step ${i})`);
            if (s.costs) checkCosts(s.costs, `Action '${id}' (Step ${i})`);
        });
    });

    console.log("\n=============================");
    console.log(`Validation completed with ${errors} Errors and ${warnings} Warnings.`);
    
    if (errors > 0) {
        process.exit(1);
    }
};

checkLogic();
