import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import registries (pointing to src/data/index.ts)
import { registries } from '../src/data/index';

let errors = 0;

const checkImage = (context: string, imgPath: string) => {
    if (!imgPath) return;
    
    // Project root is one level up from scripts
    const rootDir = path.resolve(__dirname, '..');
    const fullPath = path.join(rootDir, 'public', imgPath);
    
    if (!fs.existsSync(fullPath)) {
        console.error(`[ERROR] ${context}\n   -> Image '${imgPath}' missing in 'public/'!`);
        errors++;
    }
};

const checkAll = () => {
    console.log("=== ASSET VALIDATION STARTED (TypeScript) ===\n");

    Object.values(registries.items).forEach((item: any) => {
        if (item.image) checkImage(`Item '${item.id}'`, item.image);
    });

    Object.values(registries.actions).forEach((act: any) => {
        if (act.image) checkImage(`Action '${act.id}'`, act.image);
    });

    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.image) checkImage(`NPC '${npc.id}'`, npc.image);
        if (npc.images) {
            Object.entries(npc.images).forEach(([key, ipath]: [string, any]) => {
                checkImage(`NPC '${npc.id}' (Layer: ${key})`, ipath);
            });
        }
    });
    
    Object.values(registries.milestones).forEach((stone: any) => {
        if (stone.icon) checkImage(`Milestone '${stone.id}'`, stone.icon);
    });

    console.log("\n=============================");
    if (errors === 0) {
        console.log("Perfect! All linked assets found on disk.");
    } else {
        console.log(`Asset check failed: ${errors} images not found.`);
        process.exit(1); 
    }
};

checkAll();
