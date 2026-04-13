# Your Earned Wings ✦

`Your Earned Wings` is an atmospheric desktop simulation developed with **Electron**, **Vite**, and **Alpine.js**. It tells the journey of a wingless protagonist in a village full of winged beings. The game focuses on self-sufficiency, building infrastructure, and discovering ground-based magic.

![Official Logo](public/img/logo_wings.webp)

## ✦ Core Features

### 🛖 Persistent Progress & Housing
*   **From Gatherer to Builder**: Start by gathering twigs and pebbles and progress to building your own house.
*   **Infrastructure**: Build specialized storage for wood and stone to expand your capacities.
*   **Furniture Synergies**: A solid table and chair create the perfect environment for study, doubling your progress.
*   **Stove & Fortification**: A cast-iron stove in your hut doubles the regeneration from food.

### 🏹 Hunting & Mentor System
*   **The Hunter**: An experienced NPC who teaches you bowmaking and hunting over several phases.
*   **Meat Resource**: Collect meat through hunting actions and trade it in the village.

### 🔮 Magic & Knowledge
*   **No Passive Regeneration**: In this world, nothing is free. Manage Energy and Magic through targeted rest, eating, and meditation.
*   **Study**: Meet the *Ancient Sage* to unlock study actions and permanently increase your maximum magic capacity.

### ✨ Visual Aesthetics & UX
*   **Glassmorphism & Dark Mode**: A premium design with smooth transitions and pulsing effects.
*   **Splash Screen & Single Instance**: Professional app features for a seamless start.
*   **Hard Reset**: You can start fresh anytime through the settings.

## 🛠️ Tech Stack

*   **Runtime**: [Electron](https://www.electronjs.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Logic**: Vanilla JS & [Alpine.js](https://alpinejs.dev/)
*   **Packaging**: [Electron Packager](https://github.com/electron/electron-packager)

## 🗺️ Documentation

Find more details in the `docs/` folder:
- [Project Roadmap](docs/ROADMAP.md)
- [Game Design Document (GDD)](docs/GAMEDESIGN.md)
- [Progression Tree (Unlocks)](docs/PROGRESSION.md)

## 🚀 Installation & Build

### Prerequisites
- [Node.js](https://nodejs.org/) (Current LTS)

### Installation
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start development mode: `npm run dev`

### 📦 Create Windows Executable (.exe)
To package the game as a finished application including an icon:
```bash
npm run build-exe
```
You will find the finished application in the `BUILDS/` folder.

---
*Created by Lassandriel · April 2026*