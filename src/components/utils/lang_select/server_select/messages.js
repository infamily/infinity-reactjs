export default (lang) => {
  const messages = {
    en: {
      server: 'Server',
    },
    ru: {
      server: 'Сервер',
    },
  };
  
  return messages[lang] || messages.en;
};
