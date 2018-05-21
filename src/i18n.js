import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';
import ruLocaleData from 'react-intl/locale-data/ru';

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';
import ruTranslationMessages from './translations/ru.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(ruLocaleData);

export const appLocales = ['en', 'de', 'ru'];
export const DEFAULT_LOCALE = 'en';

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages)
};
