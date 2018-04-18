import TurndownService from 'turndown';
const turndownService = new TurndownService();
const clearTags = (str) => str.replace(/<p><br><\/p>/gi, '<br/>'); //Quill syntax replacement

turndownService.addRule('clearSpaces', {
  filter: 'p',
  replacement: function (content) {
    return content + '<br/>';
  }
});

export const getMarkdown = (html) => {
  return turndownService.turndown(clearTags(html));
} 