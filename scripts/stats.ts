import { registries } from '../src/data/index';
import de from '../src/lang/de';

const runStats = () => {
    console.log("\n📊 DRACONIA CONTENT RADAR\n");

    const npcs = Object.values(registries.npcs);
    const items = Object.values(registries.items);
    const actions = Object.values(registries.actions);
    const milestones = Object.values(registries.milestones);
    const buffs = Object.values(registries.buffs);

    // Categories
    const itemCats: Record<string, number> = {};
    items.forEach((item: any) => {
        const cat = item.category || 'misc';
        itemCats[cat] = (itemCats[cat] || 0) + 1;
    });

    const actionTypes: Record<string, number> = {};
    actions.forEach((act: any) => {
        const type = act.id.split('-')[1] || 'other';
        actionTypes[type] = (actionTypes[type] || 0) + 1;
    });

    console.log(`🏠 WORLD STATE`);
    console.log(`   - NPCs       : ${npcs.length}`);
    console.log(`   - Milestones : ${milestones.length}`);
    console.log(`   - Buffs      : ${buffs.length}`);
    console.log("");

    console.log(`📦 ITEMS (${items.length} total)`);
    Object.entries(itemCats).forEach(([cat, count]) => {
        console.log(`   - ${cat.padEnd(10)} : ${count}`);
    });
    console.log("");

    console.log(`⚡ ACTIONS (${actions.length} total)`);
    Object.entries(actionTypes).forEach(([type, count]) => {
        console.log(`   - ${type.padEnd(10)} : ${count}`);
    });
    console.log("");

    const totalKeys = Object.keys(de.npcs).length + Object.keys(de.items).length + Object.keys(de.actions).length;
    console.log(`🌐 LOCALIZATION`);
    console.log(`   - Primary Keys : ~${totalKeys} strings in de.ts`);
    console.log("");

    console.log("-----------------------------------------");
    console.log("✨ Draconia is growing! Keep up the great work.");
};

runStats();
