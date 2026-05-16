import { api, state, render, escapeHtml } from './state';

/**
 * Validation panel: runs `npm run check-all` in the project root via the
 * Electron API and streams the output back into the panel.
 */
export function renderValidationPanel(): string {
  const apiOk = !!api?.contentValidate;
  const out =
    state.validationOutput ||
    (apiOk
      ? '> Click „Run check-all" to validate the project content.'
      : '> Validation is only available inside Electron (electronAPI missing).');

  // Strip ANSI escape codes for display
  const clean = out.replace(/\x1b\[[0-9;]*m/g, '');

  // Naive line classification for color hints
  const lines = clean.split(/\r?\n/).map((line) => {
    if (/✗|✖|error|fehlt|FAIL/i.test(line)) return `<span class="vline err">${escapeHtml(line)}</span>`;
    if (/⚠|warn|warning/i.test(line)) return `<span class="vline warn">${escapeHtml(line)}</span>`;
    if (/✓|✅|ok|pass|complete|perfect/i.test(line))
      return `<span class="vline ok">${escapeHtml(line)}</span>`;
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
        <button id="run-validate" ${state.validationRunning ? 'disabled' : ''}>${
          state.validationRunning ? 'Running…' : '▶ Run check-all'
        }</button>
        <p class="hint">Checks: i18n keys, asset paths, content references, save fixtures, parity. Output below.</p>
      </section>

      <section>
        <h3>Output</h3>
        <pre class="validation-output">${lines.join('\n')}</pre>
      </section>
    </div>
  `;
}

export function wireValidationHandlers(): void {
  const btn = document.getElementById('run-validate') as HTMLButtonElement | null;
  if (!btn) return;
  btn.onclick = async () => {
    if (!api?.contentValidate) {
      state.validationOutput = 'Validation requires Electron (electronAPI missing).';
      render();
      return;
    }
    state.validationRunning = true;
    state.validationOutput = 'Running…';
    render();
    try {
      const res = await api.contentValidate();
      state.validationOutput = res.output || (res.ok ? 'No output (OK).' : 'No output (FAIL).');
    } catch (err) {
      state.validationOutput = 'Error: ' + (err as Error).message;
    }
    state.validationRunning = false;
    render();
  };
}
