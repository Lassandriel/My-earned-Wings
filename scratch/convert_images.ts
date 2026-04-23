import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function getFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

async function convert() {
  const imgDir = path.join(process.cwd(), 'public', 'img');
  const files = getFiles(imgDir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

  console.log('🚀 Starting deep image conversion...');
  
  for (const file of files) {
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync(file, 'r');
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    const isWebP = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
                   buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

    const ext = path.extname(file).toLowerCase();
    
    // Convert if it's NOT a real webp OR if it's a PNG/JPG that should be webp
    if (!isWebP || ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const relPath = path.relative(process.cwd(), file);
      const targetPath = file.replace(path.extname(file), '.webp');
      
      console.log(`Converting: ${relPath} -> ${path.relative(process.cwd(), targetPath)}`);
      
      try {
        const tempPath = file + '.tmp';
        await sharp(file).webp({ quality: 85 }).toFile(tempPath);
        
        // If we were converting a fake webp, we just replace it
        // If we were converting a png/jpg, we keep the webp and might want to delete the original?
        // Let's replace the original if it's a fake webp, otherwise just create the webp.
        
        if (ext === '.webp') {
            fs.unlinkSync(file);
            fs.renameSync(tempPath, file);
        } else {
            // It's a real png/jpg, just save the webp and keep original for now (or delete if user wants)
            fs.renameSync(tempPath, targetPath);
            // Optional: fs.unlinkSync(file); // Let's keep originals for safety unless it's the "fake" case
        }
      } catch (err) {
        console.error(`Error converting ${relPath}:`, err);
      }
    }
  }
  console.log('✅ Conversion complete!');
}

convert();
