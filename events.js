const events = [
    {
        name: "Falling Branch",
        description: "A heavy branch falls from above, striking you before you can react.",
        effect: "damage",
        minAmount: 5,
        maxAmount: 15,
        weight: 1,
        terrain: ["forest"],
        action: function() {
            const baseDamage = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDamage, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("red");
            displayEventEffect(this.name, this.description, 
                `You took ${finalAmount} damage from the falling branch.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Hidden Trap",
        description: "You trigger a hidden trap.",
        effect: "damage",
        minAmount: 8,
        maxAmount: 20,
        weight: 1,
        terrain: ["forest", "field"],
        action: function() {
            const baseDamage = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDamage, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("red");
            displayEventEffect(this.name, this.description, 
                `You step on a hunter's hidden trap and take ${finalAmount} damage.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Arcane Trap",
        description: "You trigger an arcane trap that drains your arcane energy.",
        effect: "drain_ap",
        minAmount: 10,
        maxAmount: 30,
        weight: 1,
        terrain: ["forest", "ruins"],
        action: function() {
            const baseDrain = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDrain, 'damage');
            playerStats.AP = Math.max(playerStats.AP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("purple");
            displayEventEffect(this.name, this.description, 
                `You lost ${finalAmount} AP due to the arcane trap.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your arcane energy is now ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Mana Drain Field",
        description: "You stumble into a mana drain field that weakens your arcane energy.",
        effect: "drain_ap",
        minAmount: 5,
        maxAmount: 15,
        weight: 1,
        terrain: ["forest", "field", "ruins"],
        action: function() {
            const baseDrain = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDrain, 'damage');
            playerStats.AP = Math.max(playerStats.AP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("purple");
            displayEventEffect(this.name, this.description, 
                `You lost ${finalAmount} AP due to the mana drain field.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your arcane energy is now ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Peaceful Clearing",
        description: "You find a peaceful clearing and decide to rest.",
        effect: "heal",
        minAmount: 10,
        maxAmount: 20,
        weight: 2,
        terrain: ["field"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            updatePlayerStats(playerStats);
            pulseEffect("green");
            displayEventEffect(this.name, this.description, 
                `You healed ${finalAmount} health in a peaceful clearing.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Enchanted Pond",
        description: "You discover an enchanted pond with sparkling water.",
        effect: "heal",
        minAmount: 15,
        maxAmount: 25,
        weight: 2,
        terrain: ["water"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            updatePlayerStats(playerStats);
            pulseEffect("green");
            displayEventEffect(this.name, this.description, 
                `You healed ${finalAmount} health from an enchanted pond.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Mystical Fountain",
        description: "You find a mystical fountain that rejuvenates your arcane energy.",
        effect: "heal_ap",
        minAmount: 10,
        maxAmount: 30,
        weight: 2,
        terrain: ["water", "ruins"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal_ap');
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            pulseEffect("blue");
            displayEventEffect(this.name, this.description, 
                `You restored ${finalAmount} AP at the mystical fountain.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your arcane energy is now ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Arcane Spring",
        description: "You discover a hidden spring that rejuvenates your arcane energy.",
        effect: "heal_ap",
        minAmount: 15,
        maxAmount: 25,
        weight: 2,
        terrain: ["water"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal_ap');
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            pulseEffect("blue");
            displayEventEffect(this.name, this.description, 
                `You restored ${finalAmount} AP at the arcane spring.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your arcane energy is now ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Enchanted Grove",
        description: "You discover an enchanted grove that heals your body and mind.",
        effect: "heal_hp_ap",
        minAmount: 10,
        maxAmount: 20,
        weight: 2,
        terrain: ["forest"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal_hp_ap');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            pulseEffect("green");
            displayEventEffect(this.name, this.description, 
                `You healed ${finalAmount} HP and AP in the enchanted grove.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP} and your arcane energy is ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Cursed Fog",
        description: "You wander into a cursed fog that saps your strength and arcane energy.",
        effect: "damage_hp_ap",
        minAmount: 5,
        maxAmount: 15,
        weight: 1,
        terrain: ["forest", "field"],
        action: function() {
            const baseDamage = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDamage, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            playerStats.AP = Math.max(playerStats.AP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("red");
            displayEventEffect(this.name, this.description, 
                `You lost ${finalAmount} HP and AP due to the cursed fog.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP} and your arcane energy is ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Lost Merchant",
        description: "You meet a lost merchant looking for directions.",
        effect: "receive item",
        weight: 1,
        terrain: ["forest", "field", "path"],
        action: function() {
            const item = getRandom() < 0.2 ? items.find(i => i.name === "Tent") : getRandomItemByTier(1) || getRandomItemByTier(2);
            addItemToInventory(item);
            displayEventEffect(this.name, this.description, `The lost merchant gives you a ${item.name} as thanks.`);
        }
    },
    {
        name: "Healing Herb",
        description: "You find a rare herb with healing properties while exploring.",
        effect: "receive item",
        weight: 1,
        terrain: ["forest", "field"],
        action: function() {
            const item = items.find(i => i.name === "Healing Herb");
            if (item) {
                addItemToInventory(item);
                displayEventEffect(this.name, this.description, `You found a ${item.name}.`);
            } else {
                console.error("Item not found in items table:", "Healing Herb");
            }
        }
    },
    {
        name: "Ancient Ruin",
        description: "You discover an ancient ruin hidden deep in the forest.",
        effect: "receive item",
        weight: 1,
        terrain: ["forest", "ruins"],
        action: function() {
            const tiers = getTiersByPlayerLevel(playerStats.level);
            const items = getRandomItemsByTypeAndTier(["Ancient", "Arcana"], tiers, 1, 3);
            const coins = getRandomInt(10, 30);

            playerStats.coins += coins;
            items.forEach(item => addItemToInventory(item));
            updatePlayerStats(playerStats);

            displayEventEffect(this.name, this.description, `You discovered ancient items: ${items.map(item => item.name).join(', ')} and ${coins} coins.`);
        }
    },
    {
        name: "Hidden Cave",
        description: "You explore a hidden cave.",
        effect: "receive item",
        weight: 1,
        terrain: ["mountain", "forest"],
        action: function() {
            const tiers = getTiersByPlayerLevel(playerStats.level);
            const items = getRandomItemsByTypeAndTier(["Gem"], tiers, 1, 2);

            items.forEach(item => addItemToInventory(item));
            displayEventEffect(this.name, this.description, `You found gems in the hidden cave: ${items.map(item => item.name).join(', ')}.`);
        }
    },
    {
        name: "Abandoned Campsite",
        description: "You come upon an old campsite just off the road.",
        effect: "receive item",
        weight: 1,
        terrain: ["path", "forest", "field"],
        action: function() {
            const tiers = getTiersByPlayerLevel(playerStats.level);
            const items = getRandomItemsByTypeAndTier([], tiers, 1, 3);
            const equipment = getRandomEquipmentByTier(tiers, 1, 3);
            const coins = getRandomInt(10, 30);

            playerStats.coins += coins;
            items.concat(equipment).forEach(item => addItemToInventory(item));
            updatePlayerStats(playerStats);

            displayEventEffect(this.name, this.description, `You found ${coins} coins and the following items: ${items.concat(equipment).map(item => item.name).join(', ')}.`);
        }
    },
    {
        name: "Hidden Treasure Chest",
        description: "You stumble upon a hidden treasure chest while exploring.",
        effect: "receive item",
        weight: 1,
        terrain: ["forest", "field", "ruins", "mountains"],
        action: function() {
            const tiers = getTiersByPlayerLevel(playerStats.level);
            const items = getRandomItemsByTypeAndTier([], tiers, 1, 2);
            const equipment = getRandomEquipmentByTier(tiers, 1, 2);
            const coins = getRandomInt(20, 50);

            playerStats.coins += coins;
            items.concat(equipment).forEach(item => addItemToInventory(item));
            updatePlayerStats(playerStats);

            displayEventEffect(this.name, this.description, `You found a hidden treasure chest containing: ${items.concat(equipment).map(item => item.name).join(', ')} and ${coins} coins.`);
        }
    },
    {
        name: "Merchant Encounter",
        description: "You encounter a traveling merchant.",
        effect: "Shop",
        weight: 2,
        terrain: ["path", "field"],
        action: function() {
            const itemCount = getRandomInt(3, 5);
            const stockedItems = getShopInventory({ tier: [1, 2], exclude: ["Ancient"] }, itemCount);
    
            currentMerchantName = "Traveling Merchant";
            currentMerchantStock = stockedItems;
    
            displayMerchantEncounter();
        }
    },
    {
        name: "Deranged Traveler",
        description: "You meet a deranged traveler on the road.",
        effect: "Quest",
        weight: 1,
        terrain: ["path", "forest"],
        action: function () {
            const rareItems = ["Cursed Amulet", "Enchanted Mirror"];
            const requestedItem = rareItems[Math.floor(getRandom() * rareItems.length)];
            const item = inventory.find(i => i.name === requestedItem);
            if (item) {
                const coins = getRandomInt(5, 15);
                playerStats.coins += coins;
                playerStats.xp += getRandomInt(10, 20);
                removeItemFromInventory(item);
                updatePlayerStats(playerStats);
                displayEventEffect(this.name, this.description, `The traveler gratefully takes the ${requestedItem} and rewards you with ${coins} coins and some experience.`);
            } else {
                displayEventEffect(this.name, this.description, `The traveler was looking for a ${requestedItem}, but you don't have one.`);
            }
        }
    },
    {
        name: "Mysterious Stranger",
        description: "You meet a mysterious stranger who offers to augment your equipment.",
        effect: "Augment gear",
        weight: 1,
        terrain: ["path", "ruins", "forest"],
        action: function () {
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>Select the equipment you want to augment:</p>
                <button onclick="confirmAugmentEquipmentWithItems('weapon')">Augment Weapon</button>
                <button onclick="confirmAugmentEquipmentWithItems('armor')">Augment Armor</button>
            `;
        }
    },
    {
        name: "Forgotten Door",
        description: "You come across a forgotten door hidden in the underbrush.",
        effect: "receive item",
        weight: 1,
        terrain: ["forest", "ruins"],
        action: function() {
            const tiers = getTiersByPlayerLevel(playerStats.level);
            const equipment = getRandomEquipmentByTier(tiers, 1, 1)[0];

            addItemToInventory(equipment);
            updatePlayerStats(playerStats);

            displayEventEffect(this.name, this.description, `You use the Forgotten Key to open the door and find ${equipment.name} inside.`);
        }
    },
    {
        name: "Encounter",
        description: "You encounter a wild beast.",
        effect: "Combat",
        weight: 5,
        terrain: ["forest", "field", "path", "mountains", "water", "ruins"],
        action: function () {
            const player = getPlayerStats();
            const enemy = combat.getRandomEnemy(player.level);
            combat.startCombat(enemy);
        }
    },
    {
        name: "Bandit Ambush",
        description: "You are ambushed by bandits demanding your valuables.",
        effect: "Lose Coins or Combat",
        weight: 1,
        terrain: ["path", "forest"],
        action: function () {
            const banditGroup = enemyTiers.Unique.find(enemy => enemy.name === 'Bandit');
            if (!banditGroup) {
                console.error('Bandit not found in enemies list.');
                return;
            }

            const bounty = Math.floor(getRandom() * 91) + 10;
            const controlWindow = document.getElementById('control-window');
            if (controlWindow) {
                controlWindow.style.visibility = 'hidden';
                controlWindow.style.opacity = 0;
            }

            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>Do you want to pay ${bounty} coins to avoid combat?</p>
                <button onclick="handleBanditAmbushChoice(true, ${bounty})">Pay ${bounty} Coins</button>
                <button onclick="handleBanditAmbushChoice(false)">Fight</button>
            `;

            window.handleBanditAmbushChoice = function(choice, bounty) {
                if (choice) {
                    if (playerStats.coins >= bounty) {
                        playerStats.coins -= bounty;
                        updatePlayerStats(playerStats);
                        displayEventEffect(events[0].name, events[0].description, `You paid the bandits ${bounty} coins to avoid combat.`);
                        if (controlWindow) {
                            controlWindow.style.visibility = 'visible';
                            controlWindow.style.opacity = 1;
                        }
                    } else {
                        contentWindow.innerHTML = `
                            <h2>${events[0].name}</h2>
                            <p>You don't have enough coins to pay off the bandits. Prepare for combat!</p>
                            <button onclick="startBanditCombat()">Start Combat</button>
                        `;
                    }
                } else {
                    startBanditCombat();
                }
            };

            window.startBanditCombat = function() {
                combat.startCombat(banditGroup);
            };
        }
    },
];

/**
 * Displays the result screen for a quest.
 * @param {string} questName - The name of the quest.
 * @param {boolean} success - Whether the quest was successful.
 * @param {string} message - A message detailing the result of the quest.
 */
function displayQuestResult(questName, success, message) {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>${questName} - ${success ? 'Success' : 'Failure'}</h2>
        <p>${message}</p>
        <button onclick="showPreviousScreen()">Back to Game</button>
    `;
}

const questEvents = [
    {
        name: "Goblin Menace",
        description: "You encounter a group of goblins causing trouble.",
        effect: "combat",
        terrain: ["forest"],
        weight: 3,
        relatedQuest: "Goblin Menace",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const goblinGroup = enemyTiers.Unique.find(enemy => enemy.name === 'Group of Goblins');
                if (!goblinGroup) {
                    console.error('Group of goblins not found in enemies list.');
                    return;
                }
                combat.startCombat(goblinGroup, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Lost Necklace",
        description: "You find a necklace that matches the description from the notice board.",
        effect: "find",
        terrain: ["path", "forest"],
        weight: 3,
        relatedQuest: "Lost Necklace",
        action: function() {
            // Check luck to determine if the player can collect the necklace without trouble
            const luckCheck = getRandom() < playerStats.LCK / 100;
            if (luckCheck) {
                displayQuestResult(
                    this.relatedQuest,
                    true,
                    "You successfully collected the lost necklace without any trouble. The owner will be pleased to have it back."
                );
                checkQuestCompletion({ relatedQuest: this.relatedQuest });
            } else {
                // Encounter with a thief when the luck check fails
                displayQuestResult(
                    this.relatedQuest,
                    false,
                    "As you pick up the necklace, a thief appears, claiming it as his. You may have to fight him to keep it."
                );
                
                // Initiate combat with the thief if present in enemy tiers
                const thief = enemyTiers.Unique.find(enemy => enemy.name === 'Thief');
                if (thief) {
                    combat.startCombat(thief, this.relatedQuest);
                }
            }
        }
    },
    {
        name: "Bandit Leader",
        description: "You encounter the notorious bandit leader.",
        effect: "combat",
        terrain: ["forest"],
        weight: 3,
        relatedQuest: "Bandit Leader",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const banditLeader = enemyTiers.Unique.find(enemy => enemy.name === 'Bandit Leader');
                if (!banditLeader) {
                    console.error('Bandit leader not found in enemies list.');
                    return;
                }
                combat.startCombat(banditLeader, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Missing Child",
        description: "You find the missing child, who appears scared and unsure.",
        effect: "find",
        terrain: ["forest", "field"],
        weight: 4,
        relatedQuest: "Missing Child",
        action: function() {
            const approachOptions = [
                { 
                    name: 'comfortChild', 
                    stat: 'LCK', 
                    successMessage: "You comfort the child, and they trust you enough to follow you home.",
                    failMessage: "Your attempt to comfort the child only seems to make them more frightened, and they back away from you."
                },
                { 
                    name: 'carryChild', 
                    stat: 'STR', 
                    successMessage: "You gently pick up the child and carry them back to town.",
                    failMessage: "As you try to lift the child, they panic and slip away, disappearing further into the forest."
                },
                { 
                    name: 'convinceChild', 
                    stat: 'ARC', 
                    successMessage: "You logically convince the child that they are safe with you.",
                    failMessage: "Your logical approach confuses the child, who begins to cry and runs away in fear."
                }
            ];

            // Display options for the player to choose an approach
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                ${approachOptions.map(opt => `<button onclick="${opt.name}()">Try ${opt.name.replace('Child', '')}</button>`).join('')}
            `;

            // Define approach functions with results for each option
            approachOptions.forEach(({ name, stat, successMessage, failMessage }) => {
                window[name] = () => {
                    const success = getRandom() < playerStats[stat] / 100;
                    displayQuestResult(
                        this.relatedQuest, 
                        success, 
                        success ? successMessage : failMessage
                    );
                    if (success) checkQuestCompletion({ relatedQuest: this.relatedQuest });
                };
            });
        }
    },
    {
        name: "Wolves Attack",
        description: "You encounter a pack of wolves attacking travelers.",
        effect: "combat",
        terrain: ["forest", "field"],
        weight: 3,
        relatedQuest: "Wolves Attack",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const wolfGroup = enemyTiers.Unique.find(enemy => enemy.name === 'Pack of Wolves');
                if (!wolfGroup) {
                    console.error('Pack of wolves not found in enemies list.');
                    return;
                }
                combat.startCombat(wolfGroup, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Herbal Remedy",
        description: "You need to collect specific herbs for a remedy.",
        effect: "find",
        terrain: ["forest", "field"],
        weight: 4,
        relatedQuest: "Herbal Remedy",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to proceed?</p>
                <button onclick="identifyHerbs()">Identify the Herbs (ARC Check)</button>
                <button onclick="speedyCollection()">Speedy Collection (EVD Check)</button>
                <button onclick="consultHerbalist()">Consult a Herbalist (10 Coins)</button>
            `;
            
            // Function for identifying herbs using ARC check
            window.identifyHerbs = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully identify the correct herbs, ensuring a potent remedy."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "You collect some herbs, but after consulting your notes, you realize they are the wrong ones."
                    );
                }
            };
            
            // Function for speedy collection using EVD check
            window.speedyCollection = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You quickly gather the herbs, saving time and effort. The herbalist will appreciate your efficiency."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "In your haste, you manage to ruin the herbs as you attempt to collect them."
                    );
                }
            };
            
            // Function to consult a herbalist at the cost of 10 coins
            window.consultHerbalist = function() {
                if (playerStats.coins >= 10) {
                    playerStats.coins -= 10;
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You consult a herbalist who ensures the correct herbs are collected. The remedy is perfect."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                    updatePlayerStats(playerStats); // Update coins after spending
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "You don't have enough coins to consult the herbalist."
                    );
                }
            };
        }
    },    
    {
        name: "Haunted Encounter",
        description: "You enter a haunted area. The atmosphere is heavy with dread.",
        effect: "find",
        terrain: ["ruins", "forest"],
        weight: 4,
        relatedQuest: "Haunted Encounter",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of this

            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to handle the haunting?</p>
                <button onclick="exorciseSpirit()">Exorcise the Spirit (ARC Check)</button>
                <button onclick="fleeArea()">Flee the Area (EVD Check)</button>
                <button onclick="confrontSpirit()">Confront the Spirit</button>
            `;
            
            // Attempt to exorcise the spirit using ARC check
            window.exorciseSpirit = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully exorcise the spirit, purifying the area. You feel a sense of peace and accomplishment."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("The exorcism fails, and the spirit materializes as an Apparition! Prepare for combat.");
                    const apparition = enemyTiers.Unique.find(enemy => enemy.name === 'Apparition');
                    if (apparition) {
                        combat.startCombat(apparition, "Haunted Encounter");
                    }
                }
            };
            
            // Attempt to flee using EVD check
            window.fleeArea = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You manage to escape the haunted area safely, leaving the spirit behind."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("As you try to flee, the spirit pursues you, materializing as an Apparition! Prepare for combat.");
                    const apparition = enemyTiers.Unique.find(enemy => enemy.name === 'Apparition');
                    if (apparition) {
                        combat.startCombat(apparition, "Haunted Encounter");
                    }
                }
            };
            
            // Direct confrontation with the spirit, leading to combat
            window.confrontSpirit = function() {
                displayNotification("You decide to confront the spirit directly. It materializes as an Apparition! Prepare for combat.");
                const apparition = enemyTiers.Unique.find(enemy => enemy.name === 'Apparition');
                if (apparition) {
                    combat.startCombat(apparition, "Haunted Encounter");
                }
            };
        }
    },
    {
        name: "Bridge Repair",
        description: "You arrive at the site of a damaged bridge. The local workers are struggling with the repairs.",
        effect: "build",
        terrain: ["water"],
        weight: 4,
        relatedQuest: "Bridge Repair",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`

            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How would you like to assist with the bridge repair?</p>
                <button onclick="assistWithConstruction()">Assist with Construction (STR Check)</button>
                <button onclick="assistWithPlanning()">Assist with Planning (ARC Check)</button>
            `;

            // Assist with Construction - STR check
            window.assistWithConstruction = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully assist with the construction, using your strength to stabilize the bridge. The workers are grateful, and the bridge is repaired quickly."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Despite your efforts, you struggle with the construction work, unintentionally causing delays. The workers seem frustrated, and progress is slowed."
                    );
                    // Optional: Apply a minor consequence here (e.g., slight stat penalty or temporary delay)
                }
            };

            // Assist with Planning - ARC check
            window.assistWithPlanning = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "Your planning skills help organize the repairs effectively, allowing the workers to complete the bridge efficiently."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Your attempt at organizing the repairs backfires, causing confusion among the workers and further delaying the project."
                    );
                    // Optional: Apply a minor consequence here (e.g., increased repair time or a temporary negative effect)
                }
            };
        }
    },
    {
        name: "Stolen Goods",
        description: "You've tracked down the thieves who stole the goods. Now, you need to recover them.",
        effect: "recover",
        terrain: ["forest", "ruins"],
        weight: 4,
        relatedQuest: "Stolen Goods",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of this
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to recover the stolen goods?</p>
                <button onclick="recoverGoodsStealth()">Stealthily Recover the Goods (EVD Check)</button>
                <button onclick="intimidateThieves()">Intimidate the Thieves (STR Check)</button>
                <button onclick="convinceThieves()">Convince the Thieves (ARC Check)</button>
            `;
    
            // Stealth recovery using EVD check
            window.recoverGoodsStealth = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
    
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully sneak in and recover the stolen goods without being detected. No one even knew you were there."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("You're caught trying to recover the goods! A thief attacks you.");
                    const thief = enemyTiers.Unique.find(enemy => enemy.name === 'Thief');
                    if (thief) {
                        combat.startCombat(thief, "Stolen Goods");
                    }
                }
            };
    
            // Intimidation using STR check
            window.intimidateThieves = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
    
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You intimidate the thieves into returning the stolen goods. They scurry off, leaving the items behind."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("Your intimidation fails, and the thief attacks you.");
                    const thief = enemyTiers.Unique.find(enemy => enemy.name === 'Thief');
                    if (thief) {
                        combat.startCombat(thief, "Stolen Goods");
                    }
                }
            };
    
            // Persuasion using ARC check
            window.convinceThieves = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
    
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully convince the thieves to return the stolen goods. They begrudgingly hand them over and leave."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("Your persuasion fails, and the thief attacks you.");
                    const thief = enemyTiers.Unique.find(enemy => enemy.name === 'Thief');
                    if (thief) {
                        combat.startCombat(thief, "Stolen Goods");
                    }
                }
            };
        }
    },
    {
        name: "Ancient Relic",
        description: "You encounter thieves trying to steal an ancient relic.",
        effect: "combat",
        terrain: ["ruins"],
        weight: 3,
        relatedQuest: "Ancient Relic",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const thieves = enemyTiers.Unique.find(enemy => enemy.name === 'Thief');
                if (!thieves) {
                    console.error('Thief not found in enemies list.');
                    return;
                }
                combat.startCombat(thieves, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Poisoned Water Source",
        description: "You come across a water source that has been poisoned. The local inhabitants rely on this water.",
        effect: "purify",
        terrain: ["forest", "water"],
        weight: 4,
        relatedQuest: "Poisoned Water Source",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to address the poisoned water source?</p>
                <button onclick="purifyWater()">Purify the Water (ARC Check)</button>
                <button onclick="investigateSource()">Investigate the Source (EVD Check)</button>
                <button onclick="constructFilter()">Construct a Filter (STR Check)</button>
            `;

            // Attempt to purify the water using ARC check
            window.purifyWater = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully purify the water with a cleansing spell, making it safe for the inhabitants to drink."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Your purification attempt fails, and the water remains tainted. You may need to try another approach."
                    );
                }
            };
            
            // Investigate the source of the poison using EVD check
            window.investigateSource = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully identify the source of the poison upstream. This discovery may help prevent future contamination."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "You fail to locate the source of the poison, leaving the problem unresolved. Another solution is needed."
                    );
                }
            };
            
            // Construct a filter using STR check
            window.constructFilter = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You successfully build a makeshift filter, which temporarily cleans the water and makes it safe for consumption."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Your attempt to construct a filter fails, and the water remains unsafe. Another method is needed."
                    );
                }
            };
        }
    },
    {
        name: "Cursed Forest",
        description: "The forest is cursed, and a powerful Forest Guardian lurks within.",
        effect: "combat",
        terrain: ["forest"],
        weight: 4,
        relatedQuest: "Cursed Forest",
        action: function() {
            const forestGuardian = enemyTiers.Unique.find(enemy => enemy.name === 'Forest Guardian');
            if (!forestGuardian) {
                console.error('Forest Guardian not found in enemies list.');
                return;
            }
            combat.startCombat(forestGuardian, this.relatedQuest); // Pass quest information
        }
    },
    {
        name: "Spy in the Wilderness",
        description: "You encounter a spy operating in the area.",
        effect: "combat",
        terrain: ["forest", "field"],
        weight: 3,
        relatedQuest: "Spy in the Wilderness",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const spy = enemyTiers.Unique.find(enemy => enemy.name === 'Spy');
                if (!spy) {
                    console.error('Spy not found in enemies list.');
                    return;
                }
                combat.startCombat(spy, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Missing Livestock",
        description: "You arrive at the site where the livestock was last seen. The animals are nowhere to be found.",
        effect: "find",
        terrain: ["field", "forest"],
        weight: 4,
        relatedQuest: "Missing Livestock",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to find the missing livestock?</p>
                <button onclick="searchArea()">Search the Area (EVD Check)</button>
                <button onclick="investigateTracks()">Investigate the Tracks (ARC Check)</button>
                <button onclick="wrangleLivestock()">Wrangle the Livestock (STR Check)</button>
            `;

            // Search the area using EVD check
            window.searchArea = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You carefully search the surrounding area and eventually locate the livestock grazing peacefully nearby."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Despite your thorough search, you’re unable to locate the livestock. They remain missing."
                    );
                }
            };

            // Investigate tracks using ARC check
            window.investigateTracks = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You find tracks leading away from the site and successfully follow them to where the livestock are hiding."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "The tracks lead nowhere, and you’re left with no clues as to where the livestock may be."
                    );
                }
            };

            // Wrangle livestock using STR check
            window.wrangleLivestock = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName, 
                        true, 
                        "You skillfully wrangle the livestock, gathering them safely and bringing them back to the owner."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName, 
                        false, 
                        "Your attempt to wrangle the livestock goes awry, and a few animals scatter further into the wilderness."
                    );
                }
            };
        }
    },
    {
        name: "Strange Lights",
        description: "You investigate the source of the strange lights.",
        effect: "find",
        terrain: ["forest", "field"],
        weight: 3,
        relatedQuest: "Strange Lights",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you want to approach?</p>
                <button id="sneakButton">Sneak Closer (EVD Check)</button>
                <button id="magicButton">Analyze with Magic (ARC Check)</button>
                <button id="confrontButton">Confront Directly</button>
            `;

            // Sneak Closer - EVD Check
            document.getElementById('sneakButton').addEventListener('click', function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully sneak closer, observing the strange lights. You discover a hidden stash!"
                    );
                    addItemToInventory(getRandomItemByTier(2));
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("You fail to sneak closer and alert the source of the lights. Prepare for combat!");
                    combat.startCombat(getRandomEnemy());
                }
            });

            // Analyze with Magic - ARC Check
            document.getElementById('magicButton').addEventListener('click', function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You analyze the lights with your magic and uncover a hidden magical artifact!"
                    );
                    addItemToInventory(getRandomItemByTier(3));
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "Your magical analysis fails, and the lights vanish before you can learn anything."
                    );
                }
            });

            // Confront Directly
            document.getElementById('confrontButton').addEventListener('click', function() {
                displayNotification("You confront the lights directly, ready for whatever might happen.");
                combat.startCombat(getRandomEnemy());
            });
        }
    },
    
    {
        name: "Escaped Prisoner",
        description: "You encounter an escaped prisoner.",
        effect: "combat",
        terrain: ["forest", "field"],
        weight: 3,
        relatedQuest: "Escaped Prisoner",
        action: function() {
            if (typeof enemyTiers !== 'undefined' && enemyTiers.Unique) {
                const prisoner = enemyTiers.Unique.find(enemy => enemy.name === 'Prisoner');
                if (!prisoner) {
                    console.error('Prisoner not found in enemies list.');
                    return;
                }
                combat.startCombat(prisoner, this.relatedQuest); // Pass quest information
            } else {
                console.error('enemyTiers object is not defined or does not have Unique property.');
            }
        }
    },
    {
        name: "Ancient Ritual",
        description: "You discover a hidden ritual site deep in the forest. Ancient symbols cover the stones, and magic lingers in the air.",
        effect: "ritual",
        terrain: ["forest", "ruins"],
        weight: 4,
        relatedQuest: "Ancient Ritual",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>What will you do?</p>
                <button onclick="investigateSymbols()">Investigate the Symbols (ARC Check)</button>
                <button onclick="performRitual()">Perform the Ritual (EVD Check)</button>
                <button onclick="destroySite()">Destroy the Site (STR Check)</button>
            `;

            // Investigate symbols using ARC check
            window.investigateSymbols = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You decipher the symbols, unlocking a hidden power. You gain a unique item!"
                    );
                    addItemToInventory(getRandomItemByTier(3)); // Example reward
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "You misinterpret the symbols, triggering a magical trap! You lose some health."
                    );
                    playerStats.HP -= 20; // Example consequence
                    updatePlayerStats(playerStats);
                }
            };

            // Perform ritual using EVD check
            window.performRitual = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully perform the ritual, gaining a special boon. Your strength is enhanced."
                    );
                    playerStats.STR += 10; // Example buff
                    updatePlayerStats(playerStats);
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("The ritual goes wrong, summoning a hostile spirit!");
                    const apparition = enemyTiers.Unique.find(enemy => enemy.name === 'Apparition');
                    if (apparition) {
                        combat.startCombat(apparition, "Ancient Ritual");
                    }
                }
            };

            // Destroy site using STR check
            window.destroySite = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You destroy the ritual site, dispelling the lingering magic. Hidden beneath the stones, you find an ancient relic."
                    );
                    addItemToInventory("Ancient Relic"); // Example reward
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("As you try to destroy the site, a hostile spirit appears and attacks you!");
                    const apparition = enemyTiers.Unique.find(enemy => enemy.name === 'Apparition');
                    if (apparition) {
                        combat.startCombat(apparition, "Ancient Ritual");
                    }
                }
            };
        }
    },
    {
        name: "Merchant Escort",
        description: "You've been hired to escort a merchant safely to their destination.",
        effect: "escort",
        terrain: ["path", "forest"],
        weight: 4,
        relatedQuest: "Merchant Escort",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`

            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How will you ensure the merchant's safe passage?</p>
                <button onclick="defendMerchant()">Defend the Merchant (STR Check)</button>
                <button onclick="guideMerchant()">Guide the Merchant Through Safe Paths (ARC Check)</button>
                <button onclick="negotiateBandits()">Negotiate with Bandits (LCK Check)</button>
            `;

            // Defend the merchant using STR check
            window.defendMerchant = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You fend off any would-be attackers, keeping the merchant and their goods safe."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "Despite your efforts, you are overpowered by attackers, and the merchant is injured, losing some goods."
                    );
                    // Optional: Implement a consequence like reduced rewards
                }
            };

            // Guide the merchant using ARC check
            window.guideMerchant = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You expertly guide the merchant through hidden paths, avoiding all danger along the way."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "Your guidance takes the merchant into a dangerous area, and they end up in harm's way."
                    );
                    // Optional: Trigger combat or another consequence
                }
            };

            // Negotiate with bandits using LCK check
            window.negotiateBandits = function() {
                const luckCheck = getRandom() < playerStats.LCK / 100;
                
                if (luckCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully negotiate with the bandits, who allow the merchant to pass unharmed."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("Your negotiation fails, and the bandits decide to attack!");
                    const bandit = enemyTiers.Unique.find(enemy => enemy.name === 'Bandit');
                    if (bandit) {
                        combat.startCombat(bandit, "Merchant Escort");
                    }
                }
            };
        }
    },
    {
        name: "Plague Cure Ingredients",
        description: "A deadly plague is sweeping through the village. You must gather the rare ingredients needed to prepare the cure.",
        effect: "cure",
        terrain: ["forest", "mountain"],
        weight: 5,
        relatedQuest: "Plague Cure Ingredients",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`

            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How will you proceed in gathering the ingredients?</p>
                <button onclick="searchIngredients()">Search for Rare Ingredients (EVD Check)</button>
                <button onclick="gatherFinalIngredient()">Gather the Final Ingredient (STR Check)</button>
                <button onclick="prepareCure()">Prepare the Cure (ARC Check)</button>
            `;

            // Search for rare ingredients using EVD check
            window.searchIngredients = function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully locate the rare ingredients without incident. The villagers are now closer to a cure."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("The search proves dangerous, and you encounter a hostile creature guarding the ingredient!");
                    const creature = enemyTiers.Unique.find(enemy => enemy.name === 'Venomous Arachnid'); // Example enemy
                    if (creature) {
                        combat.startCombat(creature, "Plague Cure Ingredients");
                    }
                }
            };

            // Gather the final ingredient using STR check
            window.gatherFinalIngredient = function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You overcome obstacles and successfully gather the final ingredient needed for the cure."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("You struggle to obtain the final ingredient, and a Forest Guardian appears to challenge you!");
                    const guardian = enemyTiers.Unique.find(enemy => enemy.name === 'Forest Guardian'); // Example enemy
                    if (guardian) {
                        combat.startCombat(guardian, "Plague Cure Ingredients");
                    }
                }
            };

            // Prepare the cure using ARC check
            window.prepareCure = function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You skillfully prepare the cure, potentially saving the villagers from the deadly plague."
                    );
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "The preparation fails, and you may need additional ingredients or expertise to complete the cure."
                    );
                    // Optional: Implement further steps or consequences
                }
            };
        }
    },
    {
        name: "Arachnid Nest",
        description: "You encounter a nest of venomous arachnids.",
        effect: "combat",
        terrain: ["forest", "mountain", "ruins"],
        weight: 3,
        relatedQuest: "Arachnid Nest",
        action: function() {
            const venomousArachnid = enemyTiers.Unique.find(enemy => enemy.name === 'Venomous Arachnid');
            if (!venomousArachnid) {
                console.error('Venomous Arachnid not found in enemies list.');
                return;
            }
            combat.startCombat(venomousArachnid, this.relatedQuest); // Pass quest information
        }
    },
    {
        name: "Relic of the Lost Temple",
        description: "You find a hidden chamber deep within the ruins. The relic lies on a pedestal, but the room feels dangerous.",
        effect: "relic",
        terrain: ["altar", "ruin"],
        weight: 4,
        relatedQuest: "Relic of the Lost Temple",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you approach the relic?</p>
                <button id="disarmTraps">Disarm the Traps (EVD Check)</button>
                <button id="retrieveRelic">Retrieve the Relic (STR Check)</button>
                <button id="studyRelic">Study the Relic (ARC Check)</button>
            `;

            // Disarm the traps using EVD check
            document.getElementById('disarmTraps').addEventListener('click', function() {
                const evasionCheck = getRandom() < playerStats.EVD / 100;
                if (evasionCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You expertly disarm the traps surrounding the relic and safely retrieve it."
                    );
                    addItemToInventory("Ancient Relic");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("You fail to disarm the traps, triggering them! Prepare for combat!");
                    combat.startCombat(getRandomEnemy());
                }
            });

            // Retrieve the relic directly using STR check
            document.getElementById('retrieveRelic').addEventListener('click', function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You manage to retrieve the relic, overcoming the physical challenges of the chamber."
                    );
                    addItemToInventory("Ancient Relic");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("The relic's weight triggers a trap! Prepare for combat!");
                    combat.startCombat(getRandomEnemy());
                }
            });

            // Study the relic using ARC check
            document.getElementById('studyRelic').addEventListener('click', function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You study the relic and unlock its magical properties, gaining an enchanted relic."
                    );
                    addItemToInventory("Enchanted Relic");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "The relic's magic backfires, and you lose some health in the process."
                    );
                    playerStats.HP -= 20;
                    updatePlayerStats(playerStats);
                }
            });
        }
    },
    {
        name: "Cavern Guardian",
        description: "You enter the deepest chamber of the cavern. A massive guardian blocks your path.",
        effect: "combat",
        terrain: ["cave", "treasury"],
        weight: 5,
        relatedQuest: "Cavern Guardian",
        action: function() {
            displayNotification("The guardian roars, ready to defend its territory. Prepare for battle!");
            const guardian = enemyTiers.Unique.find(enemy => enemy.name === 'Cavern Guardian');
            if (guardian) {
                combat.startCombat(guardian, "Cavern Guardian");
            }
        }
    },
    {
        name: "The Cursed Treasury",
        description: "You enter the cursed treasury, its contents locked away by an ancient spell.",
        effect: "curse",
        terrain: ["treasury"],
        weight: 4,
        relatedQuest: "The Cursed Treasury",
        action: function() {
            const relatedQuestName = this.relatedQuest; // Capture the correct context of `this`
            
            const contentWindow = document.getElementById('content-window');
            contentWindow.innerHTML = `
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>How do you deal with the curse?</p>
                <button id="breakCurse">Break the Curse (ARC Check)</button>
                <button id="endureCurse">Endure the Curse (STR Check)</button>
                <button id="dispelCurse">Dispel the Curse (LCK Check)</button>
            `;

            // Break the curse using ARC check
            document.getElementById('breakCurse').addEventListener('click', function() {
                const arcaneCheck = getRandom() < playerStats.ARC / 100;
                if (arcaneCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You successfully break the curse, unlocking the treasure within the treasury."
                    );
                    addItemToInventory("Cursed Gold");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("The curse resists your efforts, and a guardian emerges to protect the treasure! Prepare for combat!");
                    combat.startCombat(getRandomEnemy());
                }
            });

            // Endure the curse using STR check
            document.getElementById('endureCurse').addEventListener('click', function() {
                const strengthCheck = getRandom() < playerStats.STR / 100;
                if (strengthCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "You withstand the curse's effects, managing to claim the treasure despite its dark power."
                    );
                    addItemToInventory("Cursed Gold");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayQuestResult(
                        relatedQuestName,
                        false,
                        "The curse overwhelms you, causing you to lose some health as its power takes hold."
                    );
                    playerStats.HP -= 20;
                    updatePlayerStats(playerStats);
                }
            });

            // Dispel the curse using LCK check
            document.getElementById('dispelCurse').addEventListener('click', function() {
                const luckCheck = getRandom() < playerStats.LCK / 100;
                if (luckCheck) {
                    displayQuestResult(
                        relatedQuestName,
                        true,
                        "Your luck prevails, and the ancient curse dissipates, leaving the treasure unguarded."
                    );
                    addItemToInventory("Cursed Gold");
                    checkQuestCompletion({ relatedQuest: relatedQuestName });
                } else {
                    displayNotification("Your attempt to dispel the curse fails, and shadows stir around you. Enemies emerge from the darkness!");
                    combat.startCombat(getRandomEnemy());
                }
            });
        }
    },  
];

const dungeonEvents = [
    {
        name: "Encounter",
        description: "You encounter a wild beast.",
        effect: "Combat",
        weight: 5,
        terrain: ["ruin", "cave", "water", "treasury", "altar", "rubble"],
        action: function () {
            const player = getPlayerStats();
            const enemy = combat.getRandomDungeonEnemy(player.level);
            combat.startCombat(enemy);
        }
    },
    {
        name: "Crumbling Ceiling",
        description: "The ceiling above you begins to crumble, rocks falling from above.",
        effect: "damage",
        minAmount: 10,
        maxAmount: 20,
        weight: 2,
        terrain: ["ruin", "cave"],
        action: function() {
            const baseDamage = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDamage, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("red");
            displayEventEffect(this.name, this.description, 
                `You took ${finalAmount} damage from falling rocks.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Ancient Trap",
        description: "You accidentally trigger an ancient trap. Sharp spikes shoot out from the walls.",
        effect: "damage",
        minAmount: 5,
        maxAmount: 15,
        weight: 1,
        terrain: ["ruin"],
        action: function() {
            const baseDamage = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseDamage, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            updatePlayerStats(playerStats);
            pulseEffect("red");
            displayEventEffect(this.name, this.description, 
                `You took ${finalAmount} damage from the spikes.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    // New Healing Events
    {
        name: "Healing Spring",
        description: "You find a natural spring flowing with healing waters.",
        effect: "heal",
        minAmount: 15,
        maxAmount: 25,
        weight: 2,
        terrain: ["water", "cave"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            updatePlayerStats(playerStats);
            pulseEffect("green");
            displayEventEffect(this.name, this.description, 
                `You healed ${finalAmount} health from the healing spring.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP}.`);
        }
    },
    
    {
        name: "Mystical Pool",
        description: "You discover a pool with shimmering water that rejuvenates your arcane energy.",
        effect: "heal_ap",
        minAmount: 10,
        maxAmount: 30,
        weight: 2,
        terrain: ["water", "cave"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal_ap');
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            pulseEffect("blue");
            displayEventEffect(this.name, this.description, 
                `You restored ${finalAmount} AP from the mystical pool.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your arcane energy is now ${playerStats.AP}.`);
        }
    },
    
    {
        name: "Altar of Restoration",
        description: "You find an ancient altar that radiates a healing aura.",
        effect: "heal_hp_ap",
        minAmount: 20,
        maxAmount: 40,
        weight: 2,
        terrain: ["altar"],
        action: function() {
            const baseHealing = getRandomInt(this.minAmount, this.maxAmount);
            const { finalAmount, result } = calculateEventEffect(baseHealing, 'heal_hp_ap');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            pulseEffect("green");
            displayEventEffect(this.name, this.description, 
                `You healed ${finalAmount} HP and AP at the altar.<br>` + 
                `(Luck check: ${result})<br>` + 
                `Your health is now ${playerStats.HP} and your arcane energy is ${playerStats.AP}.`);
        }
    },
    
    // New Treasure Events
    {
        name: "Hidden Treasure",
        description: "You find a hidden treasure chest among the rubble.",
        effect: "receive item",
        weight: 2,
        terrain: ["rubble"],
        action: function() {
            const items = getRandomItemsByTypeAndTier([], getTiersByPlayerLevel(playerStats.level), 1, 2);
            const coins = getRandomInt(10, 30);
            playerStats.coins += coins;
            items.forEach(item => addItemToInventory(item));
            updatePlayerStats(playerStats);
            displayEventEffect(this.name, this.description, `You found ${items.map(item => item.name).join(', ')} and ${coins} coins.`);
        }
    },
    {
        name: "Treasure Trove",
        description: "You uncover a trove of treasure in the treasury.",
        effect: "receive item",
        weight: 2,
        terrain: ["treasury"],
        action: function() {
            const items = getRandomItemsByTypeAndTier([], getTiersByPlayerLevel(playerStats.level), 2, 3);
            const equipment = getRandomEquipmentByTier(getTiersByPlayerLevel(playerStats.level), 1, 2);
            const coins = getRandomInt(20, 50);
            playerStats.coins += coins;
            items.concat(equipment).forEach(item => addItemToInventory(item));
            updatePlayerStats(playerStats);
            displayEventEffect(this.name, this.description, `You uncovered ${items.concat(equipment).map(item => item.name).join(', ')} and ${coins} coins.`);
        }
    }
];

function pulseEffect(color) {
    const contentWindow = document.getElementById('content-window');
    contentWindow.style.animation = `pulse-${color} 1s infinite`;
    setTimeout(() => {
        contentWindow.style.animation = ''; // Reset animation after 1 second
    }, 1000);
}

function triggerTreasureMapEvent() {
    const tiers = getTiersByPlayerLevel(playerStats.level);
    const items = getRandomItemsByTypeAndTier([], tiers, 2, 4);
    const equipment = getRandomEquipmentByTier(tiers, 2, 4);
    const coins = getRandomInt(50, 100);

    playerStats.coins += coins;
    items.concat(equipment).forEach(item => addItemToInventory(item));
    updatePlayerStats(playerStats);

    displayEventEffect("Treasure Map", "You follow the map to a hidden treasure.", `You found: ${items.concat(equipment).map(item => item.name).join(', ')} and ${coins} coins.`);
}

// Ensure events are selected based on terrain
function getRandomEvent(terrain) {
    const filteredEvents = events.filter(event => event.terrain.includes(terrain));

    let combinedEvents = filteredEvents;

    if (playerStats.activeQuests && playerStats.activeQuests.length > 0) {
        const activeQuestTitles = playerStats.activeQuests.map(quest => quest.title);
        const questFilteredEvents = questEvents.filter(event =>
            event.terrain.includes(terrain) && activeQuestTitles.includes(event.relatedQuest)
        );
        combinedEvents = [...filteredEvents, ...questFilteredEvents];
    }

    if (combinedEvents.length === 0) {
        console.warn("No events found for the terrain:", terrain);
        return null;
    }

    const totalWeight = combinedEvents.reduce((sum, event) => sum + (event.weight || 1), 0);
    let randomWeight = getRandom() * totalWeight;

    for (let event of combinedEvents) {
        randomWeight -= (event.weight || 1);
        if (randomWeight <= 0) {
            return event;
        }
    }

    return null;
}

function getRandomEventFromDungeon(terrain) {
    if (!terrain) {
        console.warn("getRandomEventFromDungeon was called with an undefined terrain.");
        return null;
    }

    const filteredEvents = dungeonEvents.filter(event => event.terrain.includes(terrain));

    let combinedEvents = filteredEvents;

    if (playerStats.activeQuests && playerStats.activeQuests.length > 0) {
        const activeQuestTitles = playerStats.activeQuests.map(quest => quest.title);
        const questFilteredEvents = questEvents.filter(event =>
            event.terrain.includes(terrain) && activeQuestTitles.includes(event.relatedQuest)
        );
        combinedEvents = [...filteredEvents, ...questFilteredEvents];
    }

    if (combinedEvents.length === 0) {
        console.warn("No events found for the terrain:", terrain);
        return null;
    }

    const totalWeight = combinedEvents.reduce((sum, event) => sum + (event.weight || 1), 0);
    let randomWeight = getRandom() * totalWeight;

    for (let event of combinedEvents) {
        randomWeight -= event.weight;
        if (randomWeight <= 0) {
            return event;
        }
    }

    return null;
}

function applyEvent(event) {
    if (event && typeof event.action === 'function') {
        debugLog("Applying event:", event.name);
        event.action();
        if (playerStats.HP <= 0) { // Check if HP is 0 or below after event action
            gameOver();
        }
    } else {
        console.error("Event action is not a function or is missing for event:", event ? event.name : "null");
    }
}

function checkQuestCompletion({ relatedQuest }) {
    const questIndex = playerStats.activeQuests.findIndex(quest => quest.title === relatedQuest);
    if (questIndex !== -1) {
        playerStats.activeQuests[questIndex].completed = true;
        displayNotification(`Quest "${relatedQuest}" completed! Return to any notice board to collect your reward.`);
    }
}

function displayEventEffect(title, description, message) {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <p>${message}</p>
    `;
    // Remove pulsing effect after displaying event effect
    setTimeout(() => {
        contentWindow.style.animation = '';
    }, 3000);
}

function confirmAugmentEquipmentWithItems(slot) {
    const item = GameState.equippedItems[slot];
    if (!item) {
        displayNotification("No item equipped in this slot.");
        return;
    }

    if (item.name.includes('*')) {
        displayNotification(`${item.name} is already augmented.`);
        return;
    }

    const requiredItemName = slot === 'weapon' ? 'Ancient Relic' : 'Glowing Crystal';
    const requiredItem = inventory.find(i => i.name === requiredItemName);
    const requiredQuantity = item.tier;
    const ownedQuantity = requiredItem ? requiredItem.quantity : 0;

    if (ownedQuantity < requiredQuantity) {
        displayNotification(`You need ${requiredQuantity} ${requiredItemName}(s) to augment this ${slot}.`);
        return;
    }

    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Confirm Augmentation</h2>
        <p>Are you sure you want to augment your ${item.name}?</p>
        <button onclick="augmentEquipmentFromEvent('${slot}', '${requiredItemName}', ${requiredQuantity})">Yes</button>
        <button onclick="showPreviousScreen()">No</button>
    `;
}

function augmentEquipmentFromEvent(slot, requiredItemName, requiredQuantity) {
    const item = GameState.equippedItems[slot];
    if (!item) {
        displayNotification("No item equipped in this slot.");
        return;
    }

    const requiredItem = inventory.find(i => i.name === requiredItemName);
    if (!requiredItem || requiredItem.quantity < requiredQuantity) {
        displayNotification(`You need ${requiredQuantity} ${requiredItemName}(s) to augment this ${slot}.`);
        return;
    }

    if (augmentEquipment(item)) {
        requiredItem.quantity -= requiredQuantity;
        if (requiredItem.quantity <= 0) {
            removeItemFromInventory(requiredItem);
        }
        displayNotification(`${item.name} has been augmented!`);
        updatePlayerStats(playerStats);
        refreshInventoryScreen();
        refreshEquipmentScreen();
    }
    showPreviousScreen();
}

function calculateEventEffect(baseAmount, type) {
    const luckRoll = getRandom(); // A roll between 0 and 1
    const luckThreshold = playerStats.LCK / 100; // Assuming LCK is out of 100
    let result = 'pass';

    if (luckRoll < luckThreshold / 2) {
        result = 'fail'; // Fail if the roll is very low
    } else if (luckRoll < luckThreshold) {
        result = 'crit'; // Success if the roll is within the luck range
    }

    let finalAmount = baseAmount;

    if (type === 'damage') {
        switch (result) {
            case 'fail':
                finalAmount += Math.round(baseAmount * 0.2); // 20% more damage on fail
                break;
            case 'crit':
                finalAmount -= Math.round(baseAmount * 0.2); // 20% less damage on success
                break;
            default:
                // Normal damage, no modification
                break;
        }
    } else if (type === 'heal' || type === 'heal_ap' || type === 'heal_hp_ap') {
        switch (result) {
            case 'fail':
                finalAmount -= Math.round(baseAmount * 0.2); // 20% less healing on fail
                break;
            case 'crit':
                finalAmount += Math.round(baseAmount * 0.2); // 20% more healing on success
                break;
            default:
                // Normal healing, no modification
                break;
        }
    }

    // Further scale based on player level and max HP/AP
    const levelScaling = 1 + (playerStats.level / 10); // Scaling factor based on level
    if (type === 'damage') {
        finalAmount = Math.round(finalAmount * levelScaling);
        finalAmount = Math.min(finalAmount, playerStats.HP); // Ensure it doesn't exceed current HP
    } else if (type === 'heal') {
        finalAmount = Math.round(finalAmount * levelScaling);
        finalAmount = Math.min(finalAmount, playerStats.maxHP - playerStats.HP); // Ensure it doesn't exceed max HP
    } else if (type === 'heal_ap') {
        finalAmount = Math.round(finalAmount * levelScaling);
        finalAmount = Math.min(finalAmount, playerStats.maxAP - playerStats.AP); // Ensure it doesn't exceed max AP
    } else if (type === 'heal_hp_ap') {
        finalAmount = Math.round(finalAmount * levelScaling);
        const hpCap = playerStats.maxHP - playerStats.HP;
        const apCap = playerStats.maxAP - playerStats.AP;
        finalAmount = Math.min(finalAmount, hpCap, apCap); // Use the smaller of remaining HP or AP
    }

    return { finalAmount, result };
}
