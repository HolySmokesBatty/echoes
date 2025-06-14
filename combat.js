const combat = {
    player: null,
    enemy: null,
    combatLog: [],
    isInCombat: false,
    activeEffects: { player: [], enemy: [] },
    activeQuest: null,

    // Initialization and Setup
    initialize(player, enemy, quest = null) {
        this.player = player;
        this.enemy = { ...enemy };
        this.combatLog = [];
        this.isInCombat = true;
        this.activeEffects = { player: [], enemy: [] };
        this.activeQuest = quest;

        // Apply enemy adjective modifiers
        if (enemy.adjective) {
            const modifier = enemyAdjectives.find(adj => adj.adjective === enemy.adjective);
            if (modifier) {
                for (let stat in modifier) {
                    if (stat !== 'adjective' && stat !== 'XP') {
                        this.enemy[stat] = Math.floor(this.enemy[stat] * modifier[stat]);
                    }
                }
                this.enemy.XP = Math.floor(this.enemy.XP * modifier.XP);
            }
        }

        if (!this.enemy.maxHP) {
            this.enemy.maxHP = this.enemy.HP;
        } else {
            this.enemy.maxHP = Math.floor(this.enemy.maxHP);
        }
        console.log('Initialized Combat:', this.player, this.enemy);
    },

    startCombat(enemy = null, quest = null) {
        const player = getPlayerStats();
        if (!player) {
            this.appendCombatMessage('Player object is not found');
            return;
        }

        if (!enemy) {
            const playerLevel = player.level;
            enemy = currentDungeon ? this.getRandomDungeonEnemy(playerLevel) : this.getRandomEnemy(playerLevel);
        }

        this.initialize(player, enemy, quest);

        const controlWindow = document.getElementById('control-window');
        if (controlWindow) {
            controlWindow.style.visibility = 'hidden';
            controlWindow.style.opacity = 0;
        }

        const contentWindow = document.getElementById('content-window');
        const enemyName = `${enemy.adjective ? enemy.adjective + ' ' : ''}${enemy.name}`;
        contentWindow.innerHTML = `
            <h2>Combat Start</h2>
            <p>You encounter a ${enemyName}!</p>
            <div id="combat-messages" style="height: 100px; overflow-y: auto; border: 1px solid #444; background-color: #2a2a2a; padding: 10px; margin-bottom: 10px;"></div>
            <p id="enemy-hp">${enemyName}: ${this.enemy.HP}/${this.enemy.maxHP} ${this.getEnemyStatusEffects()}</p>
        `;

        this.appendCombatMessage(`You encounter a ${enemyName}!`);
        this.updateInfoWindow();
        this.displayCombatOptions();
    },

    getRandomDungeonEnemy(playerLevel) {
        return this.getRandomEnemyFromPool(dungeonEnemies, playerLevel);
    },

    getRandomEnemy(playerLevel) {
        return this.getRandomEnemyFromPool(enemyTiers, playerLevel);
    },

    getRandomEnemyFromPool(pool, playerLevel) {
        let availableTiers;
    
        // Define available tiers based on player level
        if (playerLevel <= 5) {
            availableTiers = pool.Tier1; // Only Tier 1 enemies
        } else if (playerLevel <= 10) {
            availableTiers = [...pool.Tier1, ...pool.Tier2]; // Tier 1 and 2
        } else if (playerLevel <= 15) {
            availableTiers = [...pool.Tier2, ...pool.Tier3]; // Tier 2 and 3
        } else if (playerLevel <= 20) {
            availableTiers = [...pool.Tier3, ...pool.Tier4]; // Tier 3 and 4
        } else {
            availableTiers = [...pool.Tier4, ...pool.Tier5]; // Tier 4 and 5
        }
    
        // Make sure the availableTiers array is constructed correctly
        console.log("Available tiers based on player level:", playerLevel, availableTiers);
    
        // Choose a random enemy
        const randomEnemy = availableTiers[Math.floor(Math.random() * availableTiers.length)];
        const randomAdjective = enemyAdjectives[Math.floor(Math.random() * enemyAdjectives.length)];
    
        // Apply scaling based on player level within the current tier
        const levelWithinTier = Math.min(playerLevel % 5 || 5, 5);
        const scalingFactor = 0.5 + (levelWithinTier - 1) * 0.1;
    
        // Debugging to see which enemy is selected
        console.log("Selected enemy:", randomEnemy, "with adjective:", randomAdjective);
    
        return {
            ...randomEnemy,
            HP: Math.round(randomEnemy.HP * scalingFactor),
            STR: Math.round(randomEnemy.STR * scalingFactor),
            DEF: Math.round(randomEnemy.DEF * scalingFactor),
            ARC: Math.round(randomEnemy.ARC * scalingFactor),
            EVD: Math.round(randomEnemy.EVD * scalingFactor),
            LCK: Math.round(randomEnemy.LCK * scalingFactor),
            adjective: randomAdjective.adjective
        };
    },    

    playerTurn(skillName = null) {
        if (!this.player) {
            this.appendCombatMessage('Player object is not initialized');
            return 'Player object is not initialized';
        }

        let message = '';

        if (skillName) {
            const skill = this.player.skills.find(skill => skill.name === skillName);
            if (!skill) {
                this.appendCombatMessage("Skill not found");
                return "Skill not found";
            }

            if (this.player.AP < skill.cost) {
                this.appendCombatMessage("Not enough AP to use this skill");
                this.displayCombatOptions();
                return "Not enough AP";
            }

            this.player.AP -= skill.cost;
            this.appendCombatMessage(`Using skill: ${skillName}`);
            const result = skill.execute(this.player, this.enemy);
            if (typeof result.damage !== 'number' || isNaN(result.damage)) {
                this.appendCombatMessage(`Invalid damage returned from skill: ${skillName}`);
                return `Invalid damage returned from skill: ${skillName}`;
            }
            this.enemy.HP = Math.max(this.enemy.HP - result.damage, 0);
            this.appendCombatMessage(result.message);
            this.updateInfoWindow();

            if (this.enemy.HP <= 0) {
                message += ` The ${this.enemy.name} has been defeated!`;
                this.appendCombatMessage(message);
            }
        } else {
            this.appendCombatMessage(`${this.player.name} attacked!`);
            const result = this.calculateDamage(this.player, this.enemy, false);
            if (result.evaded) {
                this.appendCombatMessage(`${this.enemy.name} evaded the attack!`);
            } else {
                this.enemy.HP = Math.max(this.enemy.HP - result.damage, 0);
                this.logDamage(this.player, this.enemy, result.damage, result.critical);
            }
            this.updateInfoWindow();
        }

        this.displayCombatOptions();
        return message;
    },

    enemyTurn() {
        if (this.enemy.isStunned) {
            this.enemy.isStunned = false;
            const message = `${this.enemy.name} is stunned and cannot move.`;
            this.appendCombatMessage(message);
            return message;
        }

        if (!this.enemy) {
            this.appendCombatMessage('Enemy object is not initialized');
            return 'Enemy object is not initialized';
        }

        const message = `${this.enemy.name} attacked!`;
        this.appendCombatMessage(message);

        const result = this.calculateDamage(this.enemy, this.player);
        if (result.evaded) {
            this.appendCombatMessage(`${this.player.name} evaded the attack!`);
        } else {
            this.player.HP = Math.max(this.player.HP - result.damage, 0);
            this.logDamage(this.enemy, this.player, result.damage, result.critical);
        }

        this.updateInfoWindow();
        return message;
    },

    playerAction() {
        this.applyTurnEffects(this.player);
        const result = this.playerTurn();
        const status = this.checkBattleStatus();
        if (status === 'won') {
            this.endCombat("You won the battle!");
        } else if (status === 'lost') {
            this.endCombat("You were defeated...");
            gameOver();
        } else {
            this.enemyTurn();
            this.applyTurnEffects(this.enemy);
            const statusAfterEnemy = this.checkBattleStatus();
            if (statusAfterEnemy === 'won') {
                this.endCombat("You won the battle!");
            } else if (statusAfterEnemy === 'lost') {
                this.endCombat("You were defeated...");
                gameOver();
            } else {
                this.updateInfoWindow();
            }
        }
    },

    useSkillMenu() {
        const player = getPlayerStats();
        const skills = player.skills || [];
        const playerLevel = player.level;
        let skillsHtml = '<h2>Use Skill</h2><ul>';
        skills.forEach(skill => {
            if (playerLevel >= skill.level) {
                const disabled = player.AP < skill.cost ? 'disabled class="disabled-button"' : '';
                skillsHtml += `<li>${skill.name} - ${skill.description} <button onclick="combat.useSkill('${skill.name}')" ${disabled}>Use</button></li>`;
            }
        });
        skillsHtml += '</ul>';
        const contentWindow = document.getElementById('content-window');
        contentWindow.innerHTML = skillsHtml + '<button onclick="combat.displayCombatOptions()">Back</button>';
    },

    useSkill(skillName) {
        const result = this.playerTurn(skillName);
        if (result === "Not enough AP") {
            return;
        }

        const status = this.checkBattleStatus();
        if (status === 'won') {
            this.endCombat("You won the battle!");
        } else if (status === 'lost') {
            this.endCombat("You were defeated...");
            gameOver();
        } else {
            this.enemyTurn();
            const statusAfterEnemy = this.checkBattleStatus();
            if (statusAfterEnemy === 'won') {
                this.endCombat("You won the battle!");
            } else if (statusAfterEnemy === 'lost') {
                this.endCombat("You were defeated...");
                gameOver();
            } else {
                this.updateInfoWindow();
                this.displayCombatOptions();
            }
        }
    },

    useItem() {
        const items = inventory.filter(item => item.types.includes("Health") || item.types.includes("Arcana"));
        let itemsHtml = '<h2>Use Item</h2><ul>';
        items.forEach(item => {
            const description = item.description.split('-')[1]?.trim() || '';
            const disabled = (item.types.includes("Health") && playerStats.HP === playerStats.maxHP) ||
                             (item.types.includes("Arcana") && playerStats.AP === playerStats.maxAP) ? 'disabled class="disabled-button"' : '';
            itemsHtml += `<li>${item.name} - ${description} <button onclick="combat.useItemInCombat('${item.name}')" ${disabled}>Use</button></li>`;
        });
        itemsHtml += '</ul>';
        const contentWindow = document.getElementById('content-window');
        contentWindow.innerHTML = itemsHtml + '<button onclick="combat.displayCombatOptions()">Back</button>';
    },

    useItemInCombat(itemName) {
        const item = inventory.find(i => i.name === itemName);
        if (!item) {
            this.appendCombatMessage(`Item ${itemName} not found.`);
            return;
        }

        const itemMessage = useHealingItem(itemName);
        if (!itemMessage.includes("You used")) {
            return;
        }

        this.appendCombatMessage(itemMessage);
        this.updateInfoWindow();
        const status = this.checkBattleStatus();
        if (status === 'won') {
            this.endCombat("You won the battle!");
        } else if (status === 'lost') {
            this.endCombat("You were defeated...");
            gameOver();
        } else {
            this.enemyTurn();
            const statusAfterEnemy = this.checkBattleStatus();
            if (statusAfterEnemy === 'won') {
                this.endCombat("You won the battle!");
            } else if (statusAfterEnemy === 'lost') {
                this.endCombat("You were defeated...");
                gameOver();
            } else {
                this.displayCombatOptions();
            }
        }
    },

    run() {
        const runSuccessChance = Math.min(0.5 + this.player.LCK / 100, 0.9);
        if (Math.random() < runSuccessChance) {
            this.endCombat("You successfully escaped the battle!");
            lastEventTriggered = 'scene';
        } else {
            this.enemyTurn();
            const statusAfterEnemy = this.checkBattleStatus();
            if (statusAfterEnemy === 'won') {
                this.endCombat("You won the battle!");
            } else if (statusAfterEnemy === 'lost') {
                this.endCombat("You were defeated...");
                gameOver();
            } else {
                this.updateInfoWindow();
            }
        }
    },

    calculateDamage(attacker, defender, isMagic = false, isSkill = false) {
        const baseAttack = isMagic ? attacker.ARC : attacker.STR;
        const defense = isMagic ? defender.ARC : defender.DEF;
        const randomFactor = Math.random() * 0.2 + 0.9;
        const criticalHitChance = Math.min(attacker.LCK / 100, 0.5);
        const isCriticalHit = Math.random() < criticalHitChance;
        const criticalHitMultiplier = isCriticalHit ? 2.0 : 1.0;
        const evasionChance = defender.EVD / 100;

        if (Math.random() < evasionChance && !isSkill) {
            return { damage: 0, evaded: true, critical: false };
        }

        let damage = Math.round(((baseAttack * randomFactor) - (defense * 0.5)) * criticalHitMultiplier);
        damage = Math.max(damage, 1);

        if (defender.shield && defender.shield > 0) {
            if (damage <= defender.shield) {
                defender.shield -= damage;
                damage = 0;
            } else {
                damage -= defender.shield;
                defender.shield = 0;
            }
        }

        return { damage, evaded: false, critical: isCriticalHit };
    },

    applyEffect(effect, target, duration = 0) {
        let message = `${target.name} is affected by ${effect}.`;
        switch (effect) {
            case 'Stun':
                target.isStunned = true;
                message = `${target.name} is stunned!`;
                break;
            case 'Reduce DEF':
                target.DEF = Math.floor(target.DEF * 0.8);
                message = `${target.name}'s defense is reduced!`;
                break;
            case 'Increase DEF':
                target.DEF = Math.floor(target.DEF * 1.5);
                message = `${target.name}'s defense is increased!`;
                break;
            case 'Poison':
                target.isPoisoned = true;
                message = `${target.name} is poisoned!`;
                break;
            case 'Burn':
                target.isBurned = true;
                message = `${target.name} is burning!`;
                break;
            case 'Evasion':
                target.EVD = Math.floor(target.EVD * 1.5);
                message = `${target.name}'s evasion is increased!`;
                break;
            default:
                message = `${effect} applied to ${target.name}.`;
                break;
        }

        if (duration > 0) {
            this.activeEffects[target === this.player ? 'player' : 'enemy'].push({ effect, duration });
        }

        this.appendCombatMessage(message);
    },

    applyDamageOverTimeEffects(target) {
        if (target.isBurned) {
            const burnDamage = Math.round(target.maxHP * 0.05);
            target.HP = Math.max(target.HP - burnDamage, 0);
            this.appendCombatMessage(`${target.name} takes ${burnDamage} burn damage.`);
        }
    },

    applyTurnEffects(target) {
        this.activeEffects[target === this.player ? 'player' : 'enemy'] = this.activeEffects[target === this.player ? 'player' : 'enemy'].filter(effect => {
            this.appendCombatMessage(`${target.name} is affected by ${effect.effect} for ${effect.duration} more turn(s).`);
            if (effect.effect === 'Burn') {
                this.applyDamageOverTimeEffects(target);
            } else if (effect.effect === 'Poison') {
                const poisonDamage = Math.round(target.maxHP * 0.05);
                target.HP = Math.max(target.HP - poisonDamage, 0);
                this.appendCombatMessage(`${target.name} takes ${poisonDamage} poison damage.`);
            }
            effect.duration -= 1;
            if (effect.duration <= 0) {
                this.removeEffect(effect.effect, target);
                return false;
            }
            return true;
        });
    },

    removeEffect(effect, target) {
        switch (effect) {
            case 'Stun':
                target.isStunned = false;
                this.appendCombatMessage(`${target.name} is no longer stunned.`);
                break;
            case 'Burn':
                target.isBurned = false;
                this.appendCombatMessage(`${target.name} is no longer burning.`);
                break;
            case 'Poison':
                target.isPoisoned = false;
                this.appendCombatMessage(`${target.name} is no longer poisoned.`);
                break;
            case 'Increase DEF':
                target.DEF = Math.floor(target.DEF / 1.5);
                this.appendCombatMessage(`${target.name}'s defense returns to normal.`);
                break;
            case 'Reduce DEF':
                target.DEF = Math.floor(target.DEF / 0.8);
                this.appendCombatMessage(`${target.name}'s defense returns to normal.`);
                break;
            case 'Evasion':
                target.EVD = Math.floor(target.EVD / 1.5);
                this.appendCombatMessage(`${target.name}'s evasion returns to normal.`);
                break;
        }
    },

    logDamage(attacker, defender, damage, isCritical) {
        if (damage > 0) {
            const criticalMessage = isCritical ? " Critical hit!" : "";
            this.appendCombatMessage(`${attacker.name} dealt ${damage} damage to ${defender.name}.${criticalMessage}`);
        } else {
            this.appendCombatMessage(`${attacker.name} attacked but dealt no damage to ${defender.name}.`);
        }
    },

    checkBattleStatus() {
        if (this.player.HP <= 0) {
            gameOver();
            return 'lost';
        } else if (this.enemy.HP <= 0) {
            return 'won';
        } else {
            return 'ongoing';
        }
    },

    displayRewards() {
        let rewardsMessage = `<h3>Battle Rewards</h3>`;
        rewardsMessage += `<p>XP Gained: ${this.enemy.XP}</p>`;

        const coinsGained = Math.floor(Math.random() * (this.enemy.coinRange.max - this.enemy.coinRange.min + 1)) + this.enemy.coinRange.min;
        playerStats.coins += coinsGained;

        rewardsMessage += `<p>Coins Gained: ${coinsGained}</p>`;

        if (this.enemy.drops && this.enemy.drops.length > 0) {
            rewardsMessage += `<p>Items Gained:</p><ul>`;
            this.enemy.drops.forEach(drop => {
                if (Math.random() < drop.rate) {
                    const item = getItemDefinition(drop.item);
                    if (item) {
                        rewardsMessage += `<li>${item.name}</li>`;
                        addItemToInventory(item);
                    }
                }
            });
            rewardsMessage += `</ul>`;
        }

        updatePlayerStats(playerStats);
        return rewardsMessage;
    },

    appendCombatMessage(message) {
        console.log(message);
        this.combatLog.push(message);
        this.updateCombatMessagesDisplay();
    },

    updateCombatMessagesDisplay() {
        const combatMessages = document.getElementById('combat-messages');
        if (combatMessages) {
            combatMessages.innerHTML = '';
            this.combatLog.forEach(message => {
                const messageElement = document.createElement('p');
                messageElement.innerText = message;
                combatMessages.appendChild(messageElement);
            });
            combatMessages.scrollTop = combatMessages.scrollHeight;
        }
    },

    updateInfoWindow() {
        const playerHP = document.getElementById('player-hp');
        const playerAP = document.getElementById('player-ap');
        if (playerHP) {
            playerHP.innerText = `HP: ${this.player.HP}/${this.player.maxHP}`;
        }
        if (playerAP) {
            playerAP.innerText = `AP: ${this.player.AP}/${this.player.maxAP}`;
        }
        const enemyHP = document.getElementById('enemy-hp');
        if (enemyHP) {
            const enemyName = `${this.enemy.adjective ? this.enemy.adjective + ' ' : ''}${this.enemy.name}`;
            enemyHP.innerText = `${enemyName}: ${this.enemy.HP}/${this.enemy.maxHP} ${this.getEnemyStatusEffects()}`;
        }
    },

    displayCombatOptions() {
        const contentWindow = document.getElementById('content-window');
        const combatMessages = document.getElementById('combat-messages');
        const enemyName = `${this.enemy.adjective ? this.enemy.adjective + ' ' : ''}${this.enemy.name}`;
    
        contentWindow.innerHTML = `
            <h2>Combat</h2>
            ${combatMessages ? combatMessages.outerHTML : '<div id="combat-messages" style="height: 150px; overflow-y: auto; border: 1px solid #444; background-color: #2a2a2a; padding: 10px; margin-bottom: 10px;"></div>'}
            <p id="enemy-hp">${enemyName}: ${this.enemy.HP}/${this.enemy.maxHP} ${this.getEnemyStatusEffects()}</p>
            <button onclick="combat.playerAction()">Attack</button>
            <button onclick="combat.useSkillMenu()">Use Skill</button>
            <button onclick="combat.useItem()">Use Item</button>
            <button onclick="combat.run()">Run</button>
        `;
    
        this.updateCombatMessagesDisplay();
    },

    getEnemyStatusEffects() {
        let statusEffects = '';
        if (this.enemy.isBurned) statusEffects += 'Burning ';
        if (this.enemy.isPoisoned) statusEffects += 'Poisoned ';
        if (this.enemy.isStunned) statusEffects += 'Stunned ';
        return statusEffects.trim();
    },
    endCombat(message) {
        this.isInCombat = false;
        let rewardsMessage = "";
        if (message.includes("You won")) {
            playerStats.xp += this.enemy.XP;
            while (playerStats.xp >= playerStats.nextLevelXp) {
                levelUpPlayer();
            }
            rewardsMessage = this.displayRewards();
    
            // Check if there was an active quest and mark it as completed
            if (this.activeQuest) {
                checkQuestCompletion({ relatedQuest: this.activeQuest });
                this.activeQuest = null; // Reset active quest
            }
        }
    
        const contentWindow = document.getElementById('content-window');
        contentWindow.innerHTML = `
            <h2>${message}</h2>
            ${rewardsMessage}
        `;
    
        const controlWindow = document.getElementById('control-window');
        if (controlWindow) {
            controlWindow.style.visibility = 'visible';
            controlWindow.style.opacity = 1;
        }
    }
    
};

function getItemDefinition(itemName) {
    return items.find(item => item.name === itemName);
}
