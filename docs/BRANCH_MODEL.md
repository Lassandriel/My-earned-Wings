# BRANCH MODEL — demo, addons, and why branches sit far apart

Short version: **the long-lived addon branches are intentional.** They are not
stale feature branches waiting to be merged, and they are not forgotten work.
If you came here because `addons/luxana` is ~100 commits ahead of `main` and
has not moved in a while — that is the design, and this file explains it.

## `main` is the demo

`main` carries the **playable demo**, and the demo ships *without* Vandara and
Luxana. That is a deliberate scope decision, not an oversight — see the
Vandara/Academy rollback entry in [ROADMAP.md](./ROADMAP.md).

What `main` does contain is the addon *runtime*: the loader
(`src/core/services/runtime-addons.ts`), the `content/addons/_example/`
skeleton, the packaging step (`scripts/post-package-runtime-addons.cjs`) that
puts an `addons/` folder next to the built `.exe`, and the authoring docs.
Addons behave like mods: drop a folder in, and its content merges into the
game.

The deeper patch layer (`src/core/addons/`) that lets an addon modify content
that already exists lives on the addon branches, not in the demo.

## Addons are chronological, so their branches stack

Addons are ordered by **story chronology**, and the branches mirror that order:

```
main ───────> addons/vandara ───────> addons/luxana
(demo)         (earlier in the        (later in the
                story)                 story)
```

`addons/luxana` is branched from `addons/vandara`, not from `main`. It
therefore *contains* Vandara.

This is on purpose. Luxana comes after Vandara in the story, so **Luxana may
change Vandara** — shared mechanics, reactions, and content that only make
sense once both exist. These are the intended *co-energies* between addons.

The reverse is not allowed: **Vandara may not change Luxana.** An earlier
addon cannot reach forward and alter something that, from its point in the
story, has not happened yet.

### Consequence when reading the history

Because Luxana sits on top of Vandara, work on *Vandara* can legitimately
appear as commits on the `addons/luxana` branch — for example a later dialogue
pass over Vandara's scenes. `addons/vandara` marks Vandara's own line; the
combined, current state of both is on `addons/luxana`.

So do not "fix" the divergence by merging the addon branches into `main`, and
do not expect `addons/vandara` alone to represent the newest state of
everything Vandara-related.

## Quick reference

| Branch | Holds | Branched from |
| --- | --- | --- |
| `main` | playable demo + addon runtime | — |
| `addons/vandara` | Vandara addon (earlier in the story) | `main` |
| `addons/luxana` | Luxana addon, includes Vandara | `addons/vandara` |

Short-lived `fix/*`, `chore/*` and `dependabot/*` branches are ordinary
branches and *are* meant to be merged into `main`.
