# Your Earned Wings ✦ (Golden Master - Core 3.9)

`Your Earned Wings` is an atmospheric desktop simulation and narrative adventure developed with **TypeScript**, **Electron**, **Vite**, and **Alpine.js**.

> [!IMPORTANT]
> **GOLDEN MASTER VERSION 1.1.0-STABLE (v3.9)**
> This build features the fully decoupled, **Registry-First Core 3.9** engine with a dynamic categorization system and hardened survival mechanics.

![Official Logo](public/img/menu/logo_wings.webp)

## 📖 The Journey (Active Survival Update)

Experience the transformation of a grounded wanderer into a pillar of the community:

1. **Active Survival**: Manage your Vitality (Energy/Magic) and Satiation. Warning: Hunger (<20% Satiation) increases all action costs by **150%**.
2. **Dynamic Locations**: Actions are automatically grouped by location headings. New areas appear dynamically as you discover them.
3. **Unified Construction**: Build Furniture and Addons through a centralized registry system.
4. **Refined UI & Rendering**: Premium typography with glassmorphism aesthetics and smooth micro-animations.
5. **Community Bonds**: Track your progress with NPCs in a dedicated log.
6. **Arcane Focus**: Master magically driven automation at the cost of Magic.
7. **The Finale**: Reach the **Tree of Life** by maximizing wisdom and community reputation.

---

## ✦ Core Features

### 🛖 Dynamic Category System
* **Automatic Discovery**: No more manual tab switching. The UI detects available locations (Forest, Mine, etc.) from the Action Database and groups them instantly.
* **Registry-First Architecture**: Every entity (Item, Furniture, Addon) follows a strict data standard: **Title, Description, Effect, Cost**.

### 🍖 Hardcore Survival Balance
* **Satiation Malus**: Survival is not passive. Resource costs scale dynamically with your hunger level, rewarding proactive foraging and cooking.
* **Consolidated Buffs**: Use meals and potions to gain temporary modifiers, tracked visually in the HUD.

### 🔄 Arcane Focus (Automation)
* **Magical Automation**: Automate loopable actions at the cost of **3.0 Magic per second**.
* **Smart Context**: Focused actions automatically swap Energy costs for Magic, allowing for high-efficiency gameplay.

### 🔮 Architecture (Registry-Hardened Core 3.9)
* **Zero Hardcoding**: All user-facing text is managed via I18N.
* **Asset Integrity**: Automated validation ensures every registered icon and sound exists physically.
* **Modular Logic**: Content-agnostic engine; gameplay rules are entirely defined in `src/data/`.

---

## 🚀 Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 24+ recommended)

### Quick Start
1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game in development mode.

---

## 🛠️ Developer & Quality Tools

To maintain "Golden Master" quality, use these automated validation scripts:

* `npm run check-all`: **(Recommended)** Global audit of translations, assets, and logic.
* `npm run check-logic`: Simulates game progression to find dead-ends or unreachable milestones.
* `npm run check-i18n`: Ensures 100% parity between languages and detects orphan keys.
* `npm run check-assets`: Verifies that every path in the registries points to a valid file.

---

## 📦 Building the Executable

To generate a production-ready Windows application (`.exe`):

1. **Validation**: Always run `npm run check-all` before building.
2. **Standard Build**: `npm run build` (Compiles the Vite project).
3. **Electron Package**: `npm run build-exe` (Packages everything into the `BUILDS/` directory).

The finished executable will be located in: `BUILDS/My-earned-Wings-win32-x64/`.

---

Created by Lassandriel · April 2026 · Registry-Hardened Core 3.9

---

[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)
