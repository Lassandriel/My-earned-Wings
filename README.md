# Your Earned Wings ✦ (Draconia Core 2.0)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**. 

This **Demo Version** features the first complete story arc: **The Heart of Draconia**. You play as a wingless "Lung" (dragon-kin) in a world where flight is everything, discovering that true power and "wings" can be earned through loyalty to the ground and building a community.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (Phases 1-5.6)
Experience the transformation of a grounded wanderer into a pillar of the community:
1.  **Survival**: Learn to gather resources and manage your limited vitality (Energy, Magic, Satiation).
2.  **Roots**: Build your first campfire, a tent, and eventually a permanent house at the edge of the village.
3.  **Community**: Forge bonds with village inhabitants, from the quiet Baker to the Ancient Sage and Ellie the Dream Wyvern.
4.  **Upgrades (Possessions)**: Manage your tools and artifacts in your personal vault.
5.  **Mastery**: Unlock the Arcane Sanctum, Master the Kitchen, and utilize the specialized Loop Mode.
6.  **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom are maximized.

---

## ✦ Core Features

### 🛖 Modular Housing & Masteries
*   **Base Building Progression**: Develop your home from a simple fire to a fully equipped hut with a garden and specialized wings.
*   **Kitchen & Arcanum**: Build unique stations for **Gourmet Cooking** (long-term buffs) and **Astral Meditation** (generating specialized shards).
*   **Satiation Mechanics**: A deep cost-scaling system where your hunger level directly impacts magical drain and effort.

### 👥 NPC Companions & Mentors
*   **Trust & Progress**: Unlock 10+ unique interactions and secret lore through a data-driven NPC progression system.
*   **Companionship**: Assign befriended NPCs to village tasks for passive yields, supported by a robust salary management system.

### 🔄 Automation & Flow (Loop Mode)
*   **Innate Looping**: Toggle repetitive "Loopable" actions (Gathering, Watering, Cooking) for a smoother gameplay flow.
*   **Smart Ticker**: A centralized 100ms task-engine ensures automation is snappy, responsive, and resource-aware.

### 🔮 Senior Architecture (Core 2.0)
*   **SOA (Service-Oriented)**: Decoupled logic from the state store using 15 specialized system managers.
*   **Value Pipeline**: Mathematical modifier system for dynamic cost and yield calculations.
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
    ├── actions.js      # Effect Execution
    ├── resource.js     # Economy / Satiation logic
    ├── persistence.js  # Memory / Save management
    ├── audio.js        # Soundscapes
    ├── logger.js       # Narrative Log management
    ├── juice.js        # Visual Haptics
    ├── ui.js           # View Flows / Scaling
    ├── story.js        # Milestone / Finale logic
    ├── prologue.js     # Sequential Narrative
    ├── dialogue.js     # NPC Text Engine
    ├── npc.js          # Progression / Companion logic
    ├── engine.js       # Game Loops (100ms, 1s, 30s)
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