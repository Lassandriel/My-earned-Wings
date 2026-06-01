/**
 * IPC: runtime addon discovery (Phase 16).
 *
 * End users of the packaged .exe can drop YAML-only addons into folders
 * the loader picks up at boot. We scan, in order:
 *   1. <exe-dir>/addons/          — primary, what the README points to
 *   2. <resourcesPath>/addons/    — fallback bundled in the build for examples
 * In dev mode neither is scanned (build-time addons under
 * content/addons/<name>/ already handle the dev workflow).
 *
 * Each <addon>/ folder must contain manifest.yaml. We parse the same
 * 10 content categories the build script understands, plus i18n/ and
 * views/. handlers.ts is intentionally NOT loaded — TS handlers require
 * a build step. Runtime addons are pure data.
 */

import { app, ipcMain, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { IpcChannel, RuntimeAddonDiscoveryResult, RuntimeAddonPayload } from '../ipc.js';

const RUNTIME_ADDON_CATEGORIES = [
  'resources', 'modifiers', 'actions', 'items', 'npcs',
  'buffs', 'homes', 'milestones', 'navigation', 'titles',
  'sections', 'subTabs',
] as const;

const ADDON_NAME_PATTERN = /^[a-z][a-z0-9_-]*$/;
const ADDON_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

const runtimeAddonScanDirs = (): string[] => {
  const dirs: string[] = [];
  try {
    // Path next to the .exe — the user-facing drop location. Works for
    // both portable and dir-target builds.
    const exeDir = path.dirname(app.getPath('exe'));
    dirs.push(path.join(exeDir, 'addons'));
  } catch {
    // app.getPath may throw in odd contexts; ignore.
  }
  try {
    // resourcesPath is undefined in dev (electron not packaged). Skip then.
    const rp = (process as any).resourcesPath as string | undefined;
    if (rp && typeof rp === 'string') {
      const candidate = path.join(rp, 'addons');
      if (!dirs.includes(candidate)) dirs.push(candidate);
    }
  } catch {
    // ignore
  }
  return dirs;
};

const loadAddonYamlDir = (
  dir: string,
  warnings: string[],
  addonName: string,
  category: string,
): any[] => {
  if (!fs.existsSync(dir)) return [];
  const out: any[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(dir, file);
    try {
      const parsed = yaml.load(fs.readFileSync(full, 'utf8'));
      if (!Array.isArray(parsed)) {
        warnings.push(`[${addonName}/${category}/${file}] expected an array, skipped`);
        continue;
      }
      for (const entry of parsed) {
        if (!entry || typeof entry !== 'object' || typeof (entry as any).id !== 'string') {
          warnings.push(`[${addonName}/${category}/${file}] entry missing string "id", skipped`);
          continue;
        }
        out.push(entry);
      }
    } catch (err) {
      warnings.push(`[${addonName}/${category}/${file}] parse error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonTranslations = (
  i18nDir: string,
  warnings: string[],
  addonName: string,
): Record<string, Record<string, Record<string, string>>> => {
  const out: Record<string, Record<string, Record<string, string>>> = {};
  if (!fs.existsSync(i18nDir)) return out;
  for (const lang of fs.readdirSync(i18nDir)) {
    const langDir = path.join(i18nDir, lang);
    let st: fs.Stats;
    try { st = fs.statSync(langDir); } catch { continue; }
    if (!st.isDirectory()) continue;
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) {
      warnings.push(`[${addonName}/i18n] invalid lang folder "${lang}", skipped`);
      continue;
    }
    out[lang] = {};
    for (const file of fs.readdirSync(langDir).filter((f) => /\.ya?ml$/.test(f))) {
      const ctx = file.replace(/\.ya?ml$/, '');
      try {
        const parsed = yaml.load(fs.readFileSync(path.join(langDir, file), 'utf8'));
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          out[lang]![ctx] = parsed as Record<string, string>;
        } else {
          warnings.push(`[${addonName}/i18n/${lang}/${file}] expected an object, skipped`);
        }
      } catch (err) {
        warnings.push(`[${addonName}/i18n/${lang}/${file}] parse error: ${(err as Error).message}`);
      }
    }
  }
  return out;
};

const loadAddonStyles = (
  stylesDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(stylesDir)) return out;
  for (const file of fs.readdirSync(stylesDir)) {
    if (!file.endsWith('.css')) continue;
    try {
      out[file] = fs.readFileSync(path.join(stylesDir, file), 'utf8');
    } catch (err) {
      warnings.push(`[${addonName}/styles/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonSlots = (
  slotsDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(slotsDir)) return out;
  for (const file of fs.readdirSync(slotsDir)) {
    if (!file.endsWith('.html')) continue;
    const slotId = file.replace(/\.html$/, '');
    try {
      out[slotId] = fs.readFileSync(path.join(slotsDir, file), 'utf8').trim();
    } catch (err) {
      warnings.push(`[${addonName}/slots/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const SFX_EXT_RE = /\.(mp3|ogg|wav|m4a)$/i;
const SFX_MIME: Record<string, string> = {
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  m4a: 'audio/mp4',
};

const loadAddonSfx = (
  sfxDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(sfxDir)) return out;
  for (const file of fs.readdirSync(sfxDir)) {
    const m = file.match(SFX_EXT_RE);
    if (!m) continue;
    const ext = m[1]!.toLowerCase();
    const mime = SFX_MIME[ext] ?? 'application/octet-stream';
    try {
      // Encode the audio bytes as a data: URL so the renderer can play
      // them with a plain `new Audio(src)` — no extra file-protocol or
      // session-handler glue needed. Cost: ~1.33x size vs raw file in
      // memory while the addon is loaded. Acceptable for short SFX
      // (a few hundred KB tops). If users start shipping music here,
      // we'll switch to a session.protocol.handle() for streaming.
      const bytes = fs.readFileSync(path.join(sfxDir, file));
      out[file] = `data:${mime};base64,${bytes.toString('base64')}`;
    } catch (err) {
      warnings.push(`[${addonName}/sfx/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonViews = (
  viewsDir: string,
  warnings: string[],
  addonName: string,
): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!fs.existsSync(viewsDir)) return out;
  for (const file of fs.readdirSync(viewsDir)) {
    if (!file.endsWith('.html')) continue;
    const viewName = file.replace(/\.html$/, '');
    if (!/^[a-z0-9_-]+$/.test(viewName)) {
      warnings.push(`[${addonName}/views/${file}] view name must match [a-z0-9_-]+, skipped`);
      continue;
    }
    try {
      const body = fs.readFileSync(path.join(viewsDir, file), 'utf8');
      const viewId = `${addonName}/${viewName}`;
      // Same wrapper the build script writes for build-time view fragments.
      out[viewName] =
        `<!-- ${viewId} (runtime addon) -->\n` +
        `<section class="view-section" x-show="$store.game.view === '${viewId}'" x-transition:enter="view-enter">\n` +
        body.trim() + `\n</section>`;
    } catch (err) {
      warnings.push(`[${addonName}/views/${file}] read error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadAddonPatchesDir = (
  dir: string,
  warnings: string[],
  addonName: string,
): any[] => {
  if (!fs.existsSync(dir)) return [];
  const out: any[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(dir, file);
    try {
      const parsed = yaml.load(fs.readFileSync(full, 'utf8'));
      if (!Array.isArray(parsed)) {
        warnings.push(`[${addonName}/patches/${file}] expected an array, skipped`);
        continue;
      }
      // Don't validate patch shape here — the renderer's patch engine
      // owns the schema. Main process just hands raw objects through.
      for (const entry of parsed) {
        if (entry && typeof entry === 'object') out.push(entry);
      }
    } catch (err) {
      warnings.push(`[${addonName}/patches/${file}] parse error: ${(err as Error).message}`);
    }
  }
  return out;
};

const loadOneRuntimeAddon = (
  dir: string,
  folderName: string,
  warnings: string[],
): RuntimeAddonPayload | null => {
  const manifestPath = path.join(dir, 'manifest.yaml');
  if (!fs.existsSync(manifestPath)) {
    warnings.push(`[${folderName}] missing manifest.yaml — skipped`);
    return null;
  }
  let manifest: any;
  try {
    manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    warnings.push(`[${folderName}] manifest.yaml parse error: ${(err as Error).message}`);
    return null;
  }
  if (!manifest || typeof manifest !== 'object') {
    warnings.push(`[${folderName}] manifest.yaml is not an object — skipped`);
    return null;
  }
  const name = manifest.name;
  const version = manifest.version;
  if (typeof name !== 'string' || !ADDON_NAME_PATTERN.test(name)) {
    warnings.push(`[${folderName}] manifest.name "${name}" invalid (must match ${ADDON_NAME_PATTERN}) — skipped`);
    return null;
  }
  if (typeof version !== 'string' || !ADDON_VERSION_PATTERN.test(version)) {
    warnings.push(`[${folderName}] manifest.version "${version}" invalid (must be MAJOR.MINOR.PATCH) — skipped`);
    return null;
  }
  if (name !== folderName) {
    warnings.push(`[${folderName}] folder name does not match manifest.name "${name}" — skipped`);
    return null;
  }

  const data: Record<string, any[]> = {};
  for (const category of RUNTIME_ADDON_CATEGORIES) {
    const items = loadAddonYamlDir(path.join(dir, category), warnings, name, category);
    if (items.length > 0) data[category] = items;
  }
  const translations = loadAddonTranslations(path.join(dir, 'i18n'), warnings, name);
  const views = loadAddonViews(path.join(dir, 'views'), warnings, name);
  const styles = loadAddonStyles(path.join(dir, 'styles'), warnings, name);
  const slots = loadAddonSlots(path.join(dir, 'slots'), warnings, name);
  const sfx = loadAddonSfx(path.join(dir, 'sfx'), warnings, name);
  const patches = loadAddonPatchesDir(path.join(dir, 'patches'), warnings, name);

  return {
    name,
    version,
    description: typeof manifest.description === 'string' ? manifest.description : undefined,
    author: typeof manifest.author === 'string' ? manifest.author : undefined,
    requires: Array.isArray(manifest.requires)
      ? (manifest.requires as unknown[]).filter((r): r is string => typeof r === 'string')
      : undefined,
    sourceDir: dir,
    data,
    translations,
    views,
    styles,
    slots,
    sfx,
    patches,
  };
};

const discoverRuntimeAddons = (): RuntimeAddonDiscoveryResult => {
  const result: RuntimeAddonDiscoveryResult = {
    scannedDirs: [],
    addons: [],
    warnings: [],
  };
  // Dev mode: don't scan anything. Build-time addons under
  // content/addons/<name>/ already cover the developer workflow.
  if (process.env.NODE_ENV === 'development') return result;

  const seenNames = new Set<string>();
  for (const scanDir of runtimeAddonScanDirs()) {
    result.scannedDirs.push(scanDir);
    if (!fs.existsSync(scanDir)) continue;
    let entries: string[];
    try { entries = fs.readdirSync(scanDir); } catch (err) {
      result.warnings.push(`could not read ${scanDir}: ${(err as Error).message}`);
      continue;
    }
    for (const folderName of entries.sort()) {
      if (folderName.startsWith('_') || folderName.startsWith('.')) continue;
      const full = path.join(scanDir, folderName);
      let st: fs.Stats;
      try { st = fs.statSync(full); } catch { continue; }
      if (!st.isDirectory()) continue;

      if (seenNames.has(folderName)) {
        result.warnings.push(`[${folderName}] already loaded from an earlier scan path — duplicate at ${full} ignored`);
        continue;
      }
      const addon = loadOneRuntimeAddon(full, folderName, result.warnings);
      if (addon) {
        result.addons.push(addon);
        seenNames.add(folderName);
      }
    }
  }
  result.addons.sort((a, b) => a.name.localeCompare(b.name));
  return result;
};

export function registerRuntimeAddonsIpc() {
  /**
   * Open the user-facing runtime-addons folder in the OS file manager.
   * If it doesn't exist yet, create the primary one (next-to-exe path)
   * before opening — saves the player a "folder doesn't exist" error
   * the first time they install an addon.
   *
   * Returns the path that was opened so the renderer can show it in
   * a toast / log line.
   */
  ipcMain.handle(IpcChannel.ADDONS_OPEN_FOLDER, async (): Promise<{ ok: boolean; path?: string; error?: string }> => {
    const dirs = runtimeAddonScanDirs();
    if (dirs.length === 0) {
      return { ok: false, error: 'No runtime addons path available (dev mode?)' };
    }
    // Prefer an existing dir; if none exist, create the first candidate.
    let target = dirs.find((d) => fs.existsSync(d));
    if (!target) {
      target = dirs[0]!;
      try {
        fs.mkdirSync(target, { recursive: true });
      } catch (err) {
        return { ok: false, error: `mkdir failed: ${(err as Error).message}` };
      }
    }
    try {
      await shell.openPath(target);
      return { ok: true, path: target };
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  });

  ipcMain.handle(IpcChannel.ADDONS_DISCOVER_RUNTIME, async (): Promise<RuntimeAddonDiscoveryResult> => {
    const result = discoverRuntimeAddons();
    console.log(
      `[runtime-addons] scanned ${result.scannedDirs.length} dir(s), found ${result.addons.length} addon(s): ` +
        (result.addons.map((a) => `${a.name}@${a.version}`).join(', ') || '(none)') +
        (result.warnings.length ? ` — ${result.warnings.length} warning(s)` : ''),
    );
    for (const dir of result.scannedDirs) console.log(`  scan: ${dir}`);
    for (const w of result.warnings.slice(0, 10)) console.log(`  warn: ${w}`);
    return result;
  });
}
