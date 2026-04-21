# PROJECT ROADMAP - YOUR EARNED WINGS

## Current Status: Phase 8.4 COMPLETE (Story Archive & System Synchronization)

The internal architecture has been fully refactored to "Draconia Core 3.5". Narrative progression is now fully supported by a premium NPC Dialogue Archive, with synchronized system-to-content recording and automated project validation.

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
- [x] **NPC Tooltip Optimization**: Redundancy removed & dynamic quest-reward indicators implemented.
- [x] **Building Progression**: Logical dependencies (Camp -> Tent -> House) and NPC-bound recipes introduced.
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
- [x] **Categorized Vault**: Implemented tabs for Tools, Artifacts and Provisions.
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
- [x] **Dialogue De-Duplication**: Removed redundant dialogue entries from UI sections, optimizing file size and clarity.
- [x] **UI String Completion**: Finalized all remaining technical strings (Objectives, Loop Mode, Error Logs).

## Phase 5.6: Core Engine Decoupling & Loop Consolidation - **COMPLETED**

- [x] **Loop Centralization**: Moved all periodic timers (Task-Ticker, Heartbeat) from `main.js` to `EngineSystem`.
- [x] **View Management Delegation**: Migrated game-flow logic (Start, Continue, Prologue) to `UISystem`.
- [x] **Service-Proxy Re-Architecture**: Refactored `main.js` to be a lean registry for stateless systems.
- [x] **Strategic De-Duplication**: Eliminated historical redundancy between heartbeat and ticker loops.
- [x] **State Reset Integrity**: Encapsulated state reset logic for clean transitions in Electron environments.

## Phase 6.0: Demo Ready (Final Polish) - **COMPLETED**

- [x] **Asset Optimization**: Successfully migrated 100% of images to .webp, reducing build size by ~85% (17MB total).
- [x] **Lore-Aligned Visuals**: Generated and integrated 11+ high-quality character and item assets following Draconia's humanoid-shifter lore.
- [x] **Economic Hardening**: Resolved trade exploits (Meat Arbitrage) and balanced resource consumption.
- [x] **Endgame Rewards**: Replaced generic transmutation with "Arcane Furniture" upgrades (Silk Bed, Magical Hearth).
- [x] **Engine Guarding**: Implemented "Idle Prevention" for magic consumption and safe buff cleanup.
- [x] **Full-Demo QA**: Verified Tree of Life finale, NPC progression (Levels 1-5), and Save/Load integrity.
- [x] **Softlock Resolution**: Fixed prologue transition by integrating missing Naming-Modal and translations.
- [x] **Vitality Balance**: Decoupled energy recovery from satiation and fixed global satiation consumption bug.

## Phase 6.1: Narrative Economic Decentralization & Integrity - **COMPLETED**

- [x] **Decentralized Trade**: Removed central marketplace; integrated trade directly into NPC cards.
- [x] **Social Commerce Logic**: Trade options now unlock based on NPC reputation (e.g., Baker wood trade at Rep 2).
- [x] **I18n Guardian System**: Integrated automated startup-validation for all language keys.
- [x] **Start-Flow Stability**: Resolved prologue transition blockade and 'Entdecker' naming bug.
- [x] **Zero-Warning Audit**: Achieved 100% localization coverage (0 Errors, 0 Warnings).
- [x] **UI Localization Polish**: Refined all Sidebar, Nav, and Naming-Modal keys for full bilingual parity.
- [x] **Build Integrity**: Verified stable build-exe and production-ready assets.

## Phase 6.2: Interaction & Persistence Hardening (Golden Master Stability) - **COMPLETED**

- [x] **Interaction Logic Fix**: Resolved "Btn-Shake" bug by correctly evaluating action success objects in `gameplay.html`.
- [x] **Persistence Integrity**: Synchronized Settings modal with LocalStorage (Volumes, Language, Graphics toggles).
- [x] **UI Polish**: Fixed "ghost tooltips" tracking mouse behind modals and resolved Chromium scrollbar glitches.
- [x] **UX Guarding**: Hidden "Magic Focus" controls until the 'item-walking-stick' automation is unlocked.
- [x] **Localization Polish**: Resolved missing translation keys for resource categories (`ui_materials`, `ui_provisions`).

## Phase 6.3: Core 3.0 "Registry Overdrive" (Data-Driven Mastery) - **COMPLETED**

- [x] **Generic Modifiers**: Replaced hardcoded item/building effects with a dynamic `modifiers` registry system in `pipeline.js`.
- [x] **Passive Production Engine**: Replaced specific garden loops with a universal production ticker in `engine.js`.
- [x] **Milestone Architecture**: Migrated finale logic (Tree of Life) to a generic `milestones.js` requirement engine.
- [x] **Stat Percent Unification**: Replaced specific stat-bar methods with a universal `getStatPercent` utility.

## Phase 6.4: Deep Clean & Unity (Logic Neutrality) - **COMPLETED**

- [x] **Registry-Driven Unlocks**: Migrated start-NPC configuration from `state.js` to the NPC registry.
- [x] **Generic Failure Mapping**: Implemented a data-driven logging system for cost failures (`fail_${type}`).
- [x] **Persistence Metadata**: Refactored save/load logic to be metadata-driven, eliminating hardcoded array whitelists.
- [x] **Zombie Elimination**: Cleaned up all legacy method calls and "dead" variables from the Core 2.0 refactor.

## Phase 7.0: The Great Decoupling (The Golden Master) - **COMPLETED**

- [x] **Modular Effect Registration**: Implemented a dynamic `registerEffect` system, making the Action engine content-agnostic.
- [x] **Data-Driven Navigation**: Moved all sidebar and tab definitions from HTML templates to a dedicated `navigation.js` registry.
- [x] **Crafting & Construction (Consolidated)**: A unified construction system. Build everything from your first campfire to a permanent house within a single registry.
- [x] **Resource Metadata Refinement**: Replaced hardcoded satiation-scaling rules with metadata flags (`scalesWithSatiation`).
- [x] **Architecture Perfection**: Achieved 100% separation between the Engine (Systems) and Content (Data).

## Phase 7.1: Survival & Magical Focus Integrity (Final Polish) - **COMPLETED**

- [x] **Arcane Focus Substitution**: Implemented Energy-to-Magic cost substitution logic in the Action Engine.
- [x] **Survival Mechanics Activation**: Restored functional Satiation drain (Passive & Action-based) to ensure balanced gameplay loop.
- [x] **Gated Automation**: Decoupled the magical focus ✨ from the early-game Wanderstock, moving the unlock to Archmage Aris.
- [x] **Yield Synchronization**: Corrected the Wanderstock to provide its intended +1 Wood and +1 Stone yield bonuses.
- [x] **Documentation Integrity**: Fully synchronized `GAMEDESIGN.md` and `PROGRESSION.md` with the finalized Core 3.5 values.

## Phase 7.2: Debug-Offensive (The Shield) - **COMPLETED**

- [x] **Automation Security**: Stabilized gathering actions with 1s duration to prevent spam-exploits and UI flicker.
- [x] **Magic Drain Hardening**: Synchronized Focus drain logic with loopable tasks for fair resource management.
- [x] **Persistence Clamping**: Implemented load-time sanity checks to prevent overflows and data corruption.
- [x] **Log Anti-Spam**: Suppressed repetitive hunger warnings via 60s cooldown mechanism.
- [x] **Audio Resilience**: Integrated safe-playback wrappers to handle browser autoplay policies.
- [x] **Ghost-Tooltip Elimination**: Fixed UI state leaks during view/tab transitions via global UI-Watcher.
- [x] **Trade & Item Integrity**: Added wastage protection to prevent consuming items at full stats or losing trade yields.
- [x] **Value Precision**: Balanced the Efficiency curve and rounded all pipeline calculations.
- [x] **NPC Market Refinement**: Decentralized all trades to character cards and added Town Hall work permit logic.

---

## Phase 8: Production Balance & Polish - **IN PROGRESS**

- [x] **Phase 8.1: Early-Flow Balancing**:
  - [x] **Storage Fix**: Increased wood/stone limits to 50.
  - [x] **Regen Overhaul**: Buffed energy/satiation recovery 10x.
  - [x] **Focus Efficiency**: Reduced focus cost to 1.0/s.
  - [x] **Yield Scaling**: Snappy resource progression.
  - [x] **Interaction Stability**: Fixed broken event handlers in Confirm, Naming, and Settings modals by synchronizing them with the root Store-Proxies.
  - [x] **Gameplay Tab Fix**: Resolved structural HTML bugs and restored full mathematical precision for resource rewards.
  - [x] **Crafting Stability**: Fixed visibility logic for complex requirements and synchronized tooltip management.
  - [x] **Hybrid Scaling**: Implemented a transition-less auto-scale system that preserves readability on laptops while protecting UI integrity on small screens.
  - [x] **Button Polish**: Refined action bar layout with flex-wrap and adaptive widths to prevent text clipping.
  - [x] **UI Compactness**: Reduced global button padding and height for a more professional, "tighter" aesthetic.
  - [x] **VFX Polish**: Fixed shadow clipping in the primary actions container by enforcing full-width rendering.
  - [x] **UI Rescue Package**:
    - [x] **Scaling Fix**: Removed whole-wrapper scale transformations to eliminate black borders and tiny UI.
    - [x] **Scroll Restoration**: Fixed inheritance and overflow rules to re-enable mouse wheel and scrollbar usage. Global page scroll enabled for stacked layouts.
    - [x] **Background Stability**: Fixed background attachment to stay steady during scrolling in compact modes.
    - [x] **Tooltip Intelligence**: Implemented pipeline-fallback for {val} interpolation in dynamic tooltips.
    - [x] **Portrait Optimization**: Stabilized panel stacking for narrow windows to prevent content overlap.
    - [x] **Final UX Polish**:
      - [x] **Total Scroll Unlock**: Forced auto-height on all root containers for seamless page scrolling on small screens.
      - [x] **Tab Wrapping**: Implemented flex-wrap on category tabs in Upgrades and Crafting views.
      - [x] **Responsive Padding**: Optimized view padding for compact displays to maximize content area.
    - [x] **Final Alignment & Logic Correction**:
      - [x] **Alpine Fix**: Defined missing isTaskActive helper in main store to prevent JS crashes.
      - [x] **Environmental Scroll Unlock**: Forced overflow: auto to override IDE-injected scroll-locks on body.
      - [x] **Aesthetic Centers**: Centered all sub-category navigation tabs for balanced visual presentation.
    - [x] **Dialogue Integrity**: Fixed Ellie's tutorial log grouping to ensure all intro messages are visible.
    - [x] **Stat Visibility**: Restored Satiation, Energy, and Magic bars for better resource tracking.
    - [x] **Navigation Polish**: Balanced sidebar layout with optimized icon scaling and spacing for long text.
    - [x] **Stability Patch**: Resolved background crashes by initializing finale state data on startup.
    - [x] **Atmospheric Logs**: NPC dialogue is now correctly logged with speaker names in the Event Log.
    - [x] **1080p Layout Refinement**: Optimized panel widths, gaps, and navigation balance for Full HD displays.
    - [x] **Scroll Stability & UI Reliability**: Implemented internal sidebar scrolling and universal premium scrollbar designs with layout-shift protection.
    - [x] **Village View Scaling Fix**: Resolved nested scrollbar conflicts and implemented responsive NPC cards for small monitors.
    - [x] **Omni-Audit & Translation Parity**: Achieved 100% synchronization between de.js and en.js, including all secondary logs and milestones.
    - [x] **Workshop Core Fix**: Resolved recipe-completion bugs, missing tool icons, and technical ID leaks in the crafting interface.
    - [x] **UI Bar Alignment**: Fixed variable-width status bars by implementing rigid width constraints for labels and values.
    - [x] **Visual Excellence (v3.5 Assets)**: Integrated high-res hand-drawn assets (transparent .webp) for the House, Table, Kitchen, Sanctum, Garden, Gourmet Meal, Astral Shards, and Wyvern Scale.

- [x] **Phase 8.2: TypeScript Ascension & Architecture Hardening**:
  - [x] **Full TypeScript Migration**: Converted all 20+ core systems and infrastructure modules to TypeScript.
  - [x] **Type-Safe State Management**: Hardened the global `GameState` interface, ensuring zero "undefined" property leaks.
  - [x] **Logic Integrity**: Achieved 100% logic coverage in `.ts` (Systems, Content, State, and Entry Point).
  - [x] **Infrastructure Hardening**: Migrated Persistence, Event Bus, and Registry lookup to strictly typed services.
  - [x] **Build Reliability**: Verified zero-error production builds and Electron packaging via `tsc` audit.

- [x] **Phase 8.3: TypeScript stabilization & Project Clean-Code**:
  - [x] **Discriminated Unions**: Implemented strict literal unions for `GameEffect` and `GameRequirement`, enforcing exact data structures for all gameplay logic.
  - [x] **Registry Härtung**: Introduced TypeScript Generics for the `content.get<T>()` service, eliminating manual casting during registry lookups.
  - [x] **Action System Refactoring**: Removed 100% of legacy `as any` casts from effect handlers and the action execution engine.
  - [x] **System Audit**: Fully typed the Passive Production (Engine), Quest Progress (NPC), and persistence (Save/Load) systems.
  - [x] **Strict ID Architecture**: Standardized literal unions for `ResourceId`, `ItemId`, `NPCId`, and `FlagId` to eliminate typos.
  - [x] **Zero-Error Benchmark**: Achieved a 100% clean `tsc --noEmit` build state across the entire repository.

- [x] **Phase 8.4: Narrative Clarity & UI Refinement (Mina's Whisper)**:
  - [x] **Chronicle Redesign**: Transformed the "Story" tab into a premium two-column NPC dialogue archive.
  - [x] **Sidebar Navigation**: Implemented character-based filtering for past conversations.
  - [x] **Glassmorphism Aesthetic**: Applied modern, responsive UI tokens to the story interface.
  - [x] **Dialogue Integrity**: Fixed a core bug in the `ActionSystem` to ensure real spoken text is captured in the archive.
  - [x] **Placeholder Cleanup**: Removed legacy placeholder descriptions system-wide for a cleaner UI.
  - [x] **Validation Mastery**: Added `check-all` command for comprehensive, one-click project health audits.
  - [x] **Lore Update**: Renamed the primary guide NPC to **Mina** (formerly Ellie) to strengthen her narrative identity.

---

## Future Horizons

- [ ] **Phase 9: Diplomacy**
- [ ] **Phase 10: More content and islands**
