const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('event weighting', () => {
    let context;

    beforeEach(() => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/events.json'), 'utf8'));
        let eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8');
        eventsSrc += `\nglobalThis.getRandomEvent = getRandomEvent;\n` +
                     `globalThis.getRandomEventFromDungeon = getRandomEventFromDungeon;\n` +
                     `globalThis.events = events;\n` +
                     `globalThis.dungeonEvents = dungeonEvents;\n` +
                     `globalThis.questEvents = questEvents;`;
        context = { console, EVENTS_DATA: eventsData };
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

describe('executeEventEffect', () => {
    test('combat effect is case-insensitive', () => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8') +
            '\n;globalThis.executeEventEffect = executeEventEffect;';

        const combatMock = { startCombat: jest.fn() };
        const context = {
            console,
            EVENTS_DATA: { events: [], dungeonEvents: [], questEvents: [] },
            document: { getElementById: () => ({ style: {} }) },
            combat: combatMock
        };

        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        vm.runInContext(eventsSrc, context);

        const event = { name: 'Encounter', effect: 'Combat' };
        context.executeEventEffect(event);

        expect(combatMock.startCombat).toHaveBeenCalled();
    });

    test('shop effect triggers merchant helpers', () => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8') +
            '\n;globalThis.executeEventEffect = executeEventEffect;';

        const context = {
            console,
            EVENTS_DATA: { events: [], dungeonEvents: [], questEvents: [] },
            document: { getElementById: () => ({ style: {}, innerHTML: '' }) },
            currentMerchantName: ''
        };

        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        vm.runInContext(eventsSrc, context);

        context.generateMerchantInventory = jest.fn();
        context.displayMerchantEncounter = jest.fn();

        const event = { name: 'Merchant', effect: 'Shop' };
        context.executeEventEffect(event);

        expect(context.generateMerchantInventory).toHaveBeenCalled();
        expect(context.displayMerchantEncounter).toHaveBeenCalled();
        expect(context.currentMerchantName).toBe('Merchant');
    });


    test('augment gear effect confirms augmentation', () => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8') +
            '\n;globalThis.executeEventEffect = executeEventEffect;';

        const context = {
            console,
            EVENTS_DATA: { events: [], dungeonEvents: [], questEvents: [] },
            document: { getElementById: () => ({ style: {}, innerHTML: '' }) }
        };

        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        vm.runInContext(eventsSrc, context);

        context.confirmAugmentEquipmentWithItems = jest.fn();

        const event = { name: 'Stranger', effect: 'augment gear' };
        context.executeEventEffect(event);

        expect(context.confirmAugmentEquipmentWithItems).toHaveBeenCalledWith('weapon');
    });

    test('lose coins or combat effect prompts choice', () => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8') +
            '\n;globalThis.executeEventEffect = executeEventEffect;';

        const context = {
            console,
            EVENTS_DATA: { events: [], dungeonEvents: [], questEvents: [] },
            document: { getElementById: () => ({ style: {}, innerHTML: '' }) }
        };

        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        vm.runInContext(eventsSrc, context);

        context.promptLoseCoinsOrCombat = jest.fn();

        const event = { name: 'Bandit', effect: 'lose coins or combat', minAmount: 10, maxAmount: 10 };
        context.executeEventEffect(event);

        expect(context.promptLoseCoinsOrCombat).toHaveBeenCalledWith(10, event);
    });

    test('find effect completes quest', () => {
        const seedSrc = fs.readFileSync(path.join(__dirname, '../seedrandom.min.js'), 'utf8');
        const utilsSrc = fs.readFileSync(path.join(__dirname, '../utils.js'), 'utf8');
        const eventsSrc = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8') +
            '\n;globalThis.executeEventEffect = executeEventEffect;';

        const context = {
            console,
            EVENTS_DATA: { events: [], dungeonEvents: [], questEvents: [] },
            document: { getElementById: () => ({ style: {}, innerHTML: '' }) },
            playerStats: { coins: 0, activeQuests: [{ title: 'Lost Necklace', completed: false }] }
        };

        vm.createContext(context);
        vm.runInContext(seedSrc, context);
        vm.runInContext(utilsSrc, context);
        vm.runInContext(eventsSrc, context);

        context.updatePlayerStats = jest.fn();
        context.displayEventEffect = jest.fn();
        context.checkQuestCompletion = jest.fn();

        const event = { name: 'Lost Necklace', description: 'A necklace glints.', effect: 'find', relatedQuest: 'Lost Necklace' };
        context.executeEventEffect(event);

        expect(context.displayEventEffect).toHaveBeenCalled();
        expect(context.checkQuestCompletion).toHaveBeenCalledWith(event);
    });
});
