import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from './locales/en.json';
import translationVI from './locales/vi.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "vi",
        fallbackLng: "vi",

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;