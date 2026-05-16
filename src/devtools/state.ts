/**
 * Shared state, DOM refs, registries, and helpers used by every devtools
 * panel module (cheats, validation, modifier-tree, translations, entity
 * editor). Centralised here so each panel module is a thin render+wire
 * pair instead of duplicating boilerplate.
 *
 * `render()` is initialised by devtools.ts via `setRenderer()` at boot so
 * panel modules can request a redraw after mutating state without a
 * circular import on the top-level entry point.
 */
import {
  ACTION_REGISTRY_GENERATED,
  MODIFIER_REGISTRY_GENERATED,
  RESOURCE_REGISTRY_GENERATED,
  ITEM_REGISTRY_GENERATED as itemDb,
  NPC_REGISTRY_GENERATED as NPC_REGISTRY,
  BUFF_REGISTRY_GENERATED as BUFF_REGISTRY,
  HOME_REGISTRY_GENERATED as HOME_REGISTRY,
  MILESTONE_REGISTRY_GENERATED,
  NAVIGATION_REGISTRY_GENERATED,
  TITLE_REGISTRY_GENERATED,
  TRANSLATIONS_GENERATED,
} from '../generated/content';
import { ANIM } from '../core/constants';

export {
  ACTION_REGISTRY_GENERATED,
  MODIFIER_REGISTRY_GENERATED,
  RESOURCE_REGISTRY_GENERATED,
  itemDb,
  NPC_REGISTRY,
  BUFF_REGISTRY,
  HOME_REGISTRY,
  MILESTONE_REGISTRY_GENERATED,
  NAVIGATION_REGISTRY_GENERATED,
  TITLE_REGISTRY_GENERATED,
  TRANSLATIONS_GENERATED,
};

export type Entity = Record<string, unknown> & { id: string; category?: string };

// --- Registries (label → loader) ---
// Each label MUST lower-case to a key the main process recognises in
// ENTITY_DIR_MAP (src/electron/main.ts) so write-back can find the YAML file.
export const REGISTRIES: Record<string, () => Record<string, Entity>> = {
  Actions: () => ACTION_REGISTRY_GENERATED as Record<string, Entity>,
  Items: () => itemDb as unknown as Record<string, Entity>,
  NPCs: () => NPC_REGISTRY as unknown as Record<string, Entity>,
  Modifiers: () => MODIFIER_REGISTRY_GENERATED as Record<string, Entity>,
  Buffs: () => BUFF_REGISTRY as unknown as Record<string, Entity>,
  Homes: () => HOME_REGISTRY as unknown as Record<string, Entity>,
  Milestones: () => MILESTONE_REGISTRY_GENERATED as Record<string, Entity>,
  Navigation: () => NAVIGATION_REGISTRY_GENERATED as Record<string, Entity>,
  Titles: () => TITLE_REGISTRY_GENERATED as Record<string, Entity>,
  Resources: () => RESOURCE_REGISTRY_GENERATED as Record<string, Entity>,
};

// --- BroadcastChannel for live cheats → main game ---
export const channel: BroadcastChannel | null =
  typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mw-devtools') : null;
export const sendCheat = (cmd: Record<string, unknown>): void => {
  if (channel) channel.postMessage(cmd);
};

// --- DOM refs (resolved at module load — devtools.html must define them) ---
export const list = document.getElementById('list')!;
export const main = document.getElementById('main')!;
export const meta = document.getElementById('meta')!;
export const search = document.getElementById('search') as HTMLInputElement;
export const tabsBar = document.getElementById('tabs')!;

// --- Modifier sources index (used by the modifier-tree panel) ---
export interface ModifierSource {
  type: 'buff' | 'item' | 'home';
  id: string;
  category?: string;
  add?: number;
  mult?: number;
}
export const MODIFIER_INDEX: Record<string, ModifierSource[]> = (() => {
  const idx: Record<string, ModifierSource[]> = {};
  const push = (key: string, src: ModifierSource) => {
    (idx[key] ??= []).push(src);
  };
  for (const buff of Object.values(BUFF_REGISTRY) as any[]) {
    for (const m of buff.modifiers || []) {
      push(m.key, { type: 'buff', id: buff.id, add: m.add, mult: m.mult });
    }
  }
  for (const item of Object.values(itemDb) as any[]) {
    for (const m of item.modifiers || []) {
      push(m.key, { type: 'item', id: item.id, category: item.category, add: m.add, mult: m.mult });
    }
  }
  for (const home of Object.values(HOME_REGISTRY) as any[]) {
    for (const m of home.modifiers || []) {
      push(m.key, { type: 'home', id: home.id, add: m.add, mult: m.mult });
    }
  }
  // Make sure every base modifier shows up even if nothing modifies it
  for (const key of Object.keys(MODIFIER_REGISTRY_GENERATED)) {
    idx[key] ??= [];
  }
  return idx;
})();

// --- Tabs / mutable state ---
export const TAB_NAMES = [
  ...Object.keys(REGISTRIES),
  'Translations',
  'Cheats',
  'Validation',
  'Modifier Tree',
];

// Single mutable state container. Panel modules import { state } and mutate
// fields directly, then call render() to trigger a re-draw.
export const state = {
  activeTab: TAB_NAMES[0]!,
  activeId: null as string | null,
  filter: '',
  editMode: false,
  editStatus: '',
  validationOutput: '',
  validationRunning: false,
  // Translations
  trContext: '' as string,
  trActiveKey: null as string | null,
  trEditStatus: '',
};

// --- Translations data (mutable: edits are applied in-place) ---
export type TrMap = Record<string, Record<string, Record<string, string>>>;
export const trData: TrMap = JSON.parse(JSON.stringify(TRANSLATIONS_GENERATED)) as TrMap;
export const TR_LANGS = Object.keys(trData).sort();
export const TR_CONTEXTS = (() => {
  const all = new Set<string>();
  for (const lang of TR_LANGS) for (const ctx of Object.keys(trData[lang] || {})) all.add(ctx);
  return [...all].sort();
})();
// PRIMARY_LANG is the canonical lang used to enumerate keys when listing
// contexts/counts. Default to 'de' if the translations dict is somehow empty
// (defensive only — the build script never emits an empty bundle).
export const PRIMARY_LANG: string = TR_LANGS[0] ?? 'de';
// Now that TR_CONTEXTS is known, initialise the trContext default.
state.trContext = TR_CONTEXTS[0] ?? 'ui';

// --- Electron API shim (only present when running inside Electron) ---
export const api: any = (window as any).electronAPI || null;

// --- Render dispatcher hook ---
// devtools.ts wires the real render() in at boot; before that, calls are
// silent no-ops (e.g. if a panel runs work during module init).
let renderFn: () => void = () => {};
export const setRenderer = (fn: () => void): void => {
  renderFn = fn;
};
export const render = (): void => {
  renderFn();
};

// --- Tiny HTML helpers used by every panel ---
export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function flashButton(btn: HTMLButtonElement): void {
  btn.classList.add('flash');
  setTimeout(() => btn.classList.remove('flash'), ANIM.flash);
}
