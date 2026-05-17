# Authoring an Addon

How to add modular content to My-earned-Wings without touching the base
game. If you just want to copy a working skeleton, look at
`content/addons/_example/` — every file in there is commented.

This doc is the reference. Pair it with `docs/ADDON_SYSTEM_PLAN.md` for
the design rationale behind the choices below.

---

## 1 · Folder structure

Each addon lives in its own folder under `content/addons/`:

```
content/addons/<your-addon>/
  manifest.yaml                  # required
  actions/  *.yaml                # optional, same schema as content/base/actions/
  items/    *.yaml                # optional
  npcs/     *.yaml                # optional
  buffs/ modifiers/ homes/ milestones/ navigation/ titles/ resources/   *.yaml
  i18n/<lang>/<context>.yaml      # optional, e.g. i18n/de/items.yaml
  handlers.ts                     # optional — TS for customExecute logic
```

**Skipping an addon**: rename the folder to start with `_` (e.g.
`_my_addon/`). The build script skips underscore-prefixed dirs, so
`_example/` is never loaded.

---

## 2 · `manifest.yaml`

Minimum:

```yaml
name: vandara              # MUST match the folder name. lowercase + digits +
                           # underscore + hyphen, starts with a letter.
version: 0.1.0             # strict semver (MAJOR.MINOR.PATCH).
```

Optional:

```yaml
description: "What this addon adds."
author: "Your name"
enabledByDefault: true     # informational for now; runtime toggling is
                           # a future milestone
requires:                  # other addons this depends on (build-script
  - weather                # dependency check is not implemented yet —
  - moods >=0.2.0          # documented for future expansion)
```

Validation is strict — unknown top-level fields fail the build. Open an
issue / a PR before adding new manifest fields.

---

## 3 · IDs and namespacing

The build script enforces unique IDs across base + every active addon
per category. On a collision the build fails with both source paths:

```
Error: [build-content] Duplicate ID "item-axe": defined in BOTH
  base/items AND addons/vandara/items. ...
```

**Convention**: prefix every ID you ship with your addon name, e.g.
`act-vandara-research`, `item-vandara-textbook`, `npc-vandara-solen`.
This is convention only — the build will still accept a non-prefixed
ID if it doesn't collide today, but you're one base addition away from
breaking. Just prefix.

---

## 4 · Translations

Place translation files at `i18n/<lang>/<context>.yaml`. Languages and
contexts must match what base uses (`de`, `en` × `ui`, `items`, `npcs`,
…). The build merges your keys onto the base bundle.

- **New keys** (key didn't exist in base) — silently merged.
- **Overrides** (key existed in base, you gave it a different value) —
  merged, plus a dev-time warning is logged at build time so accidental
  overrides are visible:

```
⚠️  1 translation override(s) by addons:
   [de/ui] ui_house: "Eigenes Haus" → "Heim (Vandara)"
```

If you genuinely want to re-word a base string for a total-conversion
addon, this is the intended path. If you didn't mean to override, rename
your key.

---

## 5 · Assets

Convention: ship assets under `public/img/addons/<your-addon>/...`
(or `public/sfx/addons/<your-addon>/...` for audio). Reference from
YAML via the same path:

```yaml
- id: npc-vandara-solen
  image: img/addons/vandara/npcs/magistra_solen.webp
```

Base assets at `public/img/<topic>/...` stay where they are — you can
reference them from your addon's YAML too.

There's no enforced validator for asset paths today; the existing CI
"check-all" step that catches missing base assets will catch addon ones
too once those assets are referenced.

---

## 6 · Custom handlers (`handlers.ts`)

When YAML data alone can't express what you need, ship a `handlers.ts`
alongside your YAML. Export your handlers either as a default object or
as named exports — the build picks one or the other.

```ts
// content/addons/<your-addon>/handlers.ts
import type { CustomExecuteHandler } from '../../../src/data/actions/custom-handlers';

const ping: CustomExecuteHandler = (state, actionId) => {
  state.addLog('Pinged from ' + actionId, 'logs');
  return true;
};

export default { ping };
// or: export { ping };
```

The build script auto-prefixes every handler key with your addon name.
A handler named `ping` in `content/addons/myaddon/handlers.ts` becomes
addressable from YAML as:

```yaml
- id: act-myaddon-something
  customExecute: myaddon/ping
```

Handlers receive `(state, actionId)`:
- `state` — the live engine state (GameState shape). Mutate it directly
  (`state.flags.foo = true`, `state.resource.add(state, 'wood', 5)`),
  emit bus events, queue commands. UISync flushes to Alpine each RAF.
- `actionId` — the YAML action's id, useful when the same handler serves
  multiple actions.

Return value: `true | false | void | { success, ... }`. Returning
`false` (or `{ success: false }`) signals failure to the action
pipeline (no rewards applied, fail SFX, etc.).

---

## 7 · Running and testing

```
npm run build:content      # regenerates src/generated/content.ts +
                           # src/generated/addon-handlers.ts
npm run dev                # vite + electron, picks up changes via HMR
```

`npm run build:content` is the source of truth. Re-run it any time you
add/change/remove an addon. The build fails loudly on:
- missing manifest.yaml
- manifest schema violation (bad name pattern, non-semver version, …)
- folder name ≠ manifest name
- duplicate ID across base + addons

Translation overrides only log warnings — they don't fail the build.

---

## 8 · What doesn't exist yet

These are documented in `docs/ADDON_SYSTEM_PLAN.md` and intentionally
deferred for now:

- **Dependency resolution**: `requires` is parsed but not enforced.
- **Runtime toggling**: settings UI to enable/disable addons without
  rebuild. Requires save-format work first (must record active addons
  so old saves don't crash on missing references).
- **Conflict resolution UI**: when two addons override the same
  translation key, the second-loaded wins silently (after the warning).
  No interactive merge.
- **Devtools origin display**: the devtools entity browser doesn't yet
  show which addon contributed an entry. Easy enhancement when it
  matters.

---

## 9 · Checklist before sharing

- [ ] `npm run build:content` succeeds with your addon enabled.
- [ ] `npx tsc --noEmit` is clean (catches handler type errors).
- [ ] `npm run check-all` passes — your addon's referenced assets and
      translation keys all resolve.
- [ ] `npm test` is green.
- [ ] Manual smoke test: enable, load a save, trigger your addon's
      actions, save+reload, all behaves correctly.
- [ ] manifest.version bumped if you've shipped changes.
