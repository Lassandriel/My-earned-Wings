# My-earned-Wings ✦

A small atmospheric game about a wingless dragon-shifter who lands at the
edge of a quiet village and starts building a life on the ground.

This is a **free passion project**. No ads, no monetisation, no plan to ever
charge for it.

**Current demo version: v1.6.0** — see [CHANGELOG.md](./CHANGELOG.md). For
asset/audio credits see [CREDITS.md](./CREDITS.md).

![Official Logo](public/img/menu/logo_wings.webp)

## 🕹️ Play

- **In your browser**: <https://lassandriel.github.io/My-earned-Wings/> — no install, save lives in your browser.
- **Windows desktop (.exe)**: <https://github.com/Lassandriel/My-earned-Wings/releases> — better performance, plays offline.

---

## 📖 What it is

> **A note from me:** I've loved wings (and flying) for as long as I can
> remember. The world of Draconia started as a private worldbuild around its
> imperial family — somewhere just for me to live in. After a while I wanted
> to actually *walk* in it, and not as a hero. Just a slow place where you
> gather wood, build a roof, talk to the baker, and find a corner that feels
> yours. So I built this. In Draconia every dragon-shifter has wings —
> except the one you play. *(Hence the title.)* 😉

A cozy crafting & narrative game in the world of **Draconia** — a planet of
floating islands above a sea of lava, ruled by dragon-shifters. You can't
fly. You can't shift. So you make a life on the ground:

- Gather wood, stone, herbs, magic
- Build a home, then better homes
- Befriend the village (the baker, the herbalist, the smith, the teacher…)
- Read the lore books, learn the world
- Slowly find your place

The current build is the first chapter — a few hours of cosy progression
ending at the **Tree of Life** milestone, then a sandbox mode you can keep
playing in. Future chapters (the academy in
Vandara, magical automation, the ascent to the Sky Palace) are on the roadmap
but not built yet.

---

## 🌱 How it was made — honest about the tools

I want to be upfront about which parts are made by hand and which lean on
tools, because I think people deserve to know what they're playing.

| Part | How |
|---|---|
| **Story, lore, world-building** | All hand-written by me. The world of Draconia, the imperial family, the village NPCs, every dialogue - that's mine. My baby. ❤ |
| **Game design & balance** | All my decisions. |
| **Code** | Written with help from an AI coding assistant (Claude Code). Every change goes through my review and the test suite, but I'm not pretending I typed every line solo. Not with my disabled hands, lol. |
| **Music & sound** | Free-use / royalty-free assets I tracked down. No AI. |
| **Character art & images** | Generated with Google's AI tools (Gemini / Nano Banana, NotebookLM, Antigravity), then often refined in Google Flow or Canva. Many backgrounds are removed by hand. So the pipeline is AI-assisted but not "click and accept" — there's manual work behind every picture. I'd still love to work with real artists when the budget for it exists; commissioned art is the first thing I'd put money toward if this ever finds support. |

If the AI art is a deal-breaker for you, I get it; please don't feel obliged
to play. If you're OK with placeholders made by a solo dev who couldn't
afford otherwise, you're more than welcome.

---

## ✨ Features (current build)

- Atmospheric, story-led incremental loop — no idle automation, no XP grind
- Resource gathering, building, NPC bonds, lore books
- Own up to 3 houses, build them from the ground up! But first you need your paperwork done!
- 11 NPCs to befriend across the village
- Save & continue (browser uses localStorage, desktop uses local SQLite)
- Full English + German localisation
- Cozy by design — your hunger affects how well you work, but nothing punishes you

---

## 🚀 Run from source

```bash
npm install
npm run dev          # web version (Vite dev server)
npm run build:content   # rebuild YAML → typed TS after content edits
npm run test         # vitest suite
npm run check-all    # full validation (i18n, assets, logic, ...)
```

Requires Node 20+. The desktop build uses Electron 42.

---

## 🛠️ Project structure

The whole game is content-driven YAML. To add a new resource, action, item,
NPC, building or translation, edit a file under `content/` and run
`npm run build:content`. No TypeScript edit needed for content. The desktop build also has a built-in
dev-tools panel (🛠️ button in the top bar) that can edit content live,
including translations.

See `docs/ARCHITECTURE.md` and `docs/ROADMAP.md` for the longer picture.

---

## 🙏 Built on

Thanks to the people and projects whose work this is built on top of:

- **Sky / cloud backgrounds**: [Craftpix Free 1-bit Sky and Clouds](https://craftpix.net/freebies/free-1-bit-sky-and-clouds-pixel-backgrounds/) (free-use)
- **Music & sound effects**: free-use audio I gathered online over time. The
  original artist credits weren't always preserved when I downloaded them — if
  you recognise a track or sound and would like proper attribution, please
  open an issue and I'll fix it gladly.
- **Engine & frameworks**: [Electron](https://www.electronjs.org/),
  [Vite](https://vitejs.dev/), [Alpine.js](https://alpinejs.dev/),
  [sql.js](https://sql.js.org/), [js-yaml](https://github.com/nodeca/js-yaml),
  [Vitest](https://vitest.dev/).
- **Coding partner**: [Claude Code](https://claude.ai/code).

---

## 📜 Licence summary

- **Source code**: MIT — fork it, learn from it, build on it. Have fun.
- **The world of Draconia, story, lore, original character names and
  worldbuilding text**: © Lassandriel, all rights reserved. Please don't
  republish or reuse those parts without asking. Short quotes with
  attribution (reviews, fan discussions) are fine and welcome.
- **Music, sound effects, image assets**: each follows its own original
  licence — see the "Built on" section above.

See [LICENSE](LICENSE) for the legal text.

---

## 📬 Feedback & Contact

This is a **private, non-commercial hobby project**. No revenue is generated,
no donations are accepted, no commercial activity takes place.

For everything — bug reports, feedback, ideas, or anything else
(including legal or copyright concerns): please use GitHub Issues.

→ **[Open an issue](https://github.com/Lassandriel/My-earned-Wings/issues/new)**

---

Created by Lassandriel · A heart project, for anyone who wants to spend a
quiet hour on the ground.
