let currentMerchantName = '';  // Track the current merchant name
let currentMerchantStock = []; // Track the current merchant stock

function displayMerchantEncounter() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>${currentMerchantName}</h2>
        <p>You encounter a traveling merchant. He offers to trade goods with you.</p>
        <button onclick="displayMerchantOptions()">What do you have for sale?</button>
        <button onclick="displayMerchantSellScreen()">I want to sell some items.</button>
    `;
}

function displayMerchantOptions() {
    displayMerchantStock(currentMerchantStock);
}

function displayMerchantStock(items) {
    const contentWindow = document.getElementById('content-window');
    let merchantHtml = `<h2>${currentMerchantName}</h2><div class="shop-inventory"><ul>`;

    items.forEach(item => {
        let description = item.description;
        if (description.includes('-')) {
            const parts = description.split('-');
            description = `${parts[0].trim()}<br>${parts[1].trim()}`;
        }

        merchantHtml += `
            <li>
                <strong>${item.name}</strong> - ${item.value} coins<br>
                ${description}<br>
                <button onclick="merchantPurchaseItem('${escapeItemName(item.name)}', ${item.value})">Buy</button>
            </li>
        `;
    });

    merchantHtml += '</ul></div><button onclick="displayMerchantEncounter()">Back</button>';
    contentWindow.innerHTML = merchantHtml;
}

function merchantPurchaseItem(itemName, itemValue) {
    itemName = itemName.replace(/\\'/g, "'");
    if (playerStats.coins >= itemValue) {
        const item = items.find(i => i.name === itemName) || equipment.find(e => e.name === itemName);
        if (item) {
            playerStats.coins -= itemValue;
            addItemToInventory(item);
            updatePlayerStats(playerStats);
            displayNotification(`You bought ${itemName} for ${itemValue} coins.`);
            displayMerchantOptions(); // Refresh the merchant options
        }
    } else {
        displayNotification('You do not have enough coins to buy this item.');
    }
}

function displayMerchantSellScreen() {
    const contentWindow = document.getElementById('content-window');
    let inventoryHtml = `<h2>${currentMerchantName} - Sell Items</h2><div class="shop-inventory"><ul>`;
    
    if (inventory.length === 0) {
        inventoryHtml += '<li>No items available</li>';
    } else {
        inventoryHtml += inventory.map(item => {
            const sellPrice = Math.floor(item.value / 2);

            let description = item.description;
            if (description.includes('-')) {
                const parts = description.split('-');
                description = `${parts[0].trim()}<br>${parts[1].trim()}`;
            }

            return `
                <li>
                    <strong>${item.name}</strong> (x${item.quantity})<br>
                    ${description}<br>
                    Sell Price: ${sellPrice} coins<br>
                    <button onclick="merchantSellItem('${escapeItemName(item.name)}', ${sellPrice})">Sell</button>
                </li>
            `;
        }).join('');
    }

    inventoryHtml += '</ul></div><button onclick="displayMerchantEncounter()">Back</button>';
    contentWindow.innerHTML = inventoryHtml;
}

function merchantSellItem(itemName, sellPrice) {
    itemName = itemName.replace(/\\'/g, "'");
    console.log("Selling Item:", itemName, "for", sellPrice, "coins");
    const item = inventory.find(i => i.name === itemName);
    if (item) {
        playerStats.coins += sellPrice;
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            inventory.splice(inventory.indexOf(item), 1);
        }
        updatePlayerStats(playerStats);
        displayMerchantSellScreen();
        displayNotification(`You sold ${itemName} for ${sellPrice} coins.`);
    } else {
        displayNotification('Item not found in inventory.');
    }
}

function returnToMerchant() {
    displayMerchantEncounter();
}

// New function to generate merchant inventory based on tiers
function generateMerchantInventory() {
    const filters = {
        types: ["Usable", "Equipment"],
        exclude: [],
        tier: getTiersByPlayerLevel(playerStats.level)
    };
    const itemCount = 10; // Adjust based on the desired inventory size

    currentMerchantStock = getShopInventory(filters, itemCount);
}
