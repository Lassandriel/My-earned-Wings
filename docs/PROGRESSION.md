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
    Tent --> Artisan["NPC: Artisan (Recipes)"]
    
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

    %% Trader System (Decentralized)
    Baker -- "Reputation 2/5" --> SellWood["Trade: Sell Wood"]
    Hunter -- "Reputation 2/5" --> MeatTrade["Trade: Sell/Buy Meat"]
    Artisan -- "Reputation 1/3" --> SellStone["Trade: Sell Stone"]
    TownHall -- "Reputation 1/5" --> WorkAction["Work: Clean Paths"]
    
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

    Garden["Garden Level 1"] --> Garden2["Upgrade: Garden Lvl 2"]
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

* **Focus**: Resource gathering and basic survival.
* **Core Stats**: 50 Max Energy / 50 Max Magic (Symmetric Balance).
* **Milestone**: Building the first tent and meeting the Baker.

### Stage 2: Settlement (The Home)

* **Focus**: Infrastructure and community.
* **Storage**: Maximum capacity of 50 for primary resources.
* **Milestone**: Obtaining the Land Deed and building the House (40 Wood / 40 Stone).

### Stage 3: Refinement (The Mastery)

* **Focus**: Concentration of energy and optimization.
* **Decentralized Trade**: Trading is no longer a centralized market but a trust-based interaction with NPCs.
  * **Baker**: Buys Wood (Reputation 2+).
  * **Hunter**: Buys/Sells Meat (Reputation 2+).
  * **Artisan**: Buys Stone (Reputation 1+).
  * **Town Hall**: Allows working for Shards (Reputation 1+).
* **Arcane Focus**: Unlocking the ability to automate tasks using Magic Drain (3/s) instead of Energy.
* **Milestones**:
  * **Arcane Sanctum**: Unlocks Archmage Aris and the generation of Astral Shards.
  * **Kitchen Station**: Unlocks Gourmet Cooking for long-lasting buffs (+10 Satiation per meal).
  * **Garden Expansion**: Doubles harvest capacity via parallel slots.
  * **Dream Wyvern**: Meeting Ellie and unlocking the Dream Bloom action for speed bonuses.

### Stage 4: Eternal Roots (The Finale)

* **Focus**: Transcending physical needs via the **Milestone System**.
* **Requirements**: Managed by `milestones.js`.
  * **Structure**: Completed permanent House.
  * **Trust**: Full bond (Level 5) with key NPCs.
  * **Wisdom**: Expanding the Magic limit via study.
* **Final Action**: Accessing the Tree of Life once the engine validates all Milestone requirements.

## Explanation

* **Draconia Reality**: In a world where magic is the fuel for life, resources are more than just items—they are survival.
* **Milestone System**: Replaces hardcoded progression checks with a generic requirement engine (`op: '>=', val: X`).
* **Passive Production**: Buildings like the Garden now utilize a universal engine ticker for resource generation.
* **Arcane Focus**: Automation is handled by the player's own focus, draining magic but eliminating energy costs.
* **Satiation**: Keeps gathering efficiency high and facilitates recovery.
* **Loop Mode**: Allows manual repetition of tasks, synergizing with Arcane Focus.
