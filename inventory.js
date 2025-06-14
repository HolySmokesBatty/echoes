let equipmentInventory = [];
GameState.inventory = GameState.inventory || [];
let inventory = GameState.inventory;
let equippedItems = GameState.equippedItems;

function addItemToInventory(item) {
    const existingItem = inventory.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity || 1; // Increment quantity if the item already exists
    } else {
        inventory.push({ ...item, quantity: item.quantity || 1 }); // Add new item to the inventory
    }
    refreshInventoryScreen(); // Refresh inventory after adding item
}

function getEquipmentContent() {
    let equipmentHtml = '<div class="left-justify"><h2>Equipment</h2><ul>';
    if (equippedItems.weapon || equippedItems.armor) {
        if (equippedItems.weapon) {
            equipmentHtml += `
                <li>
                    <strong>${equippedItems.weapon.name}</strong><br>
                    Attribute: ${equippedItems.weapon.attribute}<br>
                    Special: ${equippedItems.weapon.special ? equippedItems.weapon.special : "None"}<br>
                    <button onclick="unequipItem('weapon')">Unequip</button>
                </li>
            `;
        }
        if (equippedItems.armor) {
            equipmentHtml += `
                <li>
                    <strong>${equippedItems.armor.name}</strong><br>
                    Attribute: ${equippedItems.armor.attribute}<br>
                    Special: ${equippedItems.armor.special ? equippedItems.armor.special : "None"}<br>
                    <button onclick="unequipItem('armor')">Unequip</button>
                </li>
            `;
        }
    } else {
        equipmentHtml += '<li>No equipment equipped</li>';
    }
    equipmentHtml += '</ul></div>';
    return equipmentHtml;
}

function sortInventory(inventory) {
    const restorativeItems = [];
    const usableItems = [];
    const equipmentItems = [];
    const otherItems = [];

    inventory.forEach(item => {
        if (item.types && Array.isArray(item.types)) {
            if (item.types.includes("Health") || item.types.includes("Food") || item.types.includes("Arcana")) {
                restorativeItems.push(item);
            } else if (item.types.includes("Usable")) {
                usableItems.push(item);
            } else if (item.types.includes("Weapon") || item.types.includes("Armor")) {
                equipmentItems.push(item);
            } else {
                otherItems.push(item);
            }
        }
    });

    return [...restorativeItems, ...usableItems, ...otherItems, ...equipmentItems];
}

function getInventoryContent() {
    const sortedInventory = sortInventory(inventory);

    let inventoryHtml = '<div class="left-justify"><h2>Inventory</h2><ul>';
    if (sortedInventory.length === 0) {
        inventoryHtml += '<li>No items available</li>';
    } else {
        sortedInventory.forEach(item => {
            let actionButton = '';
            if (item.types && Array.isArray(item.types)) {
                if (item.types.includes("Usable")) {
                    actionButton = `<button onclick="useUsableItem('${escapeItemName(item.name)}')">Use</button>`;
                } else if (item.types.includes('Weapon') || item.types.includes('Armor')) {
                    actionButton = `<button onclick="equipItem('${escapeItemName(item.name)}')">Equip</button>`;
                } else if (Array.isArray(item.effect) || (typeof item.effect === "string" && item.effect.startsWith("event:"))) {
                    actionButton = `<button onclick="useEventItem('${escapeItemName(item.name)}')">Use</button>`;
                }
            }

            let description = item.description;
            if (description.includes('-')) {
                const parts = description.split('-');
                description = `${parts[0].trim()}<br>${parts[1].trim()}`;
            }

            inventoryHtml += `
                <li>
                    <strong>${item.name}</strong> (x${item.quantity})<br>
                    ${description}<br>
                    ${actionButton}
                </li>
            `;
        });
    }
    inventoryHtml += '</ul></div>';
    return inventoryHtml;
}

function escapeItemName(itemName) {
    return itemName.replace(/'/g, "\\'");
}

function useUsableItem(itemName) {
    itemName = itemName.replace(/\\'/g, "'");
    const item = inventory.find(i => i.name === itemName);
    if (item) {
        // Check if the item is a healing item and use the useHealingItem function
        if (item.types && (item.types.includes("Health") || item.types.includes("Arcana"))) {
            useHealingItem(itemName);
            return;
        }

        // Check if the item triggers an event
        if (item.effect && item.effect.startsWith("event:")) {
            useEventItem(itemName);
            return;
        }

        // Handle other types of usable items if needed
        displayNotification(`The item ${itemName} has been used, but it has no effect.`);
        
        // If the item is not a healing item or event item, decrement the quantity or remove it
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeItemFromInventory(item);
        }
        updatePlayerStats(playerStats);
        refreshInventoryScreen(); // Refresh inventory after using item
    } else {
        const errorMessage = 'Item not found in inventory.';
        displayNotification(errorMessage);
    }
}

function useEventItem(itemName) {
    itemName = itemName.replace(/\\'/g, "'");
    const item = inventory.find(i => i.name === itemName);
    if (item) {
        const effectParts = item.effect.split(':');
        if (effectParts[0] === "event" && effectParts[1] === "Treasure Map") {
            removeItemFromInventory(item); // Remove the Old Map from the inventory
            triggerTreasureMapEvent(); // Trigger the Treasure Map Event
        } else {
            displayNotification("This item cannot trigger an event.");
        }
    } else {
        displayNotification("You do not have this item.");
    }
}

function refreshInventoryScreen() {
    if (combat.isInCombat) {
        combat.displayCombatOptions(); // Display combat options if in combat
    } else {
        const contentWindow = document.getElementById('content-window');
        if (contentWindow) {
            contentWindow.innerHTML = getInventoryContent();
        }
    }
}

function parseEffect(effect) {
    console.log("Parsing effect:", effect); // Debugging statement
    const match = effect.match(/(heal_hp|heal_ap):?(\d+%?)/);
    if (!match) {
        console.log("Effect parsing failed:", effect); // Debugging statement
        return { type: null, amount: NaN };
    }

    const type = match[1];
    const value = match[2].includes('%') ? parseFloat(match[2]) / 100 : parseFloat(match[2]);
    console.log(`Effect type: ${type}, Effect value: ${value}`); // Debugging statement
    return { type, amount: value };
}

function useHealingItem(itemName) {
    const item = inventory.find(i => i.name === itemName);
    if (!item) {
        displayNotification(`Item ${itemName} not found.`);
        return `Item ${itemName} not found.`;
    }

    const hpHealing = item.types.includes("Health") ? calculateHealing(item, playerStats, "HP") : 0;
    const apHealing = item.types.includes("Arcana") ? calculateHealing(item, playerStats, "AP") : 0;

    let message = '';

    if (item.types.includes("Health") && playerStats.HP < playerStats.maxHP) {
        playerStats.HP = Math.min(playerStats.HP + hpHealing, playerStats.maxHP);
        message += `You used ${item.name} and healed for ${hpHealing} HP. `;
    }

    if (item.types.includes("Arcana") && playerStats.AP < playerStats.maxAP) {
        playerStats.AP = Math.min(playerStats.AP + apHealing, playerStats.maxAP);
        message += `You used ${item.name} and restored ${apHealing} AP.`;
    }

    if (message) {
        displayNotification(message);
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeItemFromInventory(item);
        }
        updatePlayerStats(playerStats);
        refreshInventoryScreen(); // Refresh inventory after using item
    } else {
        displayNotification("You are already at full HP and AP.");
        return "You are already at full HP and AP.";
    }

    return message;
}

function healPlayer(amount) {
    playerStats.HP = Math.min(playerStats.HP + amount, playerStats.maxHP);
    updatePlayerStats(playerStats);
    displayNotification(`You were healed by ${amount} HP.`);
}

function healAP(amount) {
    playerStats.AP = Math.min(playerStats.AP + amount, playerStats.maxAP);
    updatePlayerStats(playerStats);
    displayNotification(`You recovered ${amount} AP.`);
}

function equipItem(itemName) {
    itemName = itemName.replace(/\\'/g, "'");
    const item = inventory.find(i => i.name === itemName);
    if (!item) {
        displayNotification('Item not found in inventory.');
        return;
    }

    const classData = classes[playerStats.class];

    if (item.types && Array.isArray(item.types) && item.types.includes('Weapon') && !classData.allowedWeapons.includes(item.types[1])) {
        displayNotification("This weapon cannot be equipped by your class.");
        return;
    }

    if (item.types && Array.isArray(item.types) && item.types.includes('Armor') && !classData.allowedArmor.includes(item.types[1])) {
        displayNotification("This armor cannot be equipped by your class.");
        return;
    }

    if (item.types && Array.isArray(item.types) && item.types.includes('Weapon')) {
        if (equippedItems.weapon) {
            addItemToInventory(equippedItems.weapon);
            removeEquipmentEffects(equippedItems.weapon);
        }
        equippedItems.weapon = { ...item, quantity: 1 }; // Equip one item
    } else if (item.types && Array.isArray(item.types) && item.types.includes('Armor')) {
        if (equippedItems.armor) {
            addItemToInventory(equippedItems.armor);
            removeEquipmentEffects(equippedItems.armor);
        }
        equippedItems.armor = { ...item, quantity: 1 }; // Equip one item
    }

    applyEquipmentEffects(item);

    // Decrement the item quantity in inventory
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        removeItemFromInventory(item);
    }

    displayNotification(`You equipped ${itemName}.`);
    updatePlayerStats(playerStats);
    refreshInventoryScreen(); // Refresh inventory after equipping item
}

function removeItemFromInventory(item) {
    const itemIndex = inventory.indexOf(item);
    if (itemIndex > -1) {
        inventory.splice(itemIndex, 1);
    }
}

function unequipItem(slot) {
    const item = equippedItems[slot];
    if (item) {
        removeEquipmentEffects(item);
        addItemToInventory(item);
        equippedItems[slot] = null;
        displayNotification(`You unequipped ${item.name}.`);
        updatePlayerStats(playerStats);
    }
}

function applyEquipmentEffects(item) {
    const attributes = item.attribute.split(' ');
    for (let i = 0; i < attributes.length; i += 2) {
        const stat = attributes[i];
        const value = parseInt(attributes[i + 1]);
        if (!isNaN(value)) {
            playerStats[stat] += value;
        }
    }
}

function removeEquipmentEffects(item) {
    const attributes = item.attribute.split(' ');
    for (let i = 0; i < attributes.length; i += 2) {
        const stat = attributes[i];
        const value = parseInt(attributes[i + 1]);
        if (!isNaN(value)) {
            playerStats[stat] -= value;
        }
    }
}
