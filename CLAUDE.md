# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ActiveListening is a vanilla JavaScript SPA for browsing active listening questions by category, with the ability to create and save meeting-specific question sets.

## Core Principle

> Ask one question. Then wait. Silence is data.

## Project Structure

```
ActiveListening/
├── index.html              # App shell
├── css/style.css           # Styling (responsive, animations)
├── js/
│   ├── app.js              # Main logic, event handling, state
│   ├── questions.js        # 43 questions in 10 categories
│   └── storage.js          # LocalStorage CRUD, export/import
├── active_listening_questions.md  # Source reference
└── docs/plans/             # Design documents
```

## Development

**No build step required.** Open `index.html` directly or serve locally:

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Architecture

- **Vanilla JS** with ES6 modules (`type="module"`)
- **State management** in `app.js`: activeCategories, currentIndex, filteredQuestions, currentView, viewingSetId
- **Persistence**: LocalStorage key `activelistening_sets`
- **No dependencies** - works offline

## Key Features

| Feature | Implementation |
|---------|----------------|
| Category filtering | Multi-select chips, questions filtered by active categories |
| Card navigation | Swipe, arrow keys, prev/next buttons with slide animation |
| Meeting sets | Create, view, export, import sets of curated questions |
| Responsive | Mobile-first, touch targets 44px minimum |

## Question Categories (10)

`core`, `mirror`, `space`, `meeting-open`, `meeting-during`, `oneonone`, `governance`, `conflict`, `self-before`, `self-after`

## Adding Questions

Edit `js/questions.js`:
```javascript
{ id: 'category-N', category: 'category', question: '...', explanation: '...' }
```
