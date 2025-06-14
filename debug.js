    /*
    {
        name: "Debug: Found All Items",
        description: "You find a hidden cache containing one of every item.",
        effect: "receive all items",
        weight: 1,
        action: function() {
            items.forEach(item => {
                addItemToInventory({ ...item, quantity: 1 });
            });
            equipment.forEach(item => {
                addItemToInventory({ ...item, quantity: 1 });
            });
            displayEventEffect(this.name, this.description, `You found one of every item and equipment.`);
        }
    }
    */