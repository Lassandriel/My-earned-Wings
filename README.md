# Your Earned Wings ✦ (Draconia Core 3.0 Stable)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**. 

> [!IMPORTANT]
> **STABLE VERSION 1.0.0**
> This build features the fully refactored **Draconia Core 3.0** engine with optimized asset handling and consolidated systems.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (The Core 3.0 Refactor)
Experience the transformation of a grounded wanderer into a pillar of the community:
1.  **Survival**: Learn to gather resources and manage your symmetric vitality (50 Energy, 50 Magic).
2.  **Handwerk & Bau (Consolidated)**: A unified construction system. Build everything from your first campfire to a permanent house within a single registry.
3.  **Community & Chronicle**: Forge bonds with village inhabitants. Your journey is now tracked in a modernized **NPC-based Chronicle**, grouping memories by the people you've met.
4.  **Upgrades**: Manage your tools and artifacts in your personal vault.
5.  **Arcane Focus**: Master the art of magically driven automation.
6.  **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom are maximized.

---

## ✦ Core Features

### 🛖 Unified Construction System
*   **Modular Progression**: Develop your home in the unified "Handwerk" tab.
*   **Asset Optimization**: Full **WebP integration** for all high-res assets, reducing the app size footprint by over 70% (from 71MB to ~17MB images).
*   **Balancing v3.0**: A refined economy with symmetric stats and optimized resource storage.

### 👥 NPC Chronicle & Narrative
*   **Grouped Stories**: The journal now automatically groups narrative milestones by NPC characters, providing a clear overview of your social progress.
*   **World Events**: Generic milestones are gathered in the "World Chronicle" section.

### 🔄 Arcane Focus (Automation)
*   **Magical Automation**: Toggle the "Magic Eye" ✨ on loopable actions to automate them at the cost of **3 Magic per second**.
*   **Cost Substitution**: Focused actions consume Magic instead of Energy, allowing for effortless industrial output.

### 🔮 Architecture (Core 3.0 Stable)
*   **SOA (Service-Oriented)**: Decoupled logic from the state store using specialized system managers.
*   **Event Bus**: Pure pub/sub architecture for all side-effects (Audio, Logs, UI Triggers).
*   **Performance Build**: Electron-optimized with `--asar` and refined `ready-to-show` window logic.

---

## 🏗️ Project Structure

```text
src/
├── main.js             # Entry: System orchestration & service-hub.
├── state.js            # Foundation: Schema definition & initial state.
├── data/               # Database: Registries for Resources, NPCs and Actions.
├── lang/               # Localization: Synchronized DE/EN dictionaries.
├── partials/           # Interface: Modular HTML fragments.
├── assets/             # Aesthetics: CSS grid-layouts and design tokens.
└── systems/            # Logic: Decentralized service modules.
    ├── bus.js          # Event Hub (Pub/Sub)
    ├── content.js      # Registry Service (ID Resolution)
    ├── engine.js       # Game Loops (Focus & Tickers)
    ├── story.js        # Milestone & Chronicle logic
    ├── npc.js          # Progression & NPC logic
    └── ...             # Audio, Juice, Persistence, etc.
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

*Created by Lassandriel · April 2026 · Draconia Core 3.0 Stable Build*

---
[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)