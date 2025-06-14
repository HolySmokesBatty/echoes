// Initialization and Setup
document.addEventListener('DOMContentLoaded', () => {
    showStartScreen();
    checkForTent();
    checkFirstVisit();
    checkSaveData(); // Check save data on DOM content loaded
});

// Adding event listener for WASD key presses with control-window visibility check
document.addEventListener('keydown', function(event) {
    const controlWindow = document.getElementById('control-window');
    
    // Check if the control window is visible
    if (controlWindow && controlWindow.style.visibility === 'visible') {
        switch(event.key) {
            case 'w':
            case 'W':
                movePlayer('N');
                break;
            case 'a':
            case 'A':
                movePlayer('W');
                break;
            case 's':
            case 'S':
                movePlayer('S');
                break;
            case 'd':
            case 'D':
                movePlayer('E');
                break;
        }
    }
});

window.addEventListener('resize', updatePlayerStats);
window.addEventListener('scroll', updatePlayerStats);
window.addEventListener('load', updatePlayerStats);

// Utility Functions
function displayNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // Adjust the time as needed
}

function calculateHealing(item, playerStats, type) {
    const baseHealing = item.baseHealing || 0; // Base healing amount
    const percentageHealing = (item.percentage || 0) * (type === "AP" ? playerStats.maxAP : playerStats.maxHP); // Percentage of max HP or AP
    const classBasedHealing = (playerStats.class === 'Mage' || playerStats.class === 'Cleric') ? 
                               0.1 * playerStats.ARC : 
                               0.1 * playerStats.STR; // Small percentage of relevant stat
    const totalHealing = Math.round(baseHealing + percentageHealing + classBasedHealing);

    console.log(`Calculating Healing for ${item.name}`);
    console.log(`Base Healing: ${baseHealing}`);
    console.log(`Percentage Healing: ${percentageHealing}`);
    console.log(`Class-Based Healing: ${classBasedHealing}`);
    console.log(`Total Healing: ${totalHealing}`);

    return totalHealing; // Ensure whole number values
}

// Initialization and Setup
let playerClass = "";
let playerStats = {};
let isCharacterCreated = false;
let eventInProgress = false;
let currentScene = null;
let previousScreen = null;
let lastEventTriggered = null;
let isLoadingGame = false;
let equippedItems = {
    weapon: null,
    armor: null
};

function checkFirstVisit() {
    if (!localStorage.getItem('hasVisited')) {
        showModal();
        localStorage.setItem('hasVisited', 'true');
    }
}

function showModal() {
    const modal = document.getElementById('welcome-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('welcome-modal');
    modal.style.display = 'none';
}

function toggleInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.style.display = 'none';
}

// Character Creation
function showStartScreen() {
    const contentWindow = document.getElementById('content-window');
    disableControlWindow();
    contentWindow.innerHTML = `
        <pre>
         *     *    *   .   *   .    *   
       *    *  .    .     *    *    .   *
    * .   *      *    .     .     *  . 
      * .      * .     *  .   *   .  
     *     *  *    .     . *   * .    
  .   *   .  *     *    *     .      * 
    .     .    * .    *  *   .  *    . 
  *  .   * .     .  .  *  .    *     * 
       /\\   .      /\\          /\\ 
       // \\   *    // \\    *   // \\ 
       //   \\      //   \\      //   \\ 
       //     \\ *  //     \\ .  //     \\ 
       //       \\  //       \\  //       \\ 
        </pre>
        <button onclick="showCharacterCreationScreen()">New Game</button>
        <button id="load-game-button" onclick="confirmLoadGame()">Load Game</button>
        <button onclick="showHowToPlay()">How to Play</button>
    `;
    document.querySelector('.info-window').style.visibility = 'hidden';
    document.querySelector('.info-window').style.opacity = '0';
    document.querySelector('.control-window').style.visibility = 'hidden';
    document.querySelector('.control-window').style.opacity = '0';

    checkSaveData(); // Check save data on showing start screen
}

function checkSaveData() {
    const loadGameButton = document.getElementById('load-game-button');
    const savedGame = localStorage.getItem('saveData1');

    if (!savedGame) {
        loadGameButton.disabled = true;
        loadGameButton.style.opacity = '0.5'; // Optional: visually indicate the button is disabled
    } else {
        loadGameButton.disabled = false;
        loadGameButton.style.opacity = '1'; // Optional: visually indicate the button is enabled
    }
}

function showCharacterCreationScreen() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h1>Character Creation</h1>
        <label for="character-name">Name:</label>
        <input type="text" id="character-name" name="character-name" oninput="checkCharacterCreation()"><br><br>
        <div>
            <label>Select a class:</label><br>
            <button onclick="updateClassDetails('Knight')">Knight</button>
            <button onclick="updateClassDetails('Rogue')">Rogue</button>
            <button onclick="updateClassDetails('Mage')">Mage</button>
            <button onclick="updateClassDetails('Cleric')">Cleric</button>
        </div><br>
        <button id="start-game-button" onclick="startGame()">Start Game</button>
        <button onclick="showStartScreen()">Back</button>
        <div id="class-details" style="margin-top: 10px;">
            <h3>Class Details</h3>
            <p>Select a class to see its details.</p>
        </div>
    `;
}

function updateClassDetails(selectedClass) {
    const classInfo = classes[selectedClass];

    if (classInfo) {
        document.getElementById('class-details').innerHTML = `
            <h3>${selectedClass}</h3>
            <p><strong>Description:</strong> ${classInfo.description || "No description available."}</p>
            <p><strong>Starting Stats:</strong></p>
            <ul style="list-style: none; padding: 0;">
                <li>HP: ${classInfo.HP.base}</li>
                <li>AP: ${classInfo.AP.base}</li>
                <li>STR: ${classInfo.STR.base}</li>
                <li>DEF: ${classInfo.DEF.base}</li>
                <li>ARC: ${classInfo.ARC.base}</li>
                <li>EVD: ${classInfo.EVD.base}</li>
                <li>LCK: ${classInfo.LCK.base}</li>
            </ul>
        `;
        playerClass = selectedClass; // Set the selected class
        checkCharacterCreation(); // Check if both name and class are selected
    } else {
        document.getElementById('class-details').innerHTML = `
            <h3>Class Details</h3>
            <p>Select a class to see its details.</p>
        `;
    }
}

function checkCharacterCreation() {
    const playerName = document.getElementById('character-name').value;
    const startGameButton = document.getElementById('start-game-button');
    startGameButton.disabled = !(playerName && playerClass);
}

function startGame() {
    const playerName = document.getElementById('character-name').value;
    if (!playerName) {
        displayNotification("Please make sure you have chosen a name and class.");
        return;
    }

    if (!playerClass) {
        displayNotification("Please select a class.");
        return;
    }

    isCharacterCreated = true;
    enableControlWindow();
    document.querySelector('.info-window').style.visibility = 'visible';
    document.querySelector('.info-window').style.opacity = '1';
    document.querySelector('.control-window').style.visibility = 'visible';
    document.querySelector('.control-window').style.opacity = '1';
    document.getElementById('player-name').innerText = `${playerName}`;
    document.getElementById('player-level').innerText = `Level: 1`;

    // Initialize player stats, inventory, and equipment
    initializePlayerStats(playerName, playerClass);
    inventory = []; // Clear the inventory
    equippedItems = []; // Clear the equipment inventory if it exists
    generateMap(); // Ensure map is generated here
    displayMap(); // Display map after generating
    updateMovementButtons();
    displayUnknownLocation(); // Display the initial "Unknown Location" scene
    checkForTent();
}

function disableControlWindow() {
    const controlWindow = document.getElementById('control-window');
    const controlButtons = controlWindow.querySelectorAll('.control-button');
    controlWindow.style.pointerEvents = 'none';
    controlWindow.style.opacity = '0.5';
    controlButtons.forEach(button => {
        button.style.pointerEvents = 'none';
    });
}

function initializePlayerStats(playerName, playerClass = null) {
    playerClass = playerClass || playerStats.class;
    if (!playerClass) {
        displayNotification("Please select a class");
        return;
    }

    const classStats = classes[playerClass];
    const playerSkills = skills[playerClass]; // Correctly fetch skills for the selected class

    playerStats = {
        name: playerName,
        level: 1,
        HP: classStats.HP.base,
        maxHP: classStats.HP.base,
        AP: classStats.AP.base,
        maxAP: classStats.AP.base,
        xp: 0,
        nextLevelXp: 50,
        coins: 0,
        STR: classStats.STR.base,
        DEF: classStats.DEF.base,
        ARC: classStats.ARC.base,
        EVD: classStats.EVD.base,
        LCK: classStats.LCK.base,
        class: playerClass,
        skills: playerSkills, // Assign skills to the player
        growth: classStats, // Include the growth arrays
        modifiers: {},
        activeQuests: [], // Initialize active quests
        steps: 0 // Initialize the step counter
    };
    updatePlayerStats();
}

// Gameplay Functions
function showHowToPlay() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h1>How to Play</h1>
        <p>Welcome to Echoes of The Darkwood! Here are some basic instructions to get you started:</p>
        <h2>Character Creation</h2>
        <p>Select your character's name and class to begin your adventure. Each class has unique strengths and abilities.</p>
        <ul>
            <li><strong>Knight:</strong> Strong in physical combat with high defense.</li>
            <li><strong>Rogue:</strong> Agile and quick, excels in critical hits and evasion.</li>
            <li><strong>Mage:</strong> Master of arcane arts, powerful spells but low defense.</li>
            <li><strong>Cleric:</strong> Healer with supportive abilities and decent combat skills.</li>
        </ul>
        <h2>Exploration</h2>
        <p>Navigate through the Darkwood using the directional buttons. You will encounter various events, enemies, and towns.</p>
        <h2>Combat</h2>
        <p>Engage enemies in turn-based combat. Use your skills and items strategically to defeat foes and earn experience points (XP).</p>
        <h2>Towns</h2>
        <p>Visit towns to rest, buy and sell items, and upgrade your equipment. Each town has different locations like Inns, Taverns, and Shops.</p>
        <h2>Glossary of Terms</h2>
        <p>Here are some key terms used in Echoes of The Darkwood:</p>
        <ul>
            <li><strong>HP (Health Points):</strong> The amount of health your character has. If it drops to 0, the game is over.</li>
            <li><strong>AP (Arcane Points):</strong> The amount of energy your character has to perform skills and spells.</li>
            <li><strong>XP (Experience Points):</strong> Earned by defeating enemies and completing events. Used to level up your character.</li>
            <li><strong>STR (Strength):</strong> Determines the physical damage your character can deal.</li>
            <li><strong>DEF (Defense):</strong> Determines the amount of physical damage your character can block.</li>
            <li><strong>ARC (Arcane):</strong> Determines the effectiveness of your character's spells and skills.</li>
            <li><strong>EVD (Evasion):</strong> Determines your character's ability to dodge attacks.</li>
            <li><strong>LCK (Luck):</strong> Influences critical hits, item finds, and the ability to escape encounters.</li>
            <li><strong>Coins:</strong> The currency used in the game to purchase items and services in towns.</li>
        </ul>
        <button onclick="showStartScreen()">Back</button>
    `;
}

function displayUnknownLocation() {
    currentScene = null;
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>You're Finally Awake</h2>
        <p>You awaken in a strange and unfamiliar clearing deep in a dark forest.</p>
    `;
    lastEventTriggered = 'scene'; // Mark as a scene to avoid triggering events immediately
}

function displayCurrentScene() {
    const contentWindow = document.getElementById('content-window');
    const { x, y } = playerPosition;
    const scene = scenesArray[y][x];

    if (scene) {
        currentScene = scene;
        contentWindow.innerHTML = `
            <h2>${scene.name}</h2>
            <p>${scene.description}</p>
            ${scene.type === 'town' ? scene.locations.map(location => `<button onclick="visitLocation('${location.name}')">${location.name}</button>`).join('') : ''}
        `;
        lastEventTriggered = 'scene';
        if (scene.type === 'town') {
            reassignTownLocationFunctions(); // Ensure town functions are restored
        }
    } else if (!isCharacterCreated) {
        contentWindow.innerHTML = `
            <h2>Unknown Location</h2>
            <p>You find yourself in an uncharted area.</p>
        `;
        lastEventTriggered = 'scene';
    } else {
        const randomScene = getRandomScene();
        scenesArray[y][x] = randomScene;
        currentScene = randomScene;
        contentWindow.innerHTML = `
            <h2>${randomScene.name}</h2>
            <p>${randomScene.description}</p>
        `;
        lastEventTriggered = 'scene';
    }

    if (!isLoadingGame && isCharacterCreated) {
        // Only trigger events if the game is not being loaded and character is created
        const isEvent = Math.random() < 0.3;
        if (isEvent && lastEventTriggered !== 'event') {
            const event = getRandomEvent();
            currentScene = { ...event, type: 'event' };
            contentWindow.innerHTML = `
                <h2>${event.name}</h2>
                <p>${event.description}</p>
            `;
            applyEvent(event);
            lastEventTriggered = 'event';
        }
    }
}

function showScreen(screen) {
    const contentWindow = document.getElementById('content-window');
    const controlButtons = document.querySelectorAll('.control-button');
    let content = '';

    // Reset control buttons before showing a new screen
    resetControlButtons();

    if (['statsSkills', 'map', 'inventory', 'quests'].includes(screen)) {
        previousScreen = currentScene;

        const button = [...controlButtons].find(btn => btn.getAttribute('onclick') === `showScreen('${screen}')`);
        if (button) {
            button.setAttribute('data-original-text', button.innerText);
            button.setAttribute('data-original-onclick', button.getAttribute('onclick'));
            button.innerText = 'BACK';
            button.setAttribute('onclick', "showPreviousScreen()");
        }
    }

    switch (screen) {
        case 'default':
            content = 'Welcome to Echoes of The Darkwood';
            if (Math.random() < 0.3) {
                const event = getRandomEvent();
                content = `
                    <h2>${event.name}</h2>
                    <p>${event.description}</p>
                `;
                applyEvent(event);
            } else if (Math.random() < 0.2) {
                const town = generateTown();
                content = `
                    <h2>Welcome to ${town.name}</h2>
                    <p>Explore the town to find shops, inns, and other locations.</p>
                    ${town.locations.map(location => `<button onclick="showLocation('${location.name}')">${location.name}</button>`).join('')}
                `;
            } else {
                currentScene = getRandomScene();
                content = `
                    <h2>${currentScene.name}</h2>
                    <p>${currentScene.description}</p>
                `;
            }
            break;
        case 'statsSkills':
            content = getStatsAndSkillsMenu();
            break;
        case 'map':
            if (currentDungeon) {
                content = getDungeonMapContent();
            } else {
                content = getMapContent();
            }
            break;
        case 'inventory':
            content = getInventoryContent();
            break;
        case 'quests':
            content = getQuestsContent();
            break;
        default:
            currentScene = getRandomScene();
            content = `
                <h2>${currentScene.name}</h2>
                <p>${currentScene.description}</p>
            `;
    }

    contentWindow.innerHTML = content;
}

function getStatsAndSkillsMenu() {
    return `
        <div class="stats-menu">
            <button onclick="showStats()">Stats</button>
            <button onclick="showEquipment()">Equipment</button>
            <button onclick="showSkills()">Skills</button>
        </div>
        <div id="stats-content"></div>
    `;
}

function showStats() {
    const statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = getStatsContent();
}

function showEquipment() {
    const statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = getEquipmentContent();
}

function showSkills() {
    const statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = getSkillsContent();
}

function getStatsContent() {
    const playerStats = getPlayerStats();
    const mods = playerStats.modifiers || {};
    return `
        <div class="left-justify">
            <h2>Stats</h2>
            <ul>
                <li>Class: ${playerClass}</li>
                <li>HP: ${playerStats.maxHP}</li>
                <li>AP: ${playerStats.maxAP}</li>
                <li>STR: ${playerStats.STR + (mods.STR || 0)}</li>
                <li>DEF: ${playerStats.DEF + (mods.DEF || 0)}</li>
                <li>ARC: ${playerStats.ARC + (mods.ARC || 0)}</li>
                <li>EVD: ${playerStats.EVD + (mods.EVD || 0)}</li>
                <li>LCK: ${playerStats.LCK + (mods.LCK || 0)}</li>
                <li>To Next Level: ${playerStats.nextLevelXp - playerStats.xp}</li>
            </ul>
        </div>
    `;
}

function getSkillsContent() {
    const playerStats = getPlayerStats();
    const playerSkills = playerStats.skills || [];
    const playerLevel = playerStats.level;

    let skillsHtml = `
        <div class="left-justify">
            <h2>Skills</h2>
            <ul>
    `;
    
    playerSkills.forEach(skill => {
        if (playerLevel >= skill.level) {
            skillsHtml += `
                <li>
                    <strong>${skill.name}</strong> (${skill.cost} AP):<br>
                    ${skill.description}
                </li>
            `;
        }
    });

    skillsHtml += '</ul></div>';
    return skillsHtml;
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

// Ensure playerStats.skills is initialized as an array
function initializePlayerSkills() {
    if (!playerStats.skills) {
        playerStats.skills = [];
    }
    const classSkills = skills[playerStats.class] || [];
    playerStats.skills = classSkills.filter(skill => skill.level <= playerStats.level);
}

function getQuestsContent() {
    if (!playerStats.activeQuests || playerStats.activeQuests.length === 0) {
        return `
            <div class="left-justify">
                <h2>Quests</h2>
                <p>No active quests.</p>
            </div>
        `;
    }

    let questsHtml = `
        <div class="left-justify">
            <h2>Active Quests</h2>
            <ul>
    `;
    playerStats.activeQuests.forEach(quest => {
        const isCompleted = quest.completed ? " (Completed)" : "";
        questsHtml += `
            <li>
                <strong>${quest.title}</strong>${isCompleted}<br>
                ${quest.description}<br>
                Reward: ${quest.coins} coins and ${quest.xp} XP<br>
            </li>
        `;
    });

    questsHtml += '</ul></div>';
    return questsHtml;
}

function getInventoryContent() {
    const sortedInventory = sortInventory(inventory);

    let inventoryHtml = '<div class="left-justify"><h2>Inventory</h2><ul>';
    if (sortedInventory.length === 0) {
        inventoryHtml += '<li>No items available</li>';
    } else {
        sortedInventory.forEach(item => {
            let actionButton = '';
            if (item.types.includes("Usable")) {
                actionButton = `<button onclick="useUsableItem('${escapeItemName(item.name)}')">Use</button>`;
            } else if (item.types.includes('Weapon') || item.types.includes('Armor')) {
                actionButton = `<button onclick="equipItem('${escapeItemName(item.name)}')">Equip</button>`;
            } else if (Array.isArray(item.effect) || (typeof item.effect === "string" && item.effect.startsWith("event:"))) {
                actionButton = `<button onclick="useEventItem('${escapeItemName(item.name)}')">Use</button>`;
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

function showPreviousScreen() {
    const contentWindow = document.getElementById('content-window');

    if (currentDungeon) {
        // If the player is in a dungeon, show the current dungeon scene
        displayDungeonScene();
        resetControlButtons();
        return;
    }

    // If not in a dungeon, revert to the previous screen
    if (previousScreen) {
        currentScene = previousScreen;
        previousScreen = null;

        if (currentScene && currentScene.type === 'town') {
            contentWindow.innerHTML = `
                <h2>${currentScene.name}</h2>
                <p>${currentScene.description}</p>
                <div class="town-menu">
                    ${currentScene.locations.map(location => `<button onclick="visitLocation('${location.name}')">${location.name}</button>`).join('')}
                </div>
            `;
        } else {
            contentWindow.innerHTML = `
                <h2>${currentScene.name}</h2>
                <p>${currentScene.description}</p>
            `;
        }
    } else {
        displayUnknownLocation();
    }

    resetControlButtons();
}

// Player Stats and Inventory
function updatePlayerStats() {
    document.getElementById('player-hp').innerText = `${playerStats.HP || 0}/${playerStats.maxHP || 0}`;
    document.getElementById('player-ap').innerText = `${playerStats.AP || 0}/${playerStats.maxAP || 0}`;
    document.getElementById('player-xp').innerText = `${playerStats.xp || 0}/${playerStats.nextLevelXp || 0}`;
    document.getElementById('player-coins').innerText = `${playerStats.coins || 0}`;
    document.getElementById('player-level').innerText = `${playerStats.level || 1}`;
    document.getElementById('player-name').innerText = `${playerStats.name || 'Unknown'}`;
}

function getPlayerStats() {
    return playerStats;
}

function addItemToInventory(item) {
    const existingItem = inventory.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        item.quantity = 1;
        inventory.push(item);
    }
    refreshInventoryScreen();
    checkForTent(); // Call this whenever inventory changes
}

function refreshInventoryScreen() {
    const contentWindow = document.getElementById('content-window');
    if (contentWindow) {
        contentWindow.innerHTML = getInventoryContent();
    }
}

function refreshEquipmentScreen() {
    const contentWindow = document.getElementById('content-window');
    if (contentWindow) {
        contentWindow.innerHTML = getEquipmentContent();
    }
}

function checkForTent() {
    const campButton = document.getElementById('camp-button');
    const hasTent = inventory.some(item => item.name === "Tent");
    
    if (hasTent) {
        campButton.disabled = false;
        campButton.classList.remove('disabled');
    } else {
        campButton.disabled = true;
        campButton.classList.add('disabled');
    }
}

function camp() {
    const tent = inventory.find(i => i.name === "Tent");
    if (!tent) {
        displayNotification("You don't have a tent!");
        return;
    }

    if (playerStats.HP === playerStats.maxHP && playerStats.AP === playerStats.maxAP) {
        displayNotification("You are already at full HP and AP.");
        return;
    }

    previousScreen = currentScene;
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Camp</h2>
        <p>Do you want to use a tent to fully restore your HP and AP?</p>
        <button onclick="confirmCamp()">Yes</button>
        <button onclick="cancelCamp()">No</button>
    `;
}

function confirmCamp() {
    const tent = inventory.find(i => i.name === "Tent");
    if (tent) {
        playerStats.HP = playerStats.maxHP;
        playerStats.AP = playerStats.maxAP;
        // Remove only one tent from the inventory
        const tentIndex = inventory.indexOf(tent);
        if (tentIndex > -1) {
            tent.quantity = (tent.quantity || 1) - 1;
            if (tent.quantity <= 0) {
                inventory.splice(tentIndex, 1);
            }
        }
        updatePlayerStats(playerStats);
        checkForTent(); // Update the camp button state
        displayNotification("You set up a tent and fully restored your HP and AP.");
        showPreviousScreen(); // Return to the previous screen after camping
    } else {
        displayNotification("You don't have a tent!");
    }
}

function cancelCamp() {
    showPreviousScreen();
}

// Event Handling
function triggerRandomEvent() {
    const event = getRandomEvent();
    applyEvent(event);
}

function handleBackButton() {
    if (!isCharacterCreated) {
        showStartScreen();
    } else if (!previousScreen) {
        displayUnknownLocation();
    } else {
        showPreviousScreen();
    }
}

function reassignTownLocationFunctions() {
    scenesArray.forEach(row => {
        row.forEach(scene => {
            if (scene && scene.type === 'town') {
                scene.locations.forEach(location => {
                    const matchingLocation = allLocations.find(loc => loc.name === location.name);
                    if (matchingLocation) {
                        location.visit = matchingLocation.visit;
                    }
                });
            }
        });
    });
}

function confirmQuitGame() {
    previousScreen = currentScene;
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Quit Game</h2>
        <p>Do you want to quit the game? Any unsaved progress will be lost.</p>
        <button onclick="showStartScreen()">Yes</button>
        <button onclick="showPreviousScreen()">No</button>
    `;
}

// Control Functions
function enableControlWindow() {
    const controlWindow = document.getElementById('control-window');
    const controlButtons = controlWindow.querySelectorAll('.control-button');
    controlWindow.style.pointerEvents = 'auto';
    controlWindow.style.opacity = '1';
    controlButtons.forEach(button => {
        button.style.pointerEvents = 'auto';
    });
}

function resetControlButtons() {
    const controlButtons = document.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        const originalText = button.getAttribute('data-original-text');
        const originalOnclick = button.getAttribute('data-original-onclick');
        if (originalText && originalOnclick) {
            button.innerText = originalText;
            button.setAttribute('onclick', originalOnclick);
            button.removeAttribute('data-original-text');
            button.removeAttribute('data-original-onclick');
        }
    });

    // Add a check here for the back button
    const backButton = [...controlButtons].find(button => button.innerText === 'BACK');
    if (backButton) {
        backButton.setAttribute('onclick', () => {
            if (!previousScreen) {
                displayUnknownLocation();
            } else {
                showPreviousScreen();
            }
        });
    }
}

function gameOver() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Game Over</h2>
        <p>Your adventure has come to an end.</p>
        <button onclick="restartGame()">Restart</button>
        <button onclick="confirmLoadGame()">Load</button>
        <button onclick="showStartScreen()">Main Menu</button>
    `;

    // Hide the control window
    const controlWindow = document.getElementById('control-window');
    if (controlWindow) {
        controlWindow.style.visibility = 'hidden';
        controlWindow.style.opacity = 0;
    }
}

function restartGame() {
    const playerName = playerStats.name; // Retain the player's name
    const playerClass = playerStats.class; // Retain the player's class

    // Reinitialize player stats with the retained name and class
    initializePlayerStats(playerName, playerClass);

    // Reset inventory and equipmentInventory by clearing their contents
    inventory.length = 0;
    equipmentInventory.length = 0;
    equippedItems.armor = null;
    equippedItems.weapon = null;

    // Clear current dungeon data
    currentDungeon = null;
    currentDungeonMap = null;
    dungeonScenesArray = null;

    // Reset map and player position
    map = [];
    scenesArray = [];
    playerPosition = { x: 0, y: 0 };

    // Regenerate the map and initialize the player position
    generateMap();

    // Display the starting scene
    displayUnknownLocation(showPreviousScreen);

    // Enable the control and info windows
    const infoWindow = document.querySelector('.info-window');
    const controlWindow = document.querySelector('.control-window');
    
    if (infoWindow) {
        infoWindow.style.visibility = 'visible';
        infoWindow.style.opacity = '1';
    }
    if (controlWindow) {
        controlWindow.style.visibility = 'visible';
        controlWindow.style.opacity = '1';
    }

    // Reset any other necessary game states
    isCharacterCreated = true;
    eventInProgress = false;
    lastEventTriggered = null;

    // Update UI elements
    updatePlayerStats();
    updateMovementButtons();
}


// Define the getRandomValue function
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updatePlayerSkills() {
    const classSkills = skills[playerStats.class] || [];
    playerStats.skills = classSkills.filter(skill => skill.level <= playerStats.level);
    console.log('Updated player skills:', playerStats.skills);
}

function levelUpPlayer() {
    playerStats.level += 1;

    if (Array.isArray(playerStats.growth.HP.growth)) {
        playerStats.maxHP += getRandomValue(playerStats.growth.HP.growth[0], playerStats.growth.HP.growth[1]);
    }
    if (Array.isArray(playerStats.growth.AP.growth)) {
        playerStats.maxAP += getRandomValue(playerStats.growth.AP.growth[0], playerStats.growth.AP.growth[1]);
    }
    if (Array.isArray(playerStats.growth.STR.growth)) {
        playerStats.STR += getRandomValue(playerStats.growth.STR.growth[0], playerStats.growth.STR.growth[1]);
    }
    if (Array.isArray(playerStats.growth.DEF.growth)) {
        playerStats.DEF += getRandomValue(playerStats.growth.DEF.growth[0], playerStats.growth.DEF.growth[1]);
    }
    if (Array.isArray(playerStats.growth.ARC.growth)) {
        playerStats.ARC += getRandomValue(playerStats.growth.ARC.growth[0], playerStats.growth.ARC.growth[1]);
    }
    if (Array.isArray(playerStats.growth.EVD.growth)) {
        playerStats.EVD += getRandomValue(playerStats.growth.EVD.growth[0], playerStats.growth.EVD.growth[1]);
    }
    if (Array.isArray(playerStats.growth.LCK.growth)) {
        playerStats.LCK += getRandomValue(playerStats.growth.LCK.growth[0], playerStats.growth.LCK.growth[1]);
    }
    playerStats.xp = (playerStats.xp-playerStats.nextLevelXp);
    playerStats.nextLevelXp = calculateNextLevelXp(playerStats.level);

    playerStats.HP = playerStats.maxHP; // Restore HP to max on level up
    playerStats.AP = playerStats.maxAP; // Restore AP to max on level up

    updatePlayerSkills(); // Update skills on level up
    updatePlayerStats(); // Ensure stats are updated in the UI

    console.log(`Player leveled up to level ${playerStats.level}`);
    displayNotification(`Congratulations! You've reached level ${playerStats.level}.`);
}

function calculateNextLevelXp(level) {
    const baseXp = 50; // You can adjust this value as needed
    return baseXp * (level * (level / 2));
}

