import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const clean = () => {
    console.log("\n🧹 CLEANING BUILD ARTIFACTS...\n");

    const foldersToClean = ['dist', 'dist_electron', 'BUILDS'];
    let count = 0;

    foldersToClean.forEach(folder => {
        const fullPath = path.join(rootDir, folder);
        if (fs.existsSync(fullPath)) {
            console.log(`   - Removing: ./${folder}`);
            fs.rmSync(fullPath, { recursive: true, force: true });
            count++;
        }
    });

    if (count === 0) {
        console.log("   - Nothing to clean. Project is already tidy!");
    } else {
        console.log(`\n✅ Cleaned ${count} directories.`);
    }
    console.log("-----------------------------------------");
};

clean();
