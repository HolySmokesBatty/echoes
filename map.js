const MAP_SIZE = 30;
let map = [];
let scenesArray = [];
let playerPosition = { x: 0, y: 0 };

const directions = [
    { name: 'N', dx: 0, dy: -1 },
    { name: 'S', dx: 0, dy: 1 },
    { name: 'W', dx: -1, dy: 0 },
    { name: 'E', dx: 1, dy: 0 }
];

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
}

function generateMap() {
    const maxTowns = 20;
    const maxDungeons = getRandomInt(5, 10);
    let townCount = 0;
    let dungeonCount = 0;
  
    // Initialize the map and scenesArray
    for (let y = 0; y < MAP_SIZE; y++) {
      map[y] = [];
      scenesArray[y] = [];
      for (let x = 0; x < MAP_SIZE; x++) {
        map[y][x] = '#';
        scenesArray[y][x] = null;
      }
    }
  
    // Generate random starting position and mark it
    playerPosition = getRandomStartPosition();
    map[playerPosition.y][playerPosition.x] = 'P';
  
    // Carve passages and create rooms
    carvePassagesFrom(playerPosition.x, playerPosition.y);
    createRooms();
  
    // Distribute towns evenly and fill remaining scenes
    distributeTowns(maxTowns);
    distributeDungeons(maxDungeons);
    fillScenes();
  
    // Ensure player marker is always placed after map generation
    map[playerPosition.y][playerPosition.x] = 'P';
    
    // Display the map and update movement buttons
    displayMap();
    updateMovementButtons();
  }  

function carvePassagesFrom(cx, cy) {
    const directions = shuffleArray([
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ]);

    for (let dir of directions) {
        const nx = cx + dir.dx * 2;
        const ny = cy + dir.dy * 2;

        if (ny >= 0 && ny < MAP_SIZE && nx >= 0 && nx < MAP_SIZE && map[ny][nx] === '#') {
            map[ny - dir.dy][nx - dir.dx] = '.';
            map[ny][nx] = '.';
            carvePassagesFrom(nx, ny);
        }
    }
}


function createRooms() {
    const roomCount = 12;
    const roomMinSize = 6;
    const roomMaxSize = 12;

    for (let i = 0; i < roomCount; i++) {
        let roomWidth = getRandomInt(roomMinSize, roomMaxSize);
        let roomHeight = getRandomInt(roomMinSize, roomMaxSize);
        let roomX = getRandomInt(1, MAP_SIZE - roomWidth - 1);
        let roomY = getRandomInt(1, MAP_SIZE - roomHeight - 1);

        for (let y = roomY; y < roomY + roomHeight; y++) {
            for (let x = roomX; x < roomX + roomWidth; x++) {
                map[y][x] = '.';
            }
        }
    }
}

function distributeTowns(maxTowns) {
    let townCount = 0;
    const quadrantSize = Math.floor(MAP_SIZE / Math.sqrt(maxTowns));

    for (let qy = 0; qy < Math.sqrt(maxTowns); qy++) {
        for (let qx = 0; qx < Math.sqrt(maxTowns); qx++) {
            if (townCount >= maxTowns) return;

            let placed = false;
            while (!placed) {
                const x = getRandomInt(qx * quadrantSize, (qx + 1) * quadrantSize - 1);
                const y = getRandomInt(qy * quadrantSize, (qy + 1) * quadrantSize - 1);

                if (map[y][x] === '.') {
                    const town = getRandomTown();
                    town.source = `town_${townCount}`;  // Assign a unique identifier to each town
                    scenesArray[y][x] = { ...town, type: 'town' };
                    map[y][x] = 'T';
                    townCount++;
                    placed = true;
                }
            }
        }
    }
}

function distributeDungeons(maxDungeons) {
    let dungeonCount = 0;
    while (dungeonCount < maxDungeons) {
        const x = getRandomInt(1, MAP_SIZE - 2);
        const y = getRandomInt(1, MAP_SIZE - 2);
        if (map[y][x] === '.') {
            const dungeonSeed = Date.now().toString() + getRandom().toString();
            const dungeonId = generateDungeon(dungeonSeed);  // Pass the unique seed

            const dungeon = dungeons[dungeonId]; // Retrieve the dungeon object using the ID
            scenesArray[y][x] = { ...dungeon, type: 'dungeon', source: dungeonId }; // Assign the correct scene object
            map[y][x] = 'D';
            dungeonCount++;
            console.log(`Dungeon generated at (${x}, ${y}) with ID: ${dungeonId} and Seed: ${dungeonSeed}`);
        }
    }
}

function fillScenes() {
    for (let y = 0; y < MAP_SIZE; y++) {
        for (let x = 0; x < MAP_SIZE; x++) {
            if (map[y][x] === '.' || map[y][x] === 'T' || map[y][x] === 'D') {
                if (map[y][x] === 'D' && scenesArray[y][x] && scenesArray[y][x].type === 'dungeon') {
                    continue;
                }

                if (map[y][x] === 'T') {
                    scenesArray[y][x] = { ...getRandomTown(), type: 'town' };
                } else {
                    scenesArray[y][x] = selectSceneBasedOnTerrain(x, y, map, scenesArray);
                }
            }
        }
    }
}


function getRandomStartPosition() {
    return {
        x: getRandomInt(1, MAP_SIZE - 2),
        y: getRandomInt(1, MAP_SIZE - 2)
    };
}

function getMapContent() {
    let mapHtml = '<div id="map-container">';
    const viewRadius = 5; // 5 tiles in each direction, making it 11x11 total
    let startX, endX, startY, endY;

    // Calculate the view boundaries
    if (playerPosition.x < viewRadius) {
        startX = 0;
        endX = Math.min(MAP_SIZE - 1, 2 * viewRadius);
    } else if (playerPosition.x > MAP_SIZE - viewRadius - 1) {
        endX = MAP_SIZE - 1;
        startX = Math.max(0, MAP_SIZE - 1 - 2 * viewRadius);
    } else {
        startX = playerPosition.x - viewRadius;
        endX = playerPosition.x + viewRadius;
    }

    if (playerPosition.y < viewRadius) {
        startY = 0;
        endY = Math.min(MAP_SIZE - 1, 2 * viewRadius);
    } else if (playerPosition.y > MAP_SIZE - viewRadius - 1) {
        endY = MAP_SIZE - 1;
        startY = Math.max(0, MAP_SIZE - 1 - 2 * viewRadius);
    } else {
        startY = playerPosition.y - viewRadius;
        endY = playerPosition.y + viewRadius;
    }

    for (let y = startY; y <= endY; y++) {
        mapHtml += '<div class="map-row">';
        for (let x = startX; x <= endX; x++) {
            let tileClass = 'map-tile wall';
            if (map[y][x] === 'P') {
                const terrain = scenesArray[y][x] ? scenesArray[y][x].terrain : 'floor';
                tileClass = `map-tile player ${terrain}`;
            } else if (map[y][x] === '.') {
                const terrain = scenesArray[y][x] ? scenesArray[y][x].terrain : 'floor';
                tileClass = `map-tile ${terrain}`;
            } else if (map[y][x] === 'T') {
                tileClass = 'map-tile town';
            } else if (map[y][x] === 'D') {
                tileClass = 'map-tile dungeon';
            }
            mapHtml += `<div class="${tileClass}" data-x="${x}" data-y="${y}"></div>`;
        }
        mapHtml += '</div>';
    }
    mapHtml += '</div>';
    mapHtml += `<div id="step-counter">Steps: ${playerStats.steps}</div>`;
    return mapHtml;
}

function displayMap() {
    const contentWindow = document.getElementById('content-window');
    if (!contentWindow) {
        return;
    }
    contentWindow.innerHTML = getMapContent(); // Use getMapContent to fill the map
}

function getTerrainColor(terrain) {
    switch (terrain) {
        case 'forest':
            return '#228B22';
        case 'field':
            return '#7CFC00';
        case 'water':
            return '#1E90FF';
        case 'path':
            return '#D2B48C';
        case 'mountain':
            return '#A9A9A9';
        case 'ruins':
            return '#8B4513';
        case 'cave':
            return '#4B0082';  // Example color for cave
        case 'ruin':
            return '#2F4F4F';  // Example color for ruin
        case 'floor':
        default:
            return '#ddd';
    }
}

function movePlayer(direction) {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    resetControlButtons();

    switch (direction) {
        case 'N': newY -= 1; break;
        case 'S': newY += 1; break;
        case 'W': newX -= 1; break;
        case 'E': newX += 1; break;
    }

    if (currentDungeon) {
        movePlayerInDungeon(newX, newY);
    } else {
        movePlayerInOverworld(newX, newY);
    }
}

function movePlayerInOverworld(newX, newY) {
    if (newX >= 0 && newX < MAP_SIZE && newY >= 0 && newY < MAP_SIZE) {
        if (map[newY][newX] === '.' || map[newY][newX] === 'T' || map[newY][newX] === 'D') {
            if (map[playerPosition.y][playerPosition.x] === 'P') {
                if (scenesArray[playerPosition.y][playerPosition.x] && scenesArray[playerPosition.y][playerPosition.x].type === 'town') {
                    map[playerPosition.y][playerPosition.x] = 'T';
                } else if (scenesArray[playerPosition.y][playerPosition.x] && scenesArray[playerPosition.y][playerPosition.x].type === 'dungeon') {
                    map[playerPosition.y][playerPosition.x] = 'D';
                } else {
                    map[playerPosition.y][playerPosition.x] = '.';
                }
            }

            playerPosition.x = newX;
            playerPosition.y = newY;
            map[playerPosition.y][playerPosition.x] = 'P';

            // Increment the step counter
            playerStats.steps += 1;
            updatePlayerStats();

            // Check if steps reach 100, then refresh shops
            if (playerStats.steps % 20 === 0) {
                refreshAllShops();
            }

            displayMap(); // Ensure the map is updated after moving
            displayScene(newX, newY);
            updateMovementButtons();
        }
    }
}

function movePlayerInDungeon(newX, newY) {
    if (newX >= 0 && newX < DUNGEON_SIZE && newY >= 0 && newY < DUNGEON_SIZE) {
        const targetTile = currentDungeonMap[newY][newX];

        if (targetTile === '.' || targetTile === 'E') {
            if (currentDungeonMap[playerPosition.y][playerPosition.x] === 'P') {
                currentDungeonMap[playerPosition.y][playerPosition.x] = (playerPosition.x === dungeons[currentDungeon].entranceX && playerPosition.y === dungeons[currentDungeon].entranceY) ? 'E' : '.';
            }

            playerPosition.x = newX;
            playerPosition.y = newY;
            currentDungeonMap[playerPosition.y][playerPosition.x] = 'P';

            // Increment the step counter
            playerStats.steps += 1;
            updatePlayerStats();

            if (targetTile === 'E') {
                console.log("Player has reached the dungeon entrance/exit");
                promptDungeonExit();
                updateMovementButtons();
            } else {
                displayDungeonScene(); // Display the scene after moving

                // Trigger a dungeon event
                triggerDungeonEvent();

                updateMovementButtons();
            }
        }
    }
}

function getDungeonMapContent() {
    let dungeonHtml = '<div id="map-container">';
    const dungeon = dungeons[currentDungeon]; // Access the current dungeon object
    if (!dungeon) {
        console.error(`Current dungeon (${currentDungeon}) not found.`);
        return;
    }

    for (let y = 0; y < DUNGEON_SIZE; y++) {
        dungeonHtml += '<div class="map-row">';
        for (let x = 0; x < DUNGEON_SIZE; x++) {
            let tileClass = 'map-tile wall';
            if (dungeon.map[y][x] === '.') {
                const scene = dungeon.scenesArray[y][x];
                const terrain = scene ? scene.terrain : 'floor'; // Get the terrain from the scene
                tileClass = `map-tile ${terrain}`;
            } else if (dungeon.map[y][x] === 'E') {
                tileClass = 'map-tile entrance';
            } else if (dungeon.map[y][x] === 'P') {
                tileClass = 'map-tile player';
            }
            dungeonHtml += `<div class="${tileClass}" data-x="${x}" data-y="${y}"></div>`;
        }
        dungeonHtml += '</div>';
    }
    dungeonHtml += '</div>';
    dungeonHtml += `<div id="step-counter">Steps: ${playerStats.steps}</div>`;
    return dungeonHtml;
}

function displayDungeon() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = getDungeonMapContent();
}

function promptDungeonEntry(dungeonId) {
    console.log(`Prompting dungeon entry for dungeon ID: ${dungeonId}`);
    const dungeon = dungeons[dungeonId];
    if (!dungeon) {
        console.error("Dungeon not found:", dungeonId);
        return;
    }
    const entranceScene = dungeon.entrance; // Use the entrance scene
    if (!entranceScene) {
        console.error("Entrance scene is undefined for dungeon ID:", dungeonId);
        return;
    }

    console.log("Entrance Scene:", entranceScene);

    const contentWindow = document.getElementById('content-window');
    if (!contentWindow) {
        console.error("Content window not found");
        return;
    }

    contentWindow.innerHTML = `
        <h2>${entranceScene.name}</h2>
        <p>${entranceScene.description}</p>
        <button onclick="enterDungeon('${dungeonId}')">Enter Dungeon</button>
        <button onclick="declineDungeonEntry()">Stay Outside</button>
    `;

    console.log("Dungeon entry prompt displayed successfully");
}

function declineDungeonEntry() {
    displayMap();
    updateMovementButtons();
    resetControlButtons();
}

function displayScene(x, y) {
    const contentWindow = document.getElementById('content-window');
    const storedScene = scenesArray[y][x];
    console.log("Current Scene:", storedScene);  // Properly log the current scene
    const terrain = storedScene ? storedScene.terrain : 'floor';
    const isEvent = getRandom() < 0.3;

    // Handle town scenes
    if (storedScene && storedScene.type === 'town') {
        currentScene = storedScene;
        contentWindow.innerHTML = `
            <h2>${storedScene.name}</h2>
            <p>${storedScene.description}</p>
            <div class="town-menu">
                ${storedScene.locations.map(location => `<button onclick="visitLocation('${location.name}')">${location.name}</button>`).join('')}
            </div>
        `;
    } 
    // Handle dungeon scenes
    else if (storedScene && storedScene.type === 'dungeon') {
        currentScene = storedScene;
        promptDungeonEntry(storedScene.source); // Correctly pass the dungeon ID or source
    } 
    // Handle random events
    else if (isEvent && lastEventTriggered !== 'event') {
        let event;

        // Check if the player is in a dungeon
        if (currentDungeon) {
            event = getRandomEventFromDungeon(terrain);
        } else {
            event = getRandomEvent(terrain);
        }

        if (!event) {
            return;
        }

        currentScene = { ...event, type: 'event' };
        contentWindow.innerHTML = `
            <h2>${event.name}</h2>
            <p>${event.description}</p>
        `;
        applyEvent(event);
        lastEventTriggered = 'event';
        console.log("Displaying event:", event);
    } 
    // Handle stored scenes (non-dungeon, non-town)
    else if (storedScene) {
        currentScene = storedScene;
        contentWindow.innerHTML = `
            <h2>${storedScene.name}</h2>
            <p>${storedScene.description}</p>
        `;
        lastEventTriggered = 'scene';
    } 
    // Handle random scenes (no prior scene stored)
    else {
        const randomScene = getRandomScene();
        if (!randomScene) {
            return;
        }
        scenesArray[y][x] = randomScene;
        currentScene = randomScene;
        contentWindow.innerHTML = `
            <h2>${randomScene.name}</h2>
            <p>${randomScene.description}</p>
        `;
        lastEventTriggered = 'scene';
        console.log("Displaying random scene:", randomScene);
    }
}

function visitLocation(locationName) {
    const contentWindow = document.getElementById('content-window');
    const scene = scenesArray[playerPosition.y][playerPosition.x];
    const location = scene.locations.find(loc => loc.name === locationName);

    contentWindow.innerHTML = `
        <h2>${location.name}</h2>
        <p>${location.description}</p>
    `;

    // Call the visit function for the location if it exists
    if (location.visit) {
        location.visit(scene.source);  // Pass the unique town identifier to the visit function
    } else {
    }
}

function showTownMenu() {
    const contentWindow = document.getElementById('content-window');
    const currentScene = scenesArray[playerPosition.y][playerPosition.x];
    if (currentScene && currentScene.type === 'town') {
        contentWindow.innerHTML = `
            <h2>${currentScene.name}</h2>
            <p>${currentScene.description}</p>
            <div class="town-menu">
                ${currentScene.locations.map(location => `<button onclick="visitLocation('${location.name}')">${location.name}</button>`).join('')}
            </div>
        `;
    } else {
        showScreen('default');
    }
}

function updateMovementButtons() {
    const directions = [
        { name: 'N', dx: 0, dy: -1 },
        { name: 'S', dx: 0, dy: 1 },
        { name: 'E', dx: 1, dy: 0 },
        { name: 'W', dx: -1, dy: 0 }
    ];

    directions.forEach(dir => {
        const button = document.querySelector(`.control-button[data-dir="${dir.name}"]`);
        if (button) {
            let newX = playerPosition.x + dir.dx;
            let newY = playerPosition.y + dir.dy;
            let isWalkable = false;

            if (currentDungeon) {
                // In a dungeon, check the dungeon map
                if (newX >= 0 && newX < DUNGEON_SIZE && newY >= 0 && newY < DUNGEON_SIZE) {
                    const targetTile = currentDungeonMap[newY][newX];
                    isWalkable = (targetTile === '.' || targetTile === 'E');
                }
            } else {
                // In the overworld, check the overworld map
                if (newX >= 0 && newX < MAP_SIZE && newY >= 0 && newY < MAP_SIZE) {
                    const targetTile = map[newY][newX];
                    isWalkable = (targetTile === '.' || targetTile === 'T' || targetTile === 'D');
                }
            }

            // Enable or disable the button based on walkability
            if (isWalkable) {
                button.disabled = false;
                button.classList.remove('disabled');
            } else {
                button.disabled = true;
                button.classList.add('disabled');
            }
        }
    });
}

function movePlayerHandler(event) {
    const direction = event.target.getAttribute('data-dir');
    if (direction) {
        movePlayer(direction);
    }
}
