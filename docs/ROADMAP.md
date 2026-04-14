# Project Roadmap: Your Earned Wings ✦

This document serves as a guide for future development.

## Phase 1: Polishing & Immersion (Technical Focus)

- [x] **Tab Rework**: Complete visual and functional overhaul of all content tabs.
- [x] **EXE Packaging**: Creating a finished Windows executable with a custom icon.
- [x] **UX Optimization**: Save confirmation, splash screen, and hard-reset mechanics.
- [x] **Core Architecture Refactoring**: Centralized Resource Manager and Transaction System.
- [x] **Audio Landscape**: Implementation of ambient music, sound effects, and volume controls.
- [x] **Settings UX Overhaul**: Modern tabbed settings menu with independent volume sliders.
- [x] **Visual Feedback ("Juice")**: Adding white floating particles and smooth transitions to all bars.
- [x] **Narrative Journal**: Complete redesign of the history tab into a compact, color-coded journal.
- [x] **System Audit**: Hardened efficiency logic and dynamic NPC metadata integration.
- [x] **Bug-Fixing**: Resolved 'ui_mixed' display and fixed early-game storage soft-lock.
- [x] **UI Scaling Fix**: Decoupled Main Menu and Intro from game scaling for full-screen coverage.
- [x] **Alpha Release**: Finalized the 0.1.0 build for public testing.

## Phase 2: Core Mechanics (Content Focus)

- [x] **Tools & Progression**: Introduction of Axe and Pickaxe for increased yields.
- [x] **NPC Expansion**: Mentor system with the Hunter (Bowmaking & Hunting).
- [x] **Resource Chain**: Introduction of Meat and processed goods (Stove bonus).
- [x] **Interactive Journal**: A dedicated area for lore entries and sketches.--> Story Tab!
- [x] **Traits (Passive Bonuses)**: Unlockable bonuses (e.g., "Woodsman") through repeated actions.

## Phase 3: World & Community (Mid-Game)

- [x] **Phase 3: Gemeinschaft & Gefährten**
    - [x] NPCs können als Gefährten arbeiten (Zuweisungs-System im Dorf).
    - [x] Passives Ressourcen-Sammeln für Splitter-Gehalt.
    - [x] Hintergrund-Game-Loop für Zeitfortschritt.
- [x] **NPC Questlines**: Deeper stories for the Sage and village residents.
- [x] **Village Reputation**: Your progress influencing how the Winged react to you.

## Phase 4: The Vision (Endgame)

- [ ] **Metamorphosis**: The creation of your own "Wings" through magic and deep knowledge.

## Phase 5: Technical Optimization (Post-Launch)

- [ ] **Savegame Management**: Implement easy copy-paste Export/Import mechanics for save files, and optionally explore Cloud Syncing to allow players to easily backup progress or play across devices.
- [ ] **Performance & Anti-Cheat**: Apply hash-encoding to the `localStorage` save file to prevent trivial cheating. Audit the background Game Loop to ensure smooth 60fps performance without UI lag in the extreme late-game.
- [ ] **Accessibility & UI Scaling**: Add support for font size adjustment, high-contrast modes, and keyboard shortcuts to improve usability.
- [ ] **Seamless Auto-Updates**: Transition from electron-packager to electron-builder and integrate `electron-updater` so the game can automatically update itself without requiring manual downloads.
- [ ] **Tauri Migration**: Transition from Electron to Tauri to drastically reduce the application size (from ~400MB down to ~15MB) while keeping the web frontend intact.

---
_Last updated: April 2026_
