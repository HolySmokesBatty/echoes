const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');
const vm = require('vm');

test('showStartScreen renders menu and resets state', () => {
  const html = `
    <div id="content-window"></div>
    <div class="info-window"></div>
    <div id="control-window" class="control-window"></div>
  `;
  const dom = new JSDOM(html, {runScripts: 'outside-only'});
  const context = dom.getInternalVMContext();
  // Prevent DOMContentLoaded side effects during tests
  context.document.addEventListener = () => {};
  context.window.addEventListener = () => {};
  class LocalStorageMock {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = String(value); }
    removeItem(key) { delete this.store[key]; }
  }
  Object.defineProperty(context, 'localStorage', {value: new LocalStorageMock(), writable: true});

  // Load GameState and script into the JSDOM context
  let gameStateSrc = fs.readFileSync(path.join(__dirname, '../GameState.js'), 'utf8');
  gameStateSrc += '\n;globalThis.GameState = GameState;';
  const scriptSrc = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
  vm.runInContext(gameStateSrc, context);
  vm.runInContext(scriptSrc, context);

  context.showStartScreen();
  const content = dom.window.document.getElementById('content-window').innerHTML;
  expect(content).toMatch('New Game');
  expect(dom.window.GameState.isCharacterCreated).toBe(false);
  expect(dom.window.GameState.lastEventTriggered).toBe(null);
});
