let enemyAdjectives = [];
let enemyTiers = {};
let dungeonEnemies = {};

(function(){
    let data = null;
    if (typeof ENEMIES_DATA !== 'undefined') {
        data = ENEMIES_DATA;
    } else if (typeof require === 'function') {
        try {
            const fs = require('fs');
            const path = require('path');
            data = JSON.parse(fs.readFileSync(path.join(__dirname,'data/enemies.json'),'utf8'));
        } catch (e) {}
    } else if (typeof XMLHttpRequest !== 'undefined') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/enemies.json', false);
        xhr.send(null);
        if (xhr.status === 200) data = JSON.parse(xhr.responseText);
    }
    data = data || { enemyAdjectives: [], enemyTiers: {}, dungeonEnemies: {} };
    enemyAdjectives = data.enemyAdjectives;
    enemyTiers = data.enemyTiers;
    dungeonEnemies = data.dungeonEnemies;
})();

