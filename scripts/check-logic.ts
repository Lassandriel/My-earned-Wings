import { registries } from '../src/data/index';

let errors = 0;

const checkLogic = () => {
    console.log("=== LOGIK & PROGRESSION PRÜFUNG (TypeScript) ===\n");

    const providedFlags = new Set<string>();
    const requiredFlags = new Set<string>();
    const requirementsMap: Record<string, string[]> = {}; 

    // Helper to collect effects
    const collectEffects = (effects: any[]) => {
        if (!effects) return;
        effects.forEach(eff => {
            if (eff.type === 'setFlag' && eff.flag) providedFlags.add(eff.flag);
            if (eff.type === 'unlockItem' && eff.id) {
                providedFlags.add(eff.id);
                providedFlags.add('item-' + eff.id.replace('item-', ''));
            }
            if (eff.type === 'unlockRecipe' && eff.id) providedFlags.add(eff.id);
            if (eff.type === 'unlockNPC' && eff.id) providedFlags.add(eff.id);
        });
    };

    // 1. Collect all providers
    Object.values(registries.actions).forEach((act: any) => {
        collectEffects(act.onSuccess);
        if (act.steps) {
            act.steps.forEach((step: any) => {
                collectEffects(step.onSuccess);
                if (step.reward) providedFlags.add(step.reward);
            });
        }
    });

    // 2. Initial Unlocks
    providedFlags.add('build-campfire'); 

    // 3. Collect all requirements
    Object.values(registries.actions).forEach((act: any) => {
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
    Object.values(registries.milestones).forEach((stone: any) => {
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
