import { addLocaleData } from 'react-intl';

import localeEn from 'react-intl/locale-data/en';
import localeFi from 'react-intl/locale-data/fi';

import en from '../../translations/en';
import fi from '../../translations/fi';

addLocaleData([...localeEn, ...localeFi]);
const translations = {
  en,
  fi
}

let storedLocale = localStorage.locale;
export const language = storedLocale ||
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
export const messages = translations[languageWithoutRegionCode] || translations[language] || translations['en'];
