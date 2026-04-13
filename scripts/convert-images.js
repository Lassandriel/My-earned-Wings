/**
 * convert-images.js
 * Converts all PNG images in public/img to WebP format using sharp.
 * Originals are kept in public/img/backup.
 * Run with: node scripts/convert-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(__dirname, '../public/img');
const BACKUP_DIR = path.join(IMG_DIR, 'backup');

// Ensure backup dir exists
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

const files = fs.readdirSync(IMG_DIR).filter(f => f.toLowerCase().endsWith('.png'));

if (files.length === 0) {
  console.log('No PNG files found in public/img — nothing to convert.');
  process.exit(0);
}

console.log(`Found ${files.length} PNG file(s). Converting to WebP...\n`);

let totalOriginal = 0;
let totalConverted = 0;

for (const file of files) {
  const srcPath = path.join(IMG_DIR, file);
  const webpName = file.replace(/\.png$/i, '.webp');
  const destPath = path.join(IMG_DIR, webpName);
  const backupPath = path.join(BACKUP_DIR, file);

  const originalSize = fs.statSync(srcPath).size;
  totalOriginal += originalSize;

  try {
    await sharp(srcPath)
      .webp({ quality: 85 })
      .toFile(destPath);

    const convertedSize = fs.statSync(destPath).size;
    totalConverted += convertedSize;

    const saving = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);

    // Move original to backup
    fs.copyFileSync(srcPath, backupPath);
    fs.unlinkSync(srcPath);

    console.log(`  ✓ ${file.padEnd(35)} ${(originalSize / 1024).toFixed(0).padStart(6)} KB  →  ${(convertedSize / 1024).toFixed(0).padStart(6)} KB  (${saving}% smaller)`);
  } catch (err) {
    console.error(`  ✗ Failed: ${file} — ${err.message}`);
  }
}

const totalSaving = (((totalOriginal - totalConverted) / totalOriginal) * 100).toFixed(1);
console.log(`\n  Total: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB  →  ${(totalConverted / 1024 / 1024).toFixed(1)} MB  (${totalSaving}% saved)`);
console.log(`  Originals backed up to: public/img/backup/`);
console.log('\nDone! Remember to update any hardcoded .png references to .webp in your code.');
