# Echoes of The Darkwood

Echoes is a lightweight browser RPG written in vanilla JavaScript. The game features procedural maps, random events, dungeons, quests and a simple turn-based combat system.

## Getting Started

1. Clone the repository and install development dependencies:
   ```bash
   npm install
   ```
2. Open `index.html` in any modern browser to start playing.

## Features

- Procedural world map with towns and dungeons
- Random encounters and events defined in `data/events.json`
- Quests tracked in `quests.js`
- Inventory management and equipment
- Save/load support via `saveLoad.js`

## Testing

Before running the tests for the first time, install the project's dependencies:

```bash
npm install
```

Internet access is required for this installation. Afterward, run the tests with:

```bash
npm test
```

### Manual Quest Event Test

To verify that quest-specific dungeon events appear when the quest is active:

1. Launch the game in your browser.
2. Open the developer console (F12) and run:
   ```javascript
   playerStats.activeQuests = [
       { title: "Relic of the Lost Temple", completed: false }
   ];
   ```
3. Enter any dungeon and move until a random event triggers. "Relic of the Lost Temple" should appear in the rotation.
4. Interact with the event to confirm quest progress.

## Customizing Game Data

The core data for Echoes lives in the `data/` directory. Editing these files lets you create your own variation of the game:

- **`events.json`** – Defines random events, dungeon events and quest events. Adjust the `weight` field to change how often an event appears or add new objects to introduce fresh encounters.
- **`items.json`** – Contains all usable items and equipment. Each item lists its `effect`, `types` and `tier`. Add new entries or tweak existing stats to rebalance loot.
- **`enemies.json`** – Describes enemy templates, stats and loot tables. You can modify enemy attributes or provide additional drop items.
- **`classes.json`** – Holds starting stats and skills for each player class. Add your own class with unique growth rates and allowed equipment.
- **`towns.json`** – Supplies prefixes, suffixes and descriptions used when generating towns. Expanding these arrays results in more varied settlement names.

After editing the JSON files, reload `index.html` in your browser to see the changes in game. Running `npm test` will help verify that basic functionality still works with your new data.

## Contributing

Before submitting a pull request, please run the linter and test suite:

```bash
npm run lint
npm test
```

Following these steps helps keep the codebase consistent and ensures tests continue to pass.
