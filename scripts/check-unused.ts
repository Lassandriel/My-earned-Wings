import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import de from '../src/lang/de';
import { registries } from '../src/data/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const getAllFiles = (dir: string, exts?: string[]): string[] => {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllFiles(full, exts));
    } else if (!exts || exts.some((e) => file.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
};

const runUnusedCheck = () => {
  console.log('\n🔍 ORPHAN FINDER v4 (Source-Scan Edition)\n');

  // -------------------------------------------------------------------------
  // 1. Collect assets referenced in registries
  // -------------------------------------------------------------------------
  const usedAssets = new Set<string>();

  Object.values(registries.actions).forEach((act: any) => {
    if (act.image) usedAssets.add(act.image);
  });
  Object.values(registries.items).forEach((item: any) => {
    if (item.image) usedAssets.add(item.image);
  });
  Object.values(registries.npcs).forEach((npc: any) => {
    if (npc.image) usedAssets.add(npc.image);
    if (npc.images) Object.values(npc.images).forEach((p: any) => usedAssets.add(p));
  });
  Object.values(registries.navigation).forEach((nav: any) => {
    if (nav.icon) usedAssets.add(`img/menu_${nav.icon}.webp`);
  });
  Object.values((registries as any).milestones || {}).forEach((m: any) => {
    if (m.icon) usedAssets.add(m.icon);
  });

  // -------------------------------------------------------------------------
  // 2. Source-file scan: extract all t('key') calls  AND  asset paths
  // -------------------------------------------------------------------------
  const codeFiles = [
    ...getAllFiles(path.join(rootDir, 'src'), ['.html', '.ts']),
    path.join(rootDir, 'index.html'),
  ];

  const imgDir      = path.join(rootDir, 'public', 'img');
  const allKnownImgs = getAllFiles(imgDir).map((p) =>
    path.relative(path.join(rootDir, 'public'), p).replace(/\\/g, '/')
  );

  // Regex: statically extractable t('key') / t('key', 'ctx')
  // Excludes keys with template-literal / variable characters
  const T_REGEX = /\bt\(\s*['"]([^'"$`{}()[\]]+)['"]\s*(?:,\s*['"]([^'"]+)['"])?\s*\)/g;

  // Keys found via t() scan
  const sourceKeys = new Set<string>();

  // Dynamic prefixes: keys generated at runtime (e.g. 'ui_' + resource.id)
  // We derive them from registries so the list stays automatic.
  const dynamicPrefixes: string[] = [
    ...Object.values(registries.resources).map((r: any) => 'ui_' + r.id),
    ...Object.values(registries.actions).filter((a: any) => a.logKey).map((a: any) => a.logKey),
  ];

  for (const file of codeFiles) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');

    // t() call scan
    T_REGEX.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = T_REGEX.exec(content)) !== null) {
      sourceKeys.add(match[1]);
    }

    // Asset scan
    allKnownImgs.forEach((img) => {
      if (content.includes(img) || content.includes(path.basename(img))) {
        usedAssets.add(img);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Check assets  (the reliable part for this project)
  // -------------------------------------------------------------------------
  // NOTE: Translation key checking is handled by check-i18n.ts which uses
  // proper static analysis. Keys in this project are often called dynamically
  // (e.g. t(actionId, 'actions')), making a "unused keys" check unreliable here.
  const ASSET_IGNORE = [
    'background/',
    'Game_icon',
    'Stat_head',
    'img/menu_housing.webp',
    'img/menu_traits.webp',
    'img/prologue/Gemini_Lunara_Dragon.webp',
  ];
  const unusedAssets = allKnownImgs.filter(
    (img) => !usedAssets.has(img) && !ASSET_IGNORE.some((i) => img.includes(i))
  );

  // -------------------------------------------------------------------------
  // 4. Report
  // -------------------------------------------------------------------------
  if (unusedAssets.length > 0) {
    console.log('--- UNUSED ASSETS ---');
    unusedAssets.forEach((a) => console.log(`[UNUSED ASSET] ${a}`));
  } else {
    console.log('✅  No unused assets found.');
  }

  console.log('\n-----------------------------------------');
  console.log('Summary:');
  console.log(`   - Unused Assets : ${unusedAssets.length}`);
  console.log(`   (Translation key check → run: npm run check-i18n)`);
  console.log('-----------------------------------------\n');
};

runUnusedCheck();
