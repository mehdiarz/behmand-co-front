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
    if (typeof document !== 'undefined') {
        const direction = lng === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', lng);

        // حذف کلاس‌های قبلی
        document.body.classList.remove('english-mode', 'persian-mode');

        if (lng === 'en') {
            document.body.classList.add('english-mode');
        } else {
            document.body.classList.add('persian-mode');
        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fa',
        fallbackLng: 'fa',
        supportedLngs: ['fa', 'en'],
        debug: false,
        detection,
        interpolation: {
            escapeValue: false
        },
    })
    .then(() => updateDocumentDirection(i18n.language));

i18n.on('languageChanged', (lng) => {
    updateDocumentDirection(lng);
});

export default i18n;