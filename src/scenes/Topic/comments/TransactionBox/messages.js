export default (lang) => {
  const messages = {
    en: {
      error: 'Incorrect amount of hours.',
      quota_over: 'Your daily quota is over.',
    },
    ru: {
      error: 'Неверное колличество часов.',
      quota_over: 'Сумма превышает лимит квоты для пользователя.',
    },
  };

  return messages[lang] || messages.en;
};
