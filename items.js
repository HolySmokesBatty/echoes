const items = [
    {
        "name": "Piece of Bread",
        "description": "A hard piece of bread, stale from days in the sun - Recovers a small amount of HP",
        "effect": "heal_hp:10%",
        "value": 5,
        "tier": 1,
        "types": ["Health", "Food", "Usable"],
        baseHealing: 5,
        percentage: 0.1
    },
    {
        "name": "Waterskin",
        "description": "A leather skin filled with fresh water, you hope - Recovers a minor amount of HP",
        "effect": "heal_hp:15%",
        "value": 7,
        "tier": 2,
        "types": ["Health", "Food", "Usable"],
        baseHealing: 10,
        percentage: 0.15
    },    
    {
        "name": "Healing Herb",
        "description": "A small herb with bright green leaves, smells faintly of mint - Recovers a decent amount of HP",
        "effect": "heal_hp:20%",
        "value": 10,
        "tier": 3,
        "types": ["Health", "Food", "Usable"],
        baseHealing: 15,
        percentage: 0.2
    },
    {
        "name": "Healing Potion",
        "description": "A bottle filled with red liquid, the color of life - Recovers a large amount of HP",
        "effect": "heal_hp:33%",
        "value": 15,
        "tier": 4,
        "types": ["Health", "Potion", "Usable"],
        baseHealing: 20,
        percentage: 0.33
    },
    {
        "name": "Golden Apple",
        "description": "A rare, golden apple said to possess magical healing properties - Recovers a great amount of HP",
        "effect": "heal_hp:50%",
        "value": 20,
        "tier": 5,
        "types": ["Health", "Food", "Usable"],
        baseHealing: 25,
        percentage: 0.5
    },
    {
        "name": "Shiny Gem",
        "description": "A small gem shining with Arcane Power - Recovers a small amount of AP",
        "effect": "heal_ap10%",
        "value": 5,
        "tier": 1,
        "types": ["Arcana", "Gem", "Usable"],
        baseHealing: 5,
        percentage: 0.1
    },
    {
        "name": "Emerald Gem",
        "description": "A brilliant green emerald filled with Arcane Power - Recovers a minor amount of AP",
        "effect": "heal_ap15%",
        "value": 7,
        "tier": 2,
        "types": ["Arcana", "Gem", "Usable"],
        baseHealing: 10,
        percentage: 0.15
    },
    {
        "name": "Ruby Gem",
        "description": "A potent red gem bursting with Arcane Power - Recovers a decent amount of AP",
        "effect": "heal_ap20%",
        "value": 10,
        "tier": 3,
        "types": ["Arcana", "Gem", "Usable"],
        baseHealing: 15,
        percentage: 0.2
    },
    {
        "name": "Azure Gem",
        "description": "A mystical blue gem pulsing with Arcane Power - Recovers a large amount of AP",
        "effect": "heal_ap33%",
        "value": 15,
        "tier": 4,
        "types": ["Arcana", "Gem", "Usable"],
        baseHealing: 20,
        percentage: 0.33
    },
    {
        "name": "Empowered Gem",
        "description": "A multihued gem radiating with immense Arcane Power - Recovers a great amount of AP",
        "effect": "heal_ap50%",
        "value": 20,
        "tier": 5,
        "types": ["Arcana", "Gem", "Usable"],
        baseHealing: 25,
        percentage: 0.5
    },
    {
        "name": "Elixir of Power",
        "description": "A powerful elixir that rejuvenates both body and spirit - Recovers a great amount of HP and AP",
        "effect": ["heal_hp50%","heal_ap50%"],
        "value": 50,
        "tier": 5,
        "types": ["Rare", "Potion", "Usable"],
        baseHealing: 25,
        percentage: 0.5
    },
    {
        name: "Ancient Relic",
        description: "The ancient relic is covered in mysterious symbols. It seems to emanate a strange energy",
        effect: "Mysterious Stranger",
        value: 100,
        tier: 5,
        types: ["Rare", "Ancient", "Event"]
    },
    {
        name: "Glowing Crystal",
        description: "The glowing crystal illuminates your surroundings. It feels warm to the touch",
        effect: "Mysterious Stranger",
        value: 100,
        tier: 5,
        types: ["Rare", "Gem", "Event"]
    },
    {
        name: "Mysterious Scroll",
        description: "The mysterious scroll is written in an ancient language. You can't decipher it, but it might be important",
        effect: "Unknown",
        value: 60,
        tier: 5,
        types: ["Rare", "Ancient", "Parchment"]
    },
    {
        name: "Magic Scroll",
        description: "The magic scroll is written in an ancient language. It radiates a magical energy",
        effect: "Unknown",
        value: 60,
        tier: 5,
        types: ["Rare", "Ancient", "Parchment"]
    },
    {
        name: "Old Map",
        description: "A faded treasure map, it could lead to riches",
        effect: "event:Treasure Map",
        value: 50,
        tier: 5,
        types: ["Rare", "Event", "Parchment", "Usable", "Ancient"]
    },
    {
        name: "Phoenix Feather",
        description: "A vibrant feather from a mythical phoenix. It feels warm to the touch",
        effect: "Revives with 50% HP",
        value: 250,
        tier: 5,
        types: ["Rare", "Revival", "Usable"]
    },
    {
        name: "Enchanted Mirror",
        description: "A small mirror that reveals hidden truths when gazed into",
        effect: "Unknown",
        value: 100,
        tier: 5,
        types: ["Rare", "Quest", "Ancient"]
    },
    {
        name: "Cursed Amulet",
        description: "An ancient amulet that pulses with dark energy",
        effect: "Unknown",
        value: 100,
        tier: 5,
        types: ["Rare", "Quest", "Ancient"]
    },
    {
        name: "Forgotten Key",
        description: "A rusty key with intricate designs. It seems to fit no lock you've seen so far",
        effect: "Forgotten Door",
        value: 250,
        tier: 5,
        types: ["Rare", "Ancient", "Event"]
    },
    {
        "name": "Tent",
        "description": "A small tent that provides shelter and comfort, fully restoring HP and AP when used.",
        "value": 100,
        "tier": 2,
        "types": ["Special"]
    },
    {
        name: "Fire Essence",
        description: "A concentrated essence of fire. It radiates warmth and power.",
        effect: "none",
        value: 30,
        tier: 2,
        types: ["Rare", "Essence", "Crafting"]
    },
    {
        name: "Water Essence",
        description: "A concentrated essence of water. It is cool to the touch and flows smoothly.",
        effect: "none",
        value: 30,
        tier: 2,
        types: ["Rare", "Essence", "Crafting"]
    },
    {
        name: "Earth Essence",
        description: "A concentrated essence of earth. It feels solid and unyielding.",
        effect: "none",
        value: 40,
        tier: 4,
        types: ["Rare", "Essence", "Crafting"]
    },
    {
        name: "Air Essence",
        description: "A concentrated essence of air. It is light and swirls around you.",
        effect: "none",
        value: 40,
        tier: 4,
        types: ["Rare", "Essence", "Crafting"]
    },
];

const itemsByTier = {};
const itemsByType = {};

function organizeItems() {
    items.forEach(item => {
        // Organize by tier
        if (!itemsByTier[item.tier]) {
            itemsByTier[item.tier] = [];
        }
        itemsByTier[item.tier].push(item);

        // Organize by type
        item.types.forEach(type => {
            if (!itemsByType[type]) {
                itemsByType[type] = [];
            }
            itemsByType[type].push(item);
        });
    });
}

organizeItems();

function getRandomItemByTier(tier) {
    const tierItems = itemsByTier[tier] || [];
    if (tierItems.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * tierItems.length);
    return tierItems[randomIndex];
}

function getRandomItemByType(type) {
    const typeItems = itemsByType[type] || [];
    if (typeItems.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * typeItems.length);
    return typeItems[randomIndex];
}

function getRandomItemByTierAndType(tiers, excludeTypes = []) {
    const tierItems = items.filter(item => tiers.includes(item.tier) && !excludeTypes.some(type => item.types.includes(type)));
    if (!tierItems.length) return null;
    return tierItems[Math.floor(Math.random() * tierItems.length)];
}

function getItemsExcludingTypes(excludedTypes) {
    return items.filter(item => !item.types.some(type => excludedTypes.includes(type)));
}

function getRandomItems(min, max, tiers = [], types = []) {
    const itemCount = getRandomInt(min, max);
    const items = [];
    for (let i = 0; i < itemCount; i++) {
        let item = null;
        if (tiers.length > 0) {
            const tier = tiers[Math.floor(Math.random() * tiers.length)];
            item = getRandomItemByTier(tier);
        } else if (types.length > 0) {
            const type = types[Math.floor(Math.random() * types.length)];
            item = getRandomItemByType(type);
        }
        if (item && !item.types.includes("Currency")) {
            items.push(item);
        }
    }
    return items;
}

function getRandomCoin() {
    return coins[Math.floor(Math.random() * coins.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}