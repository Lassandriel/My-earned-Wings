# PROJECT ROADMAP - YOUR EARNED WINGS

## Current Status: Phase 5.6 COMPLETED (Core Engine Decoupling & Loop Consolidation)

The complete project audit cycle is finished. All core directories (Systems, Data, Styles, Partials, Lang, Core) have been modernized, hardened, and documented. The Draconia Engine 2.0 is now at a production-ready senior architecture level.

---

## Phase 1: Grounded Foundations (Alpha) - **COMPLETED**
- [x] **Core Mechanics**: Movement, resource gathering (Wood, Stone, Shards).
- [x] **Basic Survival**: Energy and Magic systems.
- [x] **Refined UI**: Modern "Outfit" font, Glassmorphism panels, and vibrant colors.
- [x] **Discovery System**: Items and resources only appear in UI when found.

## Phase 2: Building Roots (Beta) - **COMPLETED**
- [x] **Housing Architecture**: Campfire -> Tent -> Wood/Stone Storage -> House.
- [x] **Village Interactions**: Introduction of key NPCs (Baker, Flower Girl, Artisan).
- [x] **UX Optimization**: Save confirmation, splash screen, and hard-reset mechanics.
- [x] **Audio Landscape**: Ambient music, sound effects, and volume controls.
- [x] **Visual Feedback ("Juice")**: Floating particles and smooth bar transitions.
- [x] **Narrative Journal**: Color-coded chronicle of the player's story.

## Phase 3: World & Community (Mid-Game) - **COMPLETED**
- [x] **Companion System**: Assigning NPCs to tasks for passive resource gain.
- [x] **Transaction Logic**: Paying shards as salary for companions.
- [x] **Advanced Crafting**: Bookshelf, Desk, Bed, Stove, and Bow.

## Phase 4: Heart of Draconia (Demo Finale) - **COMPLETED**
- [x] **NPC Extensions**: Extended questlines for Teacher and Old Sage (Level 5).
- [x] **Finale Requirements**: Logic check for House, Max NPC Bond, and Wisdom.
- [x] **The Tree of Life**: Epic encounter with the majestic heart of the ground.
- [x] **Demo Conclusion**: Summary overlay with stats and Sandbox mode hint.

## Phase 4.1: Demo Refinement (Systems) - **COMPLETED**
- [x] **Architecture Fusion**: Combined Crafting and Housing into a single progression hub.
- [x] **UI Renaming**: "Chronicle" tab renamed to "Story".
- [x] **Modular CSS**: Extracted logic into 10+ specific style files.
- [x] **System Refactor**: Logic extracted into Action, NPC, and Engine systems.

## Phase 4.2: Survival & Lore Refinement (Polish) - **COMPLETED**
- [x] **Survival Depth**: Implemented dynamic satiation-based cost scaling.
- [x] **Snappy Balancing**: Adjusted resource limits (25), work rewards (15 Shards), and energy gains.
- [x] **Lore Synchronization**: Global cleanup of terminology.
- [x] **System Centralization**: Scaling logic unified in `resource.js`.

## Phase 4.3: Community Feedback & UX Polish - **COMPLETED**
- [x] **Nomenclature Shift**: Renamed "Vitality" to "Resources" and "Inventory" to "Upgrades/Possessions".
- [x] **Visual Survival**: Added Dragon Head stat silhouette for Satiation, flying above wings.
- [x] **Intro Immersion**: Added KI-generated lore images and name prompt before Prologue.
- [x] **Accessibility**: Skip logic for Intro (Esc/Enter) and Tab-Help Icons (?).
- [x] **Tooltip Bounds**: Implemented "smart" tooltips that stay within window limits.
- [x] **Resource Highlighting**: Visual glow in sidebar when hovering over action costs.
- [x] **Save Feedback**: Added toast notifications for successful save actions.

## Phase 4.4: Omni-Viewport & Senior Audit - **COMPLETED**
- [x] **Responsive Engine**: Replaced fixed scaling with a native, fluid CSS Grid layout.
- [x] **Adaptive Breakpoints**: Custom layouts for Laptops and Tablets (Portrait/Landscape).
- [x] **Rem-Scaling**: Lossless UI zoom by linking settings to root font-size.
- [x] **Math Precision**: Full floating-point support for resource gain and costs (Jäger-Fix).
- [x] **Audio Integrity**: Integration of missing SFX (Water, Crafting).
- [x] **Electron Compatibility**: Specific CSS fixes for name-input focus.

## Phase 4.5: Aesthetic & Premium Polish - **COMPLETED**
- [x] **Aesthetic Excellence**: Smooth view transitions (x-transition) and refined button haptics.
- [x] **Visual Alerts**: Pulse-danger animations for critical energy/magic levels.
- [x] **Narrative Meta-Goal**: Added overarching story goal (seeking the Sun Palace/Imperial Family).
- [x] **Objective Tracking**: Subtle UI indicator for the current main goal.

## Phase 4.6: Draconia Core 2.0 (Architecture) - **COMPLETED**
- [x] **Service-Oriented Architecture (SOA)**: Decoupled game logic from the main store using stateless service modules.
- [x] **Registry-Driven Content**: Centralized definitions for Resources and NPCs for easy content expansion.
- [x] **Absolute Store Context**: Eliminated production reactivity bugs by using absolute `Alpine.store('game')` references.
- [x] **Dynamic UI Engine**: Refactored `index.html` into modular partials using `x-for` loops and registry metadata.
- [x] **Registry Multipliers**: Generic yield and cost scaling managed via Registry properties.

## Phase 4.7: View Consolidation (Maintainability) - **COMPLETED**
- [x] **1:1 View Structure**: Each tab content now maps to exactly one HTML partial and one CSS file.
- [x] **Namespace Alignment**: Standardized naming (e.g., `story.html` and `story.css`) across all 5 main tabs.
- [x] **Simplified Extension**: Improved developer experience for adding or modifying tab contents.
- [x] **UI De-Cluttering**: Removed redundant description text under headers, favoring tooltip-based discovery.

## Phase 4.8: Village Revamp (Immersion) - **COMPLETED**
- [x] **Centralized Market**: Moved resource trading from Gameplay to the Village Tab.
- [x] **Standardized Grid**: Unified premium card layout for all NPCs and world interactions.
- [x] **Integrated Shops**: Embedded special NPC sub-menus (e.g., Hunter's Meat Exchange) into character cards.
- [x] **Lore Synchronization**: Metadata and tooltips aligned with the `DRACONIA.md` world guide.

## Phase 4.9: Upgrades Revamp (The Dragon's Vault) - **COMPLETED**
- [x] **Namespace Consolidation**: Renamed all `inventory` references to `upgrades` for consistency.
- [x] **Categorized Vault**: Implemented tabs for Werkzeuge, Artefakte and Proviant.
- [x] **Showcase Interface**: Added a dedicated panel for detailed item presentation and effects.
- [x] **Premium Visuals**: Added aura glows, glassmorphism, and a polished grid layout.

## Phase 4.10: Icon Optimization (Visual Polish) - **COMPLETED**
- [x] **Global CSS Zoom**: Implemented a standardized scale-transform (`scale(1.8)` to `scale(2.0)`) for all item and housing icons.
- [x] **Asset Framing**: Eliminated excessive whitespace from the original `.webp` sources via CSS containment.
- [x] **Hover Refinement**: Smooth focus-zoom on interaction to enhance "filling" effect.

## Phase 4.11: Senior Architecture Revamp - **COMPLETED**
- [x] **ValuePipeline**: Centralized mathematical modifier system for all calculations.
- [x] **Event-Bus Architecture**: Decoupled systems (Audio, Logs, Persistence) via pub/sub mechanism.
- [x] **Data-Driven Actions**: Removed JS logic from data files; implemented a generic Effect-Runner.
- [x] **Scalability Hub**: main.js refactored for rapid content expansion.

## Phase 5: UX & Architecture Hardening - **COMPLETED**
- [x] **Offline Removal**: Completely eliminated original time-based offline progress.
- [x] **Terminological Consistency**: Unified nomenclature.
- [x] **Simplified Actions**: Primary gameplay actions reduced to static effects.
- [x] **Tooltip Precision**: Dynamic yield calculation for all action tooltips.

## Phase 5.1: Home, Heart & Magic (Expansion) - **COMPLETED**
- [x] **Buff System**: Implemented time-based effect system with hover tooltips and stats-bar UI.
- [x] **Kitchen Meisterschaft**: Built the Kitchen Station and added Gourmet Cooking with powerful buffs.
- [x] **Arcane Evolution**: Introduced Arcane Sanctum, Archmage Aris, and Astral Shards.
- [x] **Botanical Depth**: Expanded the Garden to level 2, enabling parallel plant slots.
- [x] **Premium Furniture**: Added recipes for Cabinets, Spice Racks, and Grand Tables.

## Phase 5.2: Senior UI & Gameplay Polish (Premium Refresh) - **COMPLETED**
- [x] **Loop Mode (Automation)**: Implemented toggleable action-looping for repetitive tasks (Wood, Stone, Garden).
- [x] **Haptic Feedback**: Added magnetic hover effects, scanning-light progress beams, and button pulse haptics.
- [x] **Visual "Juice"**: Integrated floating text feedback (`+1 Wood`) and pulsing resource bars (`Gain/Spent`).
- [x] **Immersive Transitions**: Added smooth view transitions (`Fade/Blur`) for all main navigation tabs.
- [x] **Action Awareness**: Implementation of `RESOURCE_GAINED`/`RESOURCE_SPENT` events for reactive UI updates.

## Phase 5.3: Technical Audit & Localization Hardening - **COMPLETED**
- [x] **System Decentralization**: Decoupled NPC logic from code into data registries (`onSuccess`).
- [x] **Event-Driven UI**: Unified feedback loops via central `GAME_EVENTS` and Bus architecture.
- [x] **Localization Hardening**: Migrated all items and descriptions to `de.js`/`en.js` with key-fallback support.
- [x] **Data Integrity**: Unified resource registration for complex items (Gourmet Meals).
- [x] **Mathematical Scaling**: Connected Garden harvests to the `ValuePipeline` modifier system.
- [x] **CSS Component Consolidation**: Merged improved 'Repaired' UI styles into the main codebase.
- [x] **Premium Design Tokens**: Established a centralized naming system for Spacing, Radius, and Glassmorphism.

## Phase 5.4: HTML Semantic & Accessibility Hardening - **COMPLETED**
- [x] **Semantic Refactoring**: Removed redundant `<main>` tags from all partials to ensure W3C compliance.
- [x] **Navigation Accessibility**: Converted sidebar navigation to semantic `<ul>`/`<li>` structure.
- [x] **Testing Support (ID Hardening)**: Added unique, descriptive IDs to all primary action and navigation elements.
- [x] **Bilingual UI Completion**: Finalized localization for remaining UI elements (Loop Mode, Vault Categories).
- [x] **Aria-Labeling**: Integrated accessibility tags for interactive icons and buttons.

## Phase 5.5: Localization Parity & Info Architecture - **COMPLETED**
- [x] **100% Key Synchronization**: Ensured full parity between `de.js` and `en.js` (No missing strings in either language).
- [x] **Dialogue Consolidation**: Harmonized NPC dialogue keys into a consistent `npc_..._1-5` schema.
- [x] **Finale Coverage**: Backported missing English finale descriptions and milestones to the German localization.
- [x] **Structural De-Duplication**: Removed redundant dialogue entries from UI sections, optimizing file size and clarity.
- [x] **UI String Completion**: Finalized all remaining technical strings (Objectives, Loop Mode, Error Logs).

## Phase 5.6: Core Engine Decoupling & Loop Consolidation - **COMPLETED**
- [x] **Loop Centralization**: Moved all periodic timers (Task-Ticker, Heartbeat) from `main.js` to `EngineSystem`.
- [x] **View Management Delegation**: Migrated game-flow logic (Start, Continue, Prologue) to `UISystem`.
- [x] **Service-Proxy Re-Architecture**: Refactored `main.js` to be a lean registry for stateless systems.
- [x] **Strategic De-Duplication**: Eliminated historical redundancy between heartbeat and ticker loops.
- [x] **State Reset Integrity**: Encapsulated state reset logic for clean transitions in Electron environments.

## Phase 5.7: The Arcane Shift (Balancing & Focus) - **COMPLETED**
- [x] **Arcane Focus Implementation**: Replaced villager work assignments with magic-driven automation (Focus).
- [x] **Magic-to-Energy Substitution**: Enabled focus-mode cost replacement (Magic drain instead of Energy cost).
- [x] **Symmetric Balancing**: Unified primary stats to 50/50 Energy/Magic for better progression gating.
- [x] **Storage Refinement**: Increased storage capacity to 50, enabling meaningful housing milestones (40/40 House).
- [x] **QoL Optimization**: Significant reduction in clicking fatigue (Satiation +10 per click, 0 drain on rest).
- [x] **Village Cleanup**: Streamlined the Village UI into a pure Story and Interaction hub.

---

## Post-Demo Vision (Future Phases)
- [ ] **Phase 6: The Sky Rift**: First steps toward building a mechanical flying machine.
- [ ] **Phase 7: Diplomacy**: Visiting other floating islands via trade routes.
- [ ] **Phase 8: True Wings**: Final evolution of the player character.
