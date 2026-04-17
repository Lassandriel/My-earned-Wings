# PROJECT ROADMAP - YOUR EARNED WINGS

## Current Status: Phase 5 COMPLETED (UX & Architecture Hardening)

The game has been modernized with a grid-based modular architecture, simplified primary actions, and full terminological consistency.

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
- [x] **Offline Removal**: Completely eliminated original time-based offline progress for a static, session-based experience.
- [x] **Terminological Consistency**: Unified nomenclature (Inventory -> Possession/Besitz, Story -> Chronicle).
- [x] **Simplified Actions**: Primary gameplay actions (Eat, Rest, Focus) reduced to a single-effect-per-button logic.
- [x] **Tooltip Precision**: Dynamic yield calculation for all action tooltips (replaced curly-brace placeholders).
- [x] **Architecture Cleanup**: Removed legacy system calls (e.g., checkTraits) and duplicate resource registries.
- [x] **Sidebar Highlighting**: Added active-tab glow and high-contrast text for better navigation.

---

## Post-Demo Vision (Future Phases)
- [ ] **Phase 5: The Sky Rift**: First steps toward building a mechanical flying machine.
- [ ] **Phase 6: Diplomacy**: Visiting other floating islands via trade routes.
- [ ] **Phase 7: True Wings**: Final evolution of the player character.
