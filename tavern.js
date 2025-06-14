const names = [
    "Henry", "Eliza", "Gregor", "Selene", "Thomas", "Mira", "Cedric", "Fiona", "Lucian", "Isabella",
    "Eleanor", "Roland", "Beatrice", "Duncan", "Gwendolyn", "Arthur", "Matilda", "Percival", "Cassandra", "Edmund",
    "Lydia", "Hugo", "Astrid", "Benedict", "Celia", "Damien", "Evelyn", "Finn", "Greta", "Harold",
    "Imogen", "Jasper", "Kara", "Leopold", "Maeve", "Nigel", "Ophelia", "Quentin", "Rosa", "Sylvia",
    "Tristan", "Ursula", "Victor", "Wendy", "Xander", "Yara", "Zachary", "Adeline", "Blake", "Clara"
];

const professions = [
    "Hunter", "Weaver", "Merchant", "Healer", "Guard", "Bard", "Blacksmith", "Farmer", "Scholar", "Noble",
    "Warrior", "Alchemist", "Ranger", "Seer", "Rogue", "Priest", "Minstrel", "Knight", "Mage", "Fisher",
    "Carpenter", "Tailor", "Butcher", "Baker", "Smith", "Herbalist", "Thief", "Monk", "Explorer", "Mercenary",
    "Cook", "Innkeeper", "Scribe", "Librarian", "Druid", "Sailor", "Artist", "Potter", "Gladiator", "Brewer"
];

const gossips = [
    // Two-person interactions with multiple statements
    {
        text1: "Hey, did you hear? Old Man Jenkins swears he saw a dragon flying over the mountains last night!",
        text2: "A dragon? He's been drinking too much mead, if you ask me.",
        text1b: "I don't know, he seemed pretty sober when he told me.",
        text2b: "Well, if it's true, we should be cautious."
    },
    {
        text1: "Did you see the blacksmith's daughter sneaking out again last night?",
        text2: "Yeah, I bet she's meeting someone in the woods. Wonder who it is...",
        text1b: "Whoever it is, they're keeping it very secret.",
        text2b: "Maybe we should follow her next time and find out."
    },
    {
        text1: "So, rumor has it the new mayor has a secret stash of gold hidden in his mansion.",
        text2: "Really? We should befriend him! Or... maybe find that stash ourselves.",
        text1b: "If we do, we must be very careful. The mayor is not to be underestimated."
    },
    {
        text1: "A traveling merchant told me about a hidden cave full of treasures near the old mill.",
        text2: "Treasure, huh? Sounds like a wild goose chase to me.",
        text1b: "Well, sometimes those wild chases pay off. Maybe we should check it out."
    },
    {
        text1: "The innkeeper keeps going on about a ghost haunting room number three.",
        text2: "Seriously? Guests have been complaining about strange noises. Creepy!",
        text1b: "Maybe we should spend a night there and see for ourselves."
    },
    // Two-person interactions
    {
        text1: "Ever hear about the forest to the north? They say it's cursed. People who go in never come back.",
        text2: "Yeah, I've heard. No way I'm going near that place."
    },
    {
        text1: "Someone found an ancient map in the ruins east of town. Think it could be a treasure map?",
        text2: "Could be. Or it could just lead to more ruins. Only one way to find out."
    },
    {
        text1: "Did you know there's a secret passage under the old church? Some adventurers found it.",
        text2: "Really? Wonder what they're keeping down there."
    },
    {
        text1: "The healer's been acting really strange lately. Some folks say she's dabbling in forbidden magic.",
        text2: "Forbidden magic? That's a dangerous path. Hope she knows what she's doing."
    },
    {
        text1: "Apparently, the king's advisor was seen meeting with a known bandit leader.",
        text2: "No way! That can't be good. Something's definitely brewing at the castle."
    },
    // Three-person interactions
    {
        text1: "Ever hear about the forest to the north? They say it's cursed. People who go in never come back.",
        text2: "Yeah, I've heard. No way I'm going near that place.",
        text3: "I heard someone actually returned from there once, but they were never the same."
    },
    {
        text1: "Someone found an ancient map in the ruins east of town. Think it could be a treasure map?",
        text2: "Could be. Or it could just lead to more ruins. Only one way to find out.",
        text3: "Either way, it sounds like an adventure waiting to happen!"
    },
    {
        text1: "Did you know there's a secret passage under the old church? Some adventurers found it.",
        text2: "Really? Wonder what they're keeping down there.",
        text3: "Maybe something valuable, or something dangerous."
    },
    {
        text1: "The healer's been acting really strange lately. Some folks say she's dabbling in forbidden magic.",
        text2: "Forbidden magic? That's a dangerous path. Hope she knows what she's doing.",
        text3: "I've seen her with some strange herbs and books recently."
    },
    {
        text1: "Apparently, the king's advisor was seen meeting with a known bandit leader.",
        text2: "No way! That can't be good. Something's definitely brewing at the castle.",
        text3: "We should keep an eye on them and see what's going on."
    },
    // Four-person interactions
    {
        text1: "The bard sang a song about a hidden treasure in the forest.",
        text2: "I heard that song too! Do you think it's true?",
        text3: "Maybe. It's worth checking out, don't you think?",
        text4: "Absolutely. Let's gather some supplies and head out tomorrow."
    },
    {
        text1: "The guard caught a thief trying to break into the merchant's shop last night.",
        text2: "I heard the thief was trying to steal a magical artifact!",
        text3: "That's right. It was something the merchant acquired from a faraway land.",
        text4: "Good thing the guard was there. Who knows what could have happened otherwise."
    },
    {
        text1: "The witch was seen gathering herbs near the old ruins.",
        text2: "She's always up to something mysterious. I wonder what she's brewing now.",
        text3: "I've heard she makes powerful potions and elixirs.",
        text4: "Maybe we should pay her a visit. She might have something useful for us."
    },
    {
        text1: "The knight told a tale of battling a giant in the mountains.",
        text2: "A giant? That sounds like quite the adventure!",
        text3: "It must have been a fierce battle. The knight had some impressive scars.",
        text4: "I wonder if there are more giants out there."
    },
    {
        text1: "The farmer's crops have been growing unusually well this season.",
        text2: "I heard he made a deal with a forest spirit for a bountiful harvest.",
        text3: "A forest spirit? That's incredible. I didn't think they were real.",
        text4: "Maybe we should talk to the farmer and find out more about it."
    }
];

const tavernScenes = [
    "The tavern is bustling with activity. People are laughing, chatting, and enjoying their drinks.",
    "It's a quiet night in the tavern. A few patrons sit at the bar, nursing their drinks in silence.",
    "A bard is performing in the corner, singing a lively tune. The patrons are clapping along.",
    "The tavern is filled with the smell of roasting meat. The cook is busy preparing a feast.",
    "A heated debate is taking place at one of the tables. The patrons are arguing passionately.",
    "A group of adventurers is gathered around a table, discussing their next quest.",
    "The tavernkeeper is polishing glasses behind the bar, occasionally chatting with the patrons.",
    "A game of dice is being played in the corner. The players are intensely focused.",
    "The fireplace is crackling, casting a warm glow over the tavern.",
    "A mysterious stranger is sitting in the corner, watching the room quietly."
];

function getRandomCharacter() {
    const name = names[Math.floor(getRandom() * names.length)];
    const profession = professions[Math.floor(getRandom() * professions.length)];
    return { name: `${name} the ${profession}`, description: `${name} is a ${profession.toLowerCase()} in the town.` };
}

function getRandomGossip() {
    const randomIndex = Math.floor(getRandom() * gossips.length);
    const conversation = gossips[randomIndex];

    // Determine the number of speakers needed
    const speakerCount = new Set(Object.keys(conversation).map(key => key.replace(/b$/, ''))).size;

    // Generate unique characters for each speaker
    const characters = Array.from({ length: speakerCount }, () => getRandomCharacter());

    // Ensure unique speakers for each part of the conversation
    const dialogue = Object.keys(conversation).map((key, index) => {
        const speakerIndex = characters.findIndex((_, i) => key.startsWith(`text${i + 1}`));
        const speaker = characters[speakerIndex];
        return `<p><strong><span class="speaker${speakerIndex + 1}">${speaker.name}</span></strong>: "${conversation[key]}"</p>`;
    }).join('');

    return dialogue;
}

function getRandomTavernScene() {
    return tavernScenes[Math.floor(getRandom() * tavernScenes.length)];
}

function enterTavern() {
    const contentWindow = document.getElementById('content-window');
    const gossip = getRandomGossip();
    const scene = getRandomTavernScene();
    contentWindow.innerHTML = `
        <h2>Inside the Tavern</h2>
        <p>${scene}</p>
        <p>You order a drink and sit at an empty table where you overhear some other patrons talking:</p>
        ${gossip}
        <button onclick="visitTavern()">Back</button>
    `;
}

function showNoticeBoard(townSource) {
    const contentWindow = document.getElementById('content-window');
    loadNoticeBoard(contentWindow, townSource);
}
