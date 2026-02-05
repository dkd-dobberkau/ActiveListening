# ActiveListening SPA - Design Document

**Datum:** 2025-02-05
**Status:** Approved

## Überblick

Eine minimalistische Single Page Application für kontextbezogene Meeting-Fragen. Die App dient als Meeting-Vorbereitung und Live-Begleiter.

**Core Principle:** Ask one question. Then wait. Silence is data.

## Entscheidungen

| Aspekt | Entscheidung |
|--------|--------------|
| Zweck | Meeting-Vorbereitung + Live-Begleiter |
| Kontext-Auswahl | Kategorie-Chips (10 Kategorien) |
| Fragen-Anzeige | Kartenansicht, eine pro Karte, Swipe/Browse |
| Persistenz | Meeting-Sets in LocalStorage + JSON Export/Import |
| Tech-Stack | Vanilla HTML/CSS/JS, kein Build-Step |
| Responsive | Mobile-first, Touch-Swipe Support |

## Projektstruktur

```
ActiveListening/
├── index.html          # Single HTML file
├── css/
│   └── style.css       # Styling (Cards, Transitions, Responsive)
├── js/
│   ├── app.js          # Hauptlogik, Navigation
│   ├── questions.js    # Fragen-Daten (aus MD extrahiert)
│   └── storage.js      # LocalStorage & Export/Import
└── active_listening_questions.md  # Original (Referenz)
```

## User Interface

### Hauptansicht (Browse-Modus)

```
┌─────────────────────────────────────────┐
│  ActiveListening            [Sets ☰]   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │Core │ │Deep │ │Space│ │Team │ ...   │  ← Kategorie-Chips
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │
│  │   "What is the core issue       │   │
│  │    here?"                       │   │  ← Frage-Karte
│  │                                 │   │
│  │   ─────────────────────────     │   │
│  │   Forces prioritization.        │   │  ← Erklärung
│  │   Cuts through symptoms.        │   │
│  │                                 │   │
│  │              [+ Set]            │   │  ← Zu Set hinzufügen
│  └─────────────────────────────────┘   │
│                                         │
│         ←  ●●○○○○  →                   │  ← Navigation/Dots
│                                         │
└─────────────────────────────────────────┘
```

### Interaktionen

- Swipe links/rechts oder Pfeiltasten für nächste/vorherige Karte
- Chip-Klick wechselt Kategorie (mehrere auswählbar = kombinierte Fragen)
- [+ Set] öffnet Dropdown mit bestehenden Sets oder "Neues Set"

### Sets-Ansicht

```
┌─────────────────────────────────────────┐
│  ← Zurück           Meeting-Sets        │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📋 1-on-1 mit Sarah             │   │
│  │    4 Fragen · Erstellt 05.02.   │   │
│  │                    [▶] [⬇] [✕]  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📋 Team Retro Q1                │   │
│  │    7 Fragen · Erstellt 03.02.   │   │
│  │                    [▶] [⬇] [✕]  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         [+ Neues Set]           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ─────────────────────────────────────  │
│  [⬆ Import]          [⬇ Alle Export]   │
│                                         │
└─────────────────────────────────────────┘
```

### Aktionen pro Set

| Button | Funktion |
|--------|----------|
| [▶] | Set im Karten-Modus öffnen (nur diese Fragen) |
| [⬇] | Einzelnes Set als JSON exportieren |
| [✕] | Set löschen (mit Bestätigung) |

## Datenstrukturen

### questions.js

```javascript
const QUESTIONS = [
  {
    id: "core-1",
    category: "core",
    question: "Why is this important to you?",
    explanation: "Surfaces personal motivation and emotional stakes beyond the rational argument."
  },
  // ... alle 43 Fragen
];

const CATEGORIES = [
  { id: "core", label: "Core", icon: "🎯" },
  { id: "mirror", label: "Mirroring", icon: "🪞" },
  { id: "space", label: "Space", icon: "💭" },
  { id: "meeting-open", label: "Opening", icon: "🚪" },
  { id: "meeting-during", label: "During", icon: "💬" },
  { id: "oneonone", label: "1-on-1", icon: "👥" },
  { id: "governance", label: "Governance", icon: "🏛️" },
  { id: "conflict", label: "Conflict", icon: "⚡" },
  { id: "self-before", label: "Before", icon: "🔮" },
  { id: "self-after", label: "After", icon: "📝" }
];
```

### LocalStorage Schema

```javascript
{
  "sets": [
    {
      "id": "uuid-1234",
      "name": "1-on-1 mit Sarah",
      "created": "2025-02-05",
      "questionIds": ["core-2", "mirror-4", "oneonone-3"]
    }
  ]
}
```

## Styling

| Aspekt | Umsetzung |
|--------|-----------|
| Farbschema | Neutral/dezent, dunkle Schrift auf hellem Grund, Akzentfarbe für aktive Chips |
| Typografie | System-Fonts, große lesbare Frage (1.5rem), kleinere Erklärung |
| Karten | Subtiler Schatten, abgerundete Ecken, viel Whitespace |
| Animationen | Sanftes Slide bei Kartenwechsel (CSS transitions) |

## Responsive Verhalten

```
Desktop (>768px)     Mobile (<768px)
┌────────────────┐   ┌──────────┐
│   [Chips...]   │   │ [Chips]  │  ← Chips wrappen
│                │   │ [mehr..] │
│  ┌──────────┐  │   │          │
│  │  Karte   │  │   │┌────────┐│  ← Karte volle Breite
│  │  max     │  │   ││ Karte  ││
│  │  600px   │  │   ││        ││
│  └──────────┘  │   │└────────┘│
│                │   │          │
│    ← ●●○ →     │   │  ← ●● →  │  ← Touch-Swipe
└────────────────┘   └──────────┘
```

## Touch-Support

- Swipe-Gesten für Kartenwechsel (Touch Events)
- Große Touch-Targets (min 44px)
- Kein Hover-abhängiges UI
