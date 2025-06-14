const quests = [
    { title: "Goblin Menace", description: "Goblins have been reported causing trouble. Eliminate any you find.", coins: 100, xp: 50, completed: false },
    { title: "Lost Necklace", description: "A valuable necklace has been lost. Find and return it.", coins: 50, xp: 30, completed: false },
    { title: "Bandit Leader", description: "A bandit leader is on the loose. Defeat them if encountered.", coins: 150, xp: 70, completed: false },
    { title: "Missing Child", description: "A child has gone missing. Look for them during your travels.", coins: 200, xp: 100, completed: false },
    { title: "Wolves Attack", description: "Wolves have been attacking travelers. Hunt them down.", coins: 120, xp: 60, completed: false },
    { title: "Herbal Remedy", description: "Collect rare herbs needed for a healer's remedy.", coins: 80, xp: 40, completed: false },
    { title: "Haunted Encounter", description: "Strange sightings have been reported. Investigate any hauntings you come across.", coins: 90 , xp: 45, completed: false },
    { title: "Bridge Repair", description: "A wanted ad for assistance in repairing a nearby bridge.", coins: 110, xp: 55, completed: false },
    { title: "Stolen Goods", description: "Retrieve stolen goods from bandits.", coins: 130, xp: 65, completed: false },
    { title: "Ancient Relic", description: "Protect an ancient relic from thieves.", coins: 140, xp: 70, completed: false },
    { title: "Poisoned Water Source", description: "Find and neutralize the source of poisoned water.", coins: 160, xp: 80, completed: false },
    { title: "Cursed Forest", description: "Break the curse affecting the forest.", coins: 170, xp: 85, completed: false },
    { title: "Spy in the Wilderness", description: "Capture a spy reported to be operating in the area.", coins: 150, xp: 75, completed: false },
    { title: "Missing Livestock", description: "Track down missing livestock.", coins: 100, xp: 50, completed: false },
    { title: "Strange Lights", description: "Investigate the source of strange lights seen in the wilderness.", coins: 200, xp: 100, completed: false },
    { title: "Escaped Prisoner", description: "Capture an escaped prisoner.", coins: 90, xp: 45, completed: false },
    { title: "Ancient Ritual", description: "Rumors speak of a dark sect performing ancient rites nearby, the mayor has asked for someone to investigate it.", coins: 130, xp: 65, completed: false },
    { title: "Merchant Escort", description: "Escort a merchant safely during your travels.", coins: 120, xp: 60, completed: false },
    { title: "Plague Cure Ingredients", description: "Collect ingredients needed for a plague cure.", coins: 180, xp: 90, completed: false },
    { title: "Arachnid Nest", description: "Destroy nests of venomous arachnids encountered in the wild.", coins: 160, xp: 80, completed: false },
    { title: "Relic of the Lost Temple", description: "Recover a powerful relic from deep within the ruin.", coins: 300, xp: 150, completed: false, dungeonOnly: true },
    { title: "Cavern Guardian", description: "Defeat the guardian protecting the deepest chamber of the cavern.", coins: 350, xp: 200, completed: false, dungeonOnly: true },
    { title: "The Cursed Treasury", description: "Break the curse on the treasury chamber to unlock its hidden wealth.", coins: 400, xp: 250, completed: false, dungeonOnly: true }
];

// Function to load quests on the notice board
function loadNoticeBoard(contentWindow, source) {
    let noticeBoardHtml = `
        <h2>Notice Board</h2>
        <p>Various quests are posted here:</p>
        <ul>
    `;

    if (!playerStats.generatedQuests) {
        playerStats.generatedQuests = {};
    }

    // Ensure quests are generated for the specific location
    if (!playerStats.generatedQuests[source]) {
        generateNewQuestsForTown(source);
    }

    const displayedQuests = playerStats.generatedQuests[source];

    displayedQuests.forEach((quest, index) => {
        if (!quest.accepted) {
            noticeBoardHtml += `
                <li>
                    <strong>${quest.title}</strong><br>
                    ${quest.description}<br>
                    Reward: ${quest.coins} coins and ${quest.xp} XP<br>
                    <button onclick="acceptQuest('${quest.title}', '${quest.source}', ${index})">Accept</button>
                </li>
            `;
        }
    });

    // Display completed quests for reward collection
    const completedQuests = playerStats.activeQuests.filter(quest => quest.completed && quest.source === source);
    if (completedQuests.length > 0) {
        noticeBoardHtml += `
            <h3>Completed Quests</h3>
            <ul>
        `;
        completedQuests.forEach(quest => {
            noticeBoardHtml += `
                <li>
                    <strong>${quest.title}</strong><br>
                    Reward: ${quest.coins} coins and ${quest.xp} XP<br>
                    <button onclick="collectReward('${quest.title}')">Collect Reward</button>
                </li>
            `;
        });
        noticeBoardHtml += `</ul>`;
    }

    noticeBoardHtml += `
        </ul>
        <button onclick="visitTavern('${source}')">Back</button>
    `;
    contentWindow.innerHTML = noticeBoardHtml;
}

// Function to collect quest reward
function collectReward(questTitle) {
    const questIndex = playerStats.activeQuests.findIndex(quest => quest.title === questTitle);
    if (questIndex > -1) {
        const quest = playerStats.activeQuests[questIndex];
        playerStats.coins += quest.coins;
        playerStats.xp += quest.xp;
        playerStats.activeQuests.splice(questIndex, 1);
        updatePlayerStats();
        while (playerStats.xp >= playerStats.nextLevelXp) {
            levelUpPlayer();
        }
        displayNotification(`Reward collected: ${quest.coins} coins and ${quest.xp} XP`);
        if (playerStats.activeQuests.filter(quest => quest.source === quest.source).length === 0) {
            generateNewQuestsForTown(quest.source);
        }
        loadNoticeBoard(document.getElementById('content-window'), quest.source);
    } else {
        displayNotification("Quest not found.");
    }
}

// Function to accept quest
function acceptQuest(questTitle, source, index) {
    const activeQuestsFromSource = playerStats.activeQuests.filter(quest => quest.source === source);
    if (activeQuestsFromSource.length >= 3) {
        displayNotification("You can't accept more than 3 quests from the same source.");
        return;
    }

    const quest = playerStats.generatedQuests[source][index];
    if (quest) {
        playerStats.activeQuests = playerStats.activeQuests || [];
        playerStats.activeQuests.push({ ...quest, source });
        playerStats.generatedQuests[source][index].accepted = true;
        displayNotification(`Quest accepted: ${quest.title}`);
        loadNoticeBoard(document.getElementById('content-window'), source);
    } else {
        displayNotification("Quest not found.");
    }
}

// Function to generate new quests for a town
function generateNewQuestsForTown(townSource) {
    const activeQuestTitles = playerStats.activeQuests.map(quest => quest.title);
    const availableQuests = quests.filter(quest => !activeQuestTitles.includes(quest.title));

    // Shuffle the available quests to ensure random selection
    for (let i = availableQuests.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableQuests[i], availableQuests[j]] = [availableQuests[j], availableQuests[i]];
    }

    // Select the first 3 quests from the shuffled list for this specific location
    playerStats.generatedQuests[townSource] = availableQuests.slice(0, 3).map(quest => ({ ...quest, source: townSource }));
}