const enemyAdjectives = [
    { adjective: "Fierce", HP: 1.2, STR: 1.2, DEF: 1, ARC: 1, EVD: 1, LCK: 1, XP: 1.2 },
    { adjective: "Wild", HP: 1.1, STR: 1.1, DEF: 1, ARC: 1, EVD: 1, LCK: 1.1, XP: 1.1 },
    { adjective: "Mysterious", HP: 1.1, STR: 1, DEF: 1.1, ARC: 1.2, EVD: 1.1, LCK: 1.2, XP: 1.1 },
    { adjective: "Overgrown", HP: 1.8, STR: 1.2, DEF: 1.2, ARC: 0.7, EVD: 0.8, LCK: 0.9, XP: 1.5 },
    { adjective: "Aggressive", HP: 1.1, STR: 1.3, DEF: 1, ARC: 1, EVD: 1, LCK: 1, XP: 1.2 },
    { adjective: "Savage", HP: 1.3, STR: 1.2, DEF: 1, ARC: 1, EVD: 1.1, LCK: 1, XP: 1.3 },
    { adjective: "Vicious", HP: 1.1, STR: 1.4, DEF: 1, ARC: 1, EVD: 1, LCK: 1.1, XP: 1.4 },
    { adjective: "Ferocious", HP: 1.3, STR: 1.3, DEF: 1.1, ARC: 1, EVD: 1.1, LCK: 1, XP: 1.3 },
    { adjective: "Terrifying", HP: 1.4, STR: 1.3, DEF: 1.2, ARC: 1.1, EVD: 1, LCK: 1, XP: 1.5 },
    { adjective: "Armored", HP: 1.5, STR: 1, DEF: 1.5, ARC: 0.8, EVD: 0.9, LCK: 0.9, XP: 1.4 },
    { adjective: "Nimble", HP: 1, STR: 1, DEF: 1, ARC: 1, EVD: 1.3, LCK: 1.1, XP: 1.1 },
    { adjective: "Shadowy", HP: 1, STR: 1, DEF: 1, ARC: 1.1, EVD: 1.2, LCK: 1.2, XP: 1.1 },
    { adjective: "Stalwart", HP: 1.3, STR: 1.1, DEF: 1.3, ARC: 1, EVD: 1, LCK: 1, XP: 1.3 },
    { adjective: "Ancient", HP: 1.2, STR: 1.2, DEF: 1.2, ARC: 1.1, EVD: 1, LCK: 1, XP: 1.3 },
    { adjective: "Basic", HP: 1, STR: 1, DEF: 1, ARC: 1, EVD: 1, LCK: 1, XP: 1 },
];

const enemyTiers = {
    Tier1: [
        { 
            name: "Wolf", 
            HP: 80, 
            STR: 8, 
            DEF: 5, 
            ARC: 2, 
            EVD: 4, 
            LCK: 3,
            XP: 10,
            coinRange: { min: 1, max: 10 },
            drops: [
                { item: "Piece of Bread", rate: 0.5 }
            ]
        },
        { 
            name: "Goblin", 
            HP: 75, 
            STR: 9, 
            DEF: 6, 
            ARC: 3, 
            EVD: 5, 
            LCK: 4,
            XP: 12,
            coinRange: { min: 5, max: 25 },
            drops: [
                { item: "Old Map", rate: 0.2 }
            ]
        },
        { 
            name: "Rat", 
            HP: 70, 
            STR: 7, 
            DEF: 5, 
            ARC: 1, 
            EVD: 6, 
            LCK: 5,
            XP: 8,
            coinRange: { min: 1, max: 5 },
            drops: [
                { item: "Piece of Bread", rate: 0.5 }
            ]
        },
        { 
            name: "Bat", 
            HP: 73, 
            STR: 8, 
            DEF: 5, 
            ARC: 2, 
            EVD: 8, 
            LCK: 5,
            XP: 10,
            coinRange: { min: 2, max: 10 },
            drops: [
                { item: "Healing Herb", rate: 0.3 }
            ]
        },
        { 
            name: "Snake", 
            HP: 75, 
            STR: 8, 
            DEF: 6, 
            ARC: 2, 
            EVD: 6, 
            LCK: 5,
            XP: 11,
            coinRange: { min: 3, max: 12 },
            drops: [
                { item: "Waterskin", rate: 0.3 }
            ]
        }
    ],
    Tier2: [
        { 
            name: "Fire Elemental", 
            HP: 90, 
            STR: 14, 
            DEF: 10, 
            ARC: 7, 
            EVD: 7, 
            LCK: 5,
            XP: 18,
            coinRange: { min: 10, max: 30 },
            drops: [
                { item: "Fire Essence", rate: 0.5 }
            ]
        },
        { 
            name: "Water Elemental", 
            HP: 88, 
            STR: 12, 
            DEF: 11, 
            ARC: 7, 
            EVD: 6, 
            LCK: 6,
            XP: 18,
            coinRange: { min: 10, max: 30 },
            drops: [
                { item: "Water Essence", rate: 0.5 }
            ]
        },
        { 
            name: "Orc Scout", 
            HP: 100, 
            STR: 16, 
            DEF: 10, 
            ARC: 6, 
            EVD: 5, 
            LCK: 5,
            XP: 20,
            coinRange: { min: 15, max: 50 },
            drops: [
                { item: "Healing Herb", rate: 0.4 }
            ]
        },
        { 
            name: "Goblin Warrior", 
            HP: 95, 
            STR: 17, 
            DEF: 10, 
            ARC: 6, 
            EVD: 6, 
            LCK: 4,
            XP: 21,
            coinRange: { min: 20, max: 60 },
            drops: [
                { item: "Old Map", rate: 0.3 }
            ]
        },
        { 
            name: "Shade", 
            HP: 92, 
            STR: 15, 
            DEF: 9, 
            ARC: 7, 
            EVD: 12, 
            LCK: 6,
            XP: 19,
            coinRange: { min: 15, max: 45 },
            drops: [
                { item: "Mysterious Artifact", rate: 0.2 }
            ]
        }
    ],
    Tier3: [
        { 
            name: "Bear", 
            HP: 140, 
            STR: 22, 
            DEF: 15, 
            ARC: 5, 
            EVD: 5, 
            LCK: 4,
            XP: 25,
            coinRange: { min: 20, max: 70 },
            drops: [
                { item: "Golden Apple", rate: 0.1 }
            ]
        },
        { 
            name: "Orc Warrior", 
            HP: 135, 
            STR: 24, 
            DEF: 16, 
            ARC: 6, 
            EVD: 4, 
            LCK: 3,
            XP: 27,
            coinRange: { min: 80, max: 150 },
            drops: [
                { item: "Healing Potion", rate: 0.1 }
            ]
        },
        { 
            name: "Troll", 
            HP: 155, 
            STR: 26, 
            DEF: 17, 
            ARC: 7, 
            EVD: 3, 
            LCK: 3,
            XP: 30,
            coinRange: { min: 90, max: 180 },
            drops: [
                { item: "Golden Apple", rate: 0.2 }
            ]
        },
        { 
            name: "Ogre", 
            HP: 150, 
            STR: 25, 
            DEF: 16, 
            ARC: 5, 
            EVD: 4, 
            LCK: 4,
            XP: 28,
            coinRange: { min: 70, max: 140 },
            drops: [
                { item: "Healing Herb", rate: 0.3 }
            ]
        },
        { 
            name: "Minotaur", 
            HP: 150, 
            STR: 25, 
            DEF: 16, 
            ARC: 5, 
            EVD: 4, 
            LCK: 4,
            XP: 29,
            coinRange: { min: 90, max: 180 },
            drops: [
                { item: "Magic Sword", rate: 0.05 }
            ]
        }
    ],
    Tier4: [
        { 
            name: "Earth Elemental", 
            HP: 120, 
            STR: 24, 
            DEF: 18, 
            ARC: 7, 
            EVD: 6, 
            LCK: 5,
            XP: 35,
            coinRange: { min: 15, max: 70 },
            drops: [
                { item: "Earth Essence", rate: 0.5 }
            ]
        },
        { 
            name: "Air Elemental", 
            HP: 115, 
            STR: 22, 
            DEF: 15, 
            ARC: 9, 
            EVD: 8, 
            LCK: 6,
            XP: 33,
            coinRange: { min: 12, max: 60 },
            drops: [
                { item: "Air Essence", rate: 0.5 }
            ]
        },
        { 
            name: "Giant Boar", 
            HP: 160, 
            STR: 28, 
            DEF: 17, 
            ARC: 6, 
            EVD: 5, 
            LCK: 5,
            XP: 37,
            coinRange: { min: 20, max: 70 },
            drops: [
                { item: "Golden Apple", rate: 0.15 }
            ]
        },
        { 
            name: "Bandit Leader", 
            HP: 150, 
            STR: 26, 
            DEF: 16, 
            ARC: 7, 
            EVD: 7, 
            LCK: 6,
            XP: 40,
            coinRange: { min: 40, max: 120 },
            drops: [
                { item: "Elixir of Power", rate: 0.1 }
            ]
        },
        {
            name: "Dread Knight",
            HP: 155,
            STR: 27,
            DEF: 18,
            ARC: 8,
            EVD: 6,
            LCK: 5,
            XP: 39,
            coinRange: { min: 35, max: 100 },
            drops: [
                { item: "Cursed Amulet", rate: 0.2 }
            ]
        },
    ],
    Tier5: [
        { 
            name: "Dragon", 
            HP: 300, 
            STR: 36, 
            DEF: 24, 
            ARC: 12, 
            EVD: 6, 
            LCK: 5,
            XP: 60,
            coinRange: { min: 150, max: 200 },
            drops: [
                { item: "Dragon Armor", rate: 0.05 }
            ]
        },
        { 
            name: "Giant Spider", 
            HP: 225, 
            STR: 34, 
            DEF: 22, 
            ARC: 10, 
            EVD: 7, 
            LCK: 6,
            XP: 55,
            coinRange: { min: 145, max: 190 },
            drops: [
                { item: "Golden Apple", rate: 0.2 }
            ]
        },
        { 
            name: "Wyvern", 
            HP: 240, 
            STR: 35, 
            DEF: 23, 
            ARC: 11, 
            EVD: 6, 
            LCK: 5,
            XP: 58,
            coinRange: { min: 150, max: 195 },
            drops: [
                { item: "Healing Potion", rate: 0.3 }
            ]
        },
        { 
            name: "Griffin", 
            HP: 230, 
            STR: 33, 
            DEF: 22, 
            ARC: 10, 
            EVD: 7, 
            LCK: 5,
            XP: 57,
            coinRange: { min: 140, max: 180 },
            drops: [
                { item: "Magic Sword", rate: 0.05 }
            ]
        },
        { 
            name: "Phoenix", 
            HP: 255, 
            STR: 37, 
            DEF: 23, 
            ARC: 11, 
            EVD: 6, 
            LCK: 6,
            XP: 59,
            coinRange: { min: 150, max: 190 },
            drops: [
                { item: "Phoenix Feather", rate: 0.5 }
            ]
        }
    ],
    Unique: [
        { 
            name: "Bandit", 
            HP: 100, 
            STR: 25, 
            DEF: 15, 
            ARC: 5, 
            EVD: 10, 
            LCK: 7,
            XP: 30,
            coinRange: { min: 100, max: 200 },
            drops: [
                { item: "Healing Potion", rate: 0.5 },
                { item: "Golden Apple", rate: 0.2 },
                { item: "Shiny Gem", rate: 0.3 }
            ]
        },
        { 
            name: "Bandit Leader", 
            HP: 200, 
            STR: 30, 
            DEF: 20, 
            ARC: 5, 
            EVD: 10, 
            LCK: 7,
            XP: 50,
            coinRange: { min: 150, max: 300 },
            drops: [
                { item: "Elixir of Power", rate: 0.5 },
                { item: "Magic Sword", rate: 0.1 },
                { item: "Healing Herb", rate: 0.3 }
            ]
        },
        {
            name: "Spy",
            HP: 120,
            STR: 28,
            DEF: 18,
            ARC: 7,
            EVD: 13,
            LCK: 9,
            XP: 35,
            coinRange: { min: 110, max: 220 },
            drops: [
                { item: "Emerald Gem", rate: 0.4 },
                { item: "Healing Herb", rate: 0.3 },
                { item: "Waterskin", rate: 0.3 }
            ]
        },
        {
            name: "Thief",
            HP: 110,
            STR: 27,
            DEF: 17,
            ARC: 6,
            EVD: 12,
            LCK: 8,
            XP: 33,
            coinRange: { min: 105, max: 210 },
            drops: [
                { item: "Piece of Bread", rate: 0.5 },
                { item: "Shiny Gem", rate: 0.3 },
                { item: "Golden Apple", rate: 0.2 }
            ]
        },
        {
            name: "Prisoner",
            HP: 115,
            STR: 28,
            DEF: 18,
            ARC: 6,
            EVD: 12,
            LCK: 8,
            XP: 35,
            coinRange: { min: 110, max: 220 },
            drops: [
                { item: "Healing Herb", rate: 0.3 },
                { item: "Emerald Gem", rate: 0.4 },
                { item: "Piece of Bread", rate: 0.3 }
            ]
        },
        { 
            name: "Pack of Wolves", 
            HP: 275, 
            STR: 10, 
            DEF: 6, 
            ARC: 2, 
            EVD: 7, 
            LCK: 5,
            XP: 50,
            coinRange: { min: 5, max: 50 },
            drops: [
                { item: "Waterskin", rate: 0.5 },
                { item: "Healing Herb", rate: 0.3 },
                { item: "Golden Apple", rate: 0.2 }
            ]
        },
        { 
            name: "Group of Goblins", 
            HP: 250, 
            STR: 11, 
            DEF: 7, 
            ARC: 3, 
            EVD: 6, 
            LCK: 4,
            XP: 60,
            coinRange: { min: 25, max: 125 },
            drops: [
                { item: "Old Map", rate: 0.4 },
                { item: "Piece of Bread", rate: 0.4 },
                { item: "Golden Apple", rate: 0.2 }
            ]
        },
        { 
            name: "Forest Guardian", 
            HP: 180, 
            STR: 35, 
            DEF: 20, 
            ARC: 10, 
            EVD: 8, 
            LCK: 6,
            XP: 70,
            coinRange: { min: 50, max: 150 },
            drops: [
                { item: "Cursed Bark", rate: 0.5 },
                { item: "Forest Essence", rate: 0.3 },
                { item: "Ancient Relic", rate: 0.2 }
            ]
        },
        { 
            name: "Venomous Arachnid", 
            HP: 130, 
            STR: 28, 
            DEF: 15, 
            ARC: 12, 
            EVD: 10, 
            LCK: 5,
            XP: 65,
            coinRange: { min: 20, max: 100 },
            drops: [
                { item: "Spider Silk", rate: 0.6 },
                { item: "Poison Gland", rate: 0.3 },
                { item: "Dark Fang", rate: 0.1 }
            ]
        },
        {
            name: 'Apparition',
            HP: 120,
            STR: 20,
            DEF: 15,
            ARC: 35,
            EVD: 10,
            LCK: 8,
            XP: 70,
            coinRange: { min: 10, max: 50 },
            drops: [
                { item: "Spectral Essence", rate: 0.5 },
                { item: "Ghostly Shard", rate: 0.3 },
                { item: "Haunted Relic", rate: 0.2 }
            ], 
        }
    ] 
};

const dungeonEnemies = {
    Tier1: [
        { 
            name: "Dungeon Rat", 
            HP: 60, 
            STR: 8, 
            DEF: 5, 
            ARC: 2, 
            EVD: 4, 
            LCK: 3, 
            XP: 12, 
            coinRange: { min: 2, max: 12 }, 
            drops: [{ item: "Piece of Bread", rate: 0.4 }] 
        },
        { 
            name: "Cave Spider", 
            HP: 65, 
            STR: 9, 
            DEF: 6, 
            ARC: 3, 
            EVD: 5, 
            LCK: 4, 
            XP: 14, 
            coinRange: { min: 3, max: 15 }, 
            drops: [{ item: "Spider Silk", rate: 0.5 }] 
        },
        { 
            name: "Tunnel Bat", 
            HP: 70, 
            STR: 7, 
            DEF: 4, 
            ARC: 3, 
            EVD: 6, 
            LCK: 5, 
            XP: 15, 
            coinRange: { min: 5, max: 20 }, 
            drops: [{ item: "Healing Herb", rate: 0.3 }] 
        }
    ],
    Tier2: [
        { 
            name: "Stone Golem", 
            HP: 120, 
            STR: 14, 
            DEF: 15, 
            ARC: 5, 
            EVD: 3, 
            LCK: 4, 
            XP: 22, 
            coinRange: { min: 20, max: 50 }, 
            drops: [{ item: "Emerald Gem", rate: 0.3 }] 
        },
        { 
            name: "Cursed Spirit", 
            HP: 100, 
            STR: 12, 
            DEF: 8, 
            ARC: 10, 
            EVD: 7, 
            LCK: 5, 
            XP: 20, 
            coinRange: { min: 15, max: 40 }, 
            drops: [{ item: "Cursed Amulet", rate: 0.5 }] 
        },
        { 
            name: "Cave Troll", 
            HP: 130, 
            STR: 16, 
            DEF: 10, 
            ARC: 5, 
            EVD: 4, 
            LCK: 5, 
            XP: 25, 
            coinRange: { min: 20, max: 45 }, 
            drops: [{ item: "Healing Potion", rate: 0.2 }] 
        }
    ],
    Tier3: [
        { 
            name: "Shadow Hound", 
            HP: 150, 
            STR: 18, 
            DEF: 12, 
            ARC: 8, 
            EVD: 7, 
            LCK: 5, 
            XP: 30, 
            coinRange: { min: 25, max: 60 }, 
            drops: [{ item: "Golden Apple", rate: 0.15 }] 
        },
        { 
            name: "Dungeon Serpent", 
            HP: 140, 
            STR: 20, 
            DEF: 10, 
            ARC: 6, 
            EVD: 8, 
            LCK: 6, 
            XP: 32, 
            coinRange: { min: 30, max: 70 }, 
            drops: [{ item: "Waterskin", rate: 0.3 }] 
        },
        { 
            name: "Enraged Minotaur", 
            HP: 160, 
            STR: 24, 
            DEF: 15, 
            ARC: 7, 
            EVD: 6, 
            LCK: 5, 
            XP: 35, 
            coinRange: { min: 40, max: 80 }, 
            drops: [{ item: "Magic Sword", rate: 0.1 }] 
        }
    ],
    Tier4: [
        { 
            name: "Dark Wraith", 
            HP: 180, 
            STR: 25, 
            DEF: 15, 
            ARC: 15, 
            EVD: 8, 
            LCK: 6, 
            XP: 40, 
            coinRange: { min: 50, max: 100 }, 
            drops: [{ item: "Cursed Amulet", rate: 0.2 }] 
        },
        { 
            name: "Lava Elemental", 
            HP: 200, 
            STR: 28, 
            DEF: 18, 
            ARC: 12, 
            EVD: 5, 
            LCK: 4, 
            XP: 45, 
            coinRange: { min: 55, max: 110 }, 
            drops: [{ item: "Fire Essence", rate: 0.25 }] 
        },
        { 
            name: "Arcane Construct", 
            HP: 175, 
            STR: 20, 
            DEF: 20, 
            ARC: 18, 
            EVD: 4, 
            LCK: 5, 
            XP: 42, 
            coinRange: { min: 45, max: 90 }, 
            drops: [{ item: "Ancient Relic", rate: 0.1 }] 
        }
    ],
    Tier5: [
        { 
            name: "Dungeon Dragon", 
            HP: 300, 
            STR: 36, 
            DEF: 24, 
            ARC: 15, 
            EVD: 6, 
            LCK: 5, 
            XP: 60, 
            coinRange: { min: 150, max: 200 }, 
            drops: [{ item: "Dragonplate", rate: 0.05 }] 
        },
        { 
            name: "Elder Lich", 
            HP: 280, 
            STR: 30, 
            DEF: 20, 
            ARC: 25, 
            EVD: 6, 
            LCK: 6, 
            XP: 58, 
            coinRange: { min: 130, max: 180 }, 
            drops: [{ item: "Phoenix Feather", rate: 0.05 }] 
        },
        { 
            name: "Abyssal Behemoth", 
            HP: 320, 
            STR: 40, 
            DEF: 28, 
            ARC: 10, 
            EVD: 4, 
            LCK: 5, 
            XP: 65, 
            coinRange: { min: 160, max: 210 }, 
            drops: [{ item: "Elixir of Power", rate: 0.1 }] 
        }
    ]
};

