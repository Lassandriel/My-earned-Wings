# Credits

Attribution and licensing for third-party assets bundled with the game.
Project code is under the repo's own LICENSE.

---

## 🎵 Music

### `public/music/forest_ambient.mp3` — "Forest Lullaby"

- **Composer / performer:** Lesfm
- **Source:** [Pixabay Music](https://pixabay.com/music/acoustic-group-forest-lullaby-110624/)
- **Mirror:** [YouTube](https://www.youtube.com/watch?v=WPTh2zvSbb0)
- **License:** [Pixabay Content License](https://pixabay.com/service/license-summary/)
  — free for commercial and non-commercial use, no attribution required.
  Credit given here as a thank-you and so future contributors can find
  the source if they want more from the same artist.

---

## 🔊 Sound effects

`public/sfx/{click,eat,fail,gather,success}.mp3` were collected during
early prototyping from various royalty-free sound libraries (Pixabay,
Freesound CC0 pool, OpenGameArt, and similar). Every track is under a
license that permits commercial reuse **without attribution**.

The exact per-file provenance was not preserved during download —
re-tracing it after the fact turned out to be impractical. If you
recognise one of these sounds and know the original artist, please open
an issue and the credit will go here.

If you'd like the strictest possible footing, all five SFX files can be
swapped for CC0 equivalents at any time:
- [Pixabay Sound Effects](https://pixabay.com/sound-effects/) — CC0
- [Freesound](https://freesound.org/) — filter for CC0
- [OpenGameArt](https://opengameart.org/) — filter for CC0
- [Kenney.nl](https://kenney.nl/assets) — CC0 game assets, audio included

---

## 🖼️ Visual assets

### Sky / cloud backgrounds

The pixel-art sky and cloud backgrounds under `public/img/background/` are
from [Craftpix — Free 1-bit Sky and Clouds Pixel Backgrounds](https://craftpix.net/freebies/free-1-bit-sky-and-clouds-pixel-backgrounds/),
distributed under the Craftpix free-license terms (free for commercial
and non-commercial use, no attribution required — credited here anyway).

### Character / NPC / scene art

Character portraits, NPC art, and background paintings under `public/img/`
were generated with Google's AI tools (Gemini / Nano Banana, NotebookLM,
Antigravity) by the project author, then often refined in Google Flow or
Canva. Many backgrounds were removed by hand. They are NOT commissioned
art and not licensed for redistribution outside this project.

Long-term plan (see `TODO.md` "Long-term"): replace with commissioned art
when budget allows, NPC portraits first.

Icons referenced via emoji glyphs come from the OS-native emoji font and
are not bundled with the project.

---

## 🅻 Fonts

Cinzel, Outfit, and Inter are loaded from
[Google Fonts](https://fonts.google.com/) via the public CDN. All three
are licensed under the [SIL Open Font License](https://scripts.sil.org/OFL).
No bundled copies — fetched at runtime.

---

## 📦 Code / runtime dependencies

See `package.json` for the full dependency list. Notable:
- [Alpine.js](https://alpinejs.dev/) — MIT
- [Electron](https://www.electronjs.org/) — MIT
- [Vite](https://vitejs.dev/) — MIT
- [js-yaml](https://github.com/nodeca/js-yaml) — MIT
- [Ajv](https://ajv.js.org/) — MIT
- [sql.js](https://sql.js.org/) — MIT
