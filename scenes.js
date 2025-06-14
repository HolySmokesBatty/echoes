const scenes = [
    // Forest scenes
    {
        name: "Darkwood Forest",
        description: "A dense canopy covers your surrounding, blocking out the skies above, and making visibility difficult.",
        terrain: "forest"
    },
    {
        name: "Forsaken Glade",
        description: "A glade where no sunlight penetrates the thick foliage and eerie silence prevails.",
        terrain: "forest"
    },
    {
        name: "Gloomy Thicket",
        description: "The forest thickens, and distant howls echo through the gloom.",
        terrain: "forest"
    },
    {
        name: "Ancient Grove",
        description: "An ancient grove with trees so old they seem to whisper secrets.",
        terrain: "forest"
    },
    {
        name: "Shadowy Meadow",
        description: "A meadow where the grass is tall and the shadows seem to move.",
        terrain: "forest"
    },
    {
        name: "Twilight Grove",
        description: "A grove where twilight seems perpetual, casting everything in an eerie glow.",
        terrain: "forest"
    },
    {
        name: "Moonlit Glade",
        description: "A glade where the moonlight barely penetrates, casting eerie shadows.",
        terrain: "forest"
    },
    {
        name: "Silent Woods",
        description: "The woods are eerily silent, with no sound of wildlife.",
        terrain: "forest"
    },
    {
        name: "Whispering Pines",
        description: "Tall pines whisper as the wind passes through them, creating a haunting sound.",
        terrain: "forest"
    },
    {
        name: "Veiled Glade",
        description: "A glade hidden behind a veil of mist, mysterious and serene.",
        terrain: "forest"
    },
    {
        name: "Twisted Woods",
        description: "The trees here are twisted and gnarled, as if in pain.",
        terrain: "forest"
    },
    {
        name: "Mystic Forest",
        description: "A forest filled with glowing flora and a strange, otherworldly light.",
        terrain: "forest"
    },

    // Field scenes
    {
        name: "Haunted Clearing",
        description: "You stand in a clearing where the trees seem to whisper and shadows dance.",
        terrain: "field"
    },
    {
        name: "Eerie Fog",
        description: "A dense, eerie fog surrounds you, shrouding everything in mystery.",
        terrain: "field"
    },
    {
        name: "Cursed Field",
        description: "A field where crops grow twisted and the air is thick with unease.",
        terrain: "field"
    },
    {
        name: "Ancient Battlefield",
        description: "An old battlefield, where the echoes of past conflicts linger.",
        terrain: "field"
    },
    {
        name: "Howling Hills",
        description: "Hills where the wind howls constantly, sounding almost like cries.",
        terrain: "field"
    },
    {
        name: "Sunny Meadow",
        description: "A bright meadow where wildflowers bloom in abundance.",
        terrain: "field"
    },
    {
        name: "Golden Field",
        description: "A field of golden wheat swaying gently in the breeze.",
        terrain: "field"
    },
    {
        name: "Abandoned Farmland",
        description: "An old farmland, long abandoned, with wild crops and overgrown paths.",
        terrain: "field"
    },
    {
        name: "Enchanted Clearing",
        description: "A clearing where the air feels magical and the flora glows faintly.",
        terrain: "field"
    },

    // Water scenes
    {
        name: "Cursed Lake",
        description: "You find yourself at the edge of a lake, its waters dark and foreboding.",
        terrain: "water"
    },
    {
        name: "Whispering Stream",
        description: "A stream flows nearby, the water's murmur seems to carry ancient, haunting voices.",
        terrain: "water"
    },
    {
        name: "Hidden Waterfall",
        description: "A hidden waterfall cascades down a cliff, its sound muffled by the forest.",
        terrain: "water"
    },
    {
        name: "Silent Pond",
        description: "A pond so still it reflects the sky like a dark mirror.",
        terrain: "water"
    },
    {
        name: "Murky Swamp",
        description: "A swamp with murky waters and an unsettling stillness.",
        terrain: "water"
    },
    {
        name: "Dreadful Marsh",
        description: "A marsh where the ground is soft and the air is filled with the smell of decay.",
        terrain: "water"
    },
    {
        name: "Shadowed River",
        description: "A river that flows silently, its waters dark and mysterious.",
        terrain: "water"
    },
    {
        name: "Crystal Spring",
        description: "A clear spring of water, sparkling in the light.",
        terrain: "water"
    },
    {
        name: "Frothing Rapids",
        description: "A river with fast-flowing, frothy rapids.",
        terrain: "water"
    },

    // Path scenes
    {
        name: "Shadowy Path",
        description: "A dark path bathed in deep shadows lies ahead.",
        terrain: "path"
    },
    {
        name: "Overgrown Path",
        description: "A path through tall, overgrown grass, the way forward is hard to see.",
        terrain: "path"
    },
    {
        name: "Thorny Bramble",
        description: "You encounter a thick bramble of thorny bushes, difficult to pass through.",
        terrain: "path"
    },
    {
        name: "Creeping Vines",
        description: "Vines creep along the ground and up the trees, making the path difficult.",
        terrain: "path"
    },
    {
        name: "Dark Hollow",
        description: "A hollow where the shadows are thickest and the air feels heavy.",
        terrain: "path"
    },
    {
        name: "Shadowed Path",
        description: "A path that seems to twist and turn on its own, leading you deeper into darkness.",
        terrain: "path"
    },
    {
        name: "Narrow Trail",
        description: "A narrow trail through the forest, barely wide enough to walk through.",
        terrain: "path"
    },
    {
        name: "Sunlit Path",
        description: "A path bathed in sunlight, providing a brief respite from the gloom.",
        terrain: "path"
    },

    // Mountain scenes
    {
        name: "Jagged Cliffs",
        description: "You navigate through a terrain of jagged, menacing cliffs.",
        terrain: "mountain"
    },
    {
        name: "Misty Ravine",
        description: "You find yourself at the edge of a ravine, the bottom hidden by thick mist.",
        terrain: "mountain"
    },
    {
        name: "Echoing Caves",
        description: "You find yourself in a cave where every sound echoes ominously.",
        terrain: "mountain"
    },
    {
        name: "Abandoned Mine",
        description: "You come across an old mine, abandoned and silent.",
        terrain: "mountain"
    },
    {
        name: "Frozen Peak",
        description: "A peak covered in snow and ice, the air is biting cold.",
        terrain: "mountain"
    },
    {
        name: "Rocky Pass",
        description: "A rocky pass through the mountains, difficult and treacherous.",
        terrain: "mountain"
    },
    {
        name: "Craggy Ridge",
        description: "A ridge filled with crags and uneven ground.",
        terrain: "mountain"
    },

    // Ruins scenes
    {
        name: "Ruined Tower",
        description: "You come across a ruined tower, its stones worn and covered in moss.",
        terrain: "ruins"
    },
    {
        name: "Desolate Village",
        description: "You come across a desolate village, its buildings in disrepair.",
        terrain: "ruins"
    },
    {
        name: "Forsaken Shrine",
        description: "A shrine that has been abandoned, with offerings long since decayed.",
        terrain: "ruins"
    },
    {
        name: "Hidden Ruins",
        description: "Ruins hidden deep within the forest, covered in moss and vines.",
        terrain: "ruins"
    },
    {
        name: "Ancient Tomb",
        description: "An ancient tomb, sealed for centuries and covered in runes.",
        terrain: "ruins"
    },
    {
        name: "Silent Crypt",
        description: "A crypt where the dead rest uneasily, and silence reigns.",
        terrain: "ruins"
    },
    {
        name: "Collapsed Temple",
        description: "The remains of a temple, now collapsed and overgrown.",
        terrain: "ruins"
    },
    {
        name: "Shattered Monolith",
        description: "A once-grand monolith, now shattered and in pieces.",
        terrain: "ruins"
    }
];

function getRandomScene() {
    const randomIndex = Math.floor(Math.random() * scenes.length);
    return scenes[randomIndex];
}

function getScenesByTerrain(terrain) {
    return scenes.filter(scene => scene.terrain === terrain);
}

function selectSceneBasedOnTerrain(x, y, map, scenesArray) {
    const neighboringTerrains = [];
    if (x > 0 && scenesArray[y][x - 1]) neighboringTerrains.push(scenesArray[y][x - 1].terrain);
    if (x < MAP_SIZE - 1 && scenesArray[y][x + 1]) neighboringTerrains.push(scenesArray[y][x + 1].terrain);
    if (y > 0 && scenesArray[y - 1][x]) neighboringTerrains.push(scenesArray[y - 1][x].terrain);
    if (y < MAP_SIZE - 1 && scenesArray[y + 1]) neighboringTerrains.push(scenesArray[y + 1].terrain);

    // Special handling for paths to ensure linearity
    if (map[y][x] === 'P' || isPathNeighbor(x, y, map)) {
        return { terrain: 'path', name: 'Path', description: 'A narrow path through the terrain.' };
    }

    // Add randomness to occasionally place different terrains
    if (Math.random() < 0.1) {
        const randomTerrains = ['forest', 'field', 'water', 'mountain', 'ruins'];
        const randomTerrain = randomTerrains[Math.floor(Math.random() * randomTerrains.length)];
        return getScenesByTerrain(randomTerrain)[Math.floor(Math.random() * getScenesByTerrain(randomTerrain).length)];
    }

    const terrainCounts = neighboringTerrains.reduce((acc, terrain) => {
        acc[terrain] = (acc[terrain] || 0) + 1;
        return acc;
    }, {});

    const mostCommonTerrain = Object.keys(terrainCounts).reduce((a, b) => terrainCounts[a] > terrainCounts[b] ? a : b, null);

    const availableScenes = getScenesByTerrain(mostCommonTerrain);
    return availableScenes.length > 0 ? availableScenes[Math.floor(Math.random() * availableScenes.length)] : getRandomScene();
}

function isPathNeighbor(x, y, map) {
    if (x > 0 && map[y][x - 1] === 'path') return true;
    if (x < MAP_SIZE - 1 && map[y][x + 1] === 'path') return true;
    if (y > 0 && map[y - 1][x] === 'path') return true;
    if (y < MAP_SIZE - 1 && map[y + 1][x] === 'path') return true;
    return false;
}
