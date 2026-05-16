/**
 * My-earned-Wings · Dev Tools
 *
 * Tabbed content browser for the YAML-generated registries plus cheats /
 * validation / modifier-tree / translations panels. Each panel lives in
 * its own module (cheats.ts, validation.ts, modifier-tree.ts,
 * translations.ts) and shares state via state.ts.
 *
 * This entry point owns:
 *   - the top-level render() dispatcher
 *   - the tabs bar (renderTabs)
 *   - the entity list and detail/editor for YAML-backed registry tabs
 *   - search wiring
 */
import yaml from 'js-yaml';
import {
  Entity,
  REGISTRIES,
  MODIFIER_INDEX,
  TAB_NAMES,
  state,
  list,
  main,
  meta,
  search,
  tabsBar,
  api,
  setRenderer,
  render,
  escapeHtml,
  escapeAttr,
} from './state';
import { renderCheatsPanel, wireCheatsHandlers } from './cheats';
import { renderValidationPanel, wireValidationHandlers } from './validation';
import { renderModifierTree } from './modifier-tree';
import { renderTranslationsList, renderTranslationsDetail } from './translations';

// --- Rendering ---
function renderTabs() {
  tabsBar.innerHTML = '';
  for (const name of TAB_NAMES) {
    const btn = document.createElement('button');
    btn.className = 'tab' + (name === state.activeTab ? ' active' : '');
    btn.textContent = name;
    btn.onclick = () => {
      state.activeTab = name;
      state.activeId = null;
      state.filter = '';
      state.editMode = false;
      state.editStatus = '';
      search.value = '';
      render();
    };
    tabsBar.appendChild(btn);
  }
}

function renderList() {
  list.innerHTML = '';

  if (state.activeTab === 'Cheats' || state.activeTab === 'Validation') {
    // Cheats + Validation own the right-hand pane entirely; no list view.
    return;
  }

  if (state.activeTab === 'Translations') {
    renderTranslationsList();
    return;
  }

  if (state.activeTab === 'Modifier Tree') {
    const keys = Object.keys(MODIFIER_INDEX).sort();
    const filtered = keys.filter((k) => !state.filter || k.toLowerCase().includes(state.filter));
    meta.textContent = `${keys.length} calc keys · ${filtered.length} shown`;
    const header = document.createElement('div');
    header.className = 'category';
    header.textContent = 'calculation keys';
    list.appendChild(header);
    for (const key of filtered) {
      const sources = MODIFIER_INDEX[key];
      const row = document.createElement('div');
      row.className = 'item-row' + (key === state.activeId ? ' active' : '');
      row.innerHTML = `${key} <span class="id">(${(sources ?? []).length})</span>`;
      row.onclick = () => {
        state.activeId = key;
        render();
      };
      list.appendChild(row);
    }
    return;
  }

  const registryLoader = REGISTRIES[state.activeTab];
  if (!registryLoader) return;
  const registry = registryLoader();
  const all = Object.values(registry).filter(Boolean) as Entity[];
  const byCategory: Record<string, Entity[]> = {};
  for (const e of all) {
    const cat = (e.category as string) || 'uncategorized';
    (byCategory[cat] ??= []).push(e);
  }

  meta.textContent = `${all.length} ${state.activeTab.toLowerCase()} · ${Object.keys(byCategory).length} categories`;

  for (const cat of Object.keys(byCategory).sort()) {
    const filtered = (byCategory[cat] ?? []).filter(
      (e) =>
        !state.filter ||
        (e.id || '').toLowerCase().includes(state.filter) ||
        cat.toLowerCase().includes(state.filter),
    );
    if (!filtered.length) continue;

    const header = document.createElement('div');
    header.className = 'category';
    header.textContent = cat;
    list.appendChild(header);

    for (const e of filtered) {
      const row = document.createElement('div');
      row.className = 'item-row' + (e.id === state.activeId ? ' active' : '');
      row.innerHTML = `${e.id}`;
      row.onclick = () => {
        state.activeId = e.id;
        state.editMode = false;
        state.editStatus = '';
        render();
      };
      list.appendChild(row);
    }
  }
}

function renderDetail() {
  if (state.activeTab === 'Cheats') {
    main.innerHTML = renderCheatsPanel();
    wireCheatsHandlers();
    return;
  }
  if (state.activeTab === 'Validation') {
    main.innerHTML = renderValidationPanel();
    wireValidationHandlers();
    return;
  }
  if (state.activeTab === 'Modifier Tree') {
    main.innerHTML = renderModifierTree();
    return;
  }
  if (state.activeTab === 'Translations') {
    renderTranslationsDetail();
    return;
  }

  if (!state.activeId) {
    main.innerHTML = `<div class="empty-state">Wähle einen Eintrag links aus.</div>`;
    return;
  }

  const registryLoader = REGISTRIES[state.activeTab];
  if (!registryLoader) return;
  const registry = registryLoader();
  const entity = Object.values(registry).find((e) => (e as Entity).id === state.activeId) as
    | Entity
    | undefined;
  if (!entity) {
    main.innerHTML = `<div class="empty-state">Eintrag nicht gefunden.</div>`;
    return;
  }

  const stats: string[] = [];
  if (entity.cost && entity.costType) {
    stats.push(
      `<div class="stat"><div class="num">${entity.cost}</div><div class="label">Cost (${entity.costType})</div></div>`,
    );
  }
  if (entity.duration) {
    stats.push(
      `<div class="stat"><div class="num">${((entity.duration as number) / 1000).toFixed(1)}s</div><div class="label">Duration</div></div>`,
    );
  }
  if (entity.yieldType) {
    stats.push(
      `<div class="stat"><div class="num">${entity.yieldType}</div><div class="label">Yields</div></div>`,
    );
  }
  if (entity.passiveProduction) {
    const p = entity.passiveProduction as {
      resource?: string;
      baseYield?: number;
      interval?: number;
    };
    stats.push(
      `<div class="stat"><div class="num">${p.baseYield ?? '?'}/${p.interval ? p.interval / 1000 + 's' : '?'}</div><div class="label">Producer (${p.resource})</div></div>`,
    );
  }
  if (entity.duration === undefined && entity.spaceCost) {
    stats.push(
      `<div class="stat"><div class="num">${entity.spaceCost}</div><div class="label">Space</div></div>`,
    );
  }

  const yamlText = yaml.dump(entity, { lineWidth: 80, sortKeys: false });

  // Iter 7b: every YAML-backed registry tab is editable via CONTENT_WRITE.
  const editableHere = state.activeTab in REGISTRIES && !!(api?.contentWrite || api?.contentWriteAction);
  const editButton = editableHere
    ? `<button id="edit-toggle" class="edit-btn">${state.editMode ? '✕ Cancel' : '✎ Edit'}</button>`
    : '';

  const editorHtml = state.editMode && editableHere ? renderEditor(entity) : '';

  main.innerHTML = `
    <div class="detail-header">
      <h2>${escapeHtml((entity as any).nameKey || (entity as any).title || entity.id)}</h2>
      <div class="id">${entity.id}${entity.category ? ` · ${entity.category}` : ''} ${editButton}</div>
    </div>
    ${stats.length ? `<div class="stats-grid">${stats.join('')}</div>` : ''}
    ${editorHtml}
    <details ${state.editMode ? '' : 'open'}><summary>YAML source</summary><pre class="raw-yaml">${escapeHtml(yamlText)}</pre></details>
  `;

  if (editableHere) {
    document.getElementById('edit-toggle')!.onclick = () => {
      state.editMode = !state.editMode;
      state.editStatus = '';
      render();
    };
  }
  if (state.editMode && editableHere) wireEditorHandlers(entity);
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
        <span class="status">${escapeHtml(state.editStatus)}</span>
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
      const listEl = document.getElementById('kv-' + prefix)!;
      // Drop the empty placeholder if present
      const empty = listEl.querySelector('.kv-empty');
      if (empty) empty.remove();
      const row = document.createElement('div');
      row.className = 'kv-row';
      row.setAttribute('data-prefix', prefix);
      row.innerHTML = `
        <input class="kv-key" value="" placeholder="resource id" />
        <input class="kv-val" value="" placeholder="amount" />
        <button class="kv-del" type="button" title="remove">✕</button>`;
      listEl.appendChild(row);
      wireKVDelete(row);
    };
  });

  // KV delete buttons (existing rows)
  document.querySelectorAll<HTMLDivElement>('.kv-row').forEach(wireKVDelete);

  function wireKVDelete(row: HTMLElement) {
    const del = row.querySelector('.kv-del') as HTMLButtonElement | null;
    if (del) del.onclick = () => row.remove();
  }

  const collectKV = (
    prefix: string,
    numericValues: boolean,
  ): Record<string, number | string> | undefined => {
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
      const ki = ka[i]!;
      if (ki !== kb[i]) return false;
      if (a[ki] !== b[ki]) return false;
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
          state.editStatus = '✗ Raw YAML must be a key:value mapping at the top level.';
        }
      } catch (e) {
        state.editStatus = '✗ Raw YAML parse error: ' + (e as Error).message;
      }
    }

    // Strip undefined keys from patch (null is intentional → delete on server)
    for (const k of Object.keys(patch)) if (patch[k] === undefined) delete patch[k];
    return patch;
  };

  const save = async (alsoBuild: boolean) => {
    const writer = api?.contentWrite
      ? (id: string, p: Record<string, unknown>) =>
          api.contentWrite(state.activeTab.toLowerCase(), id, p)
      : api?.contentWriteAction
        ? (id: string, p: Record<string, unknown>) => api.contentWriteAction(id, p)
        : null;
    if (!writer) {
      state.editStatus = '✗ Not running in Electron — content write unavailable.';
      render();
      return;
    }
    const patch = collectPatch();
    if (Object.keys(patch).length === 0) {
      state.editStatus = 'No changes.';
      render();
      return;
    }
    state.editStatus = 'Writing…';
    render();
    const res = await writer(entity.id, patch);
    if (!res.ok) {
      state.editStatus = '✗ ' + (res.error || 'unknown error');
      render();
      return;
    }
    state.editStatus = `✓ Wrote ${Object.keys(patch).length} field(s).`;
    if (alsoBuild) {
      state.editStatus += ' Building…';
      render();
      const build = await api.contentBuild();
      state.editStatus = build.ok
        ? `✓ Wrote and rebuilt — main game will hot-reload.`
        : `⚠ Wrote but build failed: ${build.output.split('\n').slice(-3).join(' | ')}`;
    }
    render();
  };

  document.getElementById('save-only')!.onclick = () => save(false);
  document.getElementById('save-and-build')!.onclick = () => save(true);
}

// --- Render dispatcher ---
function renderImpl(): void {
  renderTabs();
  renderList();
  renderDetail();
  if (state.activeTab === 'Cheats') meta.textContent = 'Cheats & Spawn helpers';
  if (state.activeTab === 'Validation') meta.textContent = 'Run project validators';
}

setRenderer(renderImpl);

// Re-render as user types in the search box. Modifier Tree needs a full
// render() because its detail pane depends on the filter; other tabs only
// need the list to refresh.
search.addEventListener('input', () => {
  state.filter = search.value.trim().toLowerCase();
  if (state.activeTab === 'Modifier Tree') {
    render();
  } else {
    renderList();
  }
});

render();
