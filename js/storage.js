// LocalStorage and export/import functionality
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
