# Progression Tree: Your Earned Wings

This document provides an overview of the dependencies and unlock chains in the game.

```mermaid
graph TD
    %% Start
    Start["Start on the Ground"] --> Gather["Gather Twigs & Pebbles"]
    Gather --> Campfire["Campfire (5 Wood)"]
    Campfire --> FlowerGirl["NPC: Flower Girl"]
    
    %% Flower Girl Chain
    FlowerGirl -- "Reputation 5/5" --> Blacksmith["NPC: Blacksmith (Future)"]
    
    %% Housing Chain
    Campfire --> Tent["Tent (15 Wood, 5 Stone)"]
    Tent --> TownHall["NPC: Town Hall"]
    Tent --> Storage["Storage (20 Wood / 20 Stone)"]
    Storage --> Artisan["NPC: Artisan"]
    
    %% Tools
    Artisan -- "Reputation 3/3" --> Axe["Recipe: Stone Axe"]
    Artisan -- "Reputation 3/3" --> Pickaxe["Recipe: Stone Pickaxe"]
    
    %% Advanced Housing
    TownHall -- "Buy Deed" --> House["Build House (50 Wood/Stone)"]
    House --> Table["Recipe: Solid Table (40 Wood)"]
    Table --> Sage["NPC: Ancient Sage"]
    
    %% Magic Chain
    Sage -- "Knowledge 1/1" --> Study["Action: Study"]
    Study --> MagicCap["Increase Magic Limit"]
    
    %% Furniture Synergies
    Table --> Chair["Recipe: Chair (10 Wood)"]
    Chair -- "Bonus" --> Study
    Table --> Bookshelf["Recipe: Bookshelf (20 Wood)"]
    Bookshelf -- "Bonus" --> Study
    
    House --> Stove["Recipe: Stove (25 Stone)"]
    Stove -- "Bonus" --> Eat["Action: Eat (Berries)"]
    
    %% Hunter Saga
    Start --> Hunter["NPC: Hunter"]
    Hunter -- "Training 2/5" --> Bow["Recipe: Hunting Bow (30 Wood)"]
    Bow --> Hunt["Action: Hunt (Story)"]
    Hunter -- "Training 5/5" --> MeatTrade["Meat Trade (Village)"]
    Hunt -- "Provides" --> Meat["Resource: Meat"]
    Meat --> MeatTrade
    
    %% NEW: Traits & Companions
    Gather -- "Quantity" --> Traits["Traits (Titles)"]
    Traits -- "Bonuses" --> Gather
    
    Hunter -- "Training 5/5" --> Companion_Hunter["Companion: Hunter"]
    Artisan -- "Rep 5/5" --> Companion_Artisan["Companion: Artisan"]
    Companion_Hunter -- "Costs Shards" --> Auto_Meat["Passive Meat Yield"]
    Companion_Artisan -- "Costs Shards" --> Auto_Wood_Stone["Passive Material Yield"]
    
    %% Satiation logic
    Eat -- "Refills" --> Satiation["Satiation"]
    Satiation -- "Multiplier" --> EnergyCost["Energy Cost of Actions"]
```

## Explanation
- **Structures & Furniture**: Unlock new interactions, storage limits, or passive bonuses to actions.
- **NPCs**: Require progress (interactions) to release rewards like recipes, new actions, or become **Companions**.
- **Companions**: Once an NPC is fully befriended, they can work for you (managed in the Village tab), providing passive resource yields in exchange for a Shard-based salary.
- **Tools**: Massively increase yield per click (e.g., Axe: 1 Wood -> 2 Wood).
- **Traits (Titles)**: Unlocked by reaching total gathering milestones (e.g., 100 Wood for "Woodcutter"). They provide permanent passive bonuses to yield or costs.
- **Satiation Loop**: Eating food maintains Satiation. High Satiation (>80%) reduces Energy costs by 20%, while low Satiation (<20%) increases costs by 50%.
- **Architecture**: The game uses a centralized Resource Manager and Transaction System to handle all resource flows and unlocks.
