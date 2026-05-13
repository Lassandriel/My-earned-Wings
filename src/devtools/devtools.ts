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
import { ACTION_REGISTRY_GENERATED, MODIFIER_REGISTRY_GENERATED } from '../generated/content';
import { itemDb } from '../features/crafting/items.data';
import { NPC_REGISTRY } from '../features/village/village.data';
import { vandaraNPCs } from '../features/vandara/vandara.data';
import { BUFF_REGISTRY } from '../data/definitions/buffs';
import yaml from 'js-yaml';

type Entity = Record<string, unknown> & { id: string; category?: string };

// --- Registries ---
const REGISTRIES: Record<string, () => Record<string, Entity>> = {
  Actions: () => ACTION_REGISTRY_GENERATED as Record<string, Entity>,
  Items: () => itemDb as unknown as Record<string, Entity>,
  NPCs: () => ({ ...NPC_REGISTRY, ...vandaraNPCs }) as unknown as Record<string, Entity>,
  Modifiers: () => MODIFIER_REGISTRY_GENERATED as Record<string, Entity>,
  Buffs: () => BUFF_REGISTRY as unknown as Record<string, Entity>,
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

// --- State ---
const TAB_NAMES = [...Object.keys(REGISTRIES), 'Cheats', 'Validation'];
let activeTab = TAB_NAMES[0];
let activeId: string | null = null;
let filter = '';
let editMode = false;
let editStatus = '';
let validationOutput = '';
let validationRunning = false;

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

  const editableHere = activeTab === 'Actions' && api?.contentWriteAction;
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

  return `
    <div class="editor">
      <h3>Edit (writes back to YAML)</h3>
      <div class="form">
        <label>category <input id="ed-category" value="${escapeAttr(String(category))}" /></label>
        <label>cost <input id="ed-cost" type="number" value="${cost === '' ? '' : Number(cost)}" /></label>
        <label>costType <input id="ed-costType" value="${escapeAttr(String(costType))}" /></label>
        <label>duration (ms) <input id="ed-duration" type="number" value="${duration === '' ? '' : Number(duration)}" /></label>
        <label>yieldType <input id="ed-yieldType" value="${escapeAttr(String(yieldType))}" /></label>
      </div>
      <div class="actions">
        <button id="save-only">Save YAML only</button>
        <button id="save-and-build">Save &amp; rebuild</button>
        <span class="status">${escapeHtml(editStatus)}</span>
      </div>
      <p class="hint">⚠️ Only top-level scalar fields are exposed. Comments in the YAML
      file will be stripped by the rewrite (js-yaml limitation). Nested fields
      (rewards/costs/requirements/onSuccess) keep their existing values.</p>
    </div>
  `;
}

function wireEditorHandlers(entity: Entity): void {
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
    // Strip undefined keys from patch
    for (const k of Object.keys(patch)) if (patch[k] === undefined) delete patch[k];
    return patch;
  };

  const save = async (alsoBuild: boolean) => {
    if (!api?.contentWriteAction) {
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
    const res = await api.contentWriteAction(entity.id, patch);
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
  const npcs = Object.values({ ...NPC_REGISTRY, ...vandaraNPCs });

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

search.addEventListener('input', () => {
  filter = search.value.trim().toLowerCase();
  renderList();
});

render();
