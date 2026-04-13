# Your Earned Wings ✦

`Your Earned Wings` ist eine atmosphärische Desktop-Simulation, entwickelt mit **Electron**, **Vite** und **Alpine.js**. Es erzählt die Reise eines flügellosen Protagonisten in einem Dorf voller geflügelter Wesen. Das Spiel konzentriert sich auf Selbstgenügsamkeit, den Aufbau von Infrastruktur und die Entdeckung bodenbasierter Magie.

![Official Logo](public/img/logo_wings.webp)

## ✦ Kern-Features

### 🛖 Beständiger Fortschritt & Housing
*   **Vom Sammler zum Erbauer**: Beginne mit dem Sammeln von Zweigen und Kieseln und entwickle dich weiter bis zum Bau eines eigenen Hauses.
*   **Infrastruktur**: Baue spezialisierte Lager für Holz und Stein, um deine Kapazitäten zu erweitern.
*   **Möbel-Synergien**: Ein massiver Tisch und ein Stuhl schaffen die perfekte Umgebung für dein Studium und verdoppeln deinen Fortschritt.
*   **Ofen & Stärkung**: Ein gusseiserner Ofen in deiner Hütte verdoppelt die Regeneration durch Nahrung.

### 🏹 Jagd & Mentor-System
*   **Der Jäger**: Ein erfahrener NPC, der dir in Phasen den Bogenbau und die Jagd beibringt.
*   **Ressource Fleisch**: Sammle Fleisch durch Jagd-Aktionen und handele damit im Dorf.

### 🔮 Magie & Wissen
*   **Keine passive Regeneration**: In dieser Welt ist nichts umsonst. Verwalte Energie und Magie durch gezieltes Ausruhen, Essen und Meditieren.
*   **Studium**: Triff den *Alten Weisen*, um das Studium freizuschalten und deine maximale magische Kapazität permanent zu steigern.

### ✨ Visuelle Ästhetik & UX
*   **Glassmorphismus & Dark Mode**: Ein hochwertiges Design mit flüssigen Übergängen und pulsing Effekten.
*   **Splash-Screen & Single-Instance**: Professionelle App-Features für einen reibungslosen Start.
*   **Hard-Reset**: In den Einstellungen kannst du jederzeit einen kompletten Neuanfang wagen.

## 🛠️ Tech Stack

*   **Runtime**: [Electron](https://www.electronjs.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Logik**: Vanilla JS & [Alpine.js](https://alpinejs.dev/)
*   **Packaging**: [Electron Packager](https://github.com/electron/electron-packager)

## 🗺️ Dokumentation

Weitere Details findest du im `docs/` Ordner:
- [Projekt-Roadmap](docs/ROADMAP.md)
- [Game Design Dokument (GDD)](docs/GAMEDESIGN.md)
- [Fortschritts-Baum (Unlocks)](docs/PROGRESSION.md)

## 🚀 Installation & Build

### Voraussetzungen
- [Node.js](https://nodejs.org/) (Aktuelle LTS)

### Installation
1. Repository klonen.
2. Abhängigkeiten installieren: `npm install`
3. Entwicklungsmodus starten: `npm run dev`

### 📦 Windows Executable (.exe) erstellen
Um das Spiel als fertige Anwendung inklusive Icon zu verpacken:
```bash
npm run build-exe
```
Die fertige Anwendung findest du danach im Ordner `BUILDS/`.

---
*Created by Lassandriel · April 2026*