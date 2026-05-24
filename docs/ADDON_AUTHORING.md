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
  actions/  *.yaml                # optional, same schema as content/addons/core/actions/
  items/    *.yaml                # optional
  npcs/     *.yaml                # optional
  buffs/ modifiers/ homes/ milestones/ navigation/ titles/ resources/   *.yaml
  i18n/<lang>/<context>.yaml      # optional, e.g. i18n/de/items.yaml
  views/<name>.html               # optional — addon-shipped UI tabs (see §10)
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

## 10 · Adding a brand-new tab (view fragment)

If your addon needs more than just dropping items/NPCs into existing
tabs — i.e. it ships its own page with its own layout — you author
**view fragments** alongside the rest of the addon.

### Step 1: write the view HTML

Drop a file at `content/addons/<your-addon>/views/<viewname>.html`.
It's a regular Alpine view fragment — `$store.game` is in scope, all
the same directives work as in the base templates:

```html
<!-- content/addons/myaddon/views/lab.html -->
<div class="game-view-content">
  <div class="category-header">
    <h3 x-text="$store.game.t('myaddon_lab_title')"></h3>
  </div>
  <div class="panel-premium">
    <p>Wood: <strong x-text="$store.game.resources.wood ?? 0"></strong></p>
    <button @click="$store.game.commands.enqueue({ type: 'attemptAction', actionId: 'act-myaddon-experiment' })">
      Run experiment
    </button>
  </div>
</div>
```

The build script wraps this in `<section class="view-section"
x-show="$store.game.view === 'myaddon/lab'" x-transition:enter="view-enter">`
automatically — you don't write the wrapper.

### Step 2: register the tab in the sidebar

In `content/addons/<your-addon>/navigation/<file>.yaml`, add an entry
whose `id` matches the view path `<addon>/<viewname>`:

```yaml
- id: myaddon/lab
  label: nav_myaddon_lab     # translation key — define it in i18n/<lang>/ui.yaml
  icon: crafting             # base icon name; resolves to img/menu/menu_crafting.webp
  # OPTIONAL: ship your own icon, overrides the base convention
  # image: img/addons/myaddon/menu_lab.webp
  # OPTIONAL: gate behind a flag
  # requiredFlag: myaddon_unlocked
```

### Step 3: provide the translation

In `content/addons/<your-addon>/i18n/<lang>/ui.yaml`:

```yaml
nav_myaddon_lab: Laboratory
myaddon_lab_title: Arcane Laboratory
```

### How it wires together

| Step | What happens |
|---|---|
| Build | Scans `content/addons/*/views/*.html`, wraps each, writes a single `src/generated/addon-views.html` |
| Boot | `index.html` includes that generated file once. Alpine sees all sections at start-up. |
| Runtime | User clicks tab → `store.view = 'myaddon/lab'` → only matching `<section>` shows. |

No engine code touched. New tabs are pure content.

### Naming rules

- `views/<file>.html` → view id `<addon>/<file>` (the `.html` is stripped).
- Addon name `myaddon` → view id `myaddon/lab` for `views/lab.html`.
- Use the SAME id in the navigation entry's `id` field.
- View ids match `[a-z0-9_/-]+` (constrained by manifest name regex +
  file naming). Don't use spaces or capital letters.

### Limitations / known gaps

- **No view-specific lifecycle hooks** — view fragments are static HTML,
  no `boot()` per view. If you need imperative setup, wire it via
  `customExecute` handlers (handlers.ts) triggered by an action the
  view's button enqueues.
- **No view-fragment hot-reload** — editing a view file mid-`dev` server
  requires re-running `npm run build:content` to regenerate
  `addon-views.html`, then Vite picks it up via HMR.

---

## 11 · Runtime addons (no rebuild needed)

If you're an **end user of the packaged .exe** and just want to drop in
a community addon — or you're an author who wants to ship a pure-data
addon without forcing players to rebuild from source — this is the path.

### Where they live

The packaged build ships an `addons/` folder right next to the .exe:

```
My-earned-Wings-win32-x64/
  My-earned-Wings.exe
  addons/
    README.txt
    _example/                 ← skeleton; underscore = ignored
    your-addon/                ← drop yours here
      manifest.yaml
      items/*.yaml
      i18n/<lang>/<ctx>.yaml
      …
```

The loader also looks at `<packaged>/resources/addons/` as a fallback
for build-shipped addons.

### What works at runtime

- Everything **data**: `manifest.yaml` + all 10 category folders
  (`actions`, `items`, `npcs`, `buffs`, `homes`, `milestones`,
  `navigation`, `titles`, `modifiers`, `resources`)
- **Translations** under `i18n/<lang>/<ctx>.yaml`
- **View fragments** under `views/<name>.html` (same `<addon>/<view>`
  convention as §10) — they get wrapped and injected into the DOM at
  boot, navigation entries with the matching `id` make them clickable

### What does NOT work at runtime

- **No `handlers.ts`** — TypeScript needs a build step. Custom
  `customExecute` logic still requires the build-time addon path
  (`content/addons/<name>/handlers.ts` + `npm run build:content`).
- **No new resources/stats in existing saves** — runtime-only
  resources and stats only appear in `initialState` from a "New Game"
  onward. New items/actions/NPCs/translations/views work immediately
  in any save.

### Conflict policy

Runtime addons **always lose** duplicate-id contests against base
content and against build-time addons (the ones compiled into
`src/generated/content.ts`). The loader logs a warning per skipped
duplicate. Translation keys behave the same way — base / build-time
keys are never overwritten by a runtime addon.

To diagnose, launch the .exe with `--debug`:

```
My-earned-Wings.exe --debug
```

DevTools opens; the `[RUNTIME-ADDONS]` log block reports what loaded
and what got skipped.

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
