const skills = {
    Knight: [
        {
            name: "Shield Bash",
            description: "A powerful bash with the shield that deals damage and has a chance to stun the enemy.",
            cost: 8,
            level: 1,
            execute(player, enemy) {
                const damage = Math.floor(combat.getModifiedStat(player, 'STR') * 1.2);
                const stunChance = 0.2;
                const criticalHitChance = Math.min(combat.getModifiedStat(player, 'LCK') / 100, 0.5);
                const isCritical = Math.random() < criticalHitChance;
                
                let message = `You bash the enemy with your shield for ${damage} damage.`;
                
                if (isCritical || Math.random() < stunChance) {
                    combat.applyEffect('Stun', enemy, 1);
                    message += " The enemy is stunned!";
                }
        
                if (isCritical) {
                    message += " (Critical hit!)";
                }
        
                return { damage, message };
            }
        },
        {
            name: "Cleave",
            cost: 12,
            level: 5,
            description: "A powerful, focused strike that deals significant damage to the target.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 2);
                return { damage, message: `Cleave deals ${damage} damage to the enemy.` };
            }
        },
        {
            name: "Iron Wall",
            cost: 18,
            level: 10,
            description: "The Knight fortifies their defenses, greatly reducing incoming damage for a short period.",
            execute: (player, enemy) => {
                combat.applyEffect('Increase DEF', player, 4);
                return { damage: 0, message: `Iron Wall increases defense by 50% for 4 turns.` };
            }
        },
        {
            name: "Focused Strike",
            cost: 22,
            level: 15,
            description: "A precise strike that exploits an enemy's weak point, increasing critical hit chance.",
            execute: (player, enemy) => {
                let damage = Math.round(combat.getModifiedStat(player, 'STR') * 1.5);
                const criticalBonus = 0.6;
                const isCritical = Math.random() < (criticalBonus + (combat.getModifiedStat(player, 'LCK') / 100));
                if (isCritical) {
                    damage *= 2;
                }
                return { damage, message: `Focused Strike deals ${damage} damage with ${isCritical ? "a critical hit" : "no critical hit"}.` };
            }
        },
        {
            name: "Power Strike",
            cost: 25,
            level: 20,
            description: "A heavily charged attack that breaks through enemy defenses.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 2.2);
                combat.applyEffect('Reduce DEF', enemy, 2);
                return { damage, message: `Power Strike deals ${damage} damage and reduces enemy defense by 20% for 2 turns.` };
            }
        },
        {
            name: "Guardian Shield",
            cost: 28,
            level: 25,
            description: "Creates a protective shield around themselves, absorbing incoming damage.",
            execute: (player, enemy) => {
                const shieldAmount = Math.round(combat.getModifiedStat(player, 'STR') * 0.6);
                player.shield = shieldAmount;
                return { damage: 0, message: `Guardian Shield absorbs up to ${shieldAmount} damage.` };
            }
        }
    ],
    Rogue: [
        {
            name: "Quick Strike",
            description: "A fast attack that allows the Rogue to strike twice in quick succession.",
            cost: 7,
            level: 1,
            execute(player, enemy) {
                const damage = Math.floor(combat.getModifiedStat(player, 'STR') * 0.8) * 2;
                return { damage, message: `You strike the enemy twice for a total of ${damage} damage.` };
            }
        },
        {
            name: "Backstab",
            cost: 18,
            level: 5,
            description: "A precise attack that targets a vital point, bypassing the enemy's defenses.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 1.5);
                return { damage, message: `Backstab deals ${damage} damage and ignores enemy defense.` };
            }
        },
        {
            name: "Evasion",
            cost: 22,
            level: 10,
            description: "The Rogue focuses on dodging incoming attacks, increasing their evasion rate.",
            execute: (player, enemy) => {
                combat.applyEffect('Evasion', player, 4);
                return { damage: 0, message: `Evasion increases evasion by 50% for 4 turns.` };
            }
        },
        {
            name: "Poison Strike",
            cost: 24,
            level: 15,
            description: "The Rogue coats their weapon in poison, increasing damage taken for a time.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 1.5);
                combat.applyEffect('Poison', enemy, 3);
                return { damage, message: `Poison Strike deals ${damage} damage and poisons the enemy for 3 turns.` };
            }
        },
        {
            name: "Shadowstep",
            cost: 28,
            level: 20,
            description: "The Rogue vanishes into the shadows, avoiding the next attack and reappearing behind the enemy for a surprise strike.",
            execute: (player, enemy) => {
                combat.applyEffect('Evasion', player, 1);
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 2);
                return { damage, message: `Shadowstep evades the next attack and deals ${damage} damage on the next turn.` };
            }
        },
        {
            name: "Assassinate",
            cost: 32,
            level: 25,
            description: "The Rogue attempts a critical strike aimed at the enemy's vital points, with a high chance of landing a critical hit.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 2);
                const criticalBonus = 0.75;
                const isCritical = Math.random() < (criticalBonus + (combat.getModifiedStat(player, 'LCK') / 100));
                const finalDamage = isCritical ? damage * 2 : damage;
                return { damage: finalDamage, message: `Assassinate deals ${finalDamage} damage with ${isCritical ? "a critical hit" : "no critical hit"}.` };
            }
        }
    ],
    Mage: [
        {
            name: "Fireball",
            description: "A basic spell that hurls a ball of fire at the enemy, dealing damage and potentially burning them.",
            cost: 8,
            level: 1,
            execute(player, enemy) {
                const damage = Math.floor(combat.getModifiedStat(player, 'ARC') * 1.2);
                const burnChance = 0.5;
                let message = `You hurl a fireball at the enemy for ${damage} damage.`;
                if (Math.random() < burnChance) {
                    combat.applyEffect('Burn', enemy, 2);
                    message += " The enemy is burning!";
                }
                return { damage, message };
            }
        },
        {
            name: "Ice Spike",
            cost: 15,
            level: 5,
            description: "A sharp icicle is conjured and hurled at the enemy, dealing damage and reducing their defense.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 1.5);
                combat.applyEffect('Reduce DEF', enemy, 2);
                return { damage, message: `Ice Spike deals ${damage} damage and reduces enemy defense by 20% for 2 turns.` };
            }
        },
        {
            name: "Arcane Shield",
            cost: 22,
            level: 10,
            description: "The Mage surrounds themselves with a protective barrier that reduces incoming damage.",
            execute: (player) => {
                combat.applyEffect('Increase DEF', player, 4);
                return { damage: 0, message: `Arcane Shield increases defense by 50% for 4 turns.` };
            }
        },
        {
            name: "Lightning Bolt",
            cost: 24,
            level: 15,
            description: "A powerful bolt of lightning strikes the enemy, dealing high damage with a chance to paralyze.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 1.5);
                const isStunned = Math.random() < 0.5;
                if (isStunned) {
                    combat.applyEffect('Stun', enemy, 1);
                }
                return { damage, message: `Lightning Bolt deals ${damage} damage and has ${isStunned ? "paralyzed" : "not paralyzed"} the enemy.` };
            }
        },
        {
            name: "Arcana Drain",
            cost: 28,
            level: 20,
            description: "The Mage siphons energy from the enemy, dealing damage and restoring their own Arcane Points.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 1.5);
                const apRestored = Math.round(damage * 0.5);
                player.AP = Math.min(player.AP + apRestored, player.maxAP);
                return { damage, message: `Arcana Drain deals ${damage} damage and restores ${apRestored} AP to the Mage.` };
            }
        },
        {
            name: "Meteor Strike",
            cost: 35,
            level: 25,
            description: "The Mage calls down a massive meteor to strike the enemy, dealing devastating damage.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 2);
                const isBurned = Math.random() < 0.5;
                if (isBurned) {
                    combat.applyEffect('Burn', enemy, 3);
                }
                return { damage, message: `Meteor Strike deals ${damage} damage and has ${isBurned ? "burned" : "not burned"} the enemy.` };
            }
        }
    ],
    Cleric: [
        {
            name: "Holy Strike",
            cost: 8,
            level: 1,
            description: "A powerful strike infused with holy energy.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'STR') * 1.2 + combat.getModifiedStat(player, 'ARC'));
                return { damage, message: `Holy Strike deals ${damage} damage to the enemy.` };
            }
        },
        {
            name: "Heal",
            description: "A basic healing spell that restores health to the Cleric.",
            cost: 15,
            level: 5,
            execute(player) {
                const healAmount = Math.floor(combat.getModifiedStat(player, 'ARC') * 1.5);
                player.HP = Math.min(player.HP + healAmount, player.maxHP);
                return { damage: 0, message: `You heal yourself for ${healAmount} HP.` };
            }
        },
        {
            name: "Divine Shield",
            cost: 20,
            level: 10,
            description: "The Cleric surrounds themselves with a divine barrier, reducing incoming damage.",
            execute: (player) => {
                combat.applyEffect('Increase DEF', player, 3);
                return { damage: 0, message: `Divine Shield increases defense by 50% for 3 turns.` };
            }
        },
        {
            name: "Purity",
            cost: 28,
            level: 15,
            description: "A powerful heal.",
            execute: (player) => {
                const healAmount = Math.round(combat.getModifiedStat(player, 'ARC') * 2.5 + player.maxHP * 0.2);
                player.HP = Math.min(player.HP + healAmount, player.maxHP);
                return { damage: 0, message: `Purity restores ${healAmount} HP to the player.` };
            }
        },
        {
            name: "Righteous Fury",
            cost: 32,
            level: 20,
            description: "A divine strike that deals damage and has a high chance to critically hit.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 1.5);
                const criticalBonus = 0.75;
                const isCritical = Math.random() < (criticalBonus + (combat.getModifiedStat(player, 'LCK') / 100));
                const finalDamage = isCritical ? damage * 2 : damage;
                return { damage: finalDamage, message: `Righteous Fury deals ${finalDamage} damage with ${isCritical ? "a critical hit" : "no critical hit"}.` };
            }
        },
        {
            name: "Judgment",
            cost: 35,
            level: 25,
            description: "The Cleric calls down a divine judgment on the enemy, dealing massive damage with a chance to stun.",
            execute: (player, enemy) => {
                const damage = Math.round(combat.getModifiedStat(player, 'ARC') * 2);
                const isStunned = Math.random() < 0.5;
                if (isStunned) {
                    combat.applyEffect('Stun', enemy, 1);
                }
                return { damage, message: `Judgment deals ${damage} damage and ${isStunned ? "stuns" : "does not stun"} the enemy.` };
            }
        }
    ]
};
