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
      "html": "<!--\r\n  Smoke-test settings tab body. Injected into base's\r\n  `<div data-slot=\"settings-content\">` at boot, inside the modal's\r\n  x-data scope so `settingsTab` resolves correctly.\r\n\r\n  Renders a small panel showing the addonState bucket so the user\r\n  can VISUALLY confirm that ticks.ts is running (the counter\r\n  increments live) and that effects.ts has fired if they triggered\r\n  act-smoke-ping. Pure-Alpine, no extra wiring.\r\n-->\r\n<div x-show=\"settingsTab === 'smoke'\" x-transition>\r\n  <section class=\"settings-card\">\r\n    <h4 x-text=\"$store.game.t('smoke_panel_title', 'logs')\"></h4>\r\n    <p\r\n      class=\"hint\"\r\n      x-text=\"$store.game.t('smoke_panel_hint', 'logs')\"\r\n    ></p>\r\n    <ul class=\"smoke-stats\">\r\n      <li>\r\n        <strong x-text=\"$store.game.t('smoke_stat_ticks', 'logs')\"></strong>:\r\n        <span x-text=\"($store.game.addonState?.smoke_test?.ticks ?? 0)\"></span>\r\n      </li>\r\n      <li>\r\n        <strong x-text=\"$store.game.t('smoke_stat_flashes', 'logs')\"></strong>:\r\n        <span x-text=\"($store.game.addonState?.smoke_test?.smokeFlashCount ?? 0)\"></span>\r\n      </li>\r\n      <li>\r\n        <strong x-text=\"$store.game.t('smoke_stat_vandara', 'logs')\"></strong>:\r\n        <span x-text=\"($store.game.addonState?.smoke_test?.vandaraPresent ? '✔' : '—')\"></span>\r\n      </li>\r\n    </ul>\r\n  </section>\r\n</div>"
    }
  ],
  "player-name-extra": [
    {
      "addonName": "vandara",
      "fileName": "player-name-extra.html",
      "html": "<!--\n  Vandara — sub-label under the player name in the status card.\n  Appears once the shadow reveal has fired (Veyra step 6 sets\n  the flag). Pure passive text — there is no title system entry\n  for it, just a story-derived identity badge.\n-->\n<template x-if=\"$store.game.flags['vandara-shadow-revealed']\">\n  <div class=\"vandara-identity-tag\" x-text=\"$store.game.t('ui_vandara_shadow_shifter_label')\"></div>\n</template>"
    }
  ]
};
