import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const outDir = path.join('BUILDS', `dist-${Date.now()}`);
fs.mkdirSync(outDir, { recursive: true });
console.log(`Using electron-builder output directory: ${outDir}`);

const run = (cmd: string) => {
  const result = spawnSync(cmd, { stdio: 'inherit', shell: true });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run(`${npmCmd} run clean`);
run(`${npmCmd} run build`);
run(`${npmCmd} run build-electron`);
run(`${npxCmd} electron-builder --config.directories.output=${outDir}`);
