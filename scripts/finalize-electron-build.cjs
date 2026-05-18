// After `tsc -p tsconfig.electron.json` emits CommonJS .js files into
// dist_electron/, Node's loader walks up to the project root and finds
// "type": "module" — which Vite needs but Electron's main process does
// not. Drop a tiny package.json next to the compiled output that flips
// the type back to commonjs for just this folder.
//
// Why .cjs for this script: same reason. Run as `node scripts/finalize-electron-build.cjs`.
const fs = require('node:fs');
const path = require('node:path');

const target = path.join(__dirname, '..', 'dist_electron', 'package.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(
  target,
  JSON.stringify({ type: 'commonjs' }, null, 2) + '\n',
);
console.log('✅ Wrote', path.relative(path.join(__dirname, '..'), target));
