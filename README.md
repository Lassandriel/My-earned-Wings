# Your earned Wings ✦

**"Everyone has wings, except you. While they glide effortlessly from roof to roof, you walk the heavy path on solid ground. But strength doesn't only come from the sky—it grows from the earth you touch."**

`Your earned Wings` is a Desktop Management Simulation built with **Electron**, **Vite**, and **Vanilla JS/CSS**. It follows the journey of a wingless protagonist in a village of winged beings, focusing on self-reliance, infrastructure building, and the discovery of ancient ground-based magic.

![Official Logo](public/img/logo_wings.webp)
![Game Icon](public/img/Game_Icon.png)

## ✦ Core Features

### 🛖 Persistent Progression & Housing
- **From Gatherer to Builder**: Start by collecting twigs and pebbles, then progress to building campfires, canvas tents, and eventually a permanent house.
- **Infrastructure**: Build specialized storage for wood and stone to expand your capacities limitlessly.
- **Furniture Synergies**: Craft a **Table**, **Bookcases** and a **Chair** to unlock advanced mechanics like studying.
- **Cooking & Satiation**: Build a **Stove** in your house to cook meat and herbs. Manage your **Satiation** levels to stay efficient.

### 🔮 Magic & Resources
- **Dual-Wing Status**: Your progress is visually tracked through a dual-wing profile. The **Vitality-Wing (Green)** represents energy, while the **Magic-Wing (Blue-Violet)** represents your inner power.
- **Buff System**: Consuming cooked meals provides temporary efficiency buffs for gathering resources.
- **The Study Mechanic**: Study at your table to permanently increase your maximum Magic potential.

### ✨ Visual Juice & UX
- **Fluid Feedback**: Floating numbers, pulsing buttons, and smooth transitions make every action feel impactful.
- **Performance First**: Assets are optimized using **WebP migration**, reducing the game size from ~33MB to ~2.5MB (91% reduction).
- **Quality of Life**: Save-toast confirmations, item counts in a rich inventory view, and a hard-reset mechanism for testing.

### 🌍 Localization (i18n)
- Fully localized in **German** and **English**.
- Switch languages on the fly in the settings menu.

## 🛠️ Tech Stack
- **Runtime**: [Electron](https://www.electronjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Logic**: Vanilla JavaScript & [Alpine.js](https://alpinejs.dev/)
- **Styling**: Vanilla CSS featuring **Glassmorphism** and a "Somber Cozy" dark aesthetic.
- **Persistence**: LocalStorage with Auto-Load.

## 🗺️ Project Documentation
- [Game Design Document (GAMEDESIGN.md)](docs/GAMEDESIGN.md)
- [Roadmap (ROADMAP.md)](docs/ROADMAP.md)
- [Progression Tree (progression_tree.md)](docs/progression_tree.md)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)

### Installation
1. Clone the repository and navigate into the folder.
2. Install dependencies: `npm install`
3. Run in dev mode: `npm run dev`

### 📦 Packaging the Game (Create .exe)
To convert the game into an executable `.exe` file (Windows), run:

```bash
npm run package
```

The finished `.exe` will be located in the `dist_electron/` directory.

---

*Built with passion for those who walk the earth.* ✦
