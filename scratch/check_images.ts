import fs from 'fs';
import path from 'path';

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

const imgDir = path.join(process.cwd(), 'public', 'img');
const files = getFiles(imgDir).filter(f => f.endsWith('.webp'));

console.log('--- FAKE WEBP SCAN RESULTS ---');
files.forEach(file => {
  const buffer = Buffer.alloc(12);
  const fd = fs.openSync(file, 'r');
  fs.readSync(fd, buffer, 0, 12, 0);
  fs.closeSync(fd);

  const isWebP = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
                 buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

  if (!isWebP) {
    const relPath = path.relative(process.cwd(), file);
    let realType = 'Unknown';
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) realType = 'PNG';
    else if (buffer[0] === 0xFF && buffer[1] === 0xD8) realType = 'JPEG';
    
    console.log(`[FAKE] ${relPath} (Actually ${realType})`);
  }
});
console.log('--- SCAN COMPLETE ---');
