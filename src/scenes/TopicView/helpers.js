import TurndownService from 'turndown';
const turndownService = new TurndownService();

turndownService.addRule('clearSpaces', {
  filter: 'p',
  replacement: function (content) {
    return '\n' + content + '   ';
  }
});

export const getMarkdown = (html) => {
  return turndownService.turndown(html);
} 