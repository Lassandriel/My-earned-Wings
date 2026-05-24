// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/slots/<slot-id>.html
// Regenerate: npm run build:content

/**
 * Build-time addon slot-injection payload. Keyed by slot id; each
 * entry is an ordered list of HTML blocks contributed by addons.
 * Consumed by src/core/services/addon-slots.ts at boot.
 */
export const ADDON_SLOTS_GENERATED: Record<string, Array<{ addonName: string; fileName: string; html: string }>> = {
  "settings-content": [
    {
      "addonName": "smoke_test",
      "fileName": "settings-content.html",
      "html": "<!--\n  Smoke-test settings tab body. Injected into base's\n  `<div data-slot=\"settings-content\">` at boot, inside the modal's\n  x-data scope so `settingsTab` resolves correctly.\n\n  Renders a small panel showing the addonState bucket so the user\n  can VISUALLY confirm that ticks.ts is running (the counter\n  increments live) and that effects.ts has fired if they triggered\n  act-smoke-ping. Pure-Alpine, no extra wiring.\n-->\n<div x-show=\"settingsTab === 'smoke'\" x-transition>\n  <section class=\"settings-card\">\n    <h4 x-text=\"$store.game.t('smoke_panel_title', 'logs')\"></h4>\n    <p\n      class=\"hint\"\n      x-text=\"$store.game.t('smoke_panel_hint', 'logs')\"\n    ></p>\n    <ul class=\"smoke-stats\">\n      <li>\n        <strong x-text=\"$store.game.t('smoke_stat_ticks', 'logs')\"></strong>:\n        <span x-text=\"($store.game.addonState?.smoke_test?.ticks ?? 0)\"></span>\n      </li>\n      <li>\n        <strong x-text=\"$store.game.t('smoke_stat_flashes', 'logs')\"></strong>:\n        <span x-text=\"($store.game.addonState?.smoke_test?.smokeFlashCount ?? 0)\"></span>\n      </li>\n      <li>\n        <strong x-text=\"$store.game.t('smoke_stat_vandara', 'logs')\"></strong>:\n        <span x-text=\"($store.game.addonState?.smoke_test?.vandaraPresent ? '✔' : '—')\"></span>\n      </li>\n    </ul>\n  </section>\n</div>"
    }
  ]
};
