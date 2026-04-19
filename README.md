# Your Earned Wings ✦ (Golden Master - Core 3.5)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**.

> [!IMPORTANT]
> **GOLDEN MASTER VERSION 1.1.0**
> This build features the fully decoupled, 100% data-driven **Golden Master (Core 3.5)** engine with modular effects and registry-based navigation.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (The Core 3.0 Refactor)

Experience the transformation of a grounded wanderer into a pillar of the community:

1. **Survival**: Learn to gather resources and manage your symmetric vitality (50 Energy, 50 Magic).
2. **Crafting & Construction (Consolidated)**: A unified construction system. Build everything from your first campfire to a permanent house within a single registry.
3. **Community & Chronicle**: Forge bonds with village inhabitants. Your journey is now tracked in a modernized **NPC-based Chronicle**, grouping memories by the people you've met.
4. **Upgrades**: Manage your tools and artifacts in your personal vault.
5. **Arcane Focus**: Master the art of magically driven automation.
6. **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom are maximized.

---

## ✦ Core Features

### 🛖 Unified Construction System

* **Modular Progression**: Develop your home in the unified "Crafting" tab.
* **Asset Optimization**: Full **WebP integration** for all high-res assets, reducing the app size footprint by over 70% (from 71MB to ~17MB images).
* **Balancing v3.0**: A refined economy with symmetric stats and optimized resource storage.

### 👥 NPC Chronicle & Narrative

* **Grouped Stories**: The journal now automatically groups narrative milestones by NPC characters, providing a clear overview of your social progress.
* **World Events**: Generic milestones are gathered in the "World Chronicle" section.

### 🔄 Arcane Focus (Automation)

* **Magical Automation**: Toggle the "Magic Eye" ✨ on loopable actions to automate them at the cost of **3 Magic per second**.
* **Cost Substitution**: Focused actions consume Magic instead of Energy, allowing for effortless industrial output.

### 🔮 Architecture (Golden Master Core 3.5)

* **100% Data-Driven**: Every gameplay rule, modifier, and requirement lives in a registry. The engine is entirely content-agnostic.
* **Modular Effect System**: Dynamic effect registration (`registerEffect`) allows for seamless expansion without core code changes.
* **Generic Milestone Engine**: A powerful requirement engine (`milestones.js`) manages all progression and finale logic.
* **SOA (Service-Oriented)**: Decoupled logic from the state store using specialized system managers.
* **Event Bus**: Pure pub/sub architecture for all side-effects (Audio, Logs, UI Triggers).

---

## 🏗️ Project Structure

```text
src/
├── main.js             # Entry: System orchestration & service-hub.
├── state.js            # Foundation: Schema definition & initial state.
├── data/               # Database: Registries for Resources, NPCs, Actions, Navigation and Milestones.
├── lang/               # Localization: Synchronized DE/EN dictionaries.
├── partials/           # Interface: Modular HTML fragments.
├── assets/             # Aesthetics: CSS grid-layouts and design tokens.
└── systems/            # Logic: Decentralized service modules.
    ├── pipeline.js     # Registry-driven Modifier System
    ├── engine.js       # Universal Production & Milestone Tickers
    ├── persistence.js  # Metadata-driven Save & Load
    └── ...             # Audio, Juice, UI, etc.
```

---

## 🚀 Installation & Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (Current LTS)

### Quick Start

1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game in development mode.

### 📦 Building the Executable

To create a standalone Windows application (`.exe`):

1. `npm run build`
2. `npm run build-exe`

The finished app will be located in `BUILDS/My-earned-Wings-win32-x64`.

---

Created by Lassandriel · April 2026 · Golden Master Core 3.5

---

[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)
