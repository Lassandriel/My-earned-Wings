const { nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

const convertDir = (dir) => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) return;
    
    const files = fs.readdirSync(fullPath);
    files.forEach(file => {
        if (file.endsWith('.png')) {
            const inputPath = path.join(fullPath, file);
            const outputPath = inputPath.replace('.png', '.webp');
            
            console.log(`Converting: ${file} -> .webp`);
            const img = nativeImage.createFromPath(inputPath);
            const buffer = img.toWebP();
            
            fs.writeFileSync(outputPath, buffer);
            // Optionally remove the PNG to clean up
            // fs.unlinkSync(inputPath);
        }
    });
};

convertDir('public/img/npcs');
convertDir('public/img/items');

console.log('Conversion complete! Quitting in 1s...');
setTimeout(() => process.exit(0), 1000);
