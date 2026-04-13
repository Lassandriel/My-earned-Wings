import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = 'public/img';

async function convert() {
    const files = fs.readdirSync(imgDir);
    
    for (const file of files) {
        if (file.toLowerCase().endsWith('.png')) {
            const inputPath = path.join(imgDir, file);
            const outputPath = path.join(imgDir, file.replace(/\.png$/i, '.webp'));
            
            console.log(`Konvertiere ${file} zu WebP...`);
            
            try {
                await sharp(inputPath)
                    .webp({ quality: 85 })
                    .toFile(outputPath);
                
                console.log(`Erfolgreich! Lösche Original: ${file}`);
                fs.unlinkSync(inputPath);
            } catch (err) {
                console.error(`Fehler bei ${file}:`, err);
            }
        }
    }
    console.log('Alle Bilder konvertiert.');
}

convert();
