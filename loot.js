
function getRandomItemsByTypeAndTier(types, tiers, min, max) {
    const availableItems = items.filter(item => 
        tiers.includes(item.tier) && types.some(type => item.types.includes(type))
    );
    const itemCount = getRandomInt(min, max);
    return shuffleArray(availableItems).slice(0, itemCount);
}

function getRandomEquipmentByTier(tiers, min, max) {
    const availableEquipment = equipment.filter(equip => tiers.includes(equip.tier));
    const equipmentCount = getRandomInt(min, max);
    return shuffleArray(availableEquipment).slice(0, equipmentCount);
}

