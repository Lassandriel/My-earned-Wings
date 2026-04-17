# Progression Tree: Your Earned Wings

This document provides an overview of the dependencies and unlock chains in Draconia.

```mermaid
graph TD
    %% Start & Early NPCs
    Start["Start (Drifting)"] --> Gather["Gather Twigs & Pebbles"]
    Start --> Baker["NPC: Baker (Satiation)"]
    Start --> Teacher["NPC: Teacher (Magic/Lore)"]
    Start --> Hunter["NPC: Hunter (Training)"]

    Gather --> Campfire["Campfire (5 Wood)"]
    Campfire --> FlowerGirl["NPC: Flower Girl (Magic/Shards)"]
    
    %% Flower Girl Chain
    FlowerGirl -- "Reputation 5/5" --> Blacksmith["NPC: Blacksmith"]
    
    %% Housing & Urbanization
    Campfire --> Tent["Tent (15 Wood, 5 Stone)"]
    Tent --> TownHall["NPC: Town Hall"]
    Tent --> Storage["Storage (20 Wood / 20 Stone)"]
    Storage --> Artisan["NPC: Artisan (Recipes)"]
    
    %% Tools
    Artisan -- "Crafting Knowledge" --> Axe["Recipe: Stone Axe (+1 Wood)"]
    Artisan -- "Crafting Knowledge" --> Pickaxe["Recipe: Stone Pickaxe (+1 Stone)"]
    
    %% Advanced Housing (The Home)
    TownHall -- "Official Land Deed" --> House["Build House (60 Wood/Stone)"]
    
    %% Furniture Unlocks from House
    House --> Table["Build Table (40 Wood)"]
    House --> Chair["Recipe: Chair (10 Wood)"]
    House --> Bed["Recipe: Bed (25 Wood)"]
    House --> Stove["Recipe: Stove (25 Stone, 15 Wood)"]
    
    %% Magic & Knowledge
    Teacher -- "Invest Magic" --> WorldLore["World Lore & Progression"]
    Table --> Bookshelf["Recipe: Bookshelf (20 Wood)"]
    Table --> Sage["NPC: Ancient Sage"]
    Sage -- "Deep Knowledge" --> Study["Action: Study (Magic)"]
    Study --> MagicCap["Increase Magic Limit"]
    
    %% Synergies
    Chair -- "Bonus" --> Study
    Bookshelf -- "Bonus" --> Study
    Stove -- "Bonus" --> Eat["Action: Cook & Eat"]
    
    %% Ellie & Dream Magic (Phase 5+)
    FlowerGirl --> Ellie["NPC: Ellie (Dream Wyvern)"]
    Ellie -- "Magic Investment" --> DreamBloom["Action: Dream Bloom (Speed)"]
    DreamBloom -- "Time Compression" --> Auto_Meat
    DreamBloom -- "Time Compression" --> Auto_Wood

    %% Hunter Saga
    Hunter -- "Training 2/5" --> Bow["Recipe: Hunting Bow"]
    Bow --> Hunt["Action: Hunt (Meat)"]
    Hunter -- "Training 5/5" --> MeatTrade["Action: Meat Trade"]
    Hunt -- "Provides" --> Meat["Resource: Meat"]
    Meat --> MeatTrade
    
    %% Traits & Automation
    Gather -- "Quantity" --> Traits["Traits (Titles)"]
    Traits -- "Passive Bonuses" --> Gather
    
    %% Arcane Focus (New Automation)
    Teacher -- "Invest Magic" --> ArcaneFocus["Ability: Arcane Focus"]
    ArcaneFocus -- "Magic Drain" --> Auto_Gather["Magical Automation"]
    Auto_Gather -- "Efficiency" --> Yield
    
    Eat -- "Refills" --> Satiation["Satiation"]
    Satiation -- "Efficiency" --> Yield["Yield Multiplier"]

    %% Stage 3: Refinement (The Mastery)
    House --> Kitchen["Upgrade: Kitchen Station"]
    House --> Sanctum["Build: Arcane Sanctum"]
    Kitchen --> Gourmet["Action: Gourmet Cooking (Buffs)"]
    Sanctum --> Aris["NPC: Archmage Aris"]
    Sanctum --> Meditation["Action: Meditation"]
    Meditation --> Astral["Resource: Astral Shards"]
    Astral --> Spells["Spells & Infusions"]
    
    Artisan -- "Innate Insight" --> LoopMode["Ability: Loop Mode (Manual Optimization)"]

    Garden["Garden Stufe 1"] --> Garden2["Upgrade: Garden Lvl 2"]
    Garden2 --> Parallel["Action: Parallel Planting"]

    %% Stage 4: Eternal Roots (The Finale)
    Aris --> Finale_Check{"Finale Requirements"}
    Sage --> Finale_Check
    Baker --> Finale_Check
    Study --> Finale_Check
    Finale_Check -- "House + 3 Max NPCs + 3 Study" --> TreeOfLife["The Tree of Life"]
```

## Progression Stages

### Stage 1: Survival (The Camp)
*   **Focus**: Resource gathering and basic survival.
*   **Core Stats**: 50 Max Energy / 50 Max Magic (Symmetric Balance).
*   **Milestone**: Building the first tent and meeting the Baker.

### Stage 2: Settlement (The Home)
*   **Focus**: Infrastructure and community.
*   **Storage**: Maximum capacity of 50 for primary resources.
*   **Milestone**: Obtaining the Land Deed and building the House (40 Wood / 40 Stone).

### Stage 3: Refinement (The Mastery)
*   **Focus**: Concentration of energy and optimization.
*   **Arcane Focus**: Unlocking the ability to automate tasks using Magic Drain (3/s) instead of Energy.
*   **Milestones**:
    *   **Arcane Sanctum**: Unlocks Archmage Aris and the generation of Astral Shards.
    *   **Kitchen Station**: Unlocks Gourmet Cooking for long-lasting buffs (+10 Satiation per meal).
    *   **Garden Expansion**: Doubles harvest capacity via parallel slots.
    *   **Dream Wyvern**: Meeting Ellie and unlocking the Dream Bloom action for speed bonuses.

### Stage 4: Eternal Roots (The Finale)
*   **Focus**: Transcending the physical needs to touch the world's heart (Requires 60 Magic via Study).
*   **Requirements**:
    *   **Structure**: Completed permanent House.
    *   **Trust**: Full bond (Level 5) with the Baker, the Teacher, and the Ancient Sage (Mastery level reached).
    *   **Wisdom**: At least 3 successful Study sessions performed (Expanding the Magic limit).
*   **Final Action**: Accessing the Tree of Life via the "Action Hub" once requirements are met.

## Explanation
- **Draconia Reality**: In a world where magic is the fuel for life, resources are more than just items—they are survival.
- **Teacher & Lore**: Investing **Magic** into the Teacher's lessons is the primary way to understand the world and progress through narrative milestones.
- **Housing & NPCs**: Structures like the Campfire or House aren't just for rest; they attract NPCs like the Flower Girl or the Artisan, who provide recipes for the primary toolset.
- **Arcane Focus**: Unlike previous iterations, automation is no longer handled by villagers but by the player's own focus. This drains magic constantly but replaces the energy cost of the automated action.
- **Satiation**: Keeping your satiation high (+10 per click) is crucial. It directly impacts your gathering efficiency and prevents energy drain during rest.
- **Loop Mode**: Unlocked as an innate insight, this allows for the manual repetition of tasks, while Arcane Focus handles the "Magic" version.
