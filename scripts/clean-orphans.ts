import fs from 'fs';

const paths = [
  'src/lang/en/ui.ts',
  'src/lang/de/ui.ts',
  'src/lang/en/items.ts',
  'src/lang/de/items.ts'
];

const keysToRemove = [
  'item_clay_desc',
  'item_fibers_desc',
  'item_fibers_title',
  'item_ghostwood_desc',
  'item_glowpollen_desc',
  'item_iron_parts_desc',
  'item_iron_parts_title',
  'item_resin_desc',
  'item_resin_title',
  'loc_forest',
  'loc_meadow',
  'loc_mine',
  'loc_whisper_grove'
];

paths.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  let lines = content.split('\n');
  lines = lines.filter(line => {
    return !keysToRemove.some(key => line.trim().startsWith(key + ':') || line.trim().startsWith('\'' + key + '\':'));
  });
  fs.writeFileSync(p, lines.join('\n'));
});
console.log('Orphans removed!');
