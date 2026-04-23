import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Import registries (pointing to src/data/index.ts)
import { registries } from '../src/data/index';

let errors = 0;

const checkImage = (context: string, imgPath: string) => {
    if (!imgPath) return;
    
    // Check if it's an emoji or plain text (no file extension and no path slash)
    const isEmoji = /\p{Extended_Pictographic}/u.test(imgPath);
    const isPath = imgPath.includes('/') || imgPath.includes('.');
    
    if (isEmoji || !isPath) return;

    const fullPath = path.join(ROOT_DIR, 'public', imgPath);
    
    if (!fs.existsSync(fullPath)) {
        console.error(`[ERROR] ${context}\n   -> Image file MISSING: 'public/${imgPath}'`);
        errors++;
    }
};

const checkAll = () => {
    console.log("=== ULTRA ASSET VALIDATION (v2.0) ===\n");

    // 1. Items
    Object.values(registries.items).forEach((item: any) => {
        if (item.image) checkImage(`Item '${item.id}'`, item.image);
    });

    // 2. Actions (Some might have custom images override)
    Object.values(registries.actions).forEach((act: any) => {
        if (act.image) checkImage(`Action '${act.id}'`, act.image);
    });

    // 3. NPCs (Complex: image, icons, and layers)
    Object.values(registries.npcs).forEach((npc: any) => {
        if (npc.image) checkImage(`NPC '${npc.id}' (Main)`, npc.image);
        if (npc.icon)  checkImage(`NPC '${npc.id}' (Icon)`, npc.icon);
        
        // Some NPCs have layered images (images: { body: "...", ... })
        if ((npc as any).images) {
            Object.entries((npc as any).images).forEach(([key, ipath]: [string, any]) => {
                checkImage(`NPC '${npc.id}' (Layer: ${key})`, ipath);
            });
        }
    });
    
    // 4. Homes (New)
    Object.values(registries.homes).forEach((home: any) => {
        if (home.image) checkImage(`Home '${home.id}'`, home.image);
    });

    // 5. Milestones
    Object.values(registries.milestones).forEach((stone: any) => {
        if ((stone as any).icon) checkImage(`Milestone '${stone.id}'`, (stone as any).icon);
        if ((stone as any).image) checkImage(`Milestone '${stone.id}'`, (stone as any).image);
    });

    // 6. Navigation (New: prefix based)
    Object.values(registries.navigation).forEach((nav: any) => {
        if (nav.icon) {
            // Navigation icons are resolved as 'img/menu/menu_[icon].webp' in sidebar.html
            checkImage(`Nav-Tab '${nav.id}'`, `img/menu/menu_${nav.icon}.webp`);
        }
    });

    console.log("\n=============================");
    if (errors === 0) {
        console.log("✨  PERFECT. All registered assets exist physically.\n");
    } else {
        console.log(`❌  FAILURE: ${errors} missing asset files detected.`);
        process.exit(1); 
    }
};

checkAll();
