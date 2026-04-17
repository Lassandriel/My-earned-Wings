# Your Earned Wings ✦ (Demo Edition)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**. 

This **Demo Version** features the first complete story arc: **The Heart of Draconia**. You play as a wingless "Lung" (dragon-kin) in a world where flight is everything, discovering that true power and "wings" can be earned through loyalty to the ground.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Demo Journey (Phase 1-4)
Experience the transformation of a grounded wanderer into a pillar of the community:
1.  **Survival**: Learn to gather resources and manage your limited vitality.
2.  **Roots**: Build your first shelter, campfire, and eventually a permanent home.
3.  **Community**: Forge bonds with the village inhabitants, from the quiet Baker to the Ancient Sage.
4.  **The Finale**: Reach the legendary **Tree of Life** — the majestic heart of the ground.

## ✦ Core Features

### 🛖 Persistent Housing & Growth
*   **Base Building**: Progress from a simple campfire to a fully equipped hut.
*   **Furniture Synergies**: Craft chairs, tables, and bookshelves to double your learning efficiency.
*   **Resource Management**: Build specialized depots to expand your storage capacities for Wood, Stone, and Shards.

### 👥 NPC Companions & Mentors
*   **Mentorship**: Complete multi-stage questlines for the Teacher and the Sage to unlock powerful actions like **Study**.
*   **Working Together**: Once you've earned an NPC's trust, you can assign them to tasks. They will gather resources for you in exchange for a salary of Shards.

### 🔮 Magic & Ground Lore
*   **No Passive Regen**: Survival requires intent. Manage Energy and Magic through targeted rest, eating, and meditation.
*   **Chronicle**: Every action you take is recorded in a beautifully color-coded narrative journal.

### ✨ Premium Visuals & UX
*   **Glassmorphism Aesthetic**: A sleek, modern dark mode with smooth transitions and vibrant "magical" particles.
*   **Dynamic Language**: Switch between **German** and **English** on the fly.
*   **Desktop Optimization**: Integrated custom scrollbars, window scaling, and professional app features.

*   **Styling**: Premium Vanilla CSS

## 🏗️ Project Architecture (Senior 2.0)

The game follows a strictly modular "Senior Architecture" focused on decoupling and scalability.

### 📁 Directory Overview

```text
src/
├── main.js             # Engine: Store assembly, event wiring & boot sequence.
├── state.js            # Foundation: Defines the initial global state.
├── systems/            # Logic & Services: The "brains" of the game.
│   ├── bus.js          # Event Hub: Central Event Bus (Pub/Sub mechanism).
│   ├── pipeline.js     # Calculations: Dynamic modifiers & Value Pipeline.
│   ├── actions.js      # Effect Runner: Universal processor for data-driven actions.
│   ├── resource.js     # Resource Manager: Logic for gains, costs & capacities.
│   ├── persistence.js  # Memory: LocalStorage handling & save-code management.
│   └── audio/logger... # Feedback: Atmosphere, narrative logs, and particles.
├── data/               # Database: Pure data definitions (Actions, NPCs, Items).
│   └── actions/        # Collections: Gathering, Crafting, Housing, Village.
├── partials/           # Interface: Modular HTML fragments for each tab.
└── assets/             # Aesthetics: CSS variables and view-specific styles.
```

### 🔮 Core Logic Patterns

- **Event-Driven**: Systems never call each other directly; they communicate via global events (`SOUND_TRIGGERED`, `SAVE_REQUESTED`).
- **Data-Driven**: New actions or items are defined as pure data objects—the central `ActionProcessor` handles the execution logic.
- **Value-Pipeline**: All numerical values (gains/costs) are dynamically calculated through modifiers before being applied to the state.

## 🚀 Testing & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (Current LTS)

### Quick Start
1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game.

### 📦 Building the Executable
To create a standalone Windows application (`.exe`):
1.  `npm run build`
2.  `npm run build-exe`

The finished app will be located in `BUILDS/My-earned-Wings-win32-x64`.

---
*Created by Lassandriel · April 2026 · Draconia Demo Build*