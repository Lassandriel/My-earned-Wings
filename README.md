# Your Earned Wings ✦ (Draconia Core 2.1)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**. 

This **Demo Version** features the first complete story arc: **The Heart of Draconia**. You play as a wingless "Lung" (dragon-kin) in a world where flight is everything, discovering that true power and "wings" can be earned through loyalty to the ground, inner magic, and building a community.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (Phases 1-5.7)
Experience the transformation of a grounded wanderer into a pillar of the community:
1.  **Survival**: Learn to gather resources and manage your symmetric vitality (50 Energy, 50 Magic).
2.  **Roots**: Build your first campfire, a tent, and a permanent house (40 Wood / 40 Stone).
3.  **Community**: Forge bonds with village inhabitants, from the quiet Baker to Archmage Aris.
4.  **Upgrades (Possessions)**: Manage your tools and artifacts in your personal vault.
5.  **Arcane Focus**: Master the art of magially driven automation.
6.  **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom (60 Magic) are maximized.

---

## ✦ Core Features

### 🛖 Modular Housing & Masteries
*   **Base Building Progression**: Develop your home from a simple fire to a fully equipped hut with a garden and specialized wings.
*   **Kitchen & Arcanum**: Build unique stations for **Gourmet Cooking** (+10 Satiation) and **Astral Meditation** (generating specialized shards).
*   **Balancing v2.1**: A refined economy with symmetric stats and optimized resource storage (Cap 50).

### 👥 NPC Interaction & Trust
*   **Trust & Progress**: Unlock 10+ unique interactions and secret lore through a data-driven NPC progression system.
*   **Village Hub**: NPCs are the heart of the narrative and the marketplace, providing essential trade and story milestones.

### 🔄 Arcane Focus (Automation)
*   **Magical Automation**: Toggle the "Magic Eye" ✨ on loopable actions to automate them at the cost of **3 Magic per second**.
*   **Cost Substitution**: Focused actions consume Magic instead of Energy, allowing for effortless industrial output.
*   **Loop Mode**: Toggleable manual repetition for standard gameplay.

### 🔮 Senior Architecture (Core 2.1)
*   **SOA (Service-Oriented)**: Decoupled logic from the state store using 15 specialized system managers.
*   **Event Bus**: Pure pub/sub architecture for all side-effects (Audio, Logs, UI Triggers).
*   **Bilingual Sync**: 100% parity between DE/EN localizations with key-fallback support.

---

## 🏗️ Project Architecture

```text
src/
├── main.js             # Entry: System orchestration & service-proxy hub.
├── state.js            # Foundation: Schema definition & initial state.
├── data/               # Database: Registries for Resources, NPCs and Actions.
├── lang/               # Localization: Synchronized DE/EN dictionaries.
├── partials/           # Interface: Modular HTML fragments (1:1 with tabs).
├── assets/             # Aesthetics: CSS grid-layouts and design tokens.
└── systems/            # Logic: Decentralized service modules.
    ├── bus.js          # Event Hub (Pub/Sub)
    ├── pipeline.js     # Modifiers / Math
    ├── actions.js      # Effect Execution (Arcane Focus Logic)
    ├── resource.js     # Economy / Satiation logic
    ├── persistence.js  # Memory / Save management
    ├── audio.js        # Soundscapes
    ├── logger.js       # Narrative Log management
    ├── juice.js        # Visual Haptics
    ├── ui.js           # View Flows / Scaling
    ├── story.js        # Milestone / Finale logic
    ├── prologue.js     # Sequential Narrative
    ├── dialogue.js     # NPC Text Engine
    ├── npc.js          # Progression & Trust logic
    ├── engine.js       # Game Loops (Focus & Tickers)
    └── item.js         # Consumption / Upgrade logic
```

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (Current LTS)

### Quick Start
1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game in development mode.

### 📦 Building the Executable
To create a standalone Windows application (`.exe`):
1.  `npm run build`
2.  `npm run build-exe`

The finished app will be located in `BUILDS/My-earned-Wings-win32-x64`.

---

*Created by Lassandriel · April 2026 · Draconia Core 2.0 Hardened Build*