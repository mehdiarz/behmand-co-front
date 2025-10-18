import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fa from '../locales/fa/common.json';
import en from '../locales/en/common.json';

const resources = {
  fa: { translation: fa },
  en: { translation: en },
};

const detection = {
  order: ['localStorage', 'querystring', 'cookie', 'htmlTag', 'navigator'],
  caches: ['localStorage'],
};

function updateDocumentDirection(lng) {
  const dir = i18n.dir(lng);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['fa', 'en'],
    nonExplicitSupportedLngs: true,
    debug: false,
    detection,
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  })
  .then(() => updateDocumentDirection(i18n.language));

i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
});

export default i18n;
