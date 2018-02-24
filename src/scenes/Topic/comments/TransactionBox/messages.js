export default (lang) => {
  const messages = {
    en: {
      error: 'Incorrect amount of hours.',
      quota_over: 'The daily quota is over for this user.',
    },
    ru: {
      error: 'Неверное колличество часов.',
      quota_over: 'Сумма превышает лимит квоты для пользователя.',
    },
  };

  return messages[lang] || messages.en;
};
