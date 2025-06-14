// Save Game Function
function saveGame() {
    const saveData = {
        playerStats: playerStats,
        playerPosition: playerPosition,
        mapData: map,
        scenesArray: scenesArray,
        inventory: inventory,
        equippedItems: equippedItems,
        currentScene: currentScene,
        eventInProgress: eventInProgress,
        lastEventTriggered: lastEventTriggered,
        currentDungeon: currentDungeon,  // Save current dungeon ID
        currentDungeonMap: currentDungeonMap, // Save current dungeon map
        dungeonScenesArray: dungeonScenesArray, // Save dungeon scenes
        dungeons: dungeons, // Save the entire dungeons object
        dungeonPlayerPosition: { x: playerPosition.x, y: playerPosition.y }  // Save player's position in the dungeon
    };

    localStorage.setItem('saveData1', JSON.stringify(saveData));
    displayNotification("Game saved successfully!");
}

// Load Game Function
function loadGame() {
    const savedData = localStorage.getItem('saveData1');

    if (savedData) {
        const {
            playerStats: loadedPlayerStats,
            mapData,
            playerPosition: loadedPlayerPosition,
            scenesArray: loadedScenesArray,
            inventory: loadedInventory,
            equippedItems: loadedEquippedItems,
            currentScene: loadedCurrentScene,
            eventInProgress: loadedEventInProgress,
            lastEventTriggered: loadedLastEventTriggered,
            currentDungeon: loadedCurrentDungeon,   // Load current dungeon ID
            currentDungeonMap: loadedDungeonMap,    // Load current dungeon map
            dungeonScenesArray: loadedDungeonScenesArray, // Load dungeon scenes
            dungeons: loadedDungeons,  // Load the entire dungeons object
            dungeonPlayerPosition: loadedDungeonPlayerPosition // Load player's position in the dungeon
        } = JSON.parse(savedData);

        // Assign loaded data to game variables
        playerStats = loadedPlayerStats;
        map = mapData;
        const previousX = playerPosition.x;
        const previousY = playerPosition.y;
        playerPosition = loadedPlayerPosition;
        scenesArray = loadedScenesArray;
        inventory = loadedInventory;
        equippedItems = loadedEquippedItems || { weapon: null, armor: null };
        currentScene = loadedCurrentScene;
        eventInProgress = loadedEventInProgress;
        lastEventTriggered = loadedLastEventTriggered;
        currentDungeon = loadedCurrentDungeon;  // Restore dungeon state
        currentDungeonMap = loadedDungeonMap;   // Restore dungeon map
        dungeonScenesArray = loadedDungeonScenesArray;  // Restore dungeon scenes
        dungeons = loadedDungeons; // Restore the dungeons object

        // If the player was in a dungeon, restore their position inside the dungeon
        if (currentDungeon && loadedDungeonPlayerPosition) {
            clearPlayerMarkers(currentDungeonMap, previousX, previousY);  // Clear previous player marker
            playerPosition.x = loadedDungeonPlayerPosition.x;
            playerPosition.y = loadedDungeonPlayerPosition.y;
            // Do not directly set 'P' on the map array here
        } else if (currentDungeon) {
            console.error(`Failed to load player's position in the dungeon.`);
        }

        initializePlayerSkills();
        reassignTownLocationFunctions();
        checkForTent();
        updatePlayerStats();
        refreshEquipmentScreen();

        // Ensure that the player's position is reflected correctly
        if (currentDungeon) {
            displayDungeon();
            displayDungeonScene();
        } else {
            displayCurrentScene();  // This should now handle the correct placement of 'P'
        }
        updateMovementButtons();
        isCharacterCreated = true;

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
            controlWindow.style.pointerEvents = 'auto'; // Enable interactions with control window
            const controlButtons = controlWindow.querySelectorAll('.control-button');
            controlButtons.forEach(button => {
                button.style.pointerEvents = 'auto';
            });
        }

        displayNotification("Game loaded successfully!");
        isLoadingGame = false;
    } else {
        displayNotification("No saved game found.");
        showStartScreen();
    }
}

// Confirm Save/Load
function confirmSaveGame() {
    previousScreen = currentScene;
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Save Game</h2>
        <p>Do you want to save your game? This will overwrite any existing save data.</p>
        <button onclick="saveGame()">Yes</button>
        <button onclick="showPreviousScreen()">No</button>
    `;
}

function confirmLoadGame() {
    previousScreen = currentScene;
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Load Game</h2>
        <p>Do you want to load the saved game? Any unsaved progress will be lost.</p>
        <button onclick="loadGame()">Yes</button>
        <button onclick="showPreviousScreen()">No</button>
    `;
}

function clearPlayerMarkers(map, previousX, previousY) {
    // Only clear the previous player position if it exists within the map bounds
    if (previousX >= 0 && previousX < DUNGEON_SIZE && previousY >= 0 && previousY < DUNGEON_SIZE) {
        if (map[previousY][previousX] === 'P') {
            map[previousY][previousX] = '.'; // Reset to a normal tile or whatever the default tile is
        }
    }
}
