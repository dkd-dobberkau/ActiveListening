// Question data extracted from active_listening_questions.md

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

export const QUESTIONS = [
  // 1. Understanding the Core (6 questions)
  {
    id: 'core-1',
    category: 'core',
    question: 'Why is this important to you?',
    explanation: 'Surfaces personal motivation and emotional stakes beyond the rational argument.'
  },
  {
    id: 'core-2',
    category: 'core',
    question: 'What is the core issue here?',
    explanation: 'Forces prioritization. Cuts through symptoms to root causes.'
  },
  {
    id: 'core-3',
    category: 'core',
    question: 'If you could only solve one thing, what would it be?',
    explanation: 'Reveals true priority when everything feels urgent.'
  },
  {
    id: 'core-4',
    category: 'core',
    question: 'What would change if we did nothing?',
    explanation: 'Tests urgency and clarifies real consequences vs. assumed ones.'
  },
  {
    id: 'core-5',
    category: 'core',
    question: 'What are you most worried about?',
    explanation: 'Opens the emotional dimension of a seemingly rational discussion.'
  },
  {
    id: 'core-6',
    category: 'core',
    question: 'What does success look like for you here?',
    explanation: 'Aligns expectations before jumping into solutions.'
  },

  // 2. Deepening and Mirroring (6 questions)
  {
    id: 'mirror-1',
    category: 'mirror',
    question: 'What I\'m hearing is [X]. Is that right?',
    explanation: 'Mirrors back. Shows you listened. Lets them correct or go deeper.'
  },
  {
    id: 'mirror-2',
    category: 'mirror',
    question: 'You said [X]. Tell me more about that.',
    explanation: 'Opens a door they may have only cracked. No judgment, just curiosity.'
  },
  {
    id: 'mirror-3',
    category: 'mirror',
    question: 'What do you mean by [specific word]?',
    explanation: 'Catches assumptions. Words like "fair", "respect", "quality" mean different things to different people.'
  },
  {
    id: 'mirror-4',
    category: 'mirror',
    question: 'Can you give me an example?',
    explanation: 'Moves from abstract to concrete. Reveals what someone actually experienced.'
  },
  {
    id: 'mirror-5',
    category: 'mirror',
    question: 'How did that land with you?',
    explanation: 'Invites emotional response without forcing it.'
  },
  {
    id: 'mirror-6',
    category: 'mirror',
    question: 'What\'s the part you haven\'t said yet?',
    explanation: 'Creates permission for the unsaid. Use with trust and care.'
  },

  // 3. Creating Space (6 moves)
  {
    id: 'space-1',
    category: 'space',
    question: '[Silence — 5 seconds]',
    explanation: 'Lets the other person process. Many people need a beat before they share something real.'
  },
  {
    id: 'space-2',
    category: 'space',
    question: 'Take your time.',
    explanation: 'Removes time pressure. Signals genuine interest.'
  },
  {
    id: 'space-3',
    category: 'space',
    question: 'I\'d like to understand this better.',
    explanation: 'Positions you as learner, not judge. Disarms defensiveness.'
  },
  {
    id: 'space-4',
    category: 'space',
    question: 'That sounds important. Say more.',
    explanation: 'Validates without evaluating. Opens the door wider.'
  },
  {
    id: 'space-5',
    category: 'space',
    question: 'I notice you paused there.',
    explanation: 'Gently draws attention to a nonverbal cue. Use with warmth.'
  },
  {
    id: 'space-6',
    category: 'space',
    question: 'Let me sit with that for a moment.',
    explanation: 'Models reflective behavior. Shows that thinking before responding has value.'
  },

  // 4. Team Meetings - Opening a meeting (3 questions)
  {
    id: 'meeting-open-1',
    category: 'meeting-open',
    question: 'What\'s the one thing we need to leave this room with?',
    explanation: 'Creates shared focus. Prevents drift.'
  },
  {
    id: 'meeting-open-2',
    category: 'meeting-open',
    question: 'What do you need from me today?',
    explanation: 'Shifts from presenting to serving. Sets collaborative tone.'
  },
  {
    id: 'meeting-open-3',
    category: 'meeting-open',
    question: 'Where are we stuck?',
    explanation: 'Skips status updates. Goes straight to where value is added.'
  },

  // 4. Team Meetings - During discussion (4 questions)
  {
    id: 'meeting-during-1',
    category: 'meeting-during',
    question: 'Who haven\'t we heard from yet?',
    explanation: 'Creates space for quieter voices. Models inclusive leadership.'
  },
  {
    id: 'meeting-during-2',
    category: 'meeting-during',
    question: 'Are we solving the right problem?',
    explanation: 'Recalibrates when discussion drifts into solution mode too early.'
  },
  {
    id: 'meeting-during-3',
    category: 'meeting-during',
    question: 'What are we assuming here?',
    explanation: 'Surfaces blind spots and groupthink.'
  },
  {
    id: 'meeting-during-4',
    category: 'meeting-during',
    question: 'What would we do if we had half the time?',
    explanation: 'Forces prioritization and reveals what\'s truly essential.'
  },

  // 4. Team Meetings - In 1-on-1s (5 questions)
  {
    id: 'oneonone-1',
    category: 'oneonone',
    question: 'What\'s energizing you right now?',
    explanation: 'Starts positive. Reveals what motivates this person.'
  },
  {
    id: 'oneonone-2',
    category: 'oneonone',
    question: 'What\'s draining you right now?',
    explanation: 'Paired with the above: shows the full picture without leading.'
  },
  {
    id: 'oneonone-3',
    category: 'oneonone',
    question: 'What does support from me look like for you?',
    explanation: 'Prevents assuming you know what they need.'
  },
  {
    id: 'oneonone-4',
    category: 'oneonone',
    question: 'Is there something we keep avoiding?',
    explanation: 'Opens the door to difficult topics with shared ownership.'
  },
  {
    id: 'oneonone-5',
    category: 'oneonone',
    question: 'What would you do differently if it were entirely your call?',
    explanation: 'Reveals hidden initiative, ownership, and trust levels.'
  },

  // 5. Community and Governance (6 questions)
  {
    id: 'governance-1',
    category: 'governance',
    question: 'What would the community say about this decision?',
    explanation: 'Shifts from internal logic to external impact.'
  },
  {
    id: 'governance-2',
    category: 'governance',
    question: 'What\'s the concern behind the objection?',
    explanation: 'Moves past positional disagreement to underlying needs.'
  },
  {
    id: 'governance-3',
    category: 'governance',
    question: 'Where do we agree? Let\'s start there.',
    explanation: 'Finds common ground in polarized discussions.'
  },
  {
    id: 'governance-4',
    category: 'governance',
    question: 'What would we need to see to change our mind?',
    explanation: 'Introduces intellectual humility and testable criteria.'
  },
  {
    id: 'governance-5',
    category: 'governance',
    question: 'Is this a decision or a discussion?',
    explanation: 'Clarifies expectations. Prevents frustration on both sides.'
  },
  {
    id: 'governance-6',
    category: 'governance',
    question: 'Who else should be in this conversation?',
    explanation: 'Checks for missing perspectives before committing.'
  },

  // 6. Navigating Conflict and Tension (6 questions)
  {
    id: 'conflict-1',
    category: 'conflict',
    question: 'Help me understand where you\'re coming from.',
    explanation: 'Non-confrontational. Opens dialogue when positions harden.'
  },
  {
    id: 'conflict-2',
    category: 'conflict',
    question: 'What would need to happen for this to work for both of us?',
    explanation: 'Shifts from win/lose to shared problem-solving.'
  },
  {
    id: 'conflict-3',
    category: 'conflict',
    question: 'What\'s really at stake for you here?',
    explanation: 'Goes beneath the position to the interest.'
  },
  {
    id: 'conflict-4',
    category: 'conflict',
    question: 'I sense there\'s more here. Am I reading that right?',
    explanation: 'Gently names the elephant. Gives permission to be honest.'
  },
  {
    id: 'conflict-5',
    category: 'conflict',
    question: 'What would it take to rebuild trust here?',
    explanation: 'Forward-looking. Moves from blame to repair.'
  },
  {
    id: 'conflict-6',
    category: 'conflict',
    question: 'Can we pause and check: are we still on the same side?',
    explanation: 'Resets the dynamic when conversation turns adversarial.'
  },

  // 7. Self-Check - Before the conversation (3 questions)
  {
    id: 'self-before-1',
    category: 'self-before',
    question: 'What am I trying to achieve here?',
    explanation: 'Clarifies your intention before you walk in.'
  },
  {
    id: 'self-before-2',
    category: 'self-before',
    question: 'What does the other person need from this?',
    explanation: 'Shifts perspective. Primes you for listening.'
  },
  {
    id: 'self-before-3',
    category: 'self-before',
    question: 'Where am I likely to jump in too quickly?',
    explanation: 'Pre-awareness of your pattern. Prepares the pause.'
  },

  // 7. Self-Check - After the conversation (4 questions)
  {
    id: 'self-after-1',
    category: 'self-after',
    question: 'Where did I listen well?',
    explanation: 'Reinforces positive patterns.'
  },
  {
    id: 'self-after-2',
    category: 'self-after',
    question: 'Where did I fill the silence?',
    explanation: 'Honest check without judgment. Data for the log.'
  },
  {
    id: 'self-after-3',
    category: 'self-after',
    question: 'What did I learn that surprised me?',
    explanation: 'Captures insight. Rewards curiosity.'
  },
  {
    id: 'self-after-4',
    category: 'self-after',
    question: 'What question do I wish I had asked?',
    explanation: 'Builds your repertoire for next time.'
  }
];
