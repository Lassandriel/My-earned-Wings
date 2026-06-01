/**
 * IPC: content authoring (dev-mode only). Lets the renderer dev-tools
 * read/patch the YAML files under content/ and trigger
 * build:content / check-all via npm. Gated by NODE_ENV so packaged
 * builds can't be tricked into writing arbitrary paths.
 *
 * Owns its own activeContentScript handle for the spawned npm child
 * — main.ts calls killActiveContentScript() during before-quit so a
 * dangling build doesn't survive the window closing.
 */

import { app, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import yaml from 'js-yaml';
import { IpcChannel } from '../ipc.js';

let activeContentScript: ReturnType<typeof spawn> | null = null;

/**
 * Project root resolves differently in dev (running from src) vs packaged.
 * In dev, app.getAppPath() returns the project root. In packaged, it
 * points inside app.asar — content/ files would not be writable. We
 * limit content authoring to dev mode.
 */
const projectRoot = (): string => app.getAppPath();
const isContentAuthoringAllowed = () => process.env.NODE_ENV === 'development';

// Map dev-tools tab name → content/<dir>. Translations excluded — special format.
const ENTITY_DIR_MAP: Record<string, string> = {
  actions: 'actions',
  items: 'items',
  npcs: 'npcs',
  modifiers: 'modifiers',
  buffs: 'buffs',
  homes: 'homes',
  milestones: 'milestones',
  navigation: 'navigation',
  titles: 'titles',
  resources: 'resources',
};

/** Find which YAML file in content/<dir>/ contains the given id. Supports array and record formats. */
const findEntityFile = (entityType: string, id: string): string | null => {
  const dir = ENTITY_DIR_MAP[entityType.toLowerCase()];
  if (!dir) return null;
  const contentDir = path.join(projectRoot(), 'content', dir);
  if (!fs.existsSync(contentDir)) return null;
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const full = path.join(contentDir, file);
    try {
      const text = fs.readFileSync(full, 'utf8');
      const parsed = yaml.load(text);
      if (Array.isArray(parsed)) {
        if (parsed.some((e: any) => e && e.id === id)) {
          return path.join('content', dir, file);
        }
      } else if (parsed && typeof parsed === 'object' && id in (parsed as object)) {
        return path.join('content', dir, file);
      }
    } catch {
      // ignore unreadable file
    }
  }
  return null;
};

/**
 * Patch a single entity in any YAML file under content/<dir>/.
 * Handles both array form (`- id: foo\n  ...`) and record form (`foo: { ... }`).
 * `patch` keys with value === null|undefined are deleted from the entity.
 */
const writeEntityPatch = (
  entityType: string,
  id: string,
  patch: Record<string, unknown>,
): { ok: boolean; error?: string } => {
  if (!isContentAuthoringAllowed()) return { ok: false, error: 'Content authoring is dev-mode only.' };
  const rel = findEntityFile(entityType, id);
  if (!rel) return { ok: false, error: `'${id}' not found in content/${ENTITY_DIR_MAP[entityType.toLowerCase()] ?? entityType}/*.yaml` };
  const full = path.join(projectRoot(), rel);
  try {
    const text = fs.readFileSync(full, 'utf8');
    const parsed = yaml.load(text);
    const applyPatch = (target: Record<string, any>) => {
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === undefined) delete target[k];
        else target[k] = v;
      }
    };
    if (Array.isArray(parsed)) {
      const idx = parsed.findIndex((e: any) => e && e.id === id);
      if (idx < 0) return { ok: false, error: `'${id}' missing from ${rel} (file changed?)` };
      applyPatch(parsed[idx]);
    } else if (parsed && typeof parsed === 'object' && id in (parsed as object)) {
      applyPatch((parsed as any)[id]);
    } else {
      return { ok: false, error: `'${id}' missing from ${rel} (file changed?)` };
    }
    const newText = yaml.dump(parsed, { lineWidth: 100, sortKeys: false, noRefs: true });
    yaml.load(newText); // sanity-check round-trip
    fs.writeFileSync(full, newText, 'utf8');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
};

const runNpmScript = (script: string): Promise<{ ok: boolean; output: string }> =>
  new Promise((resolve) => {
    const child = spawn('npm.cmd', ['run', script], { cwd: projectRoot(), shell: false });
    activeContentScript = child;
    let out = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (out += d.toString()));
    child.on('close', (code) => {
      activeContentScript = null;
      resolve({ ok: code === 0, output: out });
    });
    child.on('error', (err) => {
      activeContentScript = null;
      resolve({ ok: false, output: err.message });
    });
  });

/** Kill any in-flight npm child. Called from main.ts during before-quit. */
export function killActiveContentScript() {
  if (activeContentScript && !activeContentScript.killed) {
    activeContentScript.kill();
    activeContentScript = null;
  }
}

export function registerContentIpc() {
  ipcMain.handle(IpcChannel.CONTENT_FIND, async (_event, entityType: string, id: string): Promise<string | null> => {
    return findEntityFile(entityType, id);
  });

  ipcMain.handle(IpcChannel.CONTENT_READ, async (_event, relativePath: string): Promise<string | null> => {
    if (!isContentAuthoringAllowed()) return null;
    const safe = path.normalize(relativePath).replace(/^([./\\]+)/, '');
    if (!safe.startsWith('content' + path.sep) && !safe.startsWith('content/')) return null;
    const full = path.join(projectRoot(), safe);
    try {
      return fs.readFileSync(full, 'utf8');
    } catch (err) {
      console.error('[CONTENT_READ] failed:', err);
      return null;
    }
  });

  ipcMain.handle(IpcChannel.CONTENT_WRITE, async (
    _event,
    entityType: string,
    id: string,
    patch: Record<string, unknown>,
  ): Promise<{ ok: boolean; error?: string }> => {
    return writeEntityPatch(entityType, id, patch);
  });

  /**
   * Write a single translation key into content/i18n/<lang>/<context>.yaml.
   * value === null deletes the key. Lang/context/key are validated to keep paths sandboxed.
   */
  ipcMain.handle(IpcChannel.CONTENT_WRITE_TRANSLATION, async (
    _event,
    lang: string,
    context: string,
    key: string,
    value: string | null,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!isContentAuthoringAllowed()) return { ok: false, error: 'Content authoring is dev-mode only.' };
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(lang)) return { ok: false, error: `Invalid lang: ${lang}` };
    if (!/^[a-z][a-z0-9_-]*$/i.test(context)) return { ok: false, error: `Invalid context: ${context}` };
    if (typeof key !== 'string' || !key.trim()) return { ok: false, error: 'Empty key' };

    const rel = path.join('content', 'i18n', lang, `${context}.yaml`);
    const full = path.join(projectRoot(), rel);
    try {
      let parsed: Record<string, string> = {};
      if (fs.existsSync(full)) {
        const text = fs.readFileSync(full, 'utf8');
        const loaded = yaml.load(text);
        if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
          parsed = loaded as Record<string, string>;
        }
      }
      if (value === null || value === undefined) delete parsed[key];
      else parsed[key] = String(value);

      const header = `# Translations — ${lang}/${context}. Edited via dev-tools.\n`;
      const newText = header + yaml.dump(parsed, { lineWidth: 0, quotingType: '"', forceQuotes: false });
      yaml.load(newText); // round-trip sanity
      if (!fs.existsSync(path.dirname(full))) fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, newText, 'utf8');
      return { ok: true };
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  });

  // Legacy channel — kept until renderer fully switches to CONTENT_WRITE.
  ipcMain.handle(IpcChannel.CONTENT_WRITE_ACTION, async (
    _event,
    id: string,
    patch: Record<string, unknown>,
  ): Promise<{ ok: boolean; error?: string }> => {
    return writeEntityPatch('actions', id, patch);
  });

  ipcMain.handle(IpcChannel.CONTENT_BUILD, async (): Promise<{ ok: boolean; output: string }> => {
    if (!isContentAuthoringAllowed()) return { ok: false, output: 'dev-only' };
    return runNpmScript('build:content');
  });

  ipcMain.handle(IpcChannel.CONTENT_VALIDATE, async (): Promise<{ ok: boolean; output: string }> => {
    if (!isContentAuthoringAllowed()) return { ok: false, output: 'dev-only' };
    return runNpmScript('check-all');
  });
}
