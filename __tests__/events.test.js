const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('event weighting', () => {
    let context;

    beforeEach(() => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        let eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8');
        eventsSrc += `\nglobalThis.getRandomEvent = getRandomEvent;\n` +
                     `globalThis.getRandomEventFromDungeon = getRandomEventFromDungeon;\n` +
                     `globalThis.events = events;\n` +
                     `globalThis.dungeonEvents = dungeonEvents;\n` +
                     `globalThis.questEvents = questEvents;`;
        context = { console };
        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        context.playerStats = { activeQuests: [] };
        vm.runInContext(eventsSrc, context);

        context.events.length = 0;
        context.events.push(
            { name: 'common', weight: 4, terrain: ['test'], action: function(){} },
            { name: 'rare', weight: 1, terrain: ['test'], action: function(){} }
        );
        context.dungeonEvents.length = 0;
        context.dungeonEvents.push(
            { name: 'dCommon', weight: 4, terrain: ['test'], action: function(){} },
            { name: 'dRare', weight: 1, terrain: ['test'], action: function(){} }
        );
    });

    test('getRandomEvent favors higher weights', () => {
        context.setRandomSeed('abc');
        const counts = { common: 0, rare: 0 };
        for (let i = 0; i < 1000; i++) {
            const e = context.getRandomEvent('test');
            counts[e.name]++;
        }
        expect(counts.common).toBeGreaterThan(counts.rare);
    });

    test('getRandomEventFromDungeon favors higher weights', () => {
        context.setRandomSeed('abc');
        const counts = { dCommon: 0, dRare: 0 };
        for (let i = 0; i < 1000; i++) {
            const e = context.getRandomEventFromDungeon('test');
            counts[e.name]++;
        }
        expect(counts.dCommon).toBeGreaterThan(counts.dRare);
    });
});
