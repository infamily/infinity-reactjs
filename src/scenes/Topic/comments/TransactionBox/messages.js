export default (lang) => {
  const messages = {
    en: {
      error: 'Incorrect amount of hours.',
      quota_over: 'Your quota is lower than investment amount.',
    },
    ru: {
      error: 'Неверное колличество часов.',
      quota_over: 'Ваша квота ниже суммы инвестиций.',
    },
  };

  return messages[lang] || messages.en;
};
