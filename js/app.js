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
