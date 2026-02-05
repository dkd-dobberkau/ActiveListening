# ActiveListening

A minimalist web app for context-aware meeting questions. Based on the principle:

> **Ask one question. Then wait. Silence is data.**

🇩🇪 [Deutsche Version](README.de.md)

## Demo

**[Live Demo](https://dkd-dobberkau.github.io/ActiveListening/)**

## Screenshots

### Card View
![Browse View](screenshots/browse-view.png)

### Mobile View
![Mobile View](screenshots/mobile-view.png)

### Manage Meeting Sets
![Sets View](screenshots/sets-view.png)

### Add Question to Set
![Add to Set Modal](screenshots/add-to-set-modal.png)

## Features

- **10 categories** with 43 curated questions for effective listening
- **Card view** with swipe gestures and keyboard navigation
- **Meeting sets** - create, save, and reuse question collections
- **Export/Import** sets as JSON
- **Offline capable** - works without internet connection
- **Responsive design** - optimized for desktop and mobile

## Categories

| Category | Description |
|----------|-------------|
| 🎯 Core | Questions to find what actually matters |
| 🪞 Mirroring | Deepening and reflecting back |
| 💭 Space | Creating room for reflection |
| 🚪 Opening | Meeting openers |
| 💬 During | During discussion |
| 👥 1-on-1 | One-on-one conversations |
| 🏛️ Governance | Community & governance |
| ⚡ Conflict | Navigating tension |
| 🔮 Before | Self-check before |
| 📝 After | Self-check after |

## Technology

- **Vanilla JavaScript** (ES6 Modules)
- **No build step** - runs directly in the browser
- **LocalStorage** for persistence
- **CSS3** with Flexbox and animations

## Installation

No installation required. Just clone and open:

```bash
git clone https://github.com/dkd-dobberkau/ActiveListening.git
cd ActiveListening

# Option 1: Open directly
open index.html

# Option 2: Local server
python3 -m http.server 8080
# Open http://localhost:8080
```

## Usage

1. **Select category** - Click one or more chips
2. **Browse questions** - Swipe or use arrow keys
3. **Add to set** - Click "+ Set" on a question
4. **Manage sets** - Click ☰ in the top right

## License

[MIT](LICENSE)

## Credits

Developed for [dkd Internet Service GmbH](https://www.dkd.de)
