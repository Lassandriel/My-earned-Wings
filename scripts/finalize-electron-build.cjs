// After `tsc -p tsconfig.electron.json` emits CommonJS .js files into
// dist_electron/, Node's loader walks up to the project root and finds
// "type": "module" — which Vite needs but Electron's main process does
// not. Drop a tiny package.json next to the compiled output that flips
// the type back to commonjs for just this folder.
//
// Why .cjs for this script: same reason. Run as `node scripts/finalize-electron-build.cjs`.
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.join(__dirname, '..');
const rootPkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

// Minimal package.json for electron-packager: this is what it reads to find
// the main entry point. `main` is relative to dist_electron/ (where this file
// lives), so just "main.js" — NOT "dist_electron/main.js" like the root has.
// type:commonjs because tsc emits CJS but the root pkg has type:module (for Vite).
const target = path.join(repoRoot, 'dist_electron', 'package.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(
  target,
  JSON.stringify(
    {
      name: rootPkg.name,
      productName: 'My-earned-Wings',
      version: rootPkg.version,
      description: rootPkg.description,
      author: rootPkg.author,
      main: 'main.js',
      type: 'commonjs',
      // electron-packager reads `dependencies` to decide what node_modules
      // to copy into the asar. Without these the packaged main process
      // crashes on first launch with "Cannot find module 'js-yaml'" /
      // 'sql.js'. Mirror the root package.json's runtime deps.
      dependencies: rootPkg.dependencies ?? {},
    },
    null,
    2,
  ) + '\n',
);
console.log('✅ Wrote', path.relative(repoRoot, target), '(main=main.js, version=' + rootPkg.version + ')');
