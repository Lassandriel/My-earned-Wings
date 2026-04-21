# Your Earned Wings ✦ (Golden Master - Core 3.7)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **TypeScript**, **Electron**, **Vite**, and **Alpine.js**.

> [!IMPORTANT]
> **GOLDEN MASTER VERSION 1.2.1-STABLE**
> This build features the fully decoupled, **TypeScript-Hardened Core 3.7** engine with 100% verified I18N integrity and refined UI/UX rendering.

![Official Logo](public/img/logo_wings.webp)

## 📖 The Journey (The TypeScript Ascension)

Experience the transformation of a grounded wanderer into a pillar of the community:

1. **Survival**: Learn to gather resources and manage your symmetric vitality (50 Energy, 50 Magic).
2. **Crafting & Construction (Consolidated)**: A unified construction system. Build everything from your first campfire to a permanent house within a single registry.
3. **Refined UI & Rendering**: All narrative texts use **HTML-Safe Rendering** to ensure premium typography and emphasis (bold names, colored lore).
4. **Community & Story**: Forge bonds with village inhabitants. Your journey is tracked in an NPC-based log, grouping memories by the people you've met.
5. **Upgrades**: Manage your tools and artifacts in your personal vault.
6. **Arcane Focus**: Master the art of magically driven automation.
7. **The Finale**: Reach the legendary **Tree of Life** once your community bonds and wisdom are maximized.

---

## ✦ Core Features

### 🛖 Unified Construction System

* **Modular Progression**: Develop your home in the unified "Crafting" tab.
* **Premium Assets**: Full **WebP integration** for all high-res assets, including specific custom renders for storage facilities and tools.
* **Balancing v3.7**: A refined economy with symmetric stats and optimized resource storage (adaptive limits up to 125+).

### 👥 NPC Story & Narrative

* **Grouped Progress**: The journal automatically groups narrative milestones by NPC characters.
* **HTML Narrative**: Bold player names and narrative highlights are rendered natively for maximum immersion.

### 🔄 Arcane Focus (Automation)

* **Magical Automation**: Toggle the "Magic Eye" ✨ on loopable actions to automate them at the cost of **3.0 Magic per second**.
* **Effect Replacement**: Focused actions consume Magic instead of Energy, allowing for effortless progress during active play.

### 🔮 Architecture (TypeScript Hardened Core 3.7)

* **100% Type-Safe**: Every gameplay rule, modifier, and requirement is verified by TypeScript.
* **100% I18N Integrity**: Automated "God-Tier" validation ensures zero missing keys across DE/EN.
* **Refined Settings**: Premium Sidebar-Settings with "Save & Back" logic for a seamless experience.
* **Modular Effect System**: Dynamic effect registration (`registerEffect`) allows for seamless expansion.
* **Hardened IPC**: Shared Enum communication between Electron Main and Render processes.

---

## 🚀 Installation & Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (Current LTS)

### Quick Start

1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game in development mode.

### 🛠️ Developer Tools

To ensure stability across languages and logic, automated validation scripts are provided:

* `npm run check-all`: Performs a global audit of translations, assets, and game logic.
* `npm run check-ts`: Full TypeScript type audit.
* `npm run check-i18n`: Validates all translation parity.
* `npm run check-logic`: Detects dead-ends and unreachable requirements in progression.

---

## 📦 Building the Executable

To create a standalone Windows application (`.exe`):

1. `npm run build`
2. `npm run build-exe`

The finished app will be located in `dist_electron`.

---

Created by Lassandriel · April 2026 · TypeScript Hardened Core 3.7

---

[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)
