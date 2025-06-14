const DEBUG = false;
function debugLog(...args) { if (DEBUG) { console.log(...args); } }

let rng = Math.random;
let currentSeed = null;

function setRandomSeed(seed) {
    currentSeed = seed;
    rng = new Math.seedrandom(seed);
}

function resetRandomSeed() {
    currentSeed = null;
    rng = Math.random;
}

function getCurrentSeed() {
    return currentSeed;
}

function getRandom() {
    return rng();
}

function getTiersByPlayerLevel(level) {
    if (level >= 1 && level <= 4) {
        return [1];
    } else if (level >= 5 && level <= 9) {
        return [1, 2];
    } else if (level >= 10 && level <= 14) {
        return [1, 2, 3];
    } else if (level >= 15 && level <= 19) {
        return [1, 2, 3, 4];
    } else {
        return [1, 2, 3, 4, 5];
    }
}

function getRandomInt(min, max) {
    return Math.floor(getRandom() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(getRandom() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
