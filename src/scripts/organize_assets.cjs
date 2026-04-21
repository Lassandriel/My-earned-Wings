const fs = require('fs');
const path = require('path');

const root = 'c:/Users/Tcul/Desktop/My-earned-Wings/public/img';
const itemsPath = path.join(root, 'items');
const housingPath = path.join(root, 'housing');
const craftingPath = path.join(root, 'crafting');

// Ensure dirs exist
if (!fs.existsSync(housingPath)) fs.mkdirSync(housingPath);
if (!fs.existsSync(craftingPath)) fs.mkdirSync(craftingPath);

const files = fs.readdirSync(itemsPath);

files.forEach(file => {
    const oldPath = path.join(itemsPath, file);
    let newDir = itemsPath;
    let newName = file.toLowerCase();

    if (file.startsWith('Housing_')) {
        newDir = housingPath;
        newName = file.replace('Housing_', '').toLowerCase();
    } else if (file.startsWith('Crafting_')) {
        newDir = craftingPath;
        newName = file.replace('Crafting_', '').toLowerCase();
    } else if (file.startsWith('Item_')) {
        newDir = itemsPath;
        newName = file.replace('Item_', '').toLowerCase();
    } else if (file === 'bed_2.webp' || file === 'stove_2.webp') {
        newDir = craftingPath;
    }

    const newPath = path.join(newDir, newName);
    console.log(`Moving/Renaming: ${file} -> ${path.relative(root, newPath)}`);
    fs.renameSync(oldPath, newPath);
});
