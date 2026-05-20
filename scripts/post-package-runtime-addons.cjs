/* eslint-disable no-console */
/**
 * post-package-runtime-addons.cjs
 *
 * Runs after electron-packager finishes. The packaged build sits at
 *   BUILDS/My-earned-Wings-win32-x64/
 * containing My-earned-Wings.exe and the resources/ folder (with the
 * app.asar inside). Runtime addons live alongside the .exe so end
 * users can discover the folder without spelunking:
 *
 *   BUILDS/My-earned-Wings-win32-x64/
 *     My-earned-Wings.exe
 *     addons/                      ← what we set up here
 *       README.txt                  (how to add an addon)
 *       _example/                   (skeleton — disabled by _ prefix)
 *         manifest.yaml
 *         items/example.yaml
 *         i18n/en/items.yaml
 *
 * The "_example" folder is intentionally underscore-prefixed: the
 * runtime loader skips _-prefixed folders, so it acts as a copy-me
 * template rather than a loaded addon.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const BUILD_OUTPUT = path.join(REPO_ROOT, 'BUILDS', 'My-earned-Wings-win32-x64');
const ADDONS_DIR = path.join(BUILD_OUTPUT, 'addons');

const README = `My-earned-Wings · Addons
=========================

Drop an addon folder here and start the game. The addon's items, NPCs,
actions, translations and UI tabs get merged into the base game.

  addons/
    your-addon/
      manifest.yaml            ← required: name + version
      items/*.yaml             ← optional
      npcs/*.yaml              ← optional
      actions/*.yaml           ← optional
      buffs/*.yaml             ← optional
      homes/*.yaml             ← optional
      milestones/*.yaml        ← optional
      navigation/*.yaml        ← optional (sidebar entries)
      titles/*.yaml            ← optional
      modifiers/*.yaml         ← optional
      resources/*.yaml         ← optional
      i18n/<lang>/<ctx>.yaml   ← optional translations
      views/<name>.html        ← optional own UI tab

Manifest example:

  name: my-addon
  version: 0.1.0
  description: My first addon!
  author: Your Name

Rules:
  * Folder name must match manifest.name (lowercase, digits, _ or -).
  * Every YAML entry must have a unique "id" — don't clash with base
    or other addons. Convention: prefix every id with your addon name.
  * Runtime addons can NOT ship handlers.ts (TS code). For custom
    logic use the build-time addon system (see docs/ADDON_AUTHORING.md
    in the project repository).
  * Folders starting with "_" are skipped, so "_example/" is the
    template — copy it to "myaddon/" to start.

If something goes wrong, launch with --debug to see the load log:

  My-earned-Wings.exe --debug
`;

const EXAMPLE_MANIFEST = `# Copy this folder, rename it (and update "name" below) to enable.
name: _example
version: 0.1.0
description: Runtime addon skeleton — copy me!
author: My-earned-Wings
`;

const EXAMPLE_ITEM = `# Items provided by this addon. Every entry needs a unique id.
# Prefix with your addon name to avoid collisions.
- id: item-example-stone
  name: item_example_stone_name
  desc: item_example_stone_desc
  type: misc
  stack: 99
`;

const EXAMPLE_TRANSLATION_EN = `item_example_stone_name: "Example Stone"
item_example_stone_desc: "Proof that the runtime addon system loaded this addon."
`;

const EXAMPLE_TRANSLATION_DE = `item_example_stone_name: "Beispielstein"
item_example_stone_desc: "Beweis, dass das Runtime-Addon-System dieses Addon geladen hat."
`;

const writeIfMissing = (file, content) => {
  if (fs.existsSync(file)) {
    console.log('  · keep   ' + path.relative(BUILD_OUTPUT, file));
    return;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  console.log('  + write  ' + path.relative(BUILD_OUTPUT, file));
};

if (!fs.existsSync(BUILD_OUTPUT)) {
  console.error('[post-package] expected packaged build at ' + BUILD_OUTPUT + ', not found — did electron-packager run?');
  process.exit(1);
}

console.log('[post-package] setting up runtime addons folder at ' + path.relative(REPO_ROOT, ADDONS_DIR));
fs.mkdirSync(ADDONS_DIR, { recursive: true });
writeIfMissing(path.join(ADDONS_DIR, 'README.txt'), README);
writeIfMissing(path.join(ADDONS_DIR, '_example', 'manifest.yaml'), EXAMPLE_MANIFEST);
writeIfMissing(path.join(ADDONS_DIR, '_example', 'items', 'example.yaml'), EXAMPLE_ITEM);
writeIfMissing(path.join(ADDONS_DIR, '_example', 'i18n', 'en', 'items.yaml'), EXAMPLE_TRANSLATION_EN);
writeIfMissing(path.join(ADDONS_DIR, '_example', 'i18n', 'de', 'items.yaml'), EXAMPLE_TRANSLATION_DE);

console.log('[post-package] runtime addons folder ready.');
