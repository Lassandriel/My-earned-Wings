# Your Earned Wings ✦ (Draconia Core 2.0)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**. 

This **Demo Version** features the first complete story arc: **The Heart of Draconia**. You play as a wingless "Lung" (dragon-kin) in a world where flight is everything, discovering that true power and "wings" can be earned through loyalty to the ground and building a community.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (Phases 1-5)
Experience the transformation of a grounded wanderer into a pillar of the community:
1.  **Survival**: Learn to gather resources and manage your limited vitality (Energy, Magic, Satiation).
2.  **Roots**: Build your first campfire, a tent, and eventually a permanent house at the edge of the village.
3.  **Community**: Forge bonds with village inhabitants, from the quiet Baker to the Ancient Sage.
4.  **Possessions (Besitz)**: Manage your treasures, tools, and rarities in your personal vault.
5.  **The Finale**: Reach the legendary **Tree of Life** — the majestic heart of the ground.

## ✦ Core Features

### 🛖 Modular Housing & Growth
*   **Base Building Progression**: Develop your home from a simple fire to a fully equipped hut with a garden.
*   **Furniture Synergies**: Items like beds, tables, and bookshelves double your recovery and study efficiency.
*   **Satiation Mechanics**: A deep stat system where your nourishment level affects your magic efficiency and work power.

### 👥 NPC Companions & Mentors
*   **Trust & Progress**: Unlock new crafting recipes and game areas through meaningful interactions.
*   **Timed Tasks & Helpers**: Assign NPCs to tasks to generate passive resources, or sow herbs in your garden that grow while you play.

### 🔮 Senior Architecture (Core 2.0)
*   **Value Pipeline**: All game values are calculated dynamically—upgrades and stats scale your power organically.
*   **Event Bus**: Decoupled systems (Audio, Logs, Particles) communicate via a central Pub/Sub mechanism.
*   **Registry-Driven**: Content (Items, NPCs, Resources) is defined as pure data, making the game extremely easy to extend.
*   **Asynchronous Tasks**: A custom task ticker handles timed actions (like gardening) in the background.

## 🏗️ Project Architecture

```text
src/
├── main.js             # Engine: Store assembly, event wiring & heartbeat loops.
├── state.js            # Foundation: Defines the initial global state.
├── systems/            # Logic & Services: Modular game managers.
│   ├── bus.js          # Event Hub: Central Pub/Sub mechanism.
│   ├── pipeline.js     # Calculations: Dynamic modifiers & Value Pipeline.
│   ├── actions.js      # Effect Runner: Universal processor for (timed) actions.
│   ├── resource.js     # Resource Manager: Logic for gains, costs & capacities.
│   └── persistence.js  # Memory: LocalStorage handling & save-code management.
├── data/               # Database: Pure data definitions (Actions, NPCs, Items).
├── partials/           # Interface: Modular HTML fragments (1:1 with tabs).
└── assets/             # Aesthetics: CSS variables and grid-based styles.
```

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
*Created by Lassandriel · April 2026 · Draconia Core 2.0 Build*