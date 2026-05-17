# Addon System — Planning Doc

Phase 15+ from ROADMAP.md. Engine hardening is done; this is the next
real milestone. This doc captures the current state, the target
structure, the open design decisions (with recommendations), and a
step-by-step implementation plan.

---

## Current state (what addons need to plug into)

**Content pipeline** (`scripts/build-content.ts`, 250 LOC):
- Reads `content/<category>/*.yaml` for 10 categories (actions, items,
  npcs, buffs, modifiers, homes, milestones, navigation, titles,
  resources).
- Reads `content/i18n/<lang>/<context>.yaml` for translations.
- Aggregates everything into `src/generated/content.ts` as one big
  typed-but-loose module.
- `arrayToRecord` throws on duplicate IDs across files within a category.
- No notion of "where did this entry come from".

**Custom-execute handlers** (`src/data/actions/custom-handlers.ts`):
- TS file with hand-registered handlers for actions that need imperative
  logic beyond what YAML can express.
- YAML refers to a handler by string (`customExecute: tree_of_life`).
- Currently 4 handlers. Stable, low churn.

**Assets** (`public/img/...`):
- Organised by topic (`characters/`, `homes/`, `school/`, `backgrounds/`).
- YAML references assets via path string (no validator beyond
  "file exists" in CI).

**State**:
- Engine state separated from Alpine in Phase 2 Stage 2.
- Content registries are loaded eagerly at module import time. No
  runtime add/remove of content.

---

## Target structure

```
content/
  base/                          # everything that's currently in content/
    actions/ items/ npcs/ … /
    i18n/<lang>/<context>.yaml
  addons/
    _example/                    # skeleton with comments
      manifest.yaml
      actions/  items/  …
      i18n/<lang>/<context>.yaml
      handlers.ts                # optional, only if addon needs TS
      assets/                    # addon-shipped images / sfx
    vandara/                     # first real addon (the academy
                                 # rollback brought back)
      manifest.yaml
      …
```

**`manifest.yaml` (per addon, minimal v1):**
```yaml
name: vandara
version: 0.1.0
description: "The Academy storyline — three paths, late-game recipes."
author: Lassandriel
enabledByDefault: true        # compile-time addons can be disabled by
                              # commenting the dir; runtime toggling is
                              # a later milestone
requires: []                  # addon name + optional version constraint
                              # e.g. ["weather >=0.2.0"]
```

**Compile-time path (v1)**: build script discovers `content/addons/*/`,
merges into registries, fails build on un-resolvable conflicts.

**Runtime path (later)**: settings UI to enable/disable addons without
rebuild. Out of scope for v1.

---

## Open design decisions (with recommendations)

For each: my recommendation in bold, what to choose differently and
when, and what the decision costs if reversed later.

### D1 · ID namespacing — strict prefix vs. lax with collision-fail

**Recommendation: lax + build-fail on collision.**

- *Strict* (`vandara:npc-magistra-solen`): every YAML reference includes
  the prefix. No collisions ever. Costs: verbose, all existing IDs
  would have to migrate to a `base:` prefix, breaks save compatibility,
  more cognitive load for the solo dev.
- *Lax* (current scheme, build script just errors on dup ID): IDs stay
  readable, no migration cost. Costs: 3rd-party addon authors have to
  coordinate prefixes by convention (`vandara_npc_solen` instead of
  `npc-solen`). For 1-3 addons ever this is fine.

Reversal cost: medium. Switching from lax to strict later is a
search/replace on every YAML + save migration. Manageable.

### D2 · TS code in addons — allowed or YAML-only

**Recommendation: allowed, behind a single `handlers.ts` convention.**

- *Allowed*: addons can ship custom-execute handlers, get full power.
  Build script imports `content/addons/<name>/handlers.ts` if present
  and merges into `CUSTOM_EXECUTE_HANDLERS`. Naming convention prevents
  collisions: handler keys are auto-prefixed with addon name.
- *YAML-only*: addons can only declare data. Total-conversion content
  works, but anything needing imperative logic (like Tree-of-Life's
  demo-completion side effect) is impossible from an addon.

Reversal cost: low. Closing the door later is just removing the import.

### D3 · Translation overrides — allowed or forbidden

**Recommendation: allowed, with a dev-time warning log.**

- *Allowed*: addon `i18n/de/ui.yaml` keys overwrite base. Useful for
  language polish, total-conversion theming. Order: base → addons in
  alphabetical name order → last wins. Manifest could later add a
  `priority` field if real ordering issues come up.
- *Forbidden*: addons can only add new keys, build fails on duplicate.
  Safer but blocks legitimate use (Vandara might want to re-word
  "ui_school" → "ui_academy").

Reversal cost: low. The warning logs make accidental overrides visible.

### D4 · Asset path convention

**Recommendation: `public/img/addons/<name>/...` + same convention for
audio under `public/sfx/addons/<name>/`.**

- Build-content can optionally validate that every asset path referenced
  by an addon YAML resolves under the addon's own assets directory OR
  base. Catches typos early.
- Addons can ship to `public/img/addons/<name>/` and reference as e.g.
  `img/addons/vandara/npcs/solen.webp` from YAML.
- Existing base assets stay where they are — no migration.

Reversal cost: low.

### D5 · Base content location — move to `content/base/` or stay in `content/`

**Recommendation: move to `content/base/`.**

- Clean mental model: `content/` contains only addon-like things, base
  is just the "always-on" addon.
- One-time mass move (`git mv content/{cat} content/base/{cat}` for
  each category). Touches every YAML path reference in build-content.ts
  (~12 lines). No save-format change.
- Alternative: keep base at `content/{cat}/`, addons at
  `content/addons/<name>/{cat}/`. Slightly weird asymmetry but zero
  migration.

Reversal cost: low (it's just `git mv` either direction).

---

## Implementation steps

Each step ≈ one self-contained commit. Smoke-test after each.

1. **Move base content** (D5) — `git mv content/<cat>/ content/base/<cat>/`
   for all 10 categories + i18n. Update build-content.ts paths.
   Verify: `npm run build:content` → byte-identical
   `src/generated/content.ts` modulo header.

2. **Addon discovery + manifest schema** — build-content.ts also scans
   `content/addons/*/` for directories. Each must have a
   `manifest.yaml` with the v1 fields. Validate with Ajv schema. No
   actual addon content yet, just the loader.

3. **Merge addon content into registries** (D1) — for each addon, load
   its `<cat>/*.yaml` and i18n. Merge using same arrayToRecord, but on
   ID collision report origin: "act-eat exists in base/actions/core.yaml
   AND addons/vandara/actions/foo.yaml". Build fails. Translation
   collisions log a warning per D3.

4. **Addon handler loading** (D2) — if `addons/<name>/handlers.ts`
   exists, import it. Expected shape: `export default { name: handler }`
   record. Merge into `CUSTOM_EXECUTE_HANDLERS`, auto-prefix keys with
   addon name (`vandara/npc_execute`). YAML `customExecute:
   vandara/npc_execute` to call.

5. **Asset path convention** (D4) — document in
   `docs/ADDON_AUTHORING.md`. Optionally add a CI step that checks
   addon YAML asset references resolve to `public/img/addons/<name>/`
   or `public/img/` (base).

6. **Skeleton `content/addons/_example/`** — minimal addon that adds
   one item, one NPC, one translation, one handler. Acts as living
   documentation. Commented heavily.

7. **`docs/ADDON_AUTHORING.md`** — the writeup for anyone (including
   future-you) authoring an addon. Folder structure, manifest fields,
   ID conventions, asset paths, how handlers wire up, build commands.

8. **First real addon: Vandara/Academy** — see Phase 13.5 in ROADMAP.
   Out of scope for this initial sprint; that's its own design pass.
   But the addon system should be ready to receive it.

---

## Risks / things to watch

- **Build determinism**: addon load order must be deterministic (sort
  by name, NOT filesystem order) or `src/generated/content.ts` will
  churn in git.
- **Save compatibility**: if an addon adds a flag/recipe/item, then is
  removed, loading an old save with references to that addon could
  crash. Save migration registry already handles renames; this needs a
  policy ("missing addon refs are silently dropped" or "fail-load with
  warning").
- **Test coverage**: build-content currently has no unit tests. Before
  adding addon merging logic, add 3-4 tests covering happy path,
  duplicate-ID error, missing manifest, translation override warning.
- **CI**: GitHub Actions needs to pick up addons too. Just runs
  build:content — should work automatically once addons are merged in.
- **Devtools entity browser**: needs to show the addon origin for each
  entry so you can tell at a glance "this NPC comes from Vandara". Add
  later, low priority for v1.

---

## What to confirm before starting

If you disagree with any of D1-D5 say so now. Otherwise I'll start
with step 1 (move base content) which is the smallest, hardest-to-undo
prerequisite for everything else.
