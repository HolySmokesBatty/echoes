# Echoes Dungeon Quest Testing

This repository contains the code for the browser-based RPG "Echoes". The
following steps demonstrate how to verify that dungeon quest events, such as
**"Relic of the Lost Temple"**, can be encountered when their quest is active.

## Manual Test Steps

1. Open `index.html` in a modern web browser.
2. Use the console (F12) to modify the player's active quests:
   ```javascript
   playerStats.activeQuests = [
       { title: "Relic of the Lost Temple", completed: false }
   ];
   ```
3. Enter any dungeon and move until a random event triggers. The event
   "Relic of the Lost Temple" should appear in the rotation of dungeon events.
4. Interact with the event to verify quest progress.

These steps confirm that dungeon quest events are included when their
corresponding quest is active.
