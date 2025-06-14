let items = [];

(function(){
    let data = null;
    if (typeof ITEMS_DATA !== 'undefined') {
        data = ITEMS_DATA;
    } else if (typeof require === 'function') {
        try {
            const fs = require('fs');
            const path = require('path');
            data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/items.json'), 'utf8'));
        } catch (e) {}
    } else if (typeof XMLHttpRequest !== 'undefined') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/items.json', false);
        xhr.send(null);
        if (xhr.status === 200) data = JSON.parse(xhr.responseText);
    }
    items = data || [];
})();

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
    const randomIndex = Math.floor(getRandom() * tierItems.length);
    return tierItems[randomIndex];
}

function getRandomItemByType(type) {
    const typeItems = itemsByType[type] || [];
    if (typeItems.length === 0) return null;
    const randomIndex = Math.floor(getRandom() * typeItems.length);
    return typeItems[randomIndex];
}

function getRandomItemByTierAndType(tiers, excludeTypes = []) {
    const tierItems = items.filter(item => tiers.includes(item.tier) && !excludeTypes.some(type => item.types.includes(type)));
    if (!tierItems.length) return null;
    return tierItems[Math.floor(getRandom() * tierItems.length)];
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
            const tier = tiers[Math.floor(getRandom() * tiers.length)];
            item = getRandomItemByTier(tier);
        } else if (types.length > 0) {
            const type = types[Math.floor(getRandom() * types.length)];
            item = getRandomItemByType(type);
        }
        if (item && !item.types.includes("Currency")) {
            items.push(item);
        }
    }
    return items;
}

function getRandomCoin() {
    return coins[Math.floor(getRandom() * coins.length)];
}

