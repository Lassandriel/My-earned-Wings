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
    
    %% Hunter Saga
    Hunter -- "Training 2/5" --> Bow["Recipe: Hunting Bow"]
    Bow --> Hunt["Action: Hunt (Meat)"]
    Hunter -- "Training 5/5" --> MeatTrade["Action: Meat Trade"]
    Hunt -- "Provides" --> Meat["Resource: Meat"]
    Meat --> MeatTrade
    
    %% Traits & Companions
    Gather -- "Quantity" --> Traits["Traits (Titles)"]
    Traits -- "Passive Bonuses" --> Gather
    
    %% Village & Management
    Hunter -- "Max Friendship" --> Companion_Hunter["Companion: Hunter"]
    Artisan -- "Max Friendship" --> Companion_Artisan["Companion: Artisan"]
    FlowerGirl -- "Max Friendship" --> Companion_FlowerGirl["Companion: Flower Girl"]
    
    Companion_Hunter -- "Shard Salary" --> Auto_Meat["Passive Meat Yield"]
    Companion_Artisan -- "Shard Salary" --> Auto_Wood["Passive Wood Yield"]
    Companion_FlowerGirl -- "Shard Salary" --> Auto_Magic["Passive Magic Yield"]
    
    %% Core Loops
    Eat -- "Refills" --> Satiation["Satiation"]
    Satiation -- "Efficiency" --> Yield["Yield Multiplier"]
```

## Explanation
- **Draconia Reality**: In a world where magic is the fuel for life and the Lava Sea is ever-present, resources are more than just items—they are survival.
- **Teacher & Lore**: Investing **Magic** into the Teacher's lessons is the primary way to understand the world and progress through narrative milestones.
- **Housing & NPCs**: Structures like the Campfire or House aren't just for rest; they attract NPCs like the Flower Girl or the Artisan, who provide the recipes needed for higher-tier tools.
- **Companions**: Fully befriending an NPC allows you to employ them in the Village. This transitions the game from active gathering to passive management.
- **Satiation**: Keeping your satiation high is crucial. It directly impacts your gathering efficiency and energy consumption.
- **Tools**: The Axe and Pickaxe significantly boost resource yields, making them top priorities for early-game progression.
