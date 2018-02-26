export default (lang) => {
  const messages = {
    en: {
      error: 'Incorrect amount of hours.',
      quota_over: 'The quota limit is reached.',
    },
    ru: {
      error: 'Неверное колличество часов.',
      quota_over: 'Ваша квота ниже суммы инвестиций.',
    },
  };

  return messages[lang] || messages.en;
};
