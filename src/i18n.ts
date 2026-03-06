import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import jaCommon from './locales/ja/common.json';

export const resources = {
  en: { common: enCommon },
  ja: { common: jaCommon },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: 'en', // to set primal or depends on Detector
    fallbackLng: 'en',
    ns: ['common'], // list of namespaces
    defaultNS: 'common', // t() refers default
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'em', 'span'],
    },
  });

export default i18n;
