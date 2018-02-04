export default (lang) => {
  const messages = {
    en: {
      error: 'Incorrect amount of hours.',
    },
    ru: {
      error: 'Неверное колличество часов.',
    },
  };

  return messages[lang] || messages.en;
};
