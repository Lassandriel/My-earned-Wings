# PROJECT ROADMAP - MY-EARNED-WINGS

## Current Status: Version 1.3.0 (Architecture Refactor)

The internal architecture has been fully refactored into a modular, automated system-loading and delegation mechanism. The "God Object" `main.ts` has been replaced with a data-driven system registry.

---

## 🏛️ Completed Milestones

### Phase 1 - 5: Foundations & Community
- [x] **Core Engine**: Implementation of Energy/Magic, resource gathering, and the "ValuePipeline".
- [x] **Registry Architecture**: Centralized definitions for all items, NPCs, and construction actions.
- [x] **UI Basis**: Implementation of the main menu and basic game views.

### Phase 6 - 9: Technical Hardening & World Building
- [x] **TypeScript Migration**: Full migration to TypeScript for better maintainability.
- [x] **Asset Optimization**: Migration to .webp and implementation of a preloader.
- [x] **Precision Engine**: Switched to Delta-Time accumulators for resource production.
- [x] **World Expansion**: Added locations such as "Meadow" and "Whispering Grove".

### Phase 10 - 11: Quality & Stabilization
- [x] **Logic Audit**: Fixed critical bugs in resource calculation and NPC interactions.
- [x] **Validation Suite**: Integration of `npm run check-all` for real-time logic and parity checks.
- [x] **I18N Excellence**: Robust translation system with parameter support.
- [x] **Cross-Browser Hardening**: Resolved a critical Alpine.js context error and race condition that caused startup hangs in Firefox and Chrome.
- [x] **UI Reactivity Hardening**: Fixed a core store issue where using explicit variable references instead of 'this' prevented reactivity in main menu functions.
- [x] **Logic & Balance Polish**: Resolved a stat overflow bug and implemented comprehensive resource capping that respects dynamic building bonuses.
- [x] **UI/Logic Synchronization**: Unified the source of truth for limits and stats between the game engine and the UI using dynamic delegates.
- [x] **Immersion & Naming**: Enabled the character naming system and fixed name resolution placeholders in logs and dialogues.
- [x] **Logic Hardening**: Robust NPC path resolution implemented for Academy Vandara.
- [x] **Global Validation**: Hardened validation scripts (`check-all.ts`, `check-i18n.ts`) for 100% project integrity.
- [x] **I18n Cleanup**: Removed all 42+ orphaned keys and synchronized German/English translations.
- [x] **Golden Master Validation**: Achieved 100% "Perfect" status in global validation suite (i18n, assets, and logic). Fixed missing resource limits and milestone translations.
- [x] **Responsive Layout Hardening**: Optimized the Story Chronicle layout and modernized the view-system using flex-box for better multi-resolution stability.
- [x] **Registry & UI Audit**: Resolved critical audit failures in the Vandara NPC registry. Fixed "floating text" glitches in the header and resource overlap issues in the sidebar using flexible flex-grid layouts. Standardized resource limits across the logic and data layers.
- [x] **Vault UI Hardening**: Fixed a critical rendering bug in the "Possessions & Artifacts" view where item images were not displayed. Added `getItemData` helper to the UI system. Resolved the missing `cat_items` translation key error.
- [x] **Construction Registry Alignment**: Unified action categories ('camp', 'housing', 'garden') to match the Workshop UI tabs. Fixed a bug where storages and addons were invisible because they were assigned to an unsupported 'addon' category.
- [x] **Physical Labor Balance**: Removed a hard satiation requirement for physical actions. Players can now continue working as long as they have energy, even if their satiation is 0. Satiation drain remains active but no longer acts as a blocking factor.
- [x] **Alchemy Resource & Quest Fix**: Resolved a critical blocker in Aris's final quest. Registered `arcane_dust` as a consumable resource and added a new magic action 'Grind Arcane Dust' to produce it. Corrected quest costs to use resource quantities instead of item IDs.
- [x] **Event Log Optimization**: Redesigned the log layout for higher information density. Reduced paddings, tightened gaps, and optimized typography to allow more text to be visible within the log container. Added a custom slim scrollbar.
- [x] **Global Layout Compaction**: Reduced the gaps between UI panels and the padding at screen edges. Tightened internal panel paddings to maximize usable space for game content. Radically slimmed the sidebar and eliminated margins to push menu buttons directly against the main content area.
- [x] **Water Barrel Progression & Assets**: Fixed a logic bug where the Water Barrel unlocked too early. It now correctly requires the Garden to be built. Generated and integrated a dedicated visual asset for the Water Barrel.
- [x] **Academy & Validation Hardening**: Resolved a critical bug in the Vandara Academy path selection that prevented choosing the Lyra path. Enhanced the `check-all` validation suite to correctly handle dynamic i18n keys and system-level whitelists, significantly reducing false positive warnings and improving audit reliability.
- [x] **Stability & Persistence Hardening**: Fixed a critical bug where game methods (`exportGameData`, `quit`) were lost after state resets. Optimized the `ValuePipeline` to prevent performance degradation. Hardened the LZW compression for safe `localStorage` usage and resolved reactivity gaps in Alpine.js stores.
- [x] **School Asset & Logic Hardening**: Generated high-quality fantasy illustrations for all school actions. Resolved critical logic audit failures regarding missing assets and corrected file pathing in the school registry.
- [x] **Progression Logic Fix**: Corrected a flaw where Vandara could be reached prematurely. Added strict teacher progress requirements to the school graduation milestone and fixed command syntax errors.
- [x] **Vandara UI & Logic Hardening**: Improved Vandara mentor selection with premium visual styles and tooltips. Unified the Vandara view structure and added the Mentor Spotlight. Corrected path selection logic to properly unlock the chosen NPC mentor.
- [x] **Asset & Logic Hardening (Phase 12.1)**: Generated and integrated high-quality fantasy illustrations for all Vandara mentors (Solen, Bram, Lyra). Fixed a critical logic bug in NPC quest cost calculation where single and multi-resource costs were not merged. Resolved a syntax error in the Village UI and hardened the I18n validation suite to eliminate false positives for dynamic keys.
- [x] **Village Hub Refactor (v1.1.2)**: Comprehensive refactor of the Village and School views. Implemented dynamic action filtering, improved TypeScript safety in NPC logic, and modernized the UI with glassmorphism and enhanced animations.
- [x] **Title System & UI Polishing (v1.1.3)**: Implementation of the permanent Title System with active modifiers. Refactored Crafting and Upgrades UI for better modularity and grid consistency. Integrated titles into the Value Pipeline.
- [x] **Global Code Audit & Hardening (v1.1.4)**: Comprehensive TypeScript hardening. Resolved 25+ type errors in core registries and systems. Fixed missing resource definitions (`rune_fragment`, `arcane_dust`, `study_xp`) and NPC properties. Eliminated redundant logic in the Value Pipeline and cleaned up unused code across the engine.
- [x] **UI & Gameplay Hardening (v1.1.4)**: Fixed a critical Naming-Modal bug. Resolved a category-mismatch that hid gathering actions at the start of a new game. Completed missing I18N keys and standardized the registry to prevent console warnings.
- [x] **Logic Simulation Hardening (v1.1.4)**: Enhanced the logic validation suite to correctly simulate NPC progress and exclusive branching paths (like Academy Vandara). Achieved 100% "Perfect" status in the logic audit by eliminating false-positive reachability warnings.
- [x] **Architectural Decentralization (v1.2.0)**: Broke the "State-Monolith" by moving frequent/large data structures (like Logs) into dedicated Alpine stores. This reduces reactivity overhead and improves UI performance.
- [x] **Core Type-Safety Hardening (v1.2.0)**: Eliminated all 'any' casts in the main game store and core logic systems. Enforced strict GameState interface usage for better maintainability and error prevention.
- [x] **High-Frequency Performance (v1.2.0)**: Implemented 'Silent Updates' for passive resource production and regeneration. This drastically reduces Event Bus traffic and CPU load during high-frequency ticks.
- [x] **Data-Driven Satiation (v1.2.0)**: Refactored the hunger system from hardcoded side-effects to a registry-based property. Hunger costs now respect the ValuePipeline, allowing for dynamic modifiers.
- [x] **UI Consistency & Utility System (v1.2.1)**: Established a global utility CSS system (`panel-premium`, `card-premium`) and standardized all game views (Housing, Village, Crafting, Chronicle) for a unified look and feel.
- [x] **Save-Game Hardening (v1.2.1)**: Implemented schema validation and auto-migration for save files to prevent crashes during updates.
- [x] **Terminology Synchronization (v1.2.1)**: Standardized naming conventions (Chronicle, Handwerk, Seelensplitter) across German and English localizations.
- [x] **Input Debouncing (v1.2.1)**: Added action cooldowns (50ms) to prevent hardware-bounce or accidental double-triggers.

### Phase 13: Architectural Modernization (v1.3.0)
- [x] **System Registry**: Introduced a centralized registry for all game systems, decoupling them from the main store.
- [x] **Automated Delegation**: Implemented a metadata-driven delegation system to automatically expose system methods on the global `$store.game`.
- [x] **Modular Input Handling**: Extracted global keyboard and window events into a dedicated `InputSystem`.
- [x] **God-Object Deconstruction**: Reduced `main.ts` complexity by 60%, moving boilerplate initialization into specialized loaders and factories.
- [x] **Strict Type Consolidation**: Unified all scattered `GameState` extensions into a single, authoritative interface.
- [x] **Architectural Decentralization (v1.3.0)**: Broke the "State-Monolith" by moving frequent/large data structures into specialized Alpine stores.
- [x] **Store Synchronization Hardening (v1.3.1)**: Resolved critical race conditions and reactivity holes in Alpine.js store initialization. Unified 'game' and 'ui' stores and migrated view templates to a centralized store pattern for 100% stability.
- [x] **Visual Polish & Glassmorphism**: Optimized global blur effects for better readability and a premium aesthetic.

---

## 🗺️ Future Horizons

### Phase 13.5: Branching Destinies & Endings
- [ ] **Path-Specific Gameplay**: The chosen Academy Branch dictates the late-game experience. Each path has exclusive crafting, resources, or mechanics.
- [ ] **Path-Specific Endings**: The game now features multiple endings based on the chosen Branch.
- [ ] **Vandara Expansion**: Expanding the city of Vandara beyond the Academy. Adding Nobles, a Black Market/Illegal Goods, and more complex city interactions.

### Phase 14: The Incarnation Cycle
- [ ] **Prestige System**: "The Incarnation" – resetting resources while retaining Titles and fundamental essence.
- [ ] **Mid/Late Game Automation**: "Ancient Echoes" – utilizing shadows of previous lives to automate complex production chains.
- [ ] **The Tree of Life Finale**: Reaching the ultimate spiritual awakening and revealing the wingless wanderer's true purpose.

---

Last updated: May 2026 · v1.3.0-architecture-refactor
