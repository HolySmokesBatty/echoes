const classes = {
    Knight: {
        HP: { base: 95, growth: [11, 14] },
        AP: { base: 30, growth: [5, 7] },
        STR: { base: 12, growth: [2, 5] },
        DEF: { base: 11, growth: [2, 4] },
        ARC: { base: 3, growth: [1, 2] },
        EVD: { base: 3, growth: [1, 2] },
        LCK: { base: 4, growth: [0, 2] },
        skills: [
            "Shield Bash",
            "Cleave",
            "Iron Wall",
            "Focused Strike",
            "Power Strike",
            "Guardian Shield"
        ],
        allowedWeapons: ["Sword", "Hammer", "Axe"],
        allowedArmor: ["Heavy"],
        description: "Strong in physical combat with high defense."
    },
    Rogue: {
        HP: { base: 85, growth: [8, 11] },
        AP: { base: 45, growth: [8, 10] },
        STR: { base: 9, growth: [1, 3] },
        DEF: { base: 6, growth: [1, 2] },
        ARC: { base: 4, growth: [1, 2] },
        EVD: { base: 7, growth: [2, 5] },
        LCK: { base: 6, growth: [1, 4] },
        skills: [
            "Quick Strike",
            "Backstab",
            "Evasion",
            "Poison Strike",
            "Shadowstep",
            "Assassinate"
        ],
        allowedWeapons: ["Sword", "Dagger", "Bow"],
        allowedArmor: ["Medium"],
        description: "Agile and quick, excels in critical hits and evasion."
    },
    Mage: {
        HP: { base: 55, growth: [5, 7] },
        AP: { base: 75, growth: [11, 15] },
        STR: { base: 4, growth: [1, 2] },
        DEF: { base: 5, growth: [1, 2] },
        ARC: { base: 16, growth: [2, 6] },
        EVD: { base: 4, growth: [1, 4] },
        LCK: { base: 3, growth: [1, 2] },
        skills: [
            "Fireball",
            "Ice Spike",
            "Arcane Shield",
            "Lightning Bolt",
            "Arcana Drain",
            "Meteor Strike"
        ],
        allowedWeapons: ["Wand", "Staff", "Dagger"],
        allowedArmor: ["Light"],
        description: "Master of arcane arts, powerful spells but low defense."
    },
    Cleric: {
        HP: { base: 70, growth: [9, 11] },
        AP: { base: 60, growth: [7, 11] },
        STR: { base: 8, growth: [1, 4] },
        DEF: { base: 8, growth: [1, 3] },
        ARC: { base: 10, growth: [2, 4] },
        EVD: { base: 3, growth: [1, 3] },
        LCK: { base: 4, growth: [1, 2] },
        skills: [
            "Holy Strike",
            "Heal",
            "Divine Shield",
            "Purity",
            "Righteous Fury",
            "Judgment"
        ],
        allowedWeapons: ["Hammer", "Axe", "Staff"],
        allowedArmor: ["Heavy"],
        description: "Holy Crusader with a affinity for healing magic and resonable combat skills."
    }
};
