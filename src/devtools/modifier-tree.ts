import {
  MODIFIER_INDEX,
  MODIFIER_REGISTRY_GENERATED,
  ModifierSource,
  state,
  escapeHtml,
} from './state';

/**
 * Modifier-tree panel: pick a calculation key on the left, see every Buff
 * / Item / Home that adds or multiplies into it on the right, plus the
 * base value (if any).
 */
export function renderModifierTree(): string {
  if (!state.activeId) {
    return `<div class="empty-state">Wähle links einen Calculation-Key aus.<br><br>
      <span style="font-size:12px;opacity:0.7;">Filterbeispiele: <code>wood</code>, <code>magic</code>, <code>limit</code>, <code>yield</code>, <code>cost</code></span></div>`;
  }
  const key = state.activeId;
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
    ${groupHtml('Buffs', grouped.buff ?? [])}
    ${groupHtml('Items', grouped.item ?? [])}
    ${groupHtml('Homes', grouped.home ?? [])}
    ${
      sources.length === 0
        ? '<p class="hint">No modifiers target this key. It uses the base value (or 0 if no base).</p>'
        : ''
    }
  `;
}
