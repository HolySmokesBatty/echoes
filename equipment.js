// Equipment Data
const equipment = [
    // Swords
    { 
        name: "Wooden Sword", 
        description: "A basic wooden sword.", 
        attribute: "STR +6", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon", "Sword"] 
    },
    { 
        name: "Iron Sword", 
        description: "A sturdy iron sword.", 
        attribute: "STR +12", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon", "Sword"] 
    },
    { 
        name: "Steel Sword", 
        description: "A sharp steel sword.", 
        attribute: "STR +18", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon", "Sword"] 
    },
    { 
        name: "Magic Sword", 
        description: "A sword imbued with magic.", 
        attribute: "STR +24", 
        special: "ARC damage", 
        value: 500, 
        tier: 4, 
        types: ["Weapon", "Sword"] 
    },
    { 
        name: "King's Sword", 
        description: "A royal sword with healing properties.", 
        attribute: "STR +30", 
        special: "20% Heal 50% ARC", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon", "Sword"] 
    },
    // Hammers
    { 
        name: "Wooden Club", 
        description: "A basic wooden club.", 
        attribute: "STR +4 ARC +2", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Hammer"] 
    },
    { 
        name: "Spiked Club", 
        description: "A club with spikes for extra damage.", 
        attribute: "STR +8 ARC +4", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Hammer"] 
    },
    { 
        name: "Mace", 
        description: "A heavy mace for crushing blows.", 
        attribute: "STR +12 ARC +6", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Hammer"] 
    },
    { 
        name: "Dwarven Hammer", 
        description: "A hammer crafted by dwarves.", 
        attribute: "STR +16 ARC +8", 
        special: "20% Stun", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Hammer"] 
    },
    { 
        name: "Hammer of Divinity", 
        description: "A holy hammer with healing properties.", 
        attribute: "STR +20 ARC +10", 
        special: "33% Heal 50% ARC", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Hammer"] 
    },
    // Axes
    { 
        name: "Woodsman Axe", 
        description: "An axe used by woodsmen.", 
        attribute: "STR +5 DEF +1", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Axe"] 
    },
    { 
        name: "Crescent Axe", 
        description: "An axe with a crescent-shaped blade.", 
        attribute: "STR +10 DEF +2", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Axe"] 
    },
    { 
        name: "Battle Axe", 
        description: "A heavy battle axe.", 
        attribute: "STR +15 DEF +3", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Axe"] 
    },
    { 
        name: "Orcish Axe", 
        description: "An axe crafted by orcs.", 
        attribute: "STR +20 DEF +4", 
        special: "10% chance ignore DEF", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Axe"] 
    },
    { 
        name: "Axe of the Berserker", 
        description: "A berserker's axe with high damage.", 
        attribute: "STR +25 DEF +5", 
        special: "25% ARC", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Axe"] 
    },
    // Bows
    { 
        name: "Shortbow", 
        description: "A simple shortbow.", 
        attribute: "STR +2 EVD +4", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Bow"] 
    },
    { 
        name: "Longbow", 
        description: "A longbow with increased range.", 
        attribute: "STR +4 EVD +8", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Bow"] 
    },
    { 
        name: "Composite Bow", 
        description: "A composite bow for higher accuracy.", 
        attribute: "STR +6 EVD +12", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Bow"] 
    },
    { 
        name: "Elven Bow", 
        description: "An elven bow with magical properties.", 
        attribute: "STR +8 EVD +16", 
        special: "10% Crit", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Bow"] 
    },
    { 
        name: "Bow of the Forest", 
        description: "A bow crafted from the forest's wood.", 
        attribute: "STR +10 EVD +20", 
        special: "20% Crit", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Bow"] 
    },
    // Daggers
    { 
        name: "Knife", 
        description: "A small, sharp knife.", 
        attribute: "STR +3 EVD +3", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Dagger"] 
    },
    { 
        name: "Dagger", 
        description: "A sharp dagger for quick attacks.", 
        attribute: "STR +6 EVD +6", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Dagger"] 
    },
    { 
        name: "Stiletto", 
        description: "A thin, pointed stiletto.", 
        attribute: "STR +9 EVD +9", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Dagger"] 
    },
    { 
        name: "Twinblade", 
        description: "A blade with two edges.", 
        attribute: "STR +12 EVD +12", 
        special: "20% Double Attack", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Dagger"] 
    },
    { 
        name: "Shadowblade", 
        description: "A blade that strikes from the shadows.", 
        attribute: "STR +15 EVD +15", 
        special: "50% Crit", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Dagger"] 
    },
    // Wands
    { 
        name: "Beginner Wand", 
        description: "A wand for beginners.", 
        attribute: "EVD +3 ARC +3", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Wand"] 
    },
    { 
        name: "Apprentice Wand", 
        description: "A wand for apprentices.", 
        attribute: "EVD +6 ARC +6", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Wand"] 
    },
    { 
        name: "Adept Wand", 
        description: "A wand for adept magicians.", 
        attribute: "EVD +9 ARC +9", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Wand"] 
    },
    { 
        name: "Master Wand", 
        description: "A wand for master magicians.", 
        attribute: "EVD +12 ARC +12", 
        special: "10% Stun", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Wand"] 
    },
    { 
        name: "Archmage Wand", 
        description: "A wand for archmages.", 
        attribute: "EVD +15 ARC +15", 
        special: "20% Stun", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Wand"] 
    },
    // Staves
    { 
        name: "Walking Stick", 
        description: "A simple walking stick.", 
        attribute: "ARC +6", 
        special: null, 
        value: 50, 
        tier: 1, 
        types: ["Weapon","Staff"] 
    },
    { 
        name: "Mage Staff", 
        description: "A staff used by mages.", 
        attribute: "ARC +12", 
        special: null, 
        value: 100, 
        tier: 2, 
        types: ["Weapon","Staff"] 
    },
    { 
        name: "Arcane Staff", 
        description: "A staff imbued with arcane power.", 
        attribute: "ARC +18", 
        special: null, 
        value: 200, 
        tier: 3, 
        types: ["Weapon","Staff"] 
    },
    { 
        name: "Wizard Staff", 
        description: "A staff used by wizards.", 
        attribute: "ARC +24", 
        special: "Heal 10% ARC as AP", 
        value: 500, 
        tier: 4, 
        types: ["Weapon","Staff"] 
    },
    { 
        name: "Staff of the Darkwood", 
        description: "A staff made from Darkwood.", 
        attribute: "ARC +30", 
        special: "20% Chance 0AP cast", 
        value: 1000, 
        tier: 5, 
        types: ["Weapon","Staff"] 
    },
    // Light Armor
    { 
        name: "Cloth Armor", 
        description: "Simple cloth armor.", 
        attribute: "DEF +1 ARC +2", 
        special: null, 
        value: 60, 
        tier: 1, 
        types: ["Armor","Light"] 
    },
    { 
        name: "Robes", 
        description: "Robes for magical protection.", 
        attribute: "DEF +2 ARC +4", 
        special: null, 
        value: 120, 
        tier: 2, 
        types: ["Armor","Light"] 
    },
    { 
        name: "Acolyte Robes", 
        description: "Robes worn by acolytes.", 
        attribute: "DEF +3 ARC +6", 
        special: null, 
        value: 240, 
        tier: 3, 
        types: ["Armor","Light"] 
    },
    { 
        name: "Wizard Robes", 
        description: "Robes worn by wizards.", 
        attribute: "DEF +4 ARC +8", 
        special: null, 
        value: 750, 
        tier: 4, 
        types: ["Armor","Light"] 
    },
    { 
        name: "Archmage Regalia", 
        description: "Robes worn by archmages.", 
        attribute: "DEF +5 ARC +10", 
        special: null, 
        value: 1500, 
        tier: 5, 
        types: ["Armor","Light"] 
    },
    // Medium Armor
    { 
        name: "Leather Tunic", 
        description: "A simple leather tunic.", 
        attribute: "DEF +2 EVD +1", 
        special: null, 
        value: 60, 
        tier: 1, 
        types: ["Armor","Medium"] 
    },
    { 
        name: "Bandit Armor", 
        description: "Armor worn by bandits.", 
        attribute: "DEF +4 EVD +2", 
        special: null, 
        value: 120, 
        tier: 2, 
        types: ["Armor","Medium"] 
    },
    { 
        name: "Thief's Garb", 
        description: "Garb worn by thieves.", 
        attribute: "DEF +6 EVD +3", 
        special: null, 
        value: 240, 
        tier: 3, 
        types: ["Armor","Medium"] 
    },
    { 
        name: "Dragonscale Armor", 
        description: "Armor made from dragon scales.", 
        attribute: "DEF +8 EVD +4", 
        special: null, 
        value: 750, 
        tier: 4, 
        types: ["Armor","Medium"] 
    },
    { 
        name: "Shadowstep Suit", 
        description: "Armor that enhances evasion.", 
        attribute: "DEF +10 EVD +5", 
        special: null, 
        value: 1500, 
        tier: 5, 
        types: ["Armor","Medium"] 
    },
    // Heavy Armor
    { 
        name: "Chainmail Armor", 
        description: "Basic chainmail armor.", 
        attribute: "DEF +3", 
        special: null, 
        value: 60, 
        tier: 1, 
        types: ["Armor","Heavy"] 
    },
    { 
        name: "Half Plate", 
        description: "A half-plate armor.", 
        attribute: "DEF +6", 
        special: null, 
        value: 120, 
        tier: 2, 
        types: ["Armor","Heavy"] 
    },
    { 
        name: "Knight's Raiments", 
        description: "Armor worn by knights.", 
        attribute: "DEF +9", 
        special: null, 
        value: 240, 
        tier: 3, 
        types: ["Armor","Heavy"] 
    },
    { 
        name: "Dragonplate", 
        description: "Armor made from dragon scales.", 
        attribute: "DEF +12", 
        special: null, 
        value: 750, 
        tier: 4, 
        types: ["Armor","Heavy"] 
    },
    { 
        name: "Holy Plate", 
        description: "Holy armor with high protection.", 
        attribute: "DEF +15", 
        special: null, 
        value: 1500, 
        tier: 5, 
        types: ["Armor","Heavy"] 
    }
];

// Equipment Organization
const equipmentByTier = {};
const equipmentByType = {};

function organizeEquipment() {
    equipment.forEach(equip => {
        // Organize by tier
        if (!equipmentByTier[equip.tier]) {
            equipmentByTier[equip.tier] = [];
        }
        equipmentByTier[equip.tier].push(equip);

        // Organize by type
        equip.types.forEach(type => {
            if (!equipmentByType[type]) {
                equipmentByType[type] = [];
            }
            equipmentByType[type].push(equip);
        });
    });
}

organizeEquipment();

// Equipment Retrieval Functions
function getRandomEquipmentByTier(tier) {
    const tierEquipment = equipmentByTier[tier] || [];
    if (tierEquipment.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * tierEquipment.length);
    return tierEquipment[randomIndex];
}

function getRandomEquipmentByType(type) {
    const typeEquipment = equipmentByType[type] || [];
    if (typeEquipment.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * typeEquipment.length);
    return typeEquipment[randomIndex];
}

function getRandomEquipmentByTierAndType(tiers, excludeTypes = []) {
    const tierEquipment = equipment.filter(equip => 
        tiers.includes(equip.tier) && 
        (!equip.types || !excludeTypes.some(type => equip.types.includes(type)))
    );
    if (!tierEquipment.length) return null;
    return tierEquipment[Math.floor(Math.random() * tierEquipment.length)];
}

function getRandomEquipment(min, max, tiers = []) {
    const equipmentCount = getRandomInt(min, max);
    const selectedEquipment = [];
    for (let i = 0; i < equipmentCount; i++) {
        let equip = null;
        if (tiers.length > 0) {
            const tier = tiers[Math.floor(Math.random() * tiers.length)];
            equip = getRandomEquipmentByTier(tier);
        }
        if (equip) {
            selectedEquipment.push(equip);
        }
    }
    return selectedEquipment;
}

function augmentEquipment(item) {
    if (item.name.includes('*')) {
        displayNotification(`${item.name} is already augmented.`);
        return false; // Indicate that augmentation was not performed
    }

    // Remove the current equipment effects before augmentation
    removeEquipmentEffects(item);

    // Double the item's stats
    const attributes = item.attribute.split(' ');
    let augmentedAttributes = '';
    for (let i = 0; i < attributes.length; i += 2) {
        const stat = attributes[i];
        const value = parseInt(attributes[i + 1]) * 2;
        augmentedAttributes += `${stat} +${value} `;
    }
    item.attribute = augmentedAttributes.trim();
    item.name += '*'; // Mark the item as augmented

    // Apply the augmented equipment effects
    applyEquipmentEffects(item);

    return true; // Indicate that augmentation was performed
}
