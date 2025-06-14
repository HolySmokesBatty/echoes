let events = [];
let dungeonEvents = [];
let questEvents = [];
const eventActions = {};

(function(){
    let data = null;
    if (typeof EVENTS_DATA !== 'undefined') {
        data = EVENTS_DATA;
    } else if (typeof require === 'function') {
        try {
            const fs = require('fs');
            const path = require('path');
            data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/events.json'), 'utf8'));
        } catch (e) {}
    } else if (typeof XMLHttpRequest !== 'undefined') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/events.json', false);
        xhr.send(null);
        if (xhr.status === 200) data = JSON.parse(xhr.responseText);
    }
    data = data || { events: [], dungeonEvents: [], questEvents: [] };
    events = data.events;
    dungeonEvents = data.dungeonEvents;
    questEvents = data.questEvents;
})();

function registerEventActions(list) {
    list.forEach(event => {
        if (event.effect) {
            event.effect = event.effect.toLowerCase();
        }
        eventActions[event.name] = () => executeEventEffect(event);
    });
}

registerEventActions(events);
registerEventActions(dungeonEvents);
registerEventActions(questEvents);

function executeEventEffect(event) {
    const amount = event.maxAmount ? getRandomInt(event.minAmount || 0, event.maxAmount) : 0;
    const contentWindow = document.getElementById('content-window');
    const effect = (event.effect || '').toLowerCase();
    switch (effect) {
        case 'damage': {
            contentWindow.style.animation = 'pulse-red 1s';
            const { finalAmount } = calculateEventEffect(amount, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You took ${finalAmount} damage.`);
            break;
        }
        case 'heal': {
            contentWindow.style.animation = 'pulse-green 1s';
            const { finalAmount } = calculateEventEffect(amount, 'heal');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You recovered ${finalAmount} HP.`);
            break;
        }
        case 'drain_ap': {
            contentWindow.style.animation = 'pulse-blue 1s';
            const { finalAmount } = calculateEventEffect(amount, 'damage');
            playerStats.AP = Math.max(playerStats.AP - finalAmount, 0);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You lost ${finalAmount} AP.`);
            break;
        }
        case 'heal_ap': {
            contentWindow.style.animation = 'pulse-blue 1s';
            const { finalAmount } = calculateEventEffect(amount, 'heal_ap');
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You recovered ${finalAmount} AP.`);
            break;
        }
        case 'heal_hp_ap': {
            contentWindow.style.animation = 'pulse-purple 1s';
            const { finalAmount } = calculateEventEffect(amount, 'heal_hp_ap');
            playerStats.HP = Math.min(playerStats.HP + finalAmount, playerStats.maxHP);
            playerStats.AP = Math.min(playerStats.AP + finalAmount, playerStats.maxAP);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You recovered ${finalAmount} HP and AP.`);
            break;
        }
        case 'damage_hp_ap': {
            contentWindow.style.animation = 'pulse-purple 1s';
            const { finalAmount } = calculateEventEffect(amount, 'damage');
            playerStats.HP = Math.max(playerStats.HP - finalAmount, 0);
            playerStats.AP = Math.max(playerStats.AP - finalAmount, 0);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, `You lost ${finalAmount} HP and AP.`);
            break;
        }
        case 'receive item': {
            const loot = items[getRandomInt(0, items.length - 1)];
            addItemToInventory({ ...loot });
            displayEventEffect(event.name, event.description, `You received ${loot.name}.`);
            break;
        }
        case 'combat': {
            combat.startCombat();
            break;
        }
        case 'treasure_map': {
            triggerTreasureMapEvent();
            break;
        }
        case 'shop': {
            if (typeof generateMerchantInventory === 'function') {
                generateMerchantInventory();
            }
            currentMerchantName = event.merchantName || event.name;
            if (typeof displayMerchantEncounter === 'function') {
                displayMerchantEncounter();
            }
            break;
        }
        case 'quest': {
            if (event.source && event.source.startsWith('town') && typeof loadNoticeBoard === 'function') {
                loadNoticeBoard(contentWindow, event.source);
            } else if (typeof displayNotification === 'function') {
                displayNotification('No notice board available.');
            }
            break;
        }
        case 'find': {
            displayEventEffect(event.name, event.description, 'You found what you were looking for.');
            checkQuestCompletion(event);
            break;
        }
        case 'build': {
            playerStats.coins = (playerStats.coins || 0) + 10;
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'Your efforts were rewarded with 10 coins.');
            checkQuestCompletion(event);
            break;
        }
        case 'cure': {
            playerStats.HP = Math.min((playerStats.HP || 0) + 5, playerStats.maxHP);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'You helped create a cure and feel invigorated.');
            checkQuestCompletion(event);
            break;
        }
        case 'purify': {
            playerStats.AP = Math.min((playerStats.AP || 0) + 5, playerStats.maxAP);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'You purified the source and gained some energy.');
            checkQuestCompletion(event);
            break;
        }
        case 'recover': {
            playerStats.coins = (playerStats.coins || 0) + 5;
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'You recovered the goods and received 5 coins.');
            checkQuestCompletion(event);
            break;
        }
        case 'curse': {
            playerStats.AP = Math.max((playerStats.AP || 0) - 5, 0);
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'A dark curse weakens you.');
            break;
        }
        case 'escort': {
            playerStats.coins = (playerStats.coins || 0) + 15;
            updatePlayerStats(playerStats);
            displayEventEffect(event.name, event.description, 'The escort was successful and you earned 15 coins.');
            checkQuestCompletion(event);
            break;
        }
        case 'relic': {
            combat.startCombat();
            checkQuestCompletion(event);
            break;
        }
        case 'ritual': {
            combat.startCombat();
            checkQuestCompletion(event);
            break;
        }
        case 'augment gear': {
            if (typeof confirmAugmentEquipmentWithItems === 'function') {
                confirmAugmentEquipmentWithItems('weapon');
            }
            break;
        }
        case 'lose coins or combat': {
            if (typeof promptLoseCoinsOrCombat === 'function') {
                promptLoseCoinsOrCombat(amount, event);
            } else {
                combat.startCombat();
            }
            break;
        }
        default:
            displayEventEffect(event.name, event.description, 'Nothing happens.');
    }
    if (event.relatedQuest && !['find','build','cure','purify','recover','escort','relic','ritual'].includes(effect)) {
        checkQuestCompletion(event);
    }
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
            return { ...event, action: eventActions[event.name] };
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
            return { ...event, action: eventActions[event.name] };
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

function promptLoseCoinsOrCombat(amount, event) {
    if (!amount || playerStats.coins < amount) {
        combat.startCombat();
        return;
    }

    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p>The attackers demand ${amount} coins.</p>
        <button onclick="payCoinsToAvoidCombat(${amount}, '${event.name}', '${event.description}')">Pay</button>
        <button onclick="startCombatFromEvent()">Fight</button>
    `;
}

function payCoinsToAvoidCombat(amount, title, description) {
    if (playerStats.coins >= amount) {
        playerStats.coins -= amount;
        updatePlayerStats(playerStats);
        displayEventEffect(title, description, `You paid ${amount} coins.`);
    } else {
        combat.startCombat();
    }
}

function startCombatFromEvent() {
    combat.startCombat();
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
