# Game Progression & Unlock Tree

Here is the complete overview of when actions, new mechanics, buildings, craftable items, and story NPCs are unlocked. When new features are added, this diagram will be updated!

```mermaid
graph TD
    classDef npc fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef item fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef structure fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff
    classDef base fill:#1e293b,stroke:#94a3b8,stroke-width:2px,stroke-dasharray: 5, 5,color:#fff

    %% CORE LOOP
    Start([Start]) --> Actions[Gather & Meditate]
    Actions --> |"+ Energy & Resources"| B_Campfire["Campfire (Housing)"]:::structure
    
    %% TIER 1: CAMPFIRE
    B_Campfire --> NPC_FlowerGirl["Flower Girl (NPC)"]:::npc
    B_Campfire --> B_WoodStorage["Wood Storage (+5 Cap)"]:::structure
    B_Campfire --> B_StoneStorage["Stone Storage (+5 Cap)"]:::structure
    B_Campfire --> B_Tent["Tent (Housing)"]:::structure
    B_Campfire --> Action_Herbs["Gather Herbs (Action)"]

    %% STORAGE EFFECTS (Extensions)
    B_WoodStorage --> NPC_Artisan["Artisan (NPC)"]:::npc
    B_StoneStorage --> NPC_Artisan

    %% TIER 2: TENT & TOWN
    B_Tent --> NPC_TownHall["Town Hall (NPC)"]:::npc
    
    %% TOWN HALL (Permit)
    NPC_TownHall -->|Rank Max| B_House["House / Cabin (Housing)"]:::structure

    %% ARTISAN
    NPC_Artisan -->|Teaches Tools| C_Axe["Axe (Crafting)"]:::item
    NPC_Artisan -->|Teaches Tools| C_Pickaxe["Pickaxe (Crafting)"]:::item

    %% FLOWER GIRL
    NPC_FlowerGirl -->|Connects to| NPC_Blacksmith["Blacksmith (NPC)"]:::npc

    %% TIER 3: HOUSE & FURNITURE
    B_House --> C_Bed["Bed (Crafting)"]:::item
    B_House --> C_Chair["Chair (Crafting)"]:::item
    B_House --> B_Stove["Stove (Housing)"]:::structure
    
    %% HOUSE EXTENSIONS (Table & Study)
    C_Chair -->|Requirement| C_Table["Solid Table (Crafting)"]:::structure
    
    C_Table --> Trade_Books["Buy Books (Trader)"]:::item
    C_Table --> C_Bookcase["Bookcase (Crafting)"]:::structure
    C_Table --> NPC_Sage["Old Sage (NPC)"]:::npc
    Trade_Books --> |"If > 0 Books"| Action_Study["Study (+Magic)"]

    %% SAGE
    NPC_Sage -->|Rank Max| Reward_Vitality["Amulet of Vitality (+50 Max Energy)"]:::item

    %% TEACHER & HUNTER
    NPC_Teacher["Teacher (Start NPC)"]:::npc -->|Rank 3/3| NPC_Hunter["Hunter (NPC)"]:::npc
    NPC_Hunter -->|Rank 2/4| C_Bow["Bow (Crafting)"]:::item
    C_Bow --> Action_Hunt["Hunting (Action)"]
    Action_Hunt --> Res_Meat["Raw Meat (Resource)"]
    
    %% COOKING & BUFFS
    B_Stove --> Action_Cook["Cooking & Buffs"]
    Res_Meat --> Action_Cook
    Action_Cook --> |"Result"| Satiation["Full Satiation & Resource Bonus Buff"]

```

> [!TIP]
> **Tip:** As new mechanics are added, this web will continue to grow. You can open this artifact at any time to analyze all dependencies at a glance!
