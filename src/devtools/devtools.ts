/**
 * My-earned-Wings · Dev Tools (Phase 4 — Iteration 2)
 *
 * Tabbed content browser for the YAML-generated registries plus a
 * cheats panel that talks to the main game window via BroadcastChannel.
 *
 * Tabs:
 *   - Actions    (78+ from ACTION_REGISTRY_GENERATED)
 *   - Items      (from itemDb)
 *   - NPCs       (from NPC_REGISTRY + vandaraNPCs)
 *   - Modifiers  (from MODIFIER_REGISTRY_GENERATED)
 *   - Buffs      (from BUFF_REGISTRY)
 *   - Cheats     (live commands → main game)
 *
 * Editing + write-back to YAML is the next iteration.
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
import yaml from 'js-yaml';

type Entity = Record<string, unknown> & { id: string; category?: string };

// --- Registries (label → loader) ---
// Each label MUST lower-case to a key the main process recognises in
// ENTITY_DIR_MAP (src/electron/main.ts) so write-back can find the YAML file.
const REGISTRIES: Record<string, () => Record<string, Entity>> = {
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
const channel: BroadcastChannel | null =
  typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('mw-devtools') : null;
const sendCheat = (cmd: Record<string, unknown>): void => {
  if (channel) channel.postMessage(cmd);
};

// --- DOM refs ---
const list = document.getElementById('list')!;
const main = document.getElementById('main')!;
const meta = document.getElementById('meta')!;
const search = document.getElementById('search') as HTMLInputElement;
const tabsBar = document.getElementById('tabs')!;

// --- Modifier sources index (Iter 6) ---
interface ModifierSource {
  type: 'buff' | 'item' | 'home';
  id: string;
  category?: string;
  add?: number;
  mult?: number;
}
const MODIFIER_INDEX: Record<string, ModifierSource[]> = (() => {
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

// --- State ---
const TAB_NAMES = [...Object.keys(REGISTRIES), 'Translations', 'Cheats', 'Validation', 'Modifier Tree'];
let activeTab = TAB_NAMES[0];
let activeId: string | null = null;
let filter = '';
let editMode = false;
let editStatus = '';
let validationOutput = '';
let validationRunning = false;

// --- Translations state ---
type TrMap = Record<string, Record<string, Record<string, string>>>;
const trData: TrMap = JSON.parse(JSON.stringify(TRANSLATIONS_GENERATED)) as TrMap;
const TR_LANGS = Object.keys(trData).sort();
const TR_CONTEXTS = (() => {
  const all = new Set<string>();
  for (const lang of TR_LANGS) for (const ctx of Object.keys(trData[lang] || {})) all.add(ctx);
  return [...all].sort();
})();
let trContext: string = TR_CONTEXTS[0] ?? 'ui';
let trActiveKey: string | null = null;
let trEditStatus = '';

// API shim: only available when running inside Electron with our preload.
const api: any = (window as any).electronAPI || null;

// --- Rendering ---
function renderTabs() {
  tabsBar.innerHTML = '';
  for (const name of TAB_NAMES) {
    const btn = document.createElement('button');
    btn.className = 'tab' + (name === activeTab ? ' active' : '');
    btn.textContent = name;
    btn.onclick = () => {
      activeTab = name;
      activeId = null;
      filter = '';
      search.value = '';
      render();
    };
    tabsBar.appendChild(btn);
  }
}

function renderList() {
  list.innerHTML = '';

  if (activeTab === 'Cheats') {
    list.innerHTML = '<div class="category">Quick actions</div>';
    return;
  }

  if (activeTab === 'Validation') {
    list.innerHTML = '<div class="category">Project validators</div>';
    return;
  }

  if (activeTab === 'Translations') {
    renderTranslationsList();
    return;
  }

  if (activeTab === 'Modifier Tree') {
    const keys = Object.keys(MODIFIER_INDEX).sort();
    const filtered = keys.filter((k) => !filter || k.toLowerCase().includes(filter));
    meta.textContent = `${keys.length} calculation keys · ${filtered.length} shown`;
    const header = document.createElement('div');
    header.className = 'category';
    header.textContent = 'calculation keys';
    list.appendChild(header);
    for (const key of filtered) {
      const sources = MODIFIER_INDEX[key];
      const row = document.createElement('div');
      row.className = 'item-row' + (key === activeId ? ' active' : '');
      row.innerHTML = `${key} <span class="id">(${sources.length})</span>`;
      row.onclick = () => {
        activeId = key;
        render();
      };
      list.appendChild(row);
    }
    return;
  }

  const registry = REGISTRIES[activeTab]();
  const all = Object.values(registry).filter(Boolean) as Entity[];
  const byCategory: Record<string, Entity[]> = {};
  for (const e of all) {
    const cat = (e.category as string) || 'uncategorized';
    (byCategory[cat] ??= []).push(e);
  }

  meta.textContent = `${all.length} ${activeTab.toLowerCase()} · ${Object.keys(byCategory).length} categories`;

  for (const cat of Object.keys(byCategory).sort()) {
    const filtered = byCategory[cat].filter(
      (e) => !filter || (e.id || '').toLowerCase().includes(filter) || cat.toLowerCase().includes(filter),
    );
    if (!filtered.length) continue;

    const header = document.createElement('div');
    header.className = 'category';
    header.textContent = cat;
    list.appendChild(header);

    for (const e of filtered.sort((a, b) => (a.id || '').localeCompare(b.id || ''))) {
      const row = document.createElement('div');
      row.className = 'item-row' + (e.id === activeId ? ' active' : '');
      row.textContent = e.id;
      row.onclick = () => {
        activeId = e.id;
        render();
      };
      list.appendChild(row);
    }
  }
}

function renderDetail() {
  if (activeTab === 'Cheats') {
    main.innerHTML = renderCheatsPanel();
    wireCheatsHandlers();
    return;
  }

  if (activeTab === 'Validation') {
    main.innerHTML = renderValidationPanel();
    wireValidationHandlers();
    return;
  }

  if (activeTab === 'Modifier Tree') {
    main.innerHTML = renderModifierTree();
    return;
  }

  if (activeTab === 'Translations') {
    renderTranslationsDetail();
    return;
  }

  if (!activeId) {
    main.innerHTML = `<div class="empty-state">Wähle einen Eintrag links aus.</div>`;
    return;
  }

  const registry = REGISTRIES[activeTab]();
  const entity = Object.values(registry).find((e) => (e as Entity).id === activeId) as Entity | undefined;
  if (!entity) {
    main.innerHTML = `<div class="empty-state">Eintrag nicht gefunden.</div>`;
    return;
  }

  const stats: string[] = [];
  if (entity.cost && entity.costType) {
    stats.push(`<div class="stat"><div class="num">${entity.cost}</div><div class="label">Cost (${entity.costType})</div></div>`);
  }
  if (entity.duration) {
    stats.push(`<div class="stat"><div class="num">${(entity.duration as number / 1000).toFixed(1)}s</div><div class="label">Duration</div></div>`);
  }
  if (entity.yieldType) {
    stats.push(`<div class="stat"><div class="num">${entity.yieldType}</div><div class="label">Yields</div></div>`);
  }
  if (entity.passiveProduction) {
    const p = entity.passiveProduction as { resource?: string; baseYield?: number; interval?: number };
    stats.push(`<div class="stat"><div class="num">${p.baseYield ?? '?'}/${p.interval ? p.interval / 1000 + 's' : '?'}</div><div class="label">Producer (${p.resource})</div></div>`);
  }
  if (entity.duration === undefined && entity.spaceCost) {
    stats.push(`<div class="stat"><div class="num">${entity.spaceCost}</div><div class="label">Space</div></div>`);
  }

  const yamlText = yaml.dump(entity, { lineWidth: 80, sortKeys: false });

  // Iter 7b: every YAML-backed registry tab is editable via CONTENT_WRITE.
  const editableHere = activeTab in REGISTRIES && !!(api?.contentWrite || api?.contentWriteAction);
  const editButton = editableHere
    ? `<button id="edit-toggle" class="edit-btn">${editMode ? '✕ Cancel' : '✎ Edit'}</button>`
    : '';

  const editorHtml = editMode && editableHere ? renderEditor(entity) : '';

  main.innerHTML = `
    <div class="detail-header">
      <h2>${entity.id} ${editButton}</h2>
      <div class="id">category: ${entity.category || '—'} · type: ${activeTab}</div>
    </div>
    ${stats.length ? `<div class="stats-grid">${stats.join('')}</div>` : ''}
    ${editorHtml}
    <pre class="yaml">${escapeHtml(yamlText)}</pre>
  `;

  if (editableHere) {
    document.getElementById('edit-toggle')!.onclick = () => {
      editMode = !editMode;
      editStatus = '';
      render();
    };
  }
  if (editMode && editableHere) wireEditorHandlers(entity);
}

function renderEditor(entity: Entity): string {
  const cost = entity.cost ?? '';
  const costType = entity.costType ?? '';
  const duration = entity.duration ?? '';
  const category = entity.category ?? '';
  const yieldType = entity.yieldType ?? '';
  const rewards = (entity.rewards as Record<string, number | string>) || {};
  const costs = (entity.costs as Record<string, number>) || {};

  const renderKVRows = (prefix: string, obj: Record<string, number | string>): string => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return `<p class="kv-empty">no entries</p>`;
    return entries
      .map(
        ([k, v], i) => `
        <div class="kv-row" data-prefix="${prefix}" data-index="${i}">
          <input class="kv-key" value="${escapeAttr(k)}" placeholder="resource id" />
          <input class="kv-val" value="${escapeAttr(String(v))}" placeholder="amount" />
          <button class="kv-del" type="button" title="remove">✕</button>
        </div>`,
      )
      .join('');
  };

  return `
    <div class="editor">
      <h3>Edit — top-level fields</h3>
      <div class="form">
        <label>category <input id="ed-category" value="${escapeAttr(String(category))}" /></label>
        <label>cost <input id="ed-cost" type="number" value="${cost === '' ? '' : Number(cost)}" /></label>
        <label>costType <input id="ed-costType" value="${escapeAttr(String(costType))}" /></label>
        <label>duration (ms) <input id="ed-duration" type="number" value="${duration === '' ? '' : Number(duration)}" /></label>
        <label>yieldType <input id="ed-yieldType" value="${escapeAttr(String(yieldType))}" /></label>
      </div>

      <h3>Rewards</h3>
      <div class="kv-list" id="kv-rewards">${renderKVRows('rewards', rewards)}</div>
      <button class="kv-add" data-prefix="rewards" type="button">+ add reward</button>

      <h3>Costs (multi-resource)</h3>
      <div class="kv-list" id="kv-costs">${renderKVRows('costs', costs as any)}</div>
      <button class="kv-add" data-prefix="costs" type="button">+ add cost</button>

      <h3>Raw YAML patch (advanced)</h3>
      <p class="hint">For tabs other than Actions (Items, NPCs, Buffs, Modifiers): paste a partial YAML
      object here to overwrite top-level fields not covered above. Keys with <code>null</code> values
      are deleted from the entity. Example:
      <code>capacity: 16</code> or <code>modifiers:&nbsp;[{ key: rest_energy_gain, add: 100 }]</code></p>
      <textarea id="ed-raw-yaml" class="raw-yaml" rows="6" placeholder="# leave blank if not needed"></textarea>

      <div class="actions">
        <button id="save-only">Save YAML only</button>
        <button id="save-and-build">Save &amp; rebuild</button>
        <span class="status">${escapeHtml(editStatus)}</span>
      </div>
      <p class="hint">⚠️ Comments in the YAML file are stripped on save (js-yaml limit).
      Requirements + onSuccess effects still need direct YAML edits.
      Numeric reward values become numbers; pipeline-key strings (e.g. <code>wood_yield</code>) stay strings.</p>
    </div>
  `;
}

function wireEditorHandlers(entity: Entity): void {
  // KV add buttons
  document.querySelectorAll<HTMLButtonElement>('.kv-add').forEach((btn) => {
    btn.onclick = () => {
      const prefix = btn.getAttribute('data-prefix')!;
      const list = document.getElementById('kv-' + prefix)!;
      // Drop the empty placeholder if present
      const empty = list.querySelector('.kv-empty');
      if (empty) empty.remove();
      const row = document.createElement('div');
      row.className = 'kv-row';
      row.setAttribute('data-prefix', prefix);
      row.innerHTML = `
        <input class="kv-key" value="" placeholder="resource id" />
        <input class="kv-val" value="" placeholder="amount" />
        <button class="kv-del" type="button" title="remove">✕</button>`;
      list.appendChild(row);
      wireKVDelete(row);
    };
  });

  // KV delete buttons (existing rows)
  document.querySelectorAll<HTMLDivElement>('.kv-row').forEach(wireKVDelete);

  function wireKVDelete(row: HTMLElement) {
    const del = row.querySelector('.kv-del') as HTMLButtonElement | null;
    if (del) del.onclick = () => row.remove();
  }

  const collectKV = (prefix: string, numericValues: boolean): Record<string, number | string> | undefined => {
    const rows = document.querySelectorAll<HTMLDivElement>(`.kv-row[data-prefix="${prefix}"]`);
    const out: Record<string, number | string> = {};
    rows.forEach((row) => {
      const k = (row.querySelector('.kv-key') as HTMLInputElement).value.trim();
      const vRaw = (row.querySelector('.kv-val') as HTMLInputElement).value.trim();
      if (!k || !vRaw) return;
      if (numericValues) {
        const n = Number(vRaw);
        out[k] = Number.isFinite(n) ? n : vRaw; // fall through to string for pipeline keys
      } else {
        out[k] = vRaw;
      }
    });
    return Object.keys(out).length ? out : undefined;
  };

  const objectsEqual = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.length !== kb.length) return false;
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return false;
      if (a[ka[i]] !== b[kb[i]]) return false;
    }
    return true;
  };

  const collectPatch = (): Record<string, unknown> => {
    const patch: Record<string, unknown> = {};
    const get = (id: string) => (document.getElementById(id) as HTMLInputElement).value;
    const cat = get('ed-category').trim();
    if (cat !== String(entity.category ?? '')) patch.category = cat || undefined;
    const cost = get('ed-cost').trim();
    if (cost !== String(entity.cost ?? '')) patch.cost = cost === '' ? undefined : Number(cost);
    const costType = get('ed-costType').trim();
    if (costType !== String(entity.costType ?? '')) patch.costType = costType || undefined;
    const dur = get('ed-duration').trim();
    if (dur !== String(entity.duration ?? '')) patch.duration = dur === '' ? undefined : Number(dur);
    const yt = get('ed-yieldType').trim();
    if (yt !== String(entity.yieldType ?? '')) patch.yieldType = yt || undefined;

    // Nested fields — only patch when they actually changed
    const newRewards = collectKV('rewards', true) || {};
    const oldRewards = (entity.rewards as Record<string, unknown>) || {};
    if (!objectsEqual(newRewards, oldRewards)) {
      patch.rewards = Object.keys(newRewards).length ? newRewards : undefined;
    }
    const newCosts = collectKV('costs', true) || {};
    const oldCosts = (entity.costs as Record<string, unknown>) || {};
    if (!objectsEqual(newCosts, oldCosts)) {
      patch.costs = Object.keys(newCosts).length ? newCosts : undefined;
    }

    // Merge in advanced raw-YAML patch (overrides structured fields on key collision).
    const rawEl = document.getElementById('ed-raw-yaml') as HTMLTextAreaElement | null;
    const rawText = rawEl?.value?.trim() ?? '';
    if (rawText) {
      try {
        const rawObj = yaml.load(rawText);
        if (rawObj && typeof rawObj === 'object' && !Array.isArray(rawObj)) {
          Object.assign(patch, rawObj);
        } else {
          editStatus = '✗ Raw YAML must be a key:value mapping at the top level.';
        }
      } catch (e) {
        editStatus = '✗ Raw YAML parse error: ' + (e as Error).message;
      }
    }

    // Strip undefined keys from patch (null is intentional → delete on server)
    for (const k of Object.keys(patch)) if (patch[k] === undefined) delete patch[k];
    return patch;
  };

  const save = async (alsoBuild: boolean) => {
    const writer = api?.contentWrite
      ? (id: string, p: Record<string, unknown>) => api.contentWrite(activeTab.toLowerCase(), id, p)
      : api?.contentWriteAction
        ? (id: string, p: Record<string, unknown>) => api.contentWriteAction(id, p)
        : null;
    if (!writer) {
      editStatus = '✗ Not running in Electron — content write unavailable.';
      render();
      return;
    }
    const patch = collectPatch();
    if (Object.keys(patch).length === 0) {
      editStatus = 'No changes.';
      render();
      return;
    }
    editStatus = 'Writing…';
    render();
    const res = await writer(entity.id, patch);
    if (!res.ok) {
      editStatus = '✗ ' + (res.error || 'unknown error');
      render();
      return;
    }
    editStatus = `✓ Wrote ${Object.keys(patch).length} field(s).`;
    if (alsoBuild) {
      editStatus += ' Building…';
      render();
      const build = await api.contentBuild();
      editStatus = build.ok
        ? `✓ Wrote and rebuilt — main game will hot-reload.`
        : `⚠ Wrote but build failed: ${build.output.split('\n').slice(-3).join(' | ')}`;
    }
    render();
  };

  document.getElementById('save-only')!.onclick = () => save(false);
  document.getElementById('save-and-build')!.onclick = () => save(true);
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderModifierTree(): string {
  if (!activeId) {
    return `<div class="empty-state">Wähle links einen Calculation-Key aus.<br><br>
      <span style="font-size:12px;opacity:0.7;">Filterbeispiele: <code>wood</code>, <code>magic</code>, <code>limit</code>, <code>yield</code>, <code>cost</code></span></div>`;
  }
  const key = activeId;
  const sources = MODIFIER_INDEX[key] || [];
  const base = (MODIFIER_REGISTRY_GENERATED as any)[key];
  const baseValue = base?.baseValue;

  const groupBy = <T extends ModifierSource>(arr: T[], k: 'type'): Record<string, T[]> => {
    const out: Record<string, T[]> = {};
    for (const x of arr) (out[x[k]] ??= []).push(x);
    return out;
  };
  const grouped = groupBy(sources, 'type');

  const fmtOp = (s: ModifierSource): string => {
    const parts: string[] = [];
    if (s.add !== undefined) parts.push(`+${s.add}`);
    if (s.mult !== undefined) parts.push(`×${s.mult}`);
    return parts.join(' / ') || '?';
  };

  const groupHtml = (label: string, items: ModifierSource[]): string => {
    if (!items?.length) return '';
    return `
      <div class="mod-group">
        <h4>${label} (${items.length})</h4>
        <ul>
          ${items
            .map(
              (s) => `
            <li>
              <span class="mod-id">${escapeHtml(s.id)}</span>
              ${s.category ? `<span class="mod-cat">${escapeHtml(s.category)}</span>` : ''}
              <span class="mod-op">${fmtOp(s)}</span>
            </li>`,
            )
            .join('')}
        </ul>
      </div>`;
  };

  return `
    <div class="detail-header">
      <h2>${escapeHtml(key)}</h2>
      <div class="id">${base ? `base: ${baseValue ?? '?'}` : 'no base entry — calculated key'} · ${sources.length} modifier source(s)</div>
    </div>
    ${
      base
        ? `<div class="stats-grid"><div class="stat"><div class="num">${baseValue ?? '?'}</div><div class="label">base value</div></div></div>`
        : ''
    }
    ${groupHtml('Buffs', grouped.buff)}
    ${groupHtml('Items', grouped.item)}
    ${groupHtml('Homes', grouped.home)}
    ${
      sources.length === 0
        ? '<p class="hint">No modifiers target this key. It uses the base value (or 0 if no base).</p>'
        : ''
    }
  `;
}

function renderValidationPanel(): string {
  const apiOk = !!api?.contentValidate;
  const out = validationOutput || (apiOk
    ? '> Click „Run check-all" to validate the project content.'
    : '> Validation is only available inside Electron (electronAPI missing).');

  // Strip ANSI escape codes for display
  const clean = out.replace(/\x1b\[[0-9;]*m/g, '');

  // Naive line classification for color hints
  const lines = clean.split(/\r?\n/).map((line) => {
    if (/✗|✖|error|fehlt|FAIL/i.test(line)) return `<span class="vline err">${escapeHtml(line)}</span>`;
    if (/⚠|warn|warning/i.test(line)) return `<span class="vline warn">${escapeHtml(line)}</span>`;
    if (/✓|✅|ok|pass|complete|perfect/i.test(line)) return `<span class="vline ok">${escapeHtml(line)}</span>`;
    return `<span class="vline">${escapeHtml(line)}</span>`;
  });

  return `
    <div class="detail-header">
      <h2>Validation</h2>
      <div class="id">runs <code>npm run check-all</code> in the project root</div>
    </div>

    <div class="cheats">
      <section>
        <h3>Run validators</h3>
        <button id="run-validate" ${validationRunning ? 'disabled' : ''}>${validationRunning ? 'Running…' : '▶ Run check-all'}</button>
        <p class="hint">Checks: i18n keys, asset paths, content references, save fixtures, parity. Output below.</p>
      </section>

      <section>
        <h3>Output</h3>
        <pre class="validation-output">${lines.join('\n')}</pre>
      </section>
    </div>
  `;
}

function wireValidationHandlers(): void {
  const btn = document.getElementById('run-validate') as HTMLButtonElement | null;
  if (!btn) return;
  btn.onclick = async () => {
    if (!api?.contentValidate) {
      validationOutput = 'Validation requires Electron (electronAPI missing).';
      render();
      return;
    }
    validationRunning = true;
    validationOutput = 'Running…';
    render();
    try {
      const res = await api.contentValidate();
      validationOutput = res.output || (res.ok ? 'No output (OK).' : 'No output (FAIL).');
    } catch (err) {
      validationOutput = 'Error: ' + (err as Error).message;
    }
    validationRunning = false;
    render();
  };
}

function renderCheatsPanel(): string {
  const buffs = Object.values(BUFF_REGISTRY);
  const npcs = Object.values(NPC_REGISTRY);

  return `
    <div class="detail-header">
      <h2>Cheats &amp; Spawn helpers</h2>
      <div class="id">live commands → main game window (BroadcastChannel)</div>
    </div>

    <div class="cheats">
      <section>
        <h3>Quick stats</h3>
        <button data-cheat="applyCheats">Max all stats &amp; resources</button>
        <button data-cheat="addStat" data-stat="energy" data-amount="100">+100 Energy</button>
        <button data-cheat="addStat" data-stat="magic" data-amount="100">+100 Magic</button>
        <button data-cheat="addStat" data-stat="satiation" data-amount="100">+100 Satiation</button>
      </section>

      <section>
        <h3>Resources</h3>
        <button data-cheat="addResource" data-resource="wood" data-amount="100">+100 Holz</button>
        <button data-cheat="addResource" data-resource="stone" data-amount="100">+100 Stein</button>
        <button data-cheat="addResource" data-resource="herbs" data-amount="50">+50 Kräuter</button>
        <button data-cheat="addResource" data-resource="resin" data-amount="50">+50 Baumharz</button>
        <button data-cheat="addResource" data-resource="shards" data-amount="100">+100 Shards</button>
      </section>

      <section>
        <h3>Flags</h3>
        <button data-cheat="setFlag" data-flag="ability-arcane-focus" data-value="true">Unlock Arcane Focus</button>
        <button data-cheat="setFlag" data-flag="school_unlocked" data-value="true">Unlock School</button>
        <button data-cheat="setFlag" data-flag="vandara_unlocked" data-value="true">Unlock Vandara</button>
        <button data-cheat="setFlag" data-flag="academy_phase_1" data-value="true">Academy Phase 1</button>
        <button data-cheat="setFlag" data-flag="academy_phase_2" data-value="true">Academy Phase 2</button>
        <button data-cheat="setFlag" data-flag="academy_graduate" data-value="true">Academy Graduate</button>
      </section>

      <section>
        <h3>Activate buff</h3>
        ${buffs.map((b) => `<button data-cheat="addBuff" data-buffid="${b.id}">${b.id} (${b.duration}s)</button>`).join('')}
      </section>

      <section>
        <h3>NPCs</h3>
        <button data-cheat="unlockAllNPCs">Unlock ALL NPCs</button>
        ${npcs
          .slice(0, 12)
          .map((n: any) => `<button data-cheat="unlockNPC" data-npcid="${n.id}">Unlock ${n.id}</button>`)
          .join('')}
      </section>

      <section>
        <h3>Jump to view</h3>
        <button data-cheat="setView" data-view="main">main</button>
        <button data-cheat="setView" data-view="crafting">crafting</button>
        <button data-cheat="setView" data-view="upgrades">upgrades</button>
        <button data-cheat="setView" data-view="village">village</button>
        <button data-cheat="setView" data-view="housing">housing</button>
        <button data-cheat="setView" data-view="collection">collection</button>
        <button data-cheat="setView" data-view="finale">finale</button>
        <button data-cheat="setView" data-view="menu">menu</button>
      </section>

      <section>
        <h3>Demo / save management</h3>
        <button data-cheat="completeDemo">Mark demo as completed</button>
        <button data-cheat="resetSave" class="danger">Wipe save &amp; reload</button>
      </section>

      <section>
        <h3>Custom resource</h3>
        <div class="custom-row">
          <input type="text" id="custom-resource" placeholder="resource id (e.g. wood)" />
          <input type="number" id="custom-amount" placeholder="amount" value="10" />
          <button id="custom-add">Add</button>
        </div>
      </section>

      <section>
        <h3>Status</h3>
        <p class="hint">${channel ? '✓ Connected (BroadcastChannel active)' : '✗ Not connected — open this window in the same browser as the main game.'}</p>
      </section>
    </div>
  `;
}

function wireCheatsHandlers(): void {
  document.querySelectorAll<HTMLButtonElement>('.cheats button[data-cheat]').forEach((btn) => {
    btn.onclick = () => {
      const cheat = btn.getAttribute('data-cheat')!;
      const cmd: Record<string, unknown> = { type: cheat };
      // dataset attribute → command field name (HTML lowercases data-*)
      const attrMap: Record<string, string> = {
        resource: 'resource',
        stat: 'stat',
        flag: 'flag',
        amount: 'amount',
        value: 'value',
        buffid: 'buffId',
        npcid: 'npcId',
        view: 'view',
      };
      for (const [attr, field] of Object.entries(attrMap)) {
        const v = btn.getAttribute('data-' + attr);
        if (v !== null) {
          cmd[field] = field === 'amount' ? Number(v) : field === 'value' ? v === 'true' : v;
        }
      }
      sendCheat(cmd);
      flashButton(btn);
    };
  });
  const customAdd = document.getElementById('custom-add');
  if (customAdd) {
    customAdd.onclick = () => {
      const r = (document.getElementById('custom-resource') as HTMLInputElement).value.trim();
      const a = Number((document.getElementById('custom-amount') as HTMLInputElement).value);
      if (r && a) {
        sendCheat({ type: 'addResource', resource: r, amount: a });
        flashButton(customAdd as HTMLButtonElement);
      }
    };
  }
}

function flashButton(btn: HTMLButtonElement): void {
  btn.classList.add('flash');
  setTimeout(() => btn.classList.remove('flash'), 400);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function render(): void {
  renderTabs();
  renderList();
  renderDetail();
  if (activeTab === 'Cheats') meta.textContent = 'Cheats & Spawn helpers';
  if (activeTab === 'Validation') meta.textContent = 'Run project validators';
}

// re-render list as user types in the search box, also for the Modifier Tree tab
search.addEventListener('input', () => {
  if (activeTab === 'Modifier Tree') render();
});

search.addEventListener('input', () => {
  filter = search.value.trim().toLowerCase();
  renderList();
});

render();

// --- Translations editor ---

function renderTranslationsList(): void {
  const allKeys = new Set<string>();
  for (const lang of TR_LANGS) for (const k of Object.keys(trData[lang]?.[trContext] || {})) allKeys.add(k);
  const keyArr = [...allKeys].sort();
  const filtered = keyArr.filter(k => !filter || k.toLowerCase().includes(filter));
  meta.textContent = `${TR_LANGS.join(' / ')} · context "${trContext}" · ${keyArr.length} keys · ${filtered.length} shown`;

  const ctxBar = document.createElement('div');
  ctxBar.className = 'category';
  ctxBar.innerHTML = `context: <select id="tr-ctx-pick" style="margin-left:6px;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:12px;">${
    TR_CONTEXTS.map(c => `<option value="${c}"${c === trContext ? ' selected' : ''}>${c} (${Object.keys(trData[TR_LANGS[0]]?.[c] || {}).length})</option>`).join('')
  }</select> &nbsp;<button id="tr-add-key" class="kv-add" style="display:inline-block;margin:0;padding:2px 8px;">+ new key</button>`;
  list.appendChild(ctxBar);

  for (const key of filtered) {
    const missing: string[] = [];
    for (const lang of TR_LANGS) {
      if (!trData[lang]?.[trContext]?.[key]) missing.push(lang);
    }
    const row = document.createElement('div');
    row.className = 'item-row' + (key === trActiveKey ? ' active' : '');
    const badge = missing.length ? ` <span class="id" style="color:#fca5a5;">missing: ${missing.join(',')}</span>` : '';
    row.innerHTML = `${escapeHtml(key)}${badge}`;
    row.onclick = () => {
      trActiveKey = key;
      trEditStatus = '';
      render();
    };
    list.appendChild(row);
  }

  (document.getElementById('tr-ctx-pick') as HTMLSelectElement).onchange = (e) => {
    trContext = (e.target as HTMLSelectElement).value;
    trActiveKey = null;
    trEditStatus = '';
    render();
  };
  (document.getElementById('tr-add-key') as HTMLButtonElement).onclick = () => {
    const newKey = prompt(`New translation key in context "${trContext}":`)?.trim();
    if (!newKey) return;
    if (allKeys.has(newKey)) {
      alert(`Key "${newKey}" already exists in this context.`);
      return;
    }
    for (const lang of TR_LANGS) {
      (trData[lang] ??= {});
      (trData[lang][trContext] ??= {});
      trData[lang][trContext][newKey] = '';
    }
    trActiveKey = newKey;
    trEditStatus = 'New key added (not saved yet — click Save).';
    render();
  };
}

function renderTranslationsDetail(): void {
  if (!trActiveKey) {
    main.innerHTML = `<div class="empty-state">Wähle links einen Translation-Key aus.<br><br>
      <span style="font-size:12px;opacity:0.7;">Roter <code>missing:</code>-Badge zeigt Lücken in einer Sprache.<br>
      Mit "+ new key" oben kannst du neue Keys anlegen.</span></div>`;
    return;
  }

  const writer = api?.contentWriteTranslation;
  const writable = !!writer;

  const langInputs = TR_LANGS.map(lang => {
    const val = trData[lang]?.[trContext]?.[trActiveKey!] ?? '';
    return `
      <div class="tr-pane">
        <h4>${lang.toUpperCase()}</h4>
        <textarea class="raw-yaml" data-lang="${lang}" rows="4" placeholder="(empty)">${escapeHtml(val)}</textarea>
      </div>`;
  }).join('');

  main.innerHTML = `
    <div class="detail-header">
      <h2>${escapeHtml(trActiveKey)}</h2>
      <div class="id">context: ${trContext} · ${TR_LANGS.length} languages</div>
    </div>
    <div class="tr-grid">${langInputs}</div>
    <div class="editor">
      <div class="actions">
        <button id="tr-save"${writable ? '' : ' disabled'}>Save all languages</button>
        <button id="tr-delete"${writable ? '' : ' disabled'} style="background:#7f1d1d;border-color:#b91c1c;">🗑 Delete key (all langs)</button>
        <button id="tr-build"${writable ? '' : ' disabled'}>Save &amp; rebuild</button>
        <span class="status">${escapeHtml(trEditStatus)}</span>
      </div>
      <p class="hint">Empty values are written as empty strings. Use the red Delete button to remove a key from all languages. Rebuild regenerates <code>src/generated/content.ts</code> so the running game picks up the change.</p>
    </div>
  `;

  if (!writable) return;

  const collect = (): Record<string, string> => {
    const out: Record<string, string> = {};
    for (const lang of TR_LANGS) {
      const ta = main.querySelector<HTMLTextAreaElement>(`textarea[data-lang="${lang}"]`);
      out[lang] = ta?.value ?? '';
    }
    return out;
  };

  const saveAll = async (alsoBuild: boolean) => {
    const values = collect();
    trEditStatus = 'Writing…';
    render();
    const errs: string[] = [];
    for (const lang of TR_LANGS) {
      const v = values[lang];
      const res = await writer!(lang, trContext, trActiveKey!, v);
      if (!res.ok) errs.push(`${lang}: ${res.error}`);
      else (trData[lang] ??= {})[trContext] = { ...(trData[lang][trContext] || {}), [trActiveKey!]: v };
    }
    if (errs.length) {
      trEditStatus = '✗ ' + errs.join(' | ');
      render();
      return;
    }
    trEditStatus = `✓ Saved ${TR_LANGS.length} language(s).`;
    if (alsoBuild) {
      trEditStatus += ' Building…';
      render();
      const build = await api.contentBuild();
      trEditStatus = build.ok
        ? '✓ Saved and rebuilt — main game will hot-reload.'
        : '⚠ Saved but build failed: ' + build.output.split('\n').slice(-3).join(' | ');
    }
    render();
  };

  document.getElementById('tr-save')!.onclick = () => saveAll(false);
  document.getElementById('tr-build')!.onclick = () => saveAll(true);
  document.getElementById('tr-delete')!.onclick = async () => {
    if (!confirm(`Delete key "${trActiveKey}" from all languages?`)) return;
    trEditStatus = 'Deleting…';
    render();
    const errs: string[] = [];
    for (const lang of TR_LANGS) {
      const res = await writer!(lang, trContext, trActiveKey!, null);
      if (!res.ok) errs.push(`${lang}: ${res.error}`);
      else delete trData[lang]?.[trContext]?.[trActiveKey!];
    }
    if (errs.length) {
      trEditStatus = '✗ ' + errs.join(' | ');
    } else {
      trEditStatus = '';
      trActiveKey = null;
    }
    render();
  };
}
