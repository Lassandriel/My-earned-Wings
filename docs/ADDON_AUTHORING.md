# Authoring an Addon

How to add modular content to My-earned-Wings without touching the base
game. Everything an addon can do — content, patches against base,
custom code, UI extensions, save migrations — is covered here.

**Easiest start:** copy `content/addons/smoke_test/` and rename. That
folder exists as the worked example — it uses every capability once,
and every file in it is commented. Then come back here when you need
the details.

---

## 1 · Folder structure

Each addon lives in its own folder under `content/addons/`:

```
content/addons/<your-addon>/
  manifest.yaml                  # required
  schema.yaml                    # optional — own required-field rules

  # ── YAML content (any subset of these) ──
  resources/  *.yaml
  modifiers/  *.yaml
  actions/    *.yaml
  items/      *.yaml
  npcs/       *.yaml
  buffs/      *.yaml
  homes/      *.yaml
  milestones/ *.yaml
  navigation/ *.yaml
  titles/     *.yaml
  sections/   *.yaml             # action-category cards in a sub-tab
  subTabs/    *.yaml             # tabs under Main / other parent views
  settingsTabs/ *.yaml           # entries in the Settings sidebar
  patches/    *.yaml             # modifications to base / other addons

  # ── Translations ──
  i18n/<lang>/<context>.yaml     # e.g. i18n/de/items.yaml

  # ── Assets (copied to public/ at build time) ──
  resources/img/  *.{webp,png,jpg,jpeg}
  sfx/            *.{mp3,ogg,wav,m4a}

  # ── UI extensions ──
  views/<name>.html              # new top-level tabs
  slots/<slot-id>.html           # inject HTML into base data-slot markers
  styles/<name>.css              # custom CSS

  # ── TypeScript modules (build-time only) ──
  handlers.ts                    # customExecute bridges
  effects.ts                     # new onSuccess effect types
  ticks.ts                       # per-second engine hook
  migrations.ts                  # save migrations for this addon
```

**Skipping an addon**: rename the folder to start with `_` (e.g.
`_my_addon/`). The build script skips underscore-prefixed dirs.

The base game itself is an addon (`content/addons/core/`). It has the
same shape as any other addon and ships every YAML category plus
images + i18n. Read its files when you want to see how something is
done in production.

---

## 2 · `manifest.yaml`

Every addon needs a `manifest.yaml` at its root. Minimum:

```yaml
name: vandara              # MUST match the folder name. lowercase + digits
                           # + underscore + hyphen, starts with a letter.
version: 0.1.0             # strict semver (MAJOR.MINOR.PATCH).
```

All optional fields:

```yaml
description: "What this addon adds."
author: "Your name"
enabledByDefault: true     # informational; the player toggles addons
                           # in Settings → Addons regardless of this.

requires:                  # other addons this depends on. ENFORCED at
  - core                   # build time (build dies if a required addon
  - some-other-addon       # isn't installed) and at runtime (runtime
                           # addons with missing deps are skipped).

overrides:                 # names of addons whose entries this addon
  - core                   # wants to overwrite on collision. Build script
                           # topo-sorts the load order so this addon
                           # loads AFTER its targets — last write wins.
                           # Soft: missing override targets warn, don't
                           # error.

required: true             # locks the Disable toggle in Settings → Addons.
                           # `core` uses it; most addons should leave it
                           # unset so players stay free to turn them off.
```

Validation is strict — unknown top-level fields fail the build. The
manifest schema lives in `scripts/build-content.ts`.

---

## 3 · IDs and namespacing

The build script enforces unique IDs across every loaded addon per
category. On a collision the build fails with both source paths:

```
Error: [build-content] Duplicate ID "item-axe": defined in BOTH
  addons/core/items AND addons/vandara/items. ...
```

**Convention**: prefix every ID you ship with your addon name, e.g.
`act-vandara-research`, `item-vandara-textbook`, `npc-vandara-solen`.
This is convention only — the build accepts non-prefixed IDs as long
as they don't collide today — but you're one base addition away from
breaking. Just prefix.

To *intentionally* override a base entry, declare `overrides: [core]`
in your manifest and ship YAML with the same id as the base one. The
topo-sort guarantees your write wins.

---

## 4 · Content categories (YAML)

All 13 categories use the same `<id>` + arbitrary fields shape; the
specific field schema lives with each base example.

| Category | What it defines | Base example to read |
|---|---|---|
| `resources` | Trackable numbers (energy, wood, magic, …) | `content/addons/core/resources/materials.yaml` |
| `modifiers` | Stackable multipliers / flat-adds against pipeline keys | `content/addons/core/modifiers/yields.yaml` |
| `actions` | Things the player clicks (gather, build, npc-step, …) | `content/addons/core/actions/core.yaml` |
| `items` | Inventory items + furniture | `content/addons/core/items/tools.yaml` |
| `npcs` | NPC descriptors (name, icon, image, progKey, …) | `content/addons/core/npcs/village.yaml` |
| `buffs` | Time-limited modifier bundles | `content/addons/core/buffs/buffs.yaml` |
| `homes` | The player's base options + capacity | `content/addons/core/homes/homes.yaml` |
| `milestones` | One-shot unlock conditions | `content/addons/core/milestones/milestones.yaml` |
| `navigation` | Sidebar tabs (top-level views) | `content/addons/core/navigation/navigation.yaml` |
| `titles` | Display titles awarded to the player | `content/addons/core/titles/titles.yaml` |
| `sections` | Action-category cards inside a sub-tab | `content/addons/core/sections/kitchen.yaml` |
| `subTabs` | Tabs under a parent view (e.g. Main) | `content/addons/core/subTabs/main.yaml` |
| `settingsTabs` | Entries in the Settings sidebar | `content/addons/core/settingsTabs/main.yaml` |

YAML loaders are uniform: any file under each category gets parsed as
an array of objects with `id: string` (other fields free-form, the
build doesn't enforce shape unless `schema.yaml` adds requirements
— see §12).

---

## 5 · Translations

Place translation files at `i18n/<lang>/<context>.yaml`. Languages and
contexts match what base uses (`de`, `en` × `ui`, `actions`, `items`,
`npcs`, `buffs`, `milestones`, `modifiers`, `navigation`, `resources`,
`titles`, `logs`). The build merges your keys onto the base bundle.

- **New keys** (didn't exist in base) — silently merged.
- **Overrides** (key existed in base, you gave it a different value) —
  merged, plus a dev-time warning at build:

```
⚠️  1 translation override(s) by addons:
   [de/ui] ui_house: "Eigenes Haus" → "Heim (Vandara)"
```

If you genuinely want to rewrite a base string for a total-conversion
addon, this is the intended path. If you didn't mean to override,
rename your key (prefix it).

**Where do specific keys live?** Mirror what base does:

| Key references | Goes in context |
|---|---|
| NPC `nameKey`, navigation labels, settings strings, button text | `ui.yaml` |
| Action titles + descriptions | `actions.yaml` |
| NPC dialogue lines | `npcs.yaml` |
| Item titles + descriptions | `items.yaml` |
| Log messages, story beats | `logs.yaml` |

`check-i18n` (part of `npm run check-all`) verifies that every referenced
key resolves in both languages and warns about missing entries.

---

## 6 · Images & SFX

Drop images at `content/addons/<name>/resources/img/*.{webp,png,jpg,jpeg}`
and audio at `content/addons/<name>/sfx/*.{mp3,ogg,wav,m4a}`. The build
copies them into the served public/ tree:

- `content/addons/<name>/resources/img/<file>` → `public/img/addons/<name>/<file>`
- `content/addons/<name>/sfx/<file>` → `public/sfx/addons/<name>/<file>`

Filenames are **lowercased on copy** so case-sensitive filesystems
(Linux CI, packaged builds) don't bite you. Reference assets from
YAML using the served URL:

```yaml
# NPC portrait
- id: npc-vandara-pamle
  image: img/addons/vandara/pamle.webp

# Action SFX — the key is "<addon>/<basename>" (no extension)
- id: act-vandara-brew
  sfx: vandara/brew
```

Both `public/img/addons/<name>/` and `public/sfx/addons/<name>/` are
gitignored — re-running `build:content` recreates them from your
source files.

`check-assets` (part of `check-all`) validates every `image:` /
`icon:` / `sfx:` reference at build time.

---

## 7 · Patches — modifying base or other addons

Sometimes you need to *change* something base ships, not add to it.
That's what patches are for. Drop YAML files at
`content/addons/<name>/patches/*.yaml`; each file is a list of patch
entries. The patch engine validates and applies them after all content
has loaded.

Every patch has `targetType` + `targetId` + one or more operations.
All ops supported today, grouped by target type:

| Target | Ops |
|---|---|
| `action` | `prependSteps`, `appendSteps`, `replaceStep`, `removeStep`, `addOnSuccess`, `addStepOnSuccess`, `addRequirement`, `modifyCost`, `setIcon`, `setImage` |
| `npc` | `bumpMaxProgress`, `addTradeActions`, `setImage`, `setIcon`, `setColor`, `mergeDialogues`, `setChapter`, `setLocation` |
| `item` | `addModifiers`, `setSpaceCost`, `setImage` |
| `resource` | `setInitial`, `setInitialLimit`, `setColor` |
| `modifier` | `setBaseValue` |
| `buff` | `setDuration`, `addModifiers` |
| `home` | `setCapacity`, `setImage` |
| `milestone` | `addRequirement`, `addOnUnlock` |
| `navigation` | `setIcon`, `setImage`, `setLabel`, `setRequiredFlag` |
| `section` | `setHeaderLabel`, `setRequiresFlag`, `setActionCategory` |

Example — extend an NPC's questline by appending a step:

```yaml
- targetType: action
  targetId: act-npc-vandara-fafa
  appendSteps:
    - cost: 5
      costType: energy
      requirements:
        flags.vandara-shadow-revealed: true
      onSuccess:
        - type: unlockNPC
          id: npc-vandara-sariel
```

Build-time patches **fail loud** on missing targets (the addon ships
with the build — a missing reference is an addon bug). Runtime patches
warn and skip instead (a missing target means the user's installed
addons don't line up; warn, don't crash).

If your addon wants to **deliberately override** something another
addon patched, set `overrides: [other-addon]` in your manifest. The
load order then guarantees your patch wins.

For the exact validation rules of each op, see `src/core/addons/patches.ts`
(`validatePatchEntry`).

### 7.1 · Hidden-until-achieved NPC steps (`extendNPCArc`)

For multi-step NPC arcs where a later step should NOT be visible until
a player achievement happens, ship the NPC with the lower
`maxProgress` (covering only what's currently reachable), put the
hidden step in the action's `steps[]` anyway, and fire the built-in
`extendNPCArc` effect from the achieving step's `onSuccess`:

```yaml
# Achieving step (e.g. the village teacher's graduation step)
- ...
  onSuccess:
    - type: setFlag
      flag: school_graduate
      value: true
    - type: extendNPCArc
      npcId: npc-teacher    # bumps her own maxProgress by +1
      # by: 2               # optional, defaults to +1
```

At the moment the step fires, the targeted NPC's `maxProgress` bumps
live and the next step in its action becomes both visible and
clickable in the same beat — no "X/N progress" spoiler before the
achievement. The bump targets any NPC, not just the same one: use
this to make Vandara's gate warden "remember" the player after a
shadow reveal that happened with a different mentor.

Pair with `addStepOnSuccess` (patch op) when the achieving step
lives in base or another addon and you need to inject the bump
without forking the whole step:

```yaml
- targetType: action
  targetId: act-npc-teacher    # base game's village teacher
  appendSteps:
    - cost: 5                  # add your new step at the end
      ...
  addStepOnSuccess:
    step: last                 # hook base's LAST step (whatever
    effects:                   # the current count is — robust
      - type: extendNPCArc     # against base adding more steps)
        npcId: npc-teacher
```

`step: last` resolves against the steps array BEFORE this patch's
own `appendSteps`/`prependSteps` run, so the hook always lands on
the step base shipped as last. You can also use negative numbers
(`-2` = second-to-last) or absolute indices when the position is
stable. See `content/addons/vandara/patches/teacher.yaml` for the
canonical example.

---

## 8 · Custom code (`handlers.ts` / `effects.ts` / `ticks.ts` / `migrations.ts`)

YAML can't always express what you need. Build-time addons get four
TypeScript hooks to plug imperative logic into the engine. Each one
is optional. None of them work at runtime — TS needs the build step.

### 8.1 · `handlers.ts` — custom action execution

When a YAML action's behaviour can't be expressed via `onSuccess`
effects, declare `customExecute: <addon>/<handler>` on the action
and ship the TS handler. Build auto-prefixes every handler with your
addon name so collisions are impossible.

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

YAML side:

```yaml
- id: act-myaddon-something
  customExecute: myaddon/ping
```

Return value: `true | false | void | { success, ... }`. Returning
`false` (or `{ success: false }`) signals failure to the action
pipeline (no rewards, fail SFX, etc.).

### 8.2 · `effects.ts` — custom `onSuccess` effect types

The action engine has a registry of effect-type handlers. Base ships
`setFlag`, `unlockNPC`, `modifyResource`, `addBuff`, … An addon can
register its own. Ship a file like this:

```ts
// content/addons/<your-addon>/effects.ts
import type { RegisterAddonEffects } from '../../../src/core/addons/effects';

export const registerEffects: RegisterAddonEffects = (register) => {
  register('summonShadow', (game, effect) => {
    // effect is the YAML payload, cast as needed
    const npc = (effect as unknown as { npc?: string }).npc;
    if (npc) game.flags[`shadow_present_${npc}`] = true;
  });
};
```

YAML side:

```yaml
- id: act-vandara-ritual
  onSuccess:
    - type: summonShadow
      npc: shade-elder
```

Unknown effect types log a warning at runtime (used to silently
no-op). Collisions between two addons registering the same type warn;
last write wins via the topo-sort.

### 8.3 · `ticks.ts` — per-second engine hook

For periodic logic — mana regen, weather cycles, spawn timers — ship
a tick hook. It runs once per simulation second, between built-in
ticks (buffs/focus/regen/producers) and the UI sync, so reads see
fresh values and writes propagate the same frame.

```ts
// content/addons/<your-addon>/ticks.ts
import type { AddonTickHook } from '../../../src/core/addons/ticks';

export const onTick: AddonTickHook = (state, _services, deltaTime) => {
  // Mutate state.addonState directly — see §11 for the namespace.
  const addonState = (state.addonState ??= {});
  const s = (addonState.myaddon ??= {}) as { ticks?: number };
  s.ticks = (s.ticks ?? 0) + 1;
};
```

A throwing tick is caught — the rest of the addon ticks still run.

### 8.4 · `migrations.ts` — addon save migrations

If your addon's persisted state changes shape across versions, ship
migrations the same way base does. Versions are tracked per-addon in
the save's `addonSchemaVersions` field.

```ts
// content/addons/<your-addon>/migrations.ts
import type { AddonMigrationModule } from '../../../src/core/services/save-migrations';

export const SCHEMA_VERSION: AddonMigrationModule['SCHEMA_VERSION'] = 2;

export const MIGRATIONS: AddonMigrationModule['MIGRATIONS'] = {
  2: (state) => {
    // Rename a flag your addon used to set.
    const flags = state.flags as Record<string, boolean>;
    if (flags && flags.old_flag_name) {
      flags.new_flag_name = true;
      delete flags.old_flag_name;
    }
  },
};
```

A save without `addonSchemaVersions.<your-addon>` is treated as v1, so
every migration from v2 upward runs. A migration that throws skips the
rest of *this* addon's migrations; other addons keep going.

---

## 9 · UI extensions

### 9.1 · Top-level views (`views/<name>.html`)

If your addon needs a whole new sidebar tab with its own layout, drop
a view fragment:

```html
<!-- content/addons/myaddon/views/lab.html -->
<div class="game-view-content">
  <div class="category-header">
    <h3 x-text="$store.game.t('myaddon_lab_title')"></h3>
  </div>
  <p>Wood: <strong x-text="$store.game.resources.wood ?? 0"></strong></p>
</div>
```

The build wraps it in `<section class="view-section" x-show="$store.game.view === 'myaddon/lab'">`
automatically. Add a `navigation` entry with the matching id:

```yaml
# content/addons/myaddon/navigation/lab.yaml
- id: myaddon/lab
  label: nav_myaddon_lab
  icon: crafting             # base icon name → img/menu/menu_crafting.webp
  # OPTIONAL: image: img/addons/myaddon/menu_lab.webp
```

View ids must match `[a-z0-9_/-]+`. The file's basename becomes the
last segment of the view id.

### 9.2 · Sub-tabs (`subTabs/*.yaml`)

To add a sub-tab to an existing parent view (e.g. Main), drop a YAML
entry:

```yaml
- id: myaddon-research
  parentView: main           # which top-level view to attach to
  labelKey: myaddon_subtab_research
  order: 30                  # ascending. base ships: general=10, herstellen=20
  # OPTIONAL: alwaysShown: true       — always visible
  # OPTIONAL: requiresFlag: shadows   — only when flag is truthy
```

By default a sub-tab shows iff at least one `section` points at it (so
you don't see an empty sub-tab). `alwaysShown` and `requiresFlag` are
explicit overrides.

### 9.3 · Settings tabs (`settingsTabs/*.yaml`)

To add an entry to the Settings modal's sidebar:

```yaml
- id: myaddon
  icon: 🧪
  labelKey: myaddon_settings_tab
  order: 60                  # after base's 50 (System), before 60 (Addons)
  # OPTIONAL: requiresFlag: myaddon-unlocked
```

The body comes via the `settings-content` slot — see §9.5.

### 9.4 · Sections (`sections/*.yaml`)

A section is a card-list of actions matching a category, placed in a
specific sub-tab:

```yaml
- id: myaddon-bench
  subTab: myaddon-research
  headerLabel: myaddon_section_bench
  actionCategory: vandara-alchemy
  # OPTIONAL: requiresFlag: vandara-enrolled
```

Every action whose YAML has `category: vandara-alchemy` then auto-renders
inside this section. No HTML to write.

### 9.5 · Slots (`slots/<slot-id>.html`)

Base views can declare `<div data-slot="<id>">` markers. Addons fill
them by shipping HTML at `slots/<slot-id>.html`. Multiple addons can
target the same slot — their blocks append in load order.

Slots currently shipped by base:

| Slot id | Where | Use for |
|---|---|---|
| `settings-content` | Bottom of the Settings modal body | Addon-defined settings tab bodies |
| `menu-actions-end` | Main menu, between New Game/Settings and Quit | Extra menu buttons |
| `menu-footer-end` | Main menu footer | Credits, mod badges, mod-specific links |

Example — a Settings tab body. Pair this with a matching
`settingsTabs/*.yaml` entry that has `id: myaddon`:

```html
<!-- content/addons/myaddon/slots/settings-content.html -->
<div x-show="settingsTab === 'myaddon'" x-transition>
  <section class="settings-card">
    <h4 x-text="$store.game.t('myaddon_panel_title')"></h4>
    <p x-text="'Tick count: ' + ($store.game.addonState?.myaddon?.ticks ?? 0)"></p>
  </section>
</div>
```

The slot service re-initialises from the nearest `[x-data]` ancestor
after injection, so `x-show` against a modal-local variable
(`settingsTab` here) does react to changes. Without that re-init the
expression would evaluate once and freeze. Don't roll your own
injection — use the slot system.

### 9.6 · Styles (`styles/<name>.css`)

Drop CSS files; they're concatenated into `src/generated/addon-styles.css`
and bundled via Vite. Use this for custom particle types, settings-card
extras, or anything you ship.

```css
/* content/addons/myaddon/styles/particles.css */
.juice-particle.p-shadow {
  color: #6b21a8;
  text-shadow: 0 0 6px rgba(107, 33, 168, 0.7);
}
```

YAML side — any action can reference your particle type:

```yaml
- id: act-myaddon-ritual
  particleType: shadow       # CSS class becomes .p-shadow
```

Unknown particle types still render (they get the fallback color in
base CSS); they just look generic until you ship the matching CSS.

---

## 10 · Action hotkeys

Actions accept an optional `hotkey` field — any `KeyboardEvent.key` OR
`.code` value (whichever feels natural):

```yaml
- id: act-myaddon-cast
  hotkey: F4                # also accepts KeyB / Digit5 / ArrowUp / ...
```

The input handler builds a lookup map on first keydown after addon
load and dispatches O(1) per keypress. Base reserves F1/F2/F3 for the
primary actions (rest / meditate / eat); pick anything else.

---

## 11 · State & inter-addon helpers

### 11.1 · `addonState` namespace

Every addon gets its own bucket in `GameState.addonState[<your-addon>]`.
Use it for any persisted state your addon owns. Saves carry it
automatically via the existing deepMerge; load + reset work too.

From TS code (handlers, ticks, effects):

```ts
const addonState = (state.addonState ??= {}) as Record<string, Record<string, unknown>>;
const myState = (addonState.myaddon ??= {}) as { shadowEnergy?: number };
myState.shadowEnergy = (myState.shadowEnergy ?? 0) + 1;
```

From Alpine views:

```html
<span x-text="$store.game.addonStateFor('myaddon').shadowEnergy ?? 0"></span>
```

The store's `addonStateFor<T>(name)` helper auto-creates the bucket on
first access.

### 11.2 · `isAddonLoaded(name)`

For inter-addon integrations that should light up only if the
companion addon is installed:

```ts
if ((state as any).isAddonLoaded?.('vandara')) {
  // light up the vandara-specific path
}
```

Or from a view:

```html
<button x-show="$store.game.isAddonLoaded('vandara')" ...></button>
```

Build-time and runtime addons both count.

### 11.3 · `manifest.requires`

Lists other addons this one *needs* to function. The build script
throws if a required addon isn't installed; the runtime loader skips
runtime addons whose deps aren't loaded. Use this when your addon
patches another addon's content or calls `isAddonLoaded` and treats a
`false` as a bug rather than a missing-companion graceful degradation.

### 11.4 · `manifest.overrides`

Lists addons this one *wants to override* on collision. Affects load
order — addons listed here load before this one, so your writes
(patches, translations, …) win deterministically. Missing override
targets warn but don't fail.

### 11.5 · `manifest.required`

`required: true` locks the Disable toggle in Settings → Addons. Use
sparingly. `core` is the obvious case.

---

## 12 · Schema validation (`schema.yaml`)

Optional. Use this to enforce field requirements on *your own* content
— base entries are never retroactively constrained.

```yaml
# content/addons/myaddon/schema.yaml
items:
  required: [shadowAffinity]
npcs:
  required: [vandaraType]
```

The build dies with a precise pointer if any of your YAML entries in
that category is missing the field:

```
[addon] myaddon/schema.yaml: entry "item-shadow-cup" in items/
  is missing required field "shadowAffinity"
```

For richer validation (type checks, value ranges, cross-references),
just write a unit test in your addon's TS files. The smoke_test addon's
`migrations.ts` shows the pattern.

---

## 13 · Save compatibility

The save file's `activeAddons` field is a snapshot of every addon that
was loaded when the save was written. On load, the engine compares
that list to what's currently active:

- **Missing addon** (was in save, isn't loaded now) → the addon-compat
  modal opens with the player's "Load anyway" / "Cancel" choice.
- **Version mismatch** → same modal, version diff shown.
- **New addon since save** → silent, treated as advisory.

Your addon's `migrations.ts` (§8.4) runs automatically when loading a
save where your version is older than the current one. No extra
plumbing needed beyond the file.

---

## 14 · Running and testing

```
npm run build:content      # regenerates everything under src/generated/
                           # + copies addon images/SFX to public/
npm run dev                # vite + electron, picks up changes via HMR
```

`npm run build:content` is the source of truth. Re-run it after any
addon change. It fails loud on:

- missing `manifest.yaml`
- manifest schema violation (bad name pattern, non-semver version,
  unknown top-level field, …)
- folder name ≠ manifest name
- `requires:` not satisfied
- override cycles (A overrides B, B overrides A)
- duplicate IDs across addons
- schema.yaml violations on your own content
- missing patch targets

`npm run check-all` is broader:

- `check-i18n` — every referenced translation key resolves
- `check-assets` — every referenced image/icon/sfx file exists
- `check-logic` — game-state invariants hold
- `check-unused` — no orphaned entries

Translation overrides log warnings — they don't fail the build.

---

## 15 · Runtime addons (no rebuild)

If you're an **end user of the packaged .exe** and just want to drop
in a community addon — or you're an author shipping pure-data without
forcing players to rebuild — this is the path.

### Where they live

The packaged build ships an `addons/` folder next to the .exe:

```
My-earned-Wings-win32-x64/
  My-earned-Wings.exe
  addons/
    README.txt
    _example/               ← skeleton; underscore = ignored
    your-addon/             ← drop yours here
      manifest.yaml
      items/*.yaml
      i18n/<lang>/<ctx>.yaml
      …
```

Settings → Addons → "Open addons folder" opens that directory in the
OS file manager (creates it on first use).

The loader also looks at `<packaged>/resources/addons/` as a fallback.

### What works at runtime

- All YAML content (every category from §4)
- Translations (`i18n/<lang>/<ctx>.yaml`)
- View fragments (`views/<name>.html`)
- Slot HTML (`slots/<slot-id>.html`)
- CSS (`styles/*.css`)
- SFX (`sfx/*.{mp3,ogg,wav,m4a}` — shipped as base64 data URLs via IPC)
- Patches (`patches/*.yaml`)

### What does NOT work at runtime

- **Any TS file** — `handlers.ts`, `effects.ts`, `ticks.ts`,
  `migrations.ts`. TypeScript needs a build step. Use the build-time
  addon path (`content/addons/<name>/`) and ship a custom build.
- **`schema.yaml` violations** — validation only runs at build.
- **New resources/stats in existing saves** — a runtime-introduced
  resource only appears in `initialState` from "New Game" onward.

### Conflict policy

Runtime addons **always lose** duplicate-id contests against base
content and build-time addons. The loader logs a warning per skipped
duplicate. Same rule for translation keys.

To diagnose, launch with `--debug`:

```
My-earned-Wings.exe --debug
```

DevTools opens; the `[RUNTIME-ADDONS]` log block reports what loaded
and what got skipped.

---

## 16 · Worked example: `smoke_test`

`content/addons/smoke_test/` lives in the repo as the canonical
worked example. It uses every capability once:

| Capability | File |
|---|---|
| Manifest with `requires` + `overrides` | `manifest.yaml` |
| Own NPC + action + sub-tab | `npcs/`, `actions/`, `settingsTabs/` |
| Patch against base | `patches/test_patches.yaml` |
| Schema | `schema.yaml` |
| Handler | `handlers.ts` (`noop`) |
| Custom effect type | `effects.ts` (`smokeFlash`) |
| Per-second tick | `ticks.ts` (writes to `addonState`) |
| Migrations | `migrations.ts` (SCHEMA_VERSION = 2) |
| Slot injection | `slots/settings-content.html` |
| CSS | `styles/smoke.css` (custom particle type) |
| Inter-addon helper | `ticks.ts` uses `isAddonLoaded('vandara')` |
| i18n in three contexts | `i18n/<lang>/{ui,actions,logs}.yaml` |

Open the game → Settings → Smoke tab to see the live counters proving
ticks, effects, and `isAddonLoaded` are all working.

To use it as a template: copy the folder, rename to your addon name,
edit `manifest.yaml`, and start removing what you don't need.

---

## 17 · Checklist before sharing

- [ ] `npm run build:content` succeeds with your addon enabled.
- [ ] `npx tsc --noEmit` is clean (catches handler/effect/tick type errors).
- [ ] `npm run check-all` passes — assets and translation keys resolve.
- [ ] `npm test` is green.
- [ ] Manual smoke test: enable, start a save, trigger your addon's
      actions, save+reload, all behaves correctly.
- [ ] `manifest.version` bumped if shipping changes to an existing addon.
- [ ] `manifest.description` accurate (it shows in Settings → Addons).

---

## 18 · Known limitations

- **No runtime TypeScript** — by design. Runtime addons stay YAML-only.
  Building a sandboxed JS subset (eval-allowlist) is technically possible
  but a security risk; not in scope.
- **No live addon refresh** — toggling an addon's enabled state in
  Settings is persisted, but the restart contract holds (registries
  + hooks are pruned at boot, not mid-session). Undoing patches /
  unregistering SFX live would be brittle.
- **`required: true` only locks the UI toggle** — it doesn't currently
  prevent the build from running without the addon. If you depend on
  another addon being there, use `requires:` (which IS enforced).
- **DevTools origin display** — the entity browser doesn't yet show
  which addon contributed a given entry. Settings → Addons surfaces
  per-addon entry *counts*; finer-grained drill-down isn't there yet.
