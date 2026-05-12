/**
 * My-earned-Wings · Dev Tools (Phase 4 MVP)
 *
 * Loads the YAML-generated content registry and lists every action in a
 * sidebar with a YAML preview on the right. Read-only for now — editing
 * + write-back lands in the next iteration.
 *
 * Runs as a separate Vite entry (devtools.html) inside its own Electron
 * BrowserWindow. The Alpine.js + game runtime are NOT loaded here, so
 * this is intentionally a lightweight standalone view.
 */
import { ACTION_REGISTRY_GENERATED } from '../generated/content';
import yaml from 'js-yaml';

interface ActionLite {
  id: string;
  category?: string;
  costType?: string;
  cost?: number;
  duration?: number;
  yieldType?: string;
  passiveProduction?: unknown;
  [k: string]: unknown;
}

const list = document.getElementById('list')!;
const main = document.getElementById('main')!;
const meta = document.getElementById('meta')!;
const search = document.getElementById('search') as HTMLInputElement;

const actions = Object.values(ACTION_REGISTRY_GENERATED) as ActionLite[];
const byCategory: Record<string, ActionLite[]> = {};
for (const a of actions) {
  const cat = a.category || 'uncategorized';
  (byCategory[cat] ??= []).push(a);
}

meta.textContent = `${actions.length} actions · ${Object.keys(byCategory).length} categories`;

let activeId: string | null = null;
let filter = '';

function render() {
  // Sidebar
  list.innerHTML = '';
  for (const cat of Object.keys(byCategory).sort()) {
    const filtered = byCategory[cat].filter(
      (a) =>
        !filter ||
        a.id.toLowerCase().includes(filter) ||
        cat.toLowerCase().includes(filter),
    );
    if (!filtered.length) continue;

    const header = document.createElement('div');
    header.className = 'category';
    header.textContent = cat;
    list.appendChild(header);

    for (const a of filtered.sort((x, y) => x.id.localeCompare(y.id))) {
      const row = document.createElement('div');
      row.className = 'item-row' + (a.id === activeId ? ' active' : '');
      row.innerHTML = `<div>${a.id}</div>`;
      row.onclick = () => {
        activeId = a.id;
        render();
      };
      list.appendChild(row);
    }
  }

  // Main panel
  if (!activeId) {
    main.innerHTML = '<div class="empty-state">Wähle eine Aktion links aus.</div>';
    return;
  }

  const action = actions.find((a) => a.id === activeId);
  if (!action) {
    main.innerHTML = '<div class="empty-state">Aktion nicht gefunden.</div>';
    return;
  }

  const stats: string[] = [];
  if (action.cost && action.costType) {
    stats.push(`<div class="stat"><div class="num">${action.cost}</div><div class="label">Cost (${action.costType})</div></div>`);
  }
  if (action.duration) {
    stats.push(`<div class="stat"><div class="num">${(action.duration / 1000).toFixed(1)}s</div><div class="label">Duration</div></div>`);
  }
  if (action.yieldType) {
    stats.push(`<div class="stat"><div class="num">${action.yieldType}</div><div class="label">Yields</div></div>`);
  }
  if (action.passiveProduction) {
    const p = action.passiveProduction as { resource?: string; baseYield?: number; interval?: number };
    stats.push(`<div class="stat"><div class="num">${p.baseYield ?? '?'}/${p.interval ? p.interval / 1000 + 's' : '?'}</div><div class="label">Producer (${p.resource})</div></div>`);
  }

  const yamlText = yaml.dump(action, { lineWidth: 80, sortKeys: false });

  main.innerHTML = `
    <div class="detail-header">
      <h2>${action.id}</h2>
      <div class="id">category: ${action.category || '—'}</div>
    </div>
    <div class="stats-grid">${stats.join('')}</div>
    <pre class="yaml">${escapeHtml(yamlText)}</pre>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

search.addEventListener('input', () => {
  filter = search.value.trim().toLowerCase();
  render();
});

render();
