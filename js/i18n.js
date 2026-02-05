// Internationalization module
const SUPPORTED_LOCALES = ['en', 'de', 'da'];
const DEFAULT_LOCALE = 'en';
const STORAGE_KEY = 'activelistening_locale';

let currentLocale = DEFAULT_LOCALE;
let translations = {};

export const i18n = {
  // Initialize: detect and load language
  async init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const browserLang = navigator.language.split('-')[0];

    currentLocale = saved
      || (SUPPORTED_LOCALES.includes(browserLang) ? browserLang : DEFAULT_LOCALE);

    await this.loadLocale(currentLocale);
    return currentLocale;
  },

  // Switch language
  async setLocale(locale) {
    if (!SUPPORTED_LOCALES.includes(locale)) return false;
    await this.loadLocale(locale);
    localStorage.setItem(STORAGE_KEY, locale);
    currentLocale = locale;
    return true;
  },

  // Load locale JSON
  async loadLocale(locale) {
    try {
      const response = await fetch(`locales/${locale}.json`);
      translations = await response.json();
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error);
      if (locale !== DEFAULT_LOCALE) {
        await this.loadLocale(DEFAULT_LOCALE);
      }
    }
  },

  // Get translation by dot-notation key
  t(key) {
    const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
    return value !== undefined ? value : key;
  },

  // Get current locale code
  getLocale() {
    return currentLocale;
  },

  // Get all supported locales
  getLocales() {
    return SUPPORTED_LOCALES;
  },

  // Get all translations (for direct access)
  getTranslations() {
    return translations;
  },

  // Get all categories with translations
  getCategories() {
    return Object.entries(translations.categories || {}).map(([id, data]) => ({
      id,
      label: data.label,
      icon: data.icon
    }));
  },

  // Get question by ID
  getQuestion(questionId) {
    return translations.questions?.[questionId];
  },

  // Get all question IDs
  getQuestionIds() {
    return Object.keys(translations.questions || {});
  },

  // Get questions filtered by categories
  getQuestionsByCategories(categoryIds) {
    const questions = translations.questions || {};
    return Object.entries(questions)
      .filter(([id]) => {
        const category = id.replace(/-\d+$/, '');
        return categoryIds.includes(category);
      })
      .map(([id, data]) => ({
        id,
        category: id.replace(/-\d+$/, ''),
        question: data.question,
        explanation: data.explanation
      }));
  }
};
