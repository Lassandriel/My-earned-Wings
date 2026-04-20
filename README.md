# Your Earned Wings ✦ (Golden Master - Core 3.5)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **Electron**, **Vite**, and **Alpine.js**.

> [!IMPORTANT]
> **GOLDEN MASTER VERSION 1.1.0-STABLE**
> This build features the fully decoupled, 100% data-driven **Golden Master (Core 3.5)** engine with modular effects and registry-based navigation.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (The Core 3.5 Refactor)

Experience the transformation of a grounded wanderer into a pillar of the community:

1. **Survival**: Learn to gather resources and manage your symmetric vitality (50 Energy, 50 Magic).
2. **Crafting & Construction (Consolidated)**: A unified construction system. Build everything from your first campfire to a permanent house within a single registry.
3. **Refined Visuals**: Integrated high-quality 2D assets for all infrastructure, including the new **Stone and Wood Storages**.
4. **Community & Story**: Forge bonds with village inhabitants. Your journey is tracked in an NPC-based log, grouping memories by the people you've met.
5. **Upgrades**: Manage your tools and artifacts in your personal vault.
6. **Arcane Focus**: Master the art of magically driven automation.
7. **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom are maximized.

---

## ✦ Core Features

### 🛖 Unified Construction System

* **Modular Progression**: Develop your home in the unified "Crafting" tab.
* **Premium Assets**: Full **WebP integration** for all high-res assets, including specific custom renders for storage facilities and tools.
* **Balancing v3.5**: A refined economy with symmetric stats and optimized resource storage (adaptive limits up to 125+).

### 👥 NPC Story & Narrative

* **Grouped Progress**: The journal automatically groups narrative milestones by NPC characters, providing a clear overview of your social standing.
* **World Events**: Generic milestones are gathered in the "World Story" section.

### 🔄 Arcane Focus (Automation)

* **Magical Automation**: Toggle the "Magic Eye" ✨ on loopable actions to automate them at the cost of **3.0 Magic per second**.
* **Effect Replacement**: Focused actions consume Magic instead of Energy, allowing for effortless progress during active play.

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
├── systems/            # Logic: Decentralized service modules.
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

### 🛠️ Developer Tools

To ensure stability across languages, an automatic validation script is provided:

* Run `npm run check-i18n` to validate all translations (DE/EN).
* Run `npm run check-assets` to verify that all images/icons defined in data exist on disk.
* Run `npm run check-logic` to detect dead-ends and unreachable requirements in progression.

> [!TIP]
> **Integrity Checks:** These tools ensure that Core 3.5's data-driven architecture remains robust even as the content database grows. All scripts provide detailed terminal output for any issues found.

### 📦 Building the Executable

To create a standalone Windows application (`.exe`):

1. `npm run build`
2. `npm run build-exe`

The finished app will be located in `BUILDS/My-earned-Wings-win32-x64`.

---

Created by Lassandriel · April 2026 · Golden Master Core 3.5

---

[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)
