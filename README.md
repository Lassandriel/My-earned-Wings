# Your Earned Wings ✦ (Core 6.0 - Precision & Audit Update)

`Your Earned Wings` is an atmospheric simulation and narrative adventure, available as a **standalone Windows Executable (.exe)** and a **Web Version**.

> [!IMPORTANT]
> **PRECISION & AUDIT UPDATE (v6.0)**
> This version introduces **Full TypeScript Registry Core**, **Accumulator-based Resource Precision**, and a global **Automated Audit System** ensures 100% logic integrity.

![Official Logo](public/img/menu/logo_wings.webp)

### 🕹️ [Play directly in your browser (Web Version)](https://lassandriel.github.io/My-earned-Wings/)

_No download required – progress is saved locally in your browser._

### 💾 [Desktop Version (.exe)](https://github.com/Lassandriel/My-earned-Wings/releases)

_Optimal performance and offline availability._

---

## 📖 The Journey (Active Survival Update)

Experience the transformation of a grounded wanderer into a pillar of the community:

1. **Active Survival**: Manage your Vitality (Energy/Magic) and Satiation.
2. **Dynamic Locations**: Actions are automatically grouped by location. Explore the **Forest**, **Crystal Mine**, **Meadow**, and **Whispering Grove**.
3. **Unified Construction**: Build Furniture and Addons through a centralized registry system.
4. **Refined UI & Rendering**: Premium glassmorphism aesthetics with fixed clipping-free layouts.
5. **Community Bonds**: Track your progress with NPCs like **Mina (Flower Girl)** or **Geron (Baker)**.
6. **Arcane Focus**: Master magically driven automation using the high-precision Delta-Time engine.

---

## ✦ Core Features

### 🛖 Registry-Hardened Architecture

- **Full TypeScript Core**: 100% type safety across all registries and the value pipeline.
- **Modular Action Logic**: Separated logic for Housing, Tools, Garden, and Village.

### 🍖 Hardcore Survival & Balancing

- **Satiation Loop**: Resource costs scale dynamically with hunger.
- **Consolidated Buffs**: Temporary modifiers tracked visually in the HUD.

### 🔄 High-Precision Automation

- **Delta-Time Engine**: Uses a production accumulator to ensure 0% resource loss during lag or background activity.
- **Smart Context**: Automation swaps Energy for Magic costs dynamically.

### 🔮 Technical Excellence

- **LZW Compression**: Save games are compressed by ~70% for efficiency.
- **Asset Preloading**: Verified pre-caching for backgrounds and NPC assets.
- **Golden Audit System**: Global parity checks for I18N and registry integrity.

---

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 24+ recommended)

### Quick Start

1. Clone the repository.
2. Run `npm install` to set up dependencies.
3. Run `npm run dev` to start the game in development mode.

---

## 🛠️ Developer & Quality Tools

To maintain "Golden Master" quality, use these automated validation scripts:

- `npm run check-all`: **(Highly Recommended)** Performs a full audit of translations, assets, and game logic (unreachable flags, etc.).
- `npm test`: Runs the Vitest suite for core logic and modifier accuracy.
- `npm run check-logic`: Simulates total progression to verify end-game reachability.
- `npm run check-i18n`: Ensures 100% parity and validates parameter recursion.

---

## 📦 Building the Executable

1. **Validation**: Run `npm run check-all`.
2. **Build**: `npm run build`.
3. **Package**: `npm run build-exe`.

---

Created by Lassandriel · April 2026 · Project Core 6.0 (Audit Hardened)

---

[Repository](https://github.com/Lassandriel/My-earned-Wings) | [Issue Tracker](https://github.com/Lassandriel/My-earned-Wings/issues)
