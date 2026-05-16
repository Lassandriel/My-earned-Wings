import {
  api,
  list,
  main,
  meta,
  trData,
  TR_LANGS,
  TR_CONTEXTS,
  PRIMARY_LANG,
  state,
  render,
  escapeAttr,
  escapeHtml,
} from './state';

/**
 * Translations editor: pick a context (ui/items/npcs/…), then a key, edit
 * its value in every language. Save writes back to the YAML source via the
 * Electron API and optionally re-runs the content build so the main game
 * hot-reloads.
 */

export function renderTranslationsList(): void {
  const allKeys = new Set<string>();
  for (const lang of TR_LANGS)
    for (const k of Object.keys(trData[lang]?.[state.trContext] || {})) allKeys.add(k);
  const keyArr = [...allKeys].sort();
  const filtered = keyArr.filter((k) => !state.filter || k.toLowerCase().includes(state.filter));
  meta.textContent = `${TR_LANGS.join(' / ')} · context "${state.trContext}" · ${keyArr.length} keys · ${filtered.length} shown`;

  const ctxBar = document.createElement('div');
  ctxBar.className = 'category';
  ctxBar.innerHTML = `context: <select id="tr-ctx-pick" style="margin-left:6px;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-size:12px;">${TR_CONTEXTS.map(
    (c) =>
      `<option value="${escapeAttr(c)}"${c === state.trContext ? ' selected' : ''}>${escapeHtml(
        c,
      )} (${Object.keys(trData[PRIMARY_LANG]?.[c] || {}).length})</option>`,
  ).join('')}</select> &nbsp;<button id="tr-add-key" class="kv-add" style="display:inline-block;margin:0;padding:2px 8px;">+ new key</button>`;
  list.appendChild(ctxBar);

  for (const key of filtered) {
    const missing: string[] = [];
    for (const lang of TR_LANGS) {
      if (!trData[lang]?.[state.trContext]?.[key]) missing.push(lang);
    }
    const row = document.createElement('div');
    row.className = 'item-row' + (key === state.trActiveKey ? ' active' : '');
    const badge = missing.length
      ? ` <span class="id" style="color:#fca5a5;">missing: ${escapeHtml(missing.join(','))}</span>`
      : '';
    row.innerHTML = `${escapeHtml(key)}${badge}`;
    row.onclick = () => {
      state.trActiveKey = key;
      state.trEditStatus = '';
      render();
    };
    list.appendChild(row);
  }

  (document.getElementById('tr-ctx-pick') as HTMLSelectElement).onchange = (e) => {
    state.trContext = (e.target as HTMLSelectElement).value;
    state.trActiveKey = null;
    state.trEditStatus = '';
    render();
  };
  (document.getElementById('tr-add-key') as HTMLButtonElement).onclick = () => {
    const newKey = prompt(`New translation key in context "${state.trContext}":`)?.trim();
    if (!newKey) return;
    if (allKeys.has(newKey)) {
      alert(`Key "${newKey}" already exists in this context.`);
      return;
    }
    for (const lang of TR_LANGS) {
      const langMap = (trData[lang] ??= {});
      const ctxMap = (langMap[state.trContext] ??= {});
      ctxMap[newKey] = '';
    }
    state.trActiveKey = newKey;
    state.trEditStatus = 'New key added (not saved yet — click Save).';
    render();
  };
}

export function renderTranslationsDetail(): void {
  if (!state.trActiveKey) {
    main.innerHTML = `<div class="empty-state">Wähle links einen Translation-Key aus.<br><br>
      <span style="font-size:12px;opacity:0.7;">Roter <code>missing:</code>-Badge zeigt Lücken in einer Sprache.<br>
      Mit "+ new key" oben kannst du neue Keys anlegen.</span></div>`;
    return;
  }

  const writer = api?.contentWriteTranslation;
  const writable = !!writer;

  const langInputs = TR_LANGS.map((lang) => {
    const val = trData[lang]?.[state.trContext]?.[state.trActiveKey!] ?? '';
    return `
      <div class="tr-pane">
        <h4>${escapeHtml(lang.toUpperCase())}</h4>
        <textarea class="raw-yaml" data-lang="${escapeAttr(lang)}" rows="4" placeholder="(empty)">${escapeHtml(val)}</textarea>
      </div>`;
  }).join('');

  main.innerHTML = `
    <div class="detail-header">
      <h2>${escapeHtml(state.trActiveKey)}</h2>
      <div class="id">context: ${escapeHtml(state.trContext)} · ${TR_LANGS.length} languages</div>
    </div>
    <div class="tr-grid">${langInputs}</div>
    <div class="editor">
      <div class="actions">
        <button id="tr-save"${writable ? '' : ' disabled'}>Save all languages</button>
        <button id="tr-delete"${writable ? '' : ' disabled'} style="background:#7f1d1d;border-color:#b91c1c;">🗑 Delete key (all langs)</button>
        <button id="tr-build"${writable ? '' : ' disabled'}>Save &amp; rebuild</button>
        <span class="status">${escapeHtml(state.trEditStatus)}</span>
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
    state.trEditStatus = 'Writing…';
    render();
    const errs: string[] = [];
    for (const lang of TR_LANGS) {
      const v = values[lang] ?? '';
      const res = await writer!(lang, state.trContext, state.trActiveKey!, v);
      if (!res.ok) errs.push(`${lang}: ${res.error}`);
      else {
        const langMap = (trData[lang] ??= {});
        langMap[state.trContext] = {
          ...(langMap[state.trContext] || {}),
          [state.trActiveKey!]: v,
        };
      }
    }
    if (errs.length) {
      state.trEditStatus = '✗ ' + errs.join(' | ');
      render();
      return;
    }
    state.trEditStatus = `✓ Saved ${TR_LANGS.length} language(s).`;
    if (alsoBuild) {
      state.trEditStatus += ' Building…';
      render();
      const build = await api.contentBuild();
      state.trEditStatus = build.ok
        ? '✓ Saved and rebuilt — main game will hot-reload.'
        : '⚠ Saved but build failed: ' + build.output.split('\n').slice(-3).join(' | ');
    }
    render();
  };

  document.getElementById('tr-save')!.onclick = () => saveAll(false);
  document.getElementById('tr-build')!.onclick = () => saveAll(true);
  document.getElementById('tr-delete')!.onclick = async () => {
    if (!confirm(`Delete key "${state.trActiveKey}" from all languages?`)) return;
    state.trEditStatus = 'Deleting…';
    render();
    const errs: string[] = [];
    for (const lang of TR_LANGS) {
      const res = await writer!(lang, state.trContext, state.trActiveKey!, null);
      if (!res.ok) errs.push(`${lang}: ${res.error}`);
      else delete trData[lang]?.[state.trContext]?.[state.trActiveKey!];
    }
    if (errs.length) {
      state.trEditStatus = '✗ ' + errs.join(' | ');
    } else {
      state.trEditStatus = '';
      state.trActiveKey = null;
    }
    render();
  };
}
