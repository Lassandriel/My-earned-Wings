# Code Overview - My Earned Wings

This document provides a comprehensive list of all code files in the project and their respective functions.

## Project Root

- [index.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/index.html): The main entry point for the web application. It loads the compiled JavaScript and provides the basic HTML structure.
- [package.json](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/package.json): Defines project dependencies, scripts, and metadata.
- [tsconfig.json](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/tsconfig.json): Configuration for the TypeScript compiler.
- [vite.config.js](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/vite.config.js): Configuration for Vite, the build tool and dev server.
- [eslint.config.js](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/eslint.config.js): Configuration for ESLint to maintain code quality.
- [convert-images.cjs](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/convert-images.cjs): A script for batch processing or converting project images.

## Development & Maintenance Scripts (`scripts/`)

- [check-all.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/check-all.ts): Runs all project checks and validations.
- [check-assets.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/check-assets.ts): Validates that all referenced assets exist.
- [check-i18n.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/check-i18n.ts): Checks for missing or unused translation keys.
- [check-logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/check-logic.ts): Validates game logic consistency.
- [check-unused.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/check-unused.ts): Finds unused code or assets.
- [clean-orphans.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/clean-orphans.ts): Removes orphaned files or references.
- [clean.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/clean.ts): Cleans build artifacts and temporary files.
- [fix-i18n.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/fix-i18n.ts): Automatically fixes common i18n issues.
- [qa.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/qa.ts): Quality assurance script for general checks.
- [stats.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/scripts/stats.ts): Generates project statistics (e.g., line counts).

## Source Root (`src/`)

- [main.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/main.ts): The main entry point for the game logic. It initializes Alpine.js, sets up core systems, and manages the global game store.
- [state.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/state.ts): Defines the `initialState` of the game and handles translation mapping.

## Core Systems (`src/core/`)

### Events
- [bus.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/events/bus.ts): Implements the central Event Bus used for decoupled communication between game systems.

### Services
- [content.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/services/content.ts): Provides access to static game data (actions, items, resources) through a unified registry service.
- [i18n.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/services/i18n.ts): Handles internationalization, translating keys into localized strings.
- [logger.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/services/logger.ts): Manages game logs that are displayed to the player.
- [persistence.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/services/persistence.ts): Manages saving and loading game progress, including export/import functionality.

### Systems
- [boot.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/boot.ts): Coordinates the game's startup sequence and initial state building.
- [engine.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/engine.ts): The core game loop. Handles time-based updates, resource generation, and ticker registrations.
- [loader.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/loader.ts): Automatically registers systems into the Alpine.js game store.
- [logicUtils.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/logicUtils.ts): Common utility functions for game logic (e.g., formatting, math).
- [pipeline.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/pipeline.ts): A high-performance calculation system for modifiers and value pipelines.
- [registry.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/registry.ts): Manages the registration and retrieval of core game systems.
- [validator.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/validator.ts): Ensures data integrity and validates state transitions.
- [viewManager.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/systems/viewManager.ts): Handles transitions between main game views (Menu, Prologue, World, etc.).

### Visuals
- [audio.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/audio.ts): Manages sound effects and background music.
- [background.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/background.ts): Controls dynamic background elements and effects.
- [input.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/input.logic.ts): Handles global keyboard and mouse inputs.
- [juice.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/juice.ts): Implements visual polish like screen shake, particles, and animations.
- [preloader.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/preloader.ts): Manages asset loading before the game starts.
- [ui.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/core/visuals/ui.ts): Contains complex UI logic, including tooltip positioning and dynamic HUD updates.

## Data Definitions (`src/data/`)

- [index.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/index.ts): Aggregates all data registries for the `content` service.

### Actions
- [construction.base.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.base.ts): Definitions for base construction actions.
- [construction.furniture.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.furniture.ts): Definitions for furniture crafting/placement.
- [construction.garden.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.garden.ts): Definitions for garden-related construction.
- [construction.housing.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.housing.ts): Definitions for housing structures.
- [construction.tools.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.tools.ts): Definitions for tool crafting.
- [construction.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/construction.ts): Main aggregator for construction actions.
- [core.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/core.ts): Definitions for core game actions (e.g., gathering).
- [index.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/index.ts): Exports all action definitions.
- [lore.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/lore.ts): Definitions for lore-related actions.
- [magic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/magic.ts): Definitions for magical actions.
- [npcs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/npcs.ts): Definitions for NPC interaction actions.
- [village.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/actions/village.ts): Definitions for village-related actions.

### Definitions
- [buffs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/definitions/buffs.ts): Definitions for player buffs and status effects.
- [modifiers.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/definitions/modifiers.ts): Definitions for global modifiers.
- [navigation.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/definitions/navigation.ts): Definitions for location navigation and requirements.
- [resources.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/definitions/resources.ts): Definitions for all game resources and materials.
- [titles.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/data/definitions/titles.ts): Definitions for unlockable player titles.

## Feature Modules (`src/features/`)

### Crafting
- [crafting.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/crafting.style.css): Styles for the crafting interface.
- [crafting.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/crafting.view.html): Main crafting UI template.
- [items.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/items.data.ts): Static data for craftable items.
- [items.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/items.logic.ts): Logic for item creation and inventory management.
- [upgrades.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/upgrades.style.css): Styles for the upgrades menu.
- [upgrades.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/crafting/upgrades.view.html): UI template for player upgrades.

### Gameplay
- [actions.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/gameplay/actions.logic.ts): Core logic for executing game actions and checking requirements.
- [gameplay.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/gameplay/gameplay.style.css): Styles for the general gameplay area.
- [gameplay.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/gameplay/gameplay.view.html): Main gameplay UI template (action lists, etc.).
- [resource.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/gameplay/resource.logic.ts): Logic for resource updates, limits, and generation.

### Housing
- [housing.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/housing/housing.data.ts): Static data for housing structures.
- [housing.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/housing/housing.logic.ts): Logic for building and managing the player's home.
- [housing.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/housing/housing.style.css): Styles for the housing interface.
- [housing.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/housing/housing.view.html): UI template for the housing system.

### School
- [school.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/school/school.data.ts): Data and logic for school-related progression.

### Story
- [dialogue.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/dialogue.logic.ts): Logic for the dialogue system (NPC conversations).
- [finale.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/finale.style.css): Styles for the game's finale sequence.
- [finale.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/finale.view.html): UI template for the game's finale.
- [prologue.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/prologue.logic.ts): Logic for the introductory prologue.
- [prologue.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/prologue.style.css): Styles for the prologue.
- [prologue.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/prologue.view.html): UI template for the prologue.
- [story.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/story.data.ts): Static story and quest data.
- [story.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/story.logic.ts): General story progression logic.
- [story.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/story.style.css): Styles for story-related UI elements.
- [story.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/story/story.view.html): General story and quest view.

### UI
- [confirm.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/confirm.view.html): Template for confirmation modals.
- [log.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/log.view.html): Template for the game message log.
- [menu.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/menu.style.css): Styles for the main menu.
- [menu.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/menu.view.html): Template for the main menu.
- [naming.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/naming.view.html): Template for character naming screen.
- [settings.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/settings.logic.ts): Logic for managing game settings.
- [settings.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/settings.style.css): Styles for the settings menu.
- [settings.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/settings.view.html): Template for the settings menu.
- [sidebar.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/sidebar.view.html): Template for the navigation sidebar.
- [stats.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/stats.style.css): Styles for the player statistics display.
- [status_card.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/status_card.view.html): Template for status indicators (Energy, Magic, etc.).
- [titles.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/titles.logic.ts): Logic for managing and unlocking titles.
- [tooltip.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/ui/tooltip.view.html): Template for dynamic hover tooltips.

### Vandara
- [vandara.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/vandara/vandara.data.ts): Logic and data for the Vandara feature.

### Village
- [ellie.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/ellie.logic.ts): Logic for interactions with the NPC Ellie.
- [ellie.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/ellie.view.html): UI template for Ellie-related events.
- [village.data.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/village.data.ts): Static data for the village location.
- [village.logic.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/village.logic.ts): Logic for village-specific gameplay.
- [village.style.css](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/village.style.css): Styles for the village interface.
- [village.view.html](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/features/village/village.view.html): UI template for the village.

## Electron Integration (`src/electron/`)

- [main.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/electron/main.ts): The main process entry for the Electron app.
- [ipc.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/electron/ipc.ts): Sets up Inter-Process Communication handlers.
- [preload.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/electron/preload.ts): Exposes secure APIs from the main process to the renderer process.

## Stores (`src/stores/`)

- [log.store.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/stores/log.store.ts): Alpine.js store for game log messages.
- [settings.store.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/stores/settings.store.ts): Alpine.js store for user settings (audio, UI scale, etc.).
- [ui.store.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/stores/ui.store.ts): Alpine.js store for UI-specific state.

## Localization (`src/lang/`)

- [de.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de.ts) / [en.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en.ts): Root translation files that combine module-specific translations.

### German (`src/lang/de/`)
- [actions.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/actions.ts): German translations for actions.
- [buffs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/buffs.ts): German translations for buffs.
- [items.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/items.ts): German translations for items.
- [logs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/logs.ts): German translations for log messages.
- [modifiers.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/modifiers.ts): German translations for modifiers.
- [npcs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/npcs.ts): German translations for NPCs.
- [ui.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/de/ui.ts): German translations for UI elements.

### English (`src/lang/en/`)
- [actions.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/actions.ts): English translations for actions.
- [buffs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/buffs.ts): English translations for buffs.
- [items.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/items.ts): English translations for items.
- [logs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/logs.ts): English translations for log messages.
- [modifiers.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/modifiers.ts): English translations for modifiers.
- [npcs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/npcs.ts): English translations for NPCs.
- [ui.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/lang/en/ui.ts): English translations for UI elements.

## Type Definitions (`src/types/`)

- [game.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/game.ts): Main game state and object interfaces.
- [i18n.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/i18n.ts): Types for the localization system.
- [stores.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/stores.ts): Types for Alpine.js stores.
- [system.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/system.ts): Interfaces for core game systems.

### Core Types (`src/types/core/`)
- [base.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/core/base.ts): Base types for core systems.

### Feature Types (`src/types/features/`)
- [actions.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/features/actions.ts): Types for action definitions.
- [homes.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/features/homes.ts): Types for housing and home structures.
- [npcs.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/features/npcs.ts): Types for NPC-related data.
- [resources.ts](file:///c:/Users/Tcul/Desktop/GITHub%20Projekte/My-earned-Wings/src/types/features/resources.ts): Types for resource and stat definitions.

