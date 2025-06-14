const DUNGEON_SIZE = 10;
let dungeons = {};
let currentDungeon = null;
let currentDungeonMap = [];
let previousPlayerPosition = { x: 0, y: 0 };
let dungeonScenesArray = []; // New array to store scenes for each dungeon tile

const ruinsNames = [
    "Forgotten Temple",
    "Ancient Fortress",
    "Lost Citadel"
];

const cavernNames = [
    "Shadow Cavern",
    "Echoing Cave",
    "Gloomy Hollow"
];

const ruinsDescriptions = [
    "You see crumbling walls and ancient inscriptions.",
    "The air is thick with dust and the scent of decay.",
    "Faint whispers of the past echo around you."
];

const cavernDescriptions = [
    "The cave is dark and the sound of dripping water fills the air.",
    "Stalactites hang from the ceiling, and the floor is uneven.",
    "A chill runs down your spine as you step into the darkness."
];

const ruinsEntrance = [
    { name: getRandomElement(ruinsNames) + " Entrance", description: getRandomElement(ruinsDescriptions) }
];

const cavernsEntrance = [
    { name: getRandomElement(cavernNames) + " Entrance", description: getRandomElement(cavernDescriptions) }
];

const ruinsScenes = [
    { name: "Ancient Ruin Chamber", description: "You enter a dusty chamber filled with broken pottery and ancient inscriptions.", terrain: "ruin" },
    { name: "Collapsed Hallway", description: "The hallway is filled with rubble from a collapsed ceiling.", terrain: "rubble" },
    { name: "Altar Room", description: "An ancient altar stands in the center of this room.", terrain: "altar" },
    { name: "Hidden Chamber", description: "A hidden chamber, revealed by the shifting walls. Who knows what secrets it holds?", terrain: "ruin" },
    { name: "Library of Lost Lore", description: "Dusty tomes and scrolls fill the shelves, the air thick with forgotten knowledge.", terrain: "ruin" },
    { name: "Hall of Statues", description: "Statues of ancient warriors line the hall, their eyes seem to follow your every move.", terrain: "ruin" },
    { name: "Treasury", description: "This room once held treasures, now only remnants of wealth remain.", terrain: "treasury" },
    { name: "Cursed Armory", description: "Weapons and armor lie scattered, but something feels off about them.", terrain: "treasury" },
    { name: "Hall of Echoes", description: "Every step you take is echoed back by the stone walls, creating an eerie atmosphere.", terrain: "ruin" },
    { name: "Ancient Throne Room", description: "A grand throne sits in the center, long abandoned by its ruler.", terrain: "ruin" },
    { name: "Rubble-Strewn Passage", description: "The passage is littered with rubble, making it difficult to navigate.", terrain: "rubble" },
    { name: "Forgotten Courtyard", description: "A small courtyard overgrown with weeds, once a place of peace.", terrain: "ruin" },
    { name: "Sacrificial Chamber", description: "You find yourself in a dark chamber with remnants of ancient rituals.", terrain: "ruin" },
    { name: "Collapsed Bridge", description: "A once grand bridge now lies in ruins, the gap too wide to cross.", terrain: "rubble" },
    { name: "Sunken Atrium", description: "The atrium has partially collapsed, its floor flooded with stagnant water.", terrain: "rubble" },
    { name: "Hall of Records", description: "Scrolls and records of ancient knowledge lie scattered on the floor.", terrain: "ruin" },
    { name: "Guard Room", description: "Old weapons and armor are still visible, remnants of the castle's defenders.", terrain: "rubble" },
    { name: "Obsidian Hall", description: "A long hallway lined with obsidian stone, reflecting faint light.", terrain: "ruin" },
    { name: "Vaulted Chamber", description: "The high ceilings of this chamber make it feel imposing and grand.", terrain: "ruin" },
    { name: "Secret Armory", description: "A hidden armory, filled with old, rusted weapons and armor.", terrain: "treasury" }
];

const cavernsScenes = [
    { name: "Dark Cavern Chamber", description: "You walk into a large cavern, the sound of dripping water echoing through the darkness.", terrain: "cave" },
    { name: "Underground Lake", description: "A serene underground lake spans before you, its waters reflecting the faint light.", terrain: "water" },
    { name: "Stalagmite Forest", description: "The floor is dotted with stalagmites, making movement difficult.", terrain: "cave" },
    { name: "Echoing Chamber", description: "Every sound you make is amplified and echoed back to you.", terrain: "cave" },
    { name: "Crystal Cavern", description: "Glowing crystals line the walls, casting an ethereal light.", terrain: "cave" },
    { name: "Subterranean River", description: "A fast-flowing river cuts through the cave, its origin unknown.", terrain: "water" },
    { name: "Cave-In", description: "A recent collapse blocks the way forward. The air is thick with dust.", terrain: "rubble" },
    { name: "Mushroom Grove", description: "Bioluminescent mushrooms cover the ground, their glow providing the only light.", terrain: "cave" },
    { name: "Lava Flow", description: "A stream of molten lava flows through this chamber, emitting intense heat.", terrain: "cave" },
    { name: "Underground Spring", description: "Fresh water bubbles up from the ground, creating a small spring.", terrain: "water" },
    { name: "Cavernous Vault", description: "A large vault-like chamber, its walls lined with ancient carvings.", terrain: "cave" },
    { name: "Rocky Outcrop", description: "A steep rocky outcrop dominates this part of the cave.", terrain: "cave" },
    { name: "Flooded Tunnel", description: "A tunnel filled with water, its depth unknown.", terrain: "water" },
    { name: "Fossilized Remains", description: "Ancient fossils are embedded in the walls, telling a story of a forgotten past.", terrain: "cave" },
    { name: "Chasm Edge", description: "You find yourself at the edge of a deep chasm, the bottom unseen.", terrain: "cave" },
    { name: "Echoing Passage", description: "A narrow passage where every sound reverberates endlessly.", terrain: "cave" },
    { name: "Crystal Pool", description: "A pool of water surrounded by crystals, its surface unnaturally still.", terrain: "water" },
    { name: "Collapsed Entrance", description: "A once accessible path now blocked by a cave-in.", terrain: "rubble" },
    { name: "Glowing Cavern", description: "The walls of this cavern emit a faint, natural glow.", terrain: "cave" },
    { name: "Abandoned Mine", description: "The remains of an old mining operation, long since deserted.", terrain: "rubble" }
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getDungeonEntrance(dungeonType) {
    switch (dungeonType) {
        case 'ruins': return ruinsEntrance;
        case 'caverns': return cavernsEntrance;
        default: return [];
    }
}

function getDungeonScenes(dungeonType) {
    switch (dungeonType) {
        case 'ruins': return ruinsScenes;
        case 'caverns': return cavernsScenes;
        default: return [];
    }
}

function generateDungeon() {
    // Generate a unique seed for this dungeon
    const dungeonSeed = Date.now().toString() + Math.random().toString();
    const rng = new Math.seedrandom(dungeonSeed); // Initialize rng correctly

    const dungeonType = rng() < 0.5 ? 'ruins' : 'caverns';
    const dungeonMap = Array.from({ length: DUNGEON_SIZE }, () => Array(DUNGEON_SIZE).fill('#'));
    const dungeonScenesArray = Array.from({ length: DUNGEON_SIZE }, () => Array(DUNGEON_SIZE).fill(null));

    // Set entrance at a random edge position
    let entranceX, entranceY;

    // Randomly choose which edge to place the entrance on
    const edge = Math.floor(rng() * 4);

    switch (edge) {
        case 0: // Top edge
            entranceX = Math.floor(rng() * DUNGEON_SIZE);
            entranceY = 0;
            break;
        case 1: // Bottom edge
            entranceX = Math.floor(rng() * DUNGEON_SIZE);
            entranceY = DUNGEON_SIZE - 1;
            break;
        case 2: // Left edge
            entranceX = 0;
            entranceY = Math.floor(rng() * DUNGEON_SIZE);
            break;
        case 3: // Right edge
            entranceX = DUNGEON_SIZE - 1;
            entranceY = Math.floor(rng() * DUNGEON_SIZE);
            break;
    }

    dungeonMap[entranceY][entranceX] = 'E'; // Mark the entrance/exit tile

    // Clear surrounding tiles around the entrance
    clearSurroundingTiles(entranceX, entranceY, dungeonMap);

    // Ensure a clear path from entrance to treasure
    const treasureX = Math.floor(rng() * (DUNGEON_SIZE - 2)) + 1;
    const treasureY = Math.floor(rng() * (DUNGEON_SIZE - 2)) + 1;
    dungeonMap[treasureY][treasureX] = 'T'; // Mark the treasure tile

    carvePath(entranceX, entranceY, treasureX, treasureY, dungeonMap, rng);
    carvePassagesInDungeon(dungeonMap, rng);
    createDungeonRooms(dungeonMap, rng);

    // Place tiles based on dungeon type, similar to overworld scene placement
    fillDungeonScenes(dungeonMap, dungeonScenesArray, dungeonType, rng);

    const dungeonId = `dungeon_${Date.now()}`; // Unique ID for the dungeon

    dungeons[dungeonId] = {
        type: dungeonType,
        map: dungeonMap,
        scenesArray: dungeonScenesArray,
        entrance: getDungeonEntrance(dungeonType)[0], // Entrance scene
        entranceX: entranceX,
        entranceY: entranceY,
        source: dungeonId // Store the unique dungeon ID
    };

    console.log(`Generated dungeon with ID: ${dungeonId}`); // Logging for debugging

    return dungeonId; // Ensure the dungeon ID is returned correctly
}

function clearSurroundingTiles(x, y, dungeonMap) {
    const directions = [
        { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
        { dx: -1, dy: 0 }, /* center */      { dx: 1, dy: 0 },
        { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
    ];

    directions.forEach(dir => {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        if (nx >= 0 && nx < DUNGEON_SIZE && ny >= 0 && ny < DUNGEON_SIZE) {
            dungeonMap[ny][nx] = '.'; // Clear the tile
        }
    });
}

function carvePath(x1, y1, x2, y2, dungeonMap, rng) {
    let currentX = x1;
    let currentY = y1;

    while (currentX !== x2 || currentY !== y2) {
        if (currentX !== x2 && (currentY === y2 || rng() < 0.5)) {
            if (currentX < x2) {
                currentX++;
            } else if (currentX > x2) {
                currentX--;
            }
        } else if (currentY !== y2) {
            if (currentY < y2) {
                currentY++;
            } else if (currentY > y2) {
                currentY--;
            }
        }

        // Ensure we're within the dungeon map boundaries
        if (currentX >= 0 && currentX < DUNGEON_SIZE && currentY >= 0 && currentY < DUNGEON_SIZE) {
            dungeonMap[currentY][currentX] = '.'; // Carve out a path
        } else {
            console.error(`Out of bounds access attempt at (${currentX}, ${currentY})`);
        }
    }
}

function carvePassagesInDungeon(dungeonMap) {
    const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];

    function carvePassagesFrom(cx, cy) {
        shuffleArray(directions).forEach(dir => {
            const nx = cx + dir.dx * 2;
            const ny = cy + dir.dy * 2;

            if (ny >= 0 && ny < DUNGEON_SIZE && nx >= 0 && nx < DUNGEON_SIZE && dungeonMap[ny][nx] === '#') {
                dungeonMap[ny - dir.dy][nx - dir.dx] = '.';
                dungeonMap[ny][nx] = '.';
                carvePassagesFrom(nx, ny);
            }
        });
    }

    const startX = Math.floor(DUNGEON_SIZE / 2);
    const startY = Math.floor(DUNGEON_SIZE / 2);
    carvePassagesFrom(startX, startY);
}

function createDungeonRooms(dungeonMap) {
    const roomCount = 1; // Adjust room count as needed
    const roomMinSize = 2;
    const roomMaxSize = 4;

    for (let i = 0; i < roomCount; i++) {
        let roomWidth = getRandomInt(roomMinSize, roomMaxSize);
        let roomHeight = getRandomInt(roomMinSize, roomMaxSize);
        let roomX = getRandomInt(1, DUNGEON_SIZE - roomWidth - 1);
        let roomY = getRandomInt(1, DUNGEON_SIZE - roomHeight - 1);

        for (let y = roomY; y < roomY + roomHeight; y++) {
            for (let x = roomX; x < roomX + roomWidth; x++) {
                if (dungeonMap[y][x] === '#') { // Avoid overwriting existing paths
                    dungeonMap[y][x] = '.';
                }
            }
        }
    }
}

function fillDungeonScenes(dungeonMap, dungeonScenesArray, dungeonType) {
    const scenes = getDungeonScenes(dungeonType);
    let altarPlaced = false;
    let treasuryPlaced = false;

    const openTiles = [];
    for (let y = 0; y < DUNGEON_SIZE; y++) {
        for (let x = 0; x < DUNGEON_SIZE; x++) {
            if (dungeonMap[y][x] === '.') {
                openTiles.push({ x, y });
            }
        }
    }

    shuffleArray(openTiles);

    openTiles.forEach((tile, index) => {
        let scene = null;

        if (!altarPlaced) {
            scene = scenes.find(s => s.terrain === 'altar');
            altarPlaced = true;
        } else if (!treasuryPlaced) {
            scene = scenes.find(s => s.terrain === 'treasury');
            treasuryPlaced = true;
        } else {
            const filteredScenes = scenes.filter(s => s.terrain !== 'altar' && s.terrain !== 'treasury');
            if (filteredScenes.length > 0) {
                scene = getRandomElement(filteredScenes);
            } else {
                console.error("No more valid scenes to assign.");
                scene = getRandomElement(scenes); // Fallback to any available scene
            }
        }

        if (scene) {
            dungeonScenesArray[tile.y][tile.x] = scene;
        } else {
            dungeonScenesArray[tile.y][tile.x] = { name: "Empty Room", description: "This room is empty.", terrain: "cave" }; // Fallback scene
        }
    });
}

function enterDungeon(dungeonId) {
    console.log(`Entering dungeon with ID: ${dungeonId}`);
    const dungeon = dungeons[dungeonId];
    if (!dungeon) {
        console.error(`Dungeon with ID ${dungeonId} not found.`);
        return;
    }

    // Store the player's current position before entering the dungeon
    previousPlayerPosition.x = playerPosition.x;
    previousPlayerPosition.y = playerPosition.y;

    currentDungeon = dungeonId;
    currentDungeonMap = dungeon.map; // Access the unique map for this dungeon
    playerPosition.x = dungeon.entranceX;
    playerPosition.y = dungeon.entranceY;

    // Mark the player's position on the dungeon map
    currentDungeonMap[playerPosition.y][playerPosition.x] = 'P';

    displayDungeon(); // Display the dungeon map initially
    displayDungeonScene(); // Display the initial dungeon scene
    updateMovementButtons();
}

function promptDungeonExit() {
    const contentWindow = document.getElementById('content-window');
    contentWindow.innerHTML = `
        <h2>Dungeon Exit</h2>
        <p>Do you want to leave the dungeon and return to the overworld?</p>
        <button onclick="exitDungeon()">Yes</button>
        <button onclick="displayDungeon()">No</button>
    `;
}

function exitDungeon() {
    console.log(`Exiting dungeon with ID: ${currentDungeon}`);
    const dungeon = dungeons[currentDungeon];
    if (!dungeon) {
        console.error(`Dungeon with ID ${currentDungeon} not found.`);
        return;
    }

    // Restore player position on the overworld map
    playerPosition.x = previousPlayerPosition.x;
    playerPosition.y = previousPlayerPosition.y;
    map[playerPosition.y][playerPosition.x] = 'P';

    // Mark the dungeon entrance again
    currentDungeonMap[dungeon.entranceY][dungeon.entranceX] = 'E';

    currentDungeon = null;
    currentDungeonMap = [];
    dungeonScenesArray = []; // Clear the dungeon scenes array

    displayMap();
    displayScene(playerPosition.x, playerPosition.y);
    updateMovementButtons();
}

function displayDungeonScene() {
    const contentWindow = document.getElementById('content-window');
    const currentTile = currentDungeonMap[playerPosition.y][playerPosition.x];
    const dungeon = dungeons[currentDungeon]; // Ensure the current dungeon is retrieved
    if (!dungeon) {
        console.error(`Current dungeon (${currentDungeon}) not found.`);
        return;
    }

    // Ensure player position is within bounds
    if (playerPosition.y >= 0 && playerPosition.y < DUNGEON_SIZE && playerPosition.x >= 0 && playerPosition.x < DUNGEON_SIZE) {
        const scene = dungeon.scenesArray[playerPosition.y][playerPosition.x]; // Safely access the scenes array

        if (scene) {
            contentWindow.innerHTML = `
                <h2>${scene.name}</h2>
                <p>${scene.description}</p>
            `;
        } else {
            contentWindow.innerHTML = `
                <h2>Entrance</h2>
                <p>You enter the dungeon.</p>
            `;
        }
    } else {
        console.error(`Player position (${playerPosition.x}, ${playerPosition.y}) is out of bounds.`);
        contentWindow.innerHTML = `
            <h2>Error</h2>
            <p>The player is out of bounds. Please try re-entering the dungeon.</p>
        `;
    }
}

function triggerDungeonEvent() {
    const dungeon = dungeons[currentDungeon];
    if (!dungeon) {
        console.error("Current dungeon is not defined or not found.");
        return;
    }

    const scene = dungeon.scenesArray[playerPosition.y][playerPosition.x];
    if (!scene || !scene.terrain) {
        console.warn("No valid scene or terrain found for the current tile.");
        return;  // Early return if terrain is undefined
    }

    // Introduce a random chance for the event to trigger
    const eventChance = Math.random();
    if (eventChance < 0.3) { // 30% chance to trigger an event (adjust as needed)
        const event = getRandomEventFromDungeon(scene.terrain); // Call the function from events.js
        if (!event) {
            console.warn("No events found for the terrain:", scene.terrain);
            return;
        }

        applyEvent(event);
    } else {
        console.log("No event triggered this time.");
    }
}

// Helper functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}