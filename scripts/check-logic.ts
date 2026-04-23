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
    console.log("=== ULTIMATE LOGIC & ASSET VALIDATION 2.4 (SMART) ===\n");

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
    const reachableFlags = new Set<string>();
    const unlockedActions = new Set<string>();
    const processedActions = new Set<string>();
    const unlockedItems = new Set<string>();
    const unlockedNPCs = new Set<string>();

    // Seed with starting NPCs
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.unlockedAtStart) unlockedNPCs.add(npc.id);
    });

    let changed = true;
    let iteration = 0;
    while (changed && iteration < 100) {
        changed = false;
        iteration++;
        
        Object.entries(registries.actions).forEach(([id, act]: [string, any]) => {
            if (processedActions.has(id)) return;

            // Actions are available if they are part of base construction/gathering or explicitly unlocked
            const isAvailable = unlockedActions.has(id) || !act.requirements || Object.keys(act.requirements).length === 0 || id === 'build-campfire' || !id.startsWith('act-npc-');
            if (!isAvailable) return;

            // Check if requirements are met
            let met = true;
            if (act.requirements) {
                Object.entries(act.requirements).forEach(([reqPath, reqVal]: [string, any]) => {
                    if (reqPath.startsWith('flags.')) {
                        const flag = reqPath.replace('flags.', '');
                        const flagVal = reachableFlags.has(flag);
                        
                        if (typeof reqVal === 'object' && reqVal.op === '!=') {
                            if (flagVal === reqVal.val) met = false;
                        } else if (typeof reqVal === 'object' && reqVal.op === '<') {
                           // Assume 0 if flag is not reached yet
                           const currentVal = reachableFlags.has(flag) ? 1 : 0; // Simple binary simulation for now
                           if (currentVal >= reqVal.val) met = false;
                        } else if (flagVal !== (reqVal === true)) {
                            met = false;
                        }
                    }
                });
            }

            if (met) {
                processedActions.add(id);
                unlockedActions.add(id);
                changed = true;

                const processEffects = (effects: any[]) => {
                    if (!effects) return;
                    effects.forEach(eff => {
                        if (eff.type === 'setFlag') reachableFlags.add(eff.flag);
                        if (eff.type === 'unlockItem') {
                            unlockedItems.add(eff.id);
                            reachableFlags.add(eff.id); 
                            reachableFlags.add(`item-${eff.id}`); 
                        }
                        if (eff.type === 'unlockRecipe') {
                            if (!unlockedActions.has(eff.id)) {
                                unlockedActions.add(eff.id);
                                reachableFlags.add(eff.id);
                                changed = true;
                            }
                        }
                        if (eff.type === 'unlockNPC') {
                            unlockedNPCs.add(eff.id);
                            reachableFlags.add(eff.id);
                            changed = true;
                        }
                        if (eff.type === 'setHome') {
                            reachableFlags.add(eff.id);
                            changed = true;
                        }
                    });
                };

                processEffects(act.onSuccess);
                if (act.steps) act.steps.forEach((s: any) => {
                    processEffects(s.onSuccess);
                    if (s.reward) {
                        unlockedItems.add(s.reward);
                        reachableFlags.add(s.reward);
                        reachableFlags.add(`item-${s.reward}`);
                        changed = true;
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
            logWarning(`Action '${id}' is unreachable.`);
        }
    });

    Object.entries(registries.items).forEach(([id, item]: [string, any]) => {
        if (item.category === 'crafting' || item.category === 'tools') {
            if (!unlockedItems.has(id)) {
                logError(`ORPHANED ITEM: '${id}' is never unlocked or rewarded!`);
            }
        }
    });

    // 4. RESOURCE LIMIT VS COST CHECK
    console.log("--- Validating Economic Feasibility ---");
    const maxLimits: Record<string, number> = {};
    
    Object.values(registries.resources).forEach((res: any) => {
        maxLimits[res.id] = res.initialLimit !== undefined ? res.initialLimit : (res.initialMax || 0);
    });
    // Include internal modifiers in simulation
    Object.values(registries.modifiers || {}).forEach((mod: any) => {
        maxLimits[mod.id] = mod.baseValue !== undefined ? mod.baseValue : 0;
    });
    maxLimits['shards'] = Infinity;
    maxLimits['astral_shards'] = Infinity;
    maxLimits['energy'] = 200; 
    maxLimits['magic'] = 200;

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
        if (reachableFlags.has(home.id) && home.baseLimits) {
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
