const townPrefixes = [
    "Green", "Blue", "Red", "White", "Black", "Gold", "Silver", "Iron", "Stone",
    "Oak", "Pine", "Cedar", "Birch", "Elm", "Ash", "Willow", "Raven", "Eagle",
    "Dragon", "Wolf", "Bear", "Hawk", "Fox", "Stag", "Lion"
];

const townSuffixes = [
    "dale", "wood", "town", "burg", "ville", "haven", "ford", "field", "port",
    "bridge", "falls", "ridge", "hill", "vale", "hollow", "stone", "creek",
    "shore", "peak", "glen", "meadow", "heights", "plains", "cove", "springs"
];

const smallTownNames = [
    "Hamlet", "Village", "Crossroads", "Outpost", "Encampment", "Farmstead", "Homestead"
];

const mediumTownNames = [
    "Town", "Borough", "Market Town", "Trade Post", "Port Town", "Mining Camp", "Fishing Village"
];

const largeTownNames = [
    "City", "Capital", "Fortress", "Stronghold", "Citadel"
];

const allLocations = [
    { name: "Inn", description: "Rest - Fully restores HP/AP for 20 Coins", visit: visitInn },
    { name: "Tavern", description: "Gossip - Shows a random conversation snippet from the Tavern Database", visit: visitTavern },
    { name: "Item Shop", description: "Buy/Sell - Sells Tier 1 and Tier 2 Items", visit: () => visitShop('Item Shop', 'Item Shop') },
    { name: "Apothecary", description: "Buy/Sell - Sells Potion Items", visit: () => visitShop('Apothecary', 'Apothecary') },
    { name: "Arcaneum", description: "Buy/Sell - Sells Gem and Parchment Items", visit: () => visitShop('Arcaneum', 'Arcaneum') },
    { name: "Armory", description: "Buy/Sell - Sells Weapons and Armor from Tier 1 to Tier 3", visit: () => visitShop('Armory', 'Armory') },
    { name: "Blacksmith", description: "Upgrade - Augment Equipment for Coins", visit: visitBlacksmith }
];

const townDescriptions = [
    "The ${townType} of ${townName} is known for its bustling marketplace and friendly locals.",
    "In the heart of the ${townType} of ${townName}, you'll find a quaint tavern where adventurers gather.",
    "${townName} is a ${townType} surrounded by lush forests and rolling hills.",
    "The ${townType} of ${townName} is famous for its blacksmith who crafts the finest weapons in the region.",
    "${townName} is a peaceful ${townType} with a beautiful central square and a grand fountain.",
    "The ${townType} of ${townName} is nestled by a serene lake, offering stunning views and calm waters.",
    "Known for its annual festivals, the ${townType} of ${townName} is always filled with joy and laughter.",
    "${townName}, a ${townType}, is a hub for trade and commerce, attracting merchants from afar.",
    "The ${townType} of ${townName} is protected by ancient walls and a vigilant guard.",
    "With its cobblestone streets and historic buildings, ${townName} is a charming ${townType} to explore."
];

function getRandomLocations(number) {
    const shuffledLocations = allLocations.sort(() => 0.5 - getRandom());
    return shuffledLocations.slice(0, number);
}

function getRandomTown() {
    const prefix = townPrefixes[Math.floor(getRandom() * townPrefixes.length)];
    const suffix = townSuffixes[Math.floor(getRandom() * townSuffixes.length)];
    const size = getRandom();

    let townName = `${prefix}${suffix}`;
    let townType;
    let locations;

    if (size < 0.33) {
        townType = smallTownNames[Math.floor(getRandom() * smallTownNames.length)];
        locations = getRandomLocations(3);
    } else if (size < 0.66) {
        townType = mediumTownNames[Math.floor(getRandom() * mediumTownNames.length)];
        locations = getRandomLocations(5);
    } else {
        townType = largeTownNames[Math.floor(getRandom() * largeTownNames.length)];
        locations = getRandomLocations(7);
    }

    const descriptionTemplate = townDescriptions[Math.floor(getRandom() * townDescriptions.length)];
    const description = descriptionTemplate.replace('${townName}', townName).replace('${townType}', townType);

    return {
        name: `The ${townType} of ${townName}`,
        description: description,
        locations: locations
    };
}

// shuffleArray is defined in utils.js

function visitInn() {
    const contentWindow = document.getElementById('content-window');
    if (playerStats.HP === playerStats.maxHP && playerStats.AP === playerStats.maxAP) {
        contentWindow.innerHTML = `
            <h2>Inn</h2>
            <p>Your HP and AP are already full. There's no need to rest now.</p>
            <button onclick="showTownMenu()">Back</button>
        `;
        return;
    }

    contentWindow.innerHTML = `
        <h2>Inn</h2>
        <p>Would you like to rest at the inn for 20 coins to fully restore your HP and AP?</p>
        <button onclick="confirmStayAtInn()">Yes</button>
        <button onclick="showTownMenu()">No</button>
    `;
}

function confirmStayAtInn() {
    const contentWindow = document.getElementById('content-window');
    if (playerStats.coins >= 20) {
        playerStats.coins -= 20;
        playerStats.HP = playerStats.maxHP;
        playerStats.AP = playerStats.maxAP;
        updatePlayerStats(playerStats); // Ensure player stats are updated in the UI
        contentWindow.innerHTML = `
            <h2>Inn</h2>
            <p>You rest at the inn. Your HP and AP are fully restored.</p>
            <button onclick="showTownMenu()">Back</button>
        `;
    } else {
        contentWindow.innerHTML = `
            <h2>Inn</h2>
            <p>You don't have enough coins to stay at the inn.</p>
            <button onclick="showTownMenu()">Back</button>
        `;
    }
}

function visitTavern(townSource) {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Tavern</h2>
        <p>You approach the Tavern. What would you like to do?</p>
        <button onclick="showNoticeBoard('${townSource}')">Check the Notice Board</button>
        <button onclick="enterTavern()">Go Inside</button>
        <button onclick="showTownMenu()">Back</button>
    `;
}

function getShopInventory(filters, itemCount) {
    const tiers = getTiersByPlayerLevel(playerStats.level);
    
    let filteredItems = items.filter(item => {
        if (filters.types && !filters.types.some(type => item.types.includes(type))) {
            return false;
        }
        if (filters.exclude && filters.exclude.some(type => item.types.includes(type))) {
            return false;
        }
        if (filters.tier && !filters.tier.includes(item.tier)) {
            return false;
        }
        if (!tiers.includes(item.tier)) {
            return false;
        }
        return true;
    });

    let filteredEquipment = equipment.filter(equip => {
        if (filters.types && !filters.types.some(type => equip.types.includes(type))) {
            return false;
        }
        if (filters.exclude && filters.exclude.some(type => equip.types.includes(type))) {
            return false;
        }
        if (filters.tier && !filters.tier.includes(equip.tier)) {
            return false;
        }
        if (!tiers.includes(equip.tier)) {
            return false;
        }
        return true;
    });

    let combinedInventory = filteredItems.concat(filteredEquipment);
    return shuffleArray(combinedInventory).slice(0, itemCount);
}

function visitShop(shopName, shopType) {
    if (!scenesArray[playerPosition.y][playerPosition.x].shopInventories) {
        scenesArray[playerPosition.y][playerPosition.x].shopInventories = {};
    }

    const itemCount = getRandomInt(3, 5);
    const filters = getShopFilters(shopType);
    const shopInventory = getShopInventory(filters, itemCount);
    scenesArray[playerPosition.y][playerPosition.x].shopInventories[shopName] = shopInventory;

    const shopVisitText = getShopVisitText(shopType);

    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>${shopName}</h2>
        <p>${shopVisitText}</p>
        <button onclick="showShopInventory('${shopName}', '${shopType}')">Buy</button>
        <button onclick="showSellMenu('${shopName}', '${shopType}')">Sell</button>
        <button onclick="showTownMenu()">Back</button>
    `;
}

function getShopVisitText(shopType) {
    switch (shopType) {
        case 'Item Shop':
            return 'Welcome to the Item Shop. We have a variety of useful items for your journey.';
        case 'Apothecary':
            return 'Welcome to the Apothecary. We offer the finest potions and remedies.';
        case 'Arcaneum':
            return 'Welcome to the Arcaneum. Browse our collection of magical artifacts and spell components.';
        case 'Armory':
            return 'Welcome to the Armory. Equip yourself with the best weapons and armor.';
        default:
            return 'Welcome to the shop. How can I assist you today?';
    }
}

function showShopInventory(shopName, shopType) {
    const shopInventory = scenesArray[playerPosition.y][playerPosition.x].shopInventories[shopName];

    const contentWindow = document.getElementById('content-window');
    let inventoryHtml = `<h2>${shopName} - Buy Items</h2>
        <p>Browse through our selection of fine goods.</p>
        <div class="shop-inventory"><ul>`;
    if (shopInventory.length === 0) {
        inventoryHtml += '<li>No items available</li>';
    } else {
        shopInventory.forEach(item => {
            inventoryHtml += `
                <li>
                    <strong>${item.name}</strong> (${item.value} coins)<br>
                    ${item.description}<br>
                    <button onclick="buyItem('${escapeItemName(item.name)}', ${item.value}, '${shopName}', '${shopType}')">Buy</button>
                </li>
            `;
        });
    }
    inventoryHtml += '</ul></div>';
    inventoryHtml += `<button onclick="visitShop('${shopName}', '${shopType}')">Back</button>`;
    contentWindow.innerHTML = inventoryHtml;
}

function showSellMenu(shopName, shopType) {
    const contentWindow = document.getElementById('content-window');
    let inventoryHtml = `<h2>${shopName} - Sell Items</h2><div class="shop-inventory"><ul>`;
    
    if (inventory.length === 0) {
        inventoryHtml += '<li>No items available</li>';
    } else {
        inventoryHtml += inventory.map(item => {
            const sellPrice = Math.floor(item.value / 2);

            return `
                <li>
                    <strong>${item.name}</strong> (x${item.quantity})<br>
                    ${item.description}<br>
                    Sell Price: ${sellPrice} coins<br>
                    <button onclick="sellItem('${escapeItemName(item.name)}', ${sellPrice}, '${shopName}', '${shopType}')">Sell</button>
                </li>
            `;
        }).join('');
    }

    inventoryHtml += `</ul></div><button onclick="visitShop('${shopName}', '${shopType}')">Back</button>`;
    contentWindow.innerHTML = inventoryHtml;
}

function getShopFilters(shopType) {
    switch (shopType) {
        case 'Item Shop':
            return { tier: [1, 2], types: ['Food', 'Potion', 'Arcana', 'Special'], exclude: ['Rare', 'Currency'] };
        case 'Apothecary':
            return { types: ['Food', 'Potion'] };
        case 'Arcaneum':
            return { types: ['Gem', 'Staff', 'Wand', 'Light'], tier: [1, 2], exclude: ['Rare'] };
        case 'Armory':
            return { types: ['Sword', 'Hammer', 'Axe', 'Dagger', 'Bow', 'Medium', 'Heavy'], tier: [1, 2, 3] };
        default:
            return {};
    }
}

function getPlayerSellableItems() {
    return inventory.filter(item => !item.types.includes('Currency') && !item.types.includes('Quest'));
}

function sellItem(itemName, sellPrice, shopName, shopType) {
    itemName = itemName.replace(/\\'/g, "'");
    const item = inventory.find(i => i.name === itemName);
    if (item) {
        playerStats.coins += sellPrice;
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            inventory.splice(inventory.indexOf(item), 1);
        }
        updatePlayerStats(playerStats);
        debugLog("After Purchase - Merchant Name:", currentMerchantName);
        debugLog("After Purchase - Merchant Stock:", currentMerchantStock);
        showSellMenu(shopName, shopType);
        displayNotification(`You sold ${itemName} for ${sellPrice} coins.`);
    } else {
        displayNotification('Item not found in inventory.');
    }
}

function buyItem(itemName, itemPrice, shopName, shopType) {
    itemName = itemName.replace(/\\'/g, "'");
    const item = items.find(item => item.name === itemName) || equipment.find(equip => equip.name === itemName);
    if (item && playerStats.coins >= itemPrice) {
        playerStats.coins -= itemPrice;
        addItemToInventory(item);
        updatePlayerStats(playerStats);
        displayNotification(`You bought ${item.name}!`);
        showShopInventory(shopName, shopType); // Refresh the shop inventory
    } else {
        displayNotification(`You don't have enough coins to buy ${item.name}.`);
    }
}

function visitBlacksmith() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Blacksmith</h2>
        <p>Welcome to the blacksmith. Upgrade your equipment here.</p>
        <button onclick="confirmAugmentWeapon()">Augment Weapon</button>
        <button onclick="confirmAugmentArmor()">Augment Armor</button>
        <button onclick="showTownMenu()">Back</button>
    `;
}

function confirmAugmentWeapon() {
    const weapon = GameState.equippedItems.weapon;
    if (!weapon) {
        displayNotification("No weapon equipped.");
        return;
    }

    const cost = weapon.tier * 100;
    if (weapon.name.includes('*')) {
        displayNotification(`${weapon.name} is already augmented.`);
        return;
    }

    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Confirm Augmentation</h2>
        <p>Are you sure you want to augment your ${weapon.name} for ${cost} coins?</p>
        <button onclick="augmentWeapon()">Yes</button>
        <button onclick="visitBlacksmith()">No</button>
    `;
}

function confirmAugmentArmor() {
    const armor = GameState.equippedItems.armor;
    if (!armor) {
        displayNotification("No armor equipped.");
        return;
    }

    const cost = armor.tier * 100;
    if (armor.name.includes('*')) {
        displayNotification(`${armor.name} is already augmented.`);
        return;
    }

    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Confirm Augmentation</h2>
        <p>Are you sure you want to augment your ${armor.name} for ${cost} coins?</p>
        <button onclick="augmentArmor()">Yes</button>
        <button onclick="visitBlacksmith()">No</button>
    `;
}

function augmentWeapon() {
    const contentWindow = document.getElementById('content-window');
    const weapon = GameState.equippedItems.weapon;
    if (!weapon) {
        displayNotification("No weapon equipped.");
        return;
    }

    const cost = weapon.tier * 100;
    if (weapon.name.includes('*')) {
        displayNotification(`${weapon.name} is already augmented.`);
    } else if (playerStats.coins >= cost) {
        playerStats.coins -= cost;
        if (augmentEquipment(weapon)) {
            displayNotification(`${weapon.name} has been augmented!`);
            updatePlayerStats(playerStats);
            refreshInventoryScreen();
            refreshEquipmentScreen();
        }
    } else {
        displayNotification(`You need ${cost} coins to augment this weapon.`);
    }

    visitBlacksmith(); // Return to the Blacksmith menu
}

function augmentArmor() {
    const contentWindow = document.getElementById('content-window');
    const armor = GameState.equippedItems.armor;
    if (!armor) {
        displayNotification("No armor equipped.");
        return;
    }

    const cost = armor.tier * 100;
    if (armor.name.includes('*')) {
        displayNotification(`${armor.name} is already augmented.`);
    } else if (playerStats.coins >= cost) {
        playerStats.coins -= cost;
        if (augmentEquipment(armor)) {
            displayNotification(`${armor.name} has been augmented!`);
            updatePlayerStats(playerStats);
            refreshInventoryScreen();
            refreshEquipmentScreen();
        }
    } else {
        displayNotification(`You need ${cost} coins to augment this armor.`);
    }

    visitBlacksmith(); // Return to the Blacksmith menu
}

function refreshAllShops() {
    debugLog("Refreshing all shops' inventories.");
    scenesArray.forEach(row => {
        row.forEach(scene => {
            if (scene && scene.type === 'town') {
                scene.locations.forEach(location => {
                    if (location.visit) {
                        // Assuming each location visit function handles the shop inventory reset
                        location.visit(scene.source);
                    }
                });
            }
        });
    });
}