# ActiveListening SPA Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimal SPA that displays active listening questions by category with swipeable cards and saveable meeting sets.

**Architecture:** Vanilla JS with no build step. Three modules: questions.js (static data), storage.js (LocalStorage + export/import), app.js (UI logic). Single index.html entry point.

**Tech Stack:** HTML5, CSS3 (flexbox, transitions), Vanilla JavaScript (ES6 modules)

---

## Task 1: Project Structure & HTML Shell

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/questions.js`
- Create: `js/storage.js`
- Create: `js/app.js`

**Step 1: Create directory structure**

Run: `mkdir -p css js`

**Step 2: Create index.html with app shell**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ActiveListening</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="app">
    <header class="header">
      <h1>ActiveListening</h1>
      <button id="btn-sets" class="btn-icon" aria-label="Meeting Sets">☰</button>
    </header>

    <main id="view-browse" class="view active">
      <nav id="categories" class="categories" aria-label="Kategorien"></nav>

      <div class="card-container">
        <div id="card" class="card">
          <p class="card-question"></p>
          <hr>
          <p class="card-explanation"></p>
          <button id="btn-add-to-set" class="btn-secondary">+ Set</button>
        </div>
      </div>

      <div class="navigation">
        <button id="btn-prev" class="btn-nav" aria-label="Vorherige">←</button>
        <div id="dots" class="dots"></div>
        <button id="btn-next" class="btn-nav" aria-label="Nächste">→</button>
      </div>
    </main>

    <aside id="view-sets" class="view">
      <header class="sets-header">
        <button id="btn-back" class="btn-icon" aria-label="Zurück">←</button>
        <h2>Meeting-Sets</h2>
      </header>
      <div id="sets-list" class="sets-list"></div>
      <button id="btn-new-set" class="btn-primary">+ Neues Set</button>
      <div class="sets-actions">
        <button id="btn-import" class="btn-secondary">⬆ Import</button>
        <button id="btn-export-all" class="btn-secondary">⬇ Alle Export</button>
      </div>
      <input type="file" id="file-import" accept=".json" hidden>
    </aside>

    <div id="modal" class="modal hidden">
      <div class="modal-content">
        <h3 id="modal-title"></h3>
        <div id="modal-body"></div>
        <div class="modal-actions">
          <button id="modal-cancel" class="btn-secondary">Abbrechen</button>
          <button id="modal-confirm" class="btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>

  <script type="module" src="js/app.js"></script>
</body>
</html>
```

**Step 3: Create empty JS modules**

Create `js/questions.js`:
```javascript
// Question data extracted from active_listening_questions.md
export const CATEGORIES = [];
export const QUESTIONS = [];
```

Create `js/storage.js`:
```javascript
// LocalStorage and export/import functionality
export const storage = {};
```

Create `js/app.js`:
```javascript
// Main application logic
import { CATEGORIES, QUESTIONS } from './questions.js';
import { storage } from './storage.js';

console.log('ActiveListening loaded');
```

**Step 4: Create minimal CSS**

Create `css/style.css`:
```css
/* ActiveListening SPA */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  color: #1a1a1a;
  background: #f5f5f5;
}

#app {
  max-width: 100%;
  min-height: 100vh;
}

.view {
  display: none;
}

.view.active {
  display: block;
}

.hidden {
  display: none !important;
}
```

**Step 5: Test in browser**

Run: `open index.html` (or use local server)
Expected: Page loads, console shows "ActiveListening loaded"

---

## Task 2: Questions Data

**Files:**
- Modify: `js/questions.js`

**Step 1: Add all categories**

```javascript
export const CATEGORIES = [
  { id: 'core', label: 'Core', icon: '🎯' },
  { id: 'mirror', label: 'Mirroring', icon: '🪞' },
  { id: 'space', label: 'Space', icon: '💭' },
  { id: 'meeting-open', label: 'Opening', icon: '🚪' },
  { id: 'meeting-during', label: 'During', icon: '💬' },
  { id: 'oneonone', label: '1-on-1', icon: '👥' },
  { id: 'governance', label: 'Governance', icon: '🏛️' },
  { id: 'conflict', label: 'Conflict', icon: '⚡' },
  { id: 'self-before', label: 'Before', icon: '🔮' },
  { id: 'self-after', label: 'After', icon: '📝' }
];
```

**Step 2: Add all questions**

```javascript
export const QUESTIONS = [
  // Core
  { id: 'core-1', category: 'core', question: 'Why is this important to you?', explanation: 'Surfaces personal motivation and emotional stakes beyond the rational argument.' },
  { id: 'core-2', category: 'core', question: 'What is the core issue here?', explanation: 'Forces prioritization. Cuts through symptoms to root causes.' },
  { id: 'core-3', category: 'core', question: 'If you could only solve one thing, what would it be?', explanation: 'Reveals true priority when everything feels urgent.' },
  { id: 'core-4', category: 'core', question: 'What would change if we did nothing?', explanation: 'Tests urgency and clarifies real consequences vs. assumed ones.' },
  { id: 'core-5', category: 'core', question: 'What are you most worried about?', explanation: 'Opens the emotional dimension of a seemingly rational discussion.' },
  { id: 'core-6', category: 'core', question: 'What does success look like for you here?', explanation: 'Aligns expectations before jumping into solutions.' },

  // Mirroring
  { id: 'mirror-1', category: 'mirror', question: 'What I\'m hearing is [X]. Is that right?', explanation: 'Mirrors back. Shows you listened. Lets them correct or go deeper.' },
  { id: 'mirror-2', category: 'mirror', question: 'You said [X]. Tell me more about that.', explanation: 'Opens a door they may have only cracked. No judgment, just curiosity.' },
  { id: 'mirror-3', category: 'mirror', question: 'What do you mean by [specific word]?', explanation: 'Catches assumptions. Words like "fair", "respect", "quality" mean different things to different people.' },
  { id: 'mirror-4', category: 'mirror', question: 'Can you give me an example?', explanation: 'Moves from abstract to concrete. Reveals what someone actually experienced.' },
  { id: 'mirror-5', category: 'mirror', question: 'How did that land with you?', explanation: 'Invites emotional response without forcing it.' },
  { id: 'mirror-6', category: 'mirror', question: 'What\'s the part you haven\'t said yet?', explanation: 'Creates permission for the unsaid. Use with trust and care.' },

  // Space
  { id: 'space-1', category: 'space', question: '[Silence — 5 seconds]', explanation: 'Lets the other person process. Many people need a beat before they share something real.' },
  { id: 'space-2', category: 'space', question: 'Take your time.', explanation: 'Removes time pressure. Signals genuine interest.' },
  { id: 'space-3', category: 'space', question: 'I\'d like to understand this better.', explanation: 'Positions you as learner, not judge. Disarms defensiveness.' },
  { id: 'space-4', category: 'space', question: 'That sounds important. Say more.', explanation: 'Validates without evaluating. Opens the door wider.' },
  { id: 'space-5', category: 'space', question: 'I notice you paused there.', explanation: 'Gently draws attention to a nonverbal cue. Use with warmth.' },
  { id: 'space-6', category: 'space', question: 'Let me sit with that for a moment.', explanation: 'Models reflective behavior. Shows that thinking before responding has value.' },

  // Meeting Opening
  { id: 'meeting-open-1', category: 'meeting-open', question: 'What\'s the one thing we need to leave this room with?', explanation: 'Creates shared focus. Prevents drift.' },
  { id: 'meeting-open-2', category: 'meeting-open', question: 'What do you need from me today?', explanation: 'Shifts from presenting to serving. Sets collaborative tone.' },
  { id: 'meeting-open-3', category: 'meeting-open', question: 'Where are we stuck?', explanation: 'Skips status updates. Goes straight to where value is added.' },

  // Meeting During
  { id: 'meeting-during-1', category: 'meeting-during', question: 'Who haven\'t we heard from yet?', explanation: 'Creates space for quieter voices. Models inclusive leadership.' },
  { id: 'meeting-during-2', category: 'meeting-during', question: 'Are we solving the right problem?', explanation: 'Recalibrates when discussion drifts into solution mode too early.' },
  { id: 'meeting-during-3', category: 'meeting-during', question: 'What are we assuming here?', explanation: 'Surfaces blind spots and groupthink.' },
  { id: 'meeting-during-4', category: 'meeting-during', question: 'What would we do if we had half the time?', explanation: 'Forces prioritization and reveals what\'s truly essential.' },

  // 1-on-1
  { id: 'oneonone-1', category: 'oneonone', question: 'What\'s energizing you right now?', explanation: 'Starts positive. Reveals what motivates this person.' },
  { id: 'oneonone-2', category: 'oneonone', question: 'What\'s draining you right now?', explanation: 'Paired with the above: shows the full picture without leading.' },
  { id: 'oneonone-3', category: 'oneonone', question: 'What does support from me look like for you?', explanation: 'Prevents assuming you know what they need.' },
  { id: 'oneonone-4', category: 'oneonone', question: 'Is there something we keep avoiding?', explanation: 'Opens the door to difficult topics with shared ownership.' },
  { id: 'oneonone-5', category: 'oneonone', question: 'What would you do differently if it were entirely your call?', explanation: 'Reveals hidden initiative, ownership, and trust levels.' },

  // Governance
  { id: 'governance-1', category: 'governance', question: 'What would the community say about this decision?', explanation: 'Shifts from internal logic to external impact.' },
  { id: 'governance-2', category: 'governance', question: 'What\'s the concern behind the objection?', explanation: 'Moves past positional disagreement to underlying needs.' },
  { id: 'governance-3', category: 'governance', question: 'Where do we agree? Let\'s start there.', explanation: 'Finds common ground in polarized discussions.' },
  { id: 'governance-4', category: 'governance', question: 'What would we need to see to change our mind?', explanation: 'Introduces intellectual humility and testable criteria.' },
  { id: 'governance-5', category: 'governance', question: 'Is this a decision or a discussion?', explanation: 'Clarifies expectations. Prevents frustration on both sides.' },
  { id: 'governance-6', category: 'governance', question: 'Who else should be in this conversation?', explanation: 'Checks for missing perspectives before committing.' },

  // Conflict
  { id: 'conflict-1', category: 'conflict', question: 'Help me understand where you\'re coming from.', explanation: 'Non-confrontational. Opens dialogue when positions harden.' },
  { id: 'conflict-2', category: 'conflict', question: 'What would need to happen for this to work for both of us?', explanation: 'Shifts from win/lose to shared problem-solving.' },
  { id: 'conflict-3', category: 'conflict', question: 'What\'s really at stake for you here?', explanation: 'Goes beneath the position to the interest.' },
  { id: 'conflict-4', category: 'conflict', question: 'I sense there\'s more here. Am I reading that right?', explanation: 'Gently names the elephant. Gives permission to be honest.' },
  { id: 'conflict-5', category: 'conflict', question: 'What would it take to rebuild trust here?', explanation: 'Forward-looking. Moves from blame to repair.' },
  { id: 'conflict-6', category: 'conflict', question: 'Can we pause and check: are we still on the same side?', explanation: 'Resets the dynamic when conversation turns adversarial.' },

  // Self-Check Before
  { id: 'self-before-1', category: 'self-before', question: 'What am I trying to achieve here?', explanation: 'Clarifies your intention before you walk in.' },
  { id: 'self-before-2', category: 'self-before', question: 'What does the other person need from this?', explanation: 'Shifts perspective. Primes you for listening.' },
  { id: 'self-before-3', category: 'self-before', question: 'Where am I likely to jump in too quickly?', explanation: 'Pre-awareness of your pattern. Prepares the pause.' },

  // Self-Check After
  { id: 'self-after-1', category: 'self-after', question: 'Where did I listen well?', explanation: 'Reinforces positive patterns.' },
  { id: 'self-after-2', category: 'self-after', question: 'Where did I fill the silence?', explanation: 'Honest check without judgment. Data for the log.' },
  { id: 'self-after-3', category: 'self-after', question: 'What did I learn that surprised me?', explanation: 'Captures insight. Rewards curiosity.' },
  { id: 'self-after-4', category: 'self-after', question: 'What question do I wish I had asked?', explanation: 'Builds your repertoire for next time.' }
];
```

**Step 3: Verify data loads**

In browser console: Check that questions.js exports 10 categories and 43 questions.

---

## Task 3: Storage Module

**Files:**
- Modify: `js/storage.js`

**Step 1: Implement storage module**

```javascript
const STORAGE_KEY = 'activelistening_sets';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function loadSets() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSets(sets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}

export const storage = {
  getSets() {
    return loadSets();
  },

  getSet(id) {
    return loadSets().find(s => s.id === id);
  },

  createSet(name) {
    const sets = loadSets();
    const newSet = {
      id: generateId(),
      name,
      created: new Date().toISOString().split('T')[0],
      questionIds: []
    };
    sets.push(newSet);
    saveSets(sets);
    return newSet;
  },

  deleteSet(id) {
    const sets = loadSets().filter(s => s.id !== id);
    saveSets(sets);
  },

  addQuestionToSet(setId, questionId) {
    const sets = loadSets();
    const set = sets.find(s => s.id === setId);
    if (set && !set.questionIds.includes(questionId)) {
      set.questionIds.push(questionId);
      saveSets(sets);
    }
  },

  removeQuestionFromSet(setId, questionId) {
    const sets = loadSets();
    const set = sets.find(s => s.id === setId);
    if (set) {
      set.questionIds = set.questionIds.filter(id => id !== questionId);
      saveSets(sets);
    }
  },

  exportSets(setIds = null) {
    const sets = loadSets();
    const toExport = setIds ? sets.filter(s => setIds.includes(s.id)) : sets;
    return JSON.stringify(toExport, null, 2);
  },

  importSets(jsonString) {
    const imported = JSON.parse(jsonString);
    const sets = loadSets();
    imported.forEach(importedSet => {
      importedSet.id = generateId(); // Neue ID um Konflikte zu vermeiden
      sets.push(importedSet);
    });
    saveSets(sets);
    return imported.length;
  }
};
```

**Step 2: Test in browser console**

```javascript
// Test create
storage.createSet('Test Set');
storage.getSets(); // Should show 1 set

// Test add question
storage.addQuestionToSet(storage.getSets()[0].id, 'core-1');
storage.getSets()[0].questionIds; // Should contain 'core-1'

// Test export
storage.exportSets(); // Should return JSON string

// Cleanup
storage.deleteSet(storage.getSets()[0].id);
```

---

## Task 4: CSS Styling

**Files:**
- Modify: `css/style.css`

**Step 1: Complete styling**

```css
/* ActiveListening SPA */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #f5f5f5;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-accent: #2563eb;
  --color-accent-light: #dbeafe;
  --color-border: #e5e5e5;
  --radius: 12px;
  --shadow: 0 2px 8px rgba(0,0,0,0.08);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-bg);
}

#app {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.header h1 {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Buttons */
.btn-icon {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: background 0.2s;
}

.btn-icon:hover {
  background: var(--color-accent-light);
}

.btn-primary {
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.btn-secondary:hover {
  border-color: var(--color-accent);
}

.btn-nav {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-nav:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Views */
.view {
  display: none;
  flex: 1;
  padding: 1rem;
}

.view.active {
  display: flex;
  flex-direction: column;
}

/* Categories */
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.chip:hover {
  border-color: var(--color-accent);
}

.chip.active {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

/* Card */
.card-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  overflow: hidden;
}

.card {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.card.slide-left {
  transform: translateX(-100%);
  opacity: 0;
}

.card.slide-right {
  transform: translateX(100%);
  opacity: 0;
}

.card-question {
  font-size: 1.5rem;
  font-weight: 500;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.card hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1rem 0;
}

.card-explanation {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}

/* Navigation */
.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  transition: background 0.2s;
}

.dot.active {
  background: var(--color-accent);
}

/* Sets View */
.sets-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sets-header h2 {
  font-size: 1.25rem;
}

.sets-list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.set-item {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: var(--shadow);
}

.set-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.set-item-name {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.set-item-meta {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.set-item-actions {
  display: flex;
  gap: 0.5rem;
}

.set-item-actions button {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.sets-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.sets-actions button {
  flex: 1;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
}

.modal-content {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
}

.modal-content h3 {
  margin-bottom: 1rem;
}

.modal-content input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-actions button {
  width: auto;
}

/* Hidden */
.hidden {
  display: none !important;
}

/* Responsive */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .card-question {
    font-size: 1.25rem;
  }

  .dots {
    max-width: 150px;
    overflow: hidden;
  }
}
```

**Step 2: Verify styling in browser**

Open index.html and verify the basic layout renders correctly.

---

## Task 5: App Logic - Category Selection & Card Display

**Files:**
- Modify: `js/app.js`

**Step 1: Implement core app logic**

```javascript
import { CATEGORIES, QUESTIONS } from './questions.js';
import { storage } from './storage.js';

// State
let state = {
  activeCategories: ['core'],
  currentIndex: 0,
  filteredQuestions: [],
  currentView: 'browse',
  viewingSetId: null
};

// DOM Elements
const elements = {
  categoriesNav: document.getElementById('categories'),
  card: document.getElementById('card'),
  cardQuestion: document.querySelector('.card-question'),
  cardExplanation: document.querySelector('.card-explanation'),
  dots: document.getElementById('dots'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  btnSets: document.getElementById('btn-sets'),
  btnBack: document.getElementById('btn-back'),
  btnAddToSet: document.getElementById('btn-add-to-set'),
  btnNewSet: document.getElementById('btn-new-set'),
  btnImport: document.getElementById('btn-import'),
  btnExportAll: document.getElementById('btn-export-all'),
  fileImport: document.getElementById('file-import'),
  viewBrowse: document.getElementById('view-browse'),
  viewSets: document.getElementById('view-sets'),
  setsList: document.getElementById('sets-list'),
  modal: document.getElementById('modal'),
  modalTitle: document.getElementById('modal-title'),
  modalBody: document.getElementById('modal-body'),
  modalCancel: document.getElementById('modal-cancel'),
  modalConfirm: document.getElementById('modal-confirm')
};

// Filter questions by active categories
function filterQuestions() {
  if (state.viewingSetId) {
    const set = storage.getSet(state.viewingSetId);
    state.filteredQuestions = set ?
      QUESTIONS.filter(q => set.questionIds.includes(q.id)) : [];
  } else {
    state.filteredQuestions = QUESTIONS.filter(q =>
      state.activeCategories.includes(q.category)
    );
  }
  state.currentIndex = 0;
}

// Render category chips
function renderCategories() {
  elements.categoriesNav.innerHTML = CATEGORIES.map(cat => `
    <button class="chip ${state.activeCategories.includes(cat.id) ? 'active' : ''}"
            data-category="${cat.id}">
      ${cat.icon} ${cat.label}
    </button>
  `).join('');
}

// Render current card
function renderCard(direction = null) {
  const question = state.filteredQuestions[state.currentIndex];

  if (!question) {
    elements.cardQuestion.textContent = 'Keine Fragen in dieser Kategorie';
    elements.cardExplanation.textContent = '';
    elements.btnAddToSet.classList.add('hidden');
    return;
  }

  if (direction) {
    elements.card.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
    setTimeout(() => {
      updateCardContent(question);
      elements.card.classList.remove('slide-left', 'slide-right');
    }, 150);
  } else {
    updateCardContent(question);
  }
}

function updateCardContent(question) {
  elements.cardQuestion.textContent = `"${question.question}"`;
  elements.cardExplanation.textContent = question.explanation;
  elements.btnAddToSet.classList.remove('hidden');
  renderDots();
  updateNavButtons();
}

// Render navigation dots
function renderDots() {
  const total = state.filteredQuestions.length;
  const maxDots = 7;

  if (total <= maxDots) {
    elements.dots.innerHTML = state.filteredQuestions.map((_, i) =>
      `<span class="dot ${i === state.currentIndex ? 'active' : ''}"></span>`
    ).join('');
  } else {
    // Show subset of dots around current position
    let start = Math.max(0, state.currentIndex - 3);
    let end = Math.min(total, start + maxDots);
    if (end - start < maxDots) start = Math.max(0, end - maxDots);

    elements.dots.innerHTML = Array.from({ length: end - start }, (_, i) =>
      `<span class="dot ${start + i === state.currentIndex ? 'active' : ''}"></span>`
    ).join('');
  }
}

// Update navigation button states
function updateNavButtons() {
  elements.btnPrev.disabled = state.currentIndex === 0;
  elements.btnNext.disabled = state.currentIndex >= state.filteredQuestions.length - 1;
}

// Navigate to next/prev card
function navigate(direction) {
  if (direction === 'next' && state.currentIndex < state.filteredQuestions.length - 1) {
    state.currentIndex++;
    renderCard('next');
  } else if (direction === 'prev' && state.currentIndex > 0) {
    state.currentIndex--;
    renderCard('prev');
  }
}

// Toggle category
function toggleCategory(categoryId) {
  const idx = state.activeCategories.indexOf(categoryId);
  if (idx > -1) {
    if (state.activeCategories.length > 1) {
      state.activeCategories.splice(idx, 1);
    }
  } else {
    state.activeCategories.push(categoryId);
  }
  state.viewingSetId = null;
  filterQuestions();
  renderCategories();
  renderCard();
}

// Switch views
function showView(viewName) {
  state.currentView = viewName;
  elements.viewBrowse.classList.toggle('active', viewName === 'browse');
  elements.viewSets.classList.toggle('active', viewName === 'sets');

  if (viewName === 'sets') {
    renderSetsList();
  }
}

// Render sets list
function renderSetsList() {
  const sets = storage.getSets();

  if (sets.length === 0) {
    elements.setsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 2rem;">Noch keine Sets erstellt</p>';
    return;
  }

  elements.setsList.innerHTML = sets.map(set => `
    <div class="set-item" data-set-id="${set.id}">
      <div class="set-item-header">
        <span class="set-item-name">📋 ${set.name}</span>
        <div class="set-item-actions">
          <button class="btn-secondary btn-play" title="Öffnen">▶</button>
          <button class="btn-secondary btn-export" title="Export">⬇</button>
          <button class="btn-secondary btn-delete" title="Löschen">✕</button>
        </div>
      </div>
      <div class="set-item-meta">${set.questionIds.length} Fragen · ${set.created}</div>
    </div>
  `).join('');
}

// Modal helpers
let modalCallback = null;

function showModal(title, bodyHtml, onConfirm) {
  elements.modalTitle.textContent = title;
  elements.modalBody.innerHTML = bodyHtml;
  elements.modal.classList.remove('hidden');
  modalCallback = onConfirm;

  const input = elements.modalBody.querySelector('input');
  if (input) input.focus();
}

function hideModal() {
  elements.modal.classList.add('hidden');
  modalCallback = null;
}

// Show add-to-set modal
function showAddToSetModal() {
  const question = state.filteredQuestions[state.currentIndex];
  if (!question) return;

  const sets = storage.getSets();
  let html = '';

  if (sets.length > 0) {
    html += '<div style="margin-bottom: 1rem;">';
    sets.forEach(set => {
      const hasQuestion = set.questionIds.includes(question.id);
      html += `
        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; cursor: pointer;">
          <input type="checkbox" value="${set.id}" ${hasQuestion ? 'checked' : ''}>
          ${set.name}
        </label>
      `;
    });
    html += '</div>';
  }

  html += '<input type="text" id="new-set-name" placeholder="Oder neues Set erstellen...">';

  showModal('Zu Set hinzufügen', html, () => {
    const newSetName = document.getElementById('new-set-name').value.trim();
    const checkboxes = elements.modalBody.querySelectorAll('input[type="checkbox"]');

    // Handle existing sets
    checkboxes.forEach(cb => {
      if (cb.checked) {
        storage.addQuestionToSet(cb.value, question.id);
      } else {
        storage.removeQuestionFromSet(cb.value, question.id);
      }
    });

    // Create new set if name provided
    if (newSetName) {
      const newSet = storage.createSet(newSetName);
      storage.addQuestionToSet(newSet.id, question.id);
    }

    hideModal();
  });
}

// Download helper
function downloadJson(content, filename) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Touch/Swipe handling
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      navigate('next');
    } else {
      navigate('prev');
    }
  }
}

// Event Listeners
function initEventListeners() {
  // Category selection
  elements.categoriesNav.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      toggleCategory(chip.dataset.category);
    }
  });

  // Navigation
  elements.btnPrev.addEventListener('click', () => navigate('prev'));
  elements.btnNext.addEventListener('click', () => navigate('next'));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (state.currentView !== 'browse') return;
    if (e.key === 'ArrowLeft') navigate('prev');
    if (e.key === 'ArrowRight') navigate('next');
  });

  // Touch/Swipe
  elements.card.addEventListener('touchstart', handleTouchStart, { passive: true });
  elements.card.addEventListener('touchend', handleTouchEnd, { passive: true });

  // View switching
  elements.btnSets.addEventListener('click', () => showView('sets'));
  elements.btnBack.addEventListener('click', () => {
    state.viewingSetId = null;
    filterQuestions();
    renderCategories();
    renderCard();
    showView('browse');
  });

  // Add to set
  elements.btnAddToSet.addEventListener('click', showAddToSetModal);

  // New set
  elements.btnNewSet.addEventListener('click', () => {
    showModal('Neues Set', '<input type="text" id="new-set-name" placeholder="Name des Sets">', () => {
      const name = document.getElementById('new-set-name').value.trim();
      if (name) {
        storage.createSet(name);
        renderSetsList();
      }
      hideModal();
    });
  });

  // Sets list actions
  elements.setsList.addEventListener('click', (e) => {
    const setItem = e.target.closest('.set-item');
    if (!setItem) return;
    const setId = setItem.dataset.setId;

    if (e.target.closest('.btn-play')) {
      state.viewingSetId = setId;
      filterQuestions();
      elements.categoriesNav.innerHTML = `<span class="chip active">📋 ${storage.getSet(setId).name}</span>`;
      renderCard();
      showView('browse');
    } else if (e.target.closest('.btn-export')) {
      const content = storage.exportSets([setId]);
      downloadJson(content, `set-${setId}.json`);
    } else if (e.target.closest('.btn-delete')) {
      showModal('Set löschen?', '<p>Diese Aktion kann nicht rückgängig gemacht werden.</p>', () => {
        storage.deleteSet(setId);
        renderSetsList();
        hideModal();
      });
    }
  });

  // Import/Export
  elements.btnExportAll.addEventListener('click', () => {
    const content = storage.exportSets();
    downloadJson(content, 'activelistening-sets.json');
  });

  elements.btnImport.addEventListener('click', () => {
    elements.fileImport.click();
  });

  elements.fileImport.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const count = storage.importSets(event.target.result);
        renderSetsList();
        alert(`${count} Set(s) importiert`);
      } catch (err) {
        alert('Fehler beim Import: Ungültiges Format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Modal
  elements.modalCancel.addEventListener('click', hideModal);
  elements.modalConfirm.addEventListener('click', () => {
    if (modalCallback) modalCallback();
  });

  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) hideModal();
  });
}

// Initialize
function init() {
  filterQuestions();
  renderCategories();
  renderCard();
  initEventListeners();
}

init();
```

**Step 2: Test complete app in browser**

1. Open index.html
2. Click category chips - questions should filter
3. Use arrows or swipe to navigate cards
4. Click "+ Set" to add question to a set
5. Click ☰ to view sets
6. Test export/import

---

## Task 6: Final Testing & Polish

**Step 1: Test all features**

- [ ] Category selection (single and multiple)
- [ ] Card navigation (buttons, keyboard, swipe)
- [ ] Card animation on navigation
- [ ] Create new set
- [ ] Add question to set
- [ ] View set in card mode
- [ ] Export single set
- [ ] Export all sets
- [ ] Import sets
- [ ] Delete set
- [ ] Responsive layout (resize browser)

**Step 2: Verify offline functionality**

1. Load app
2. Disconnect network
3. Verify all features still work

**Step 3: Update CLAUDE.md**

Add development section to existing CLAUDE.md documenting the SPA structure.
