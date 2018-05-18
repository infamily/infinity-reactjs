import TurndownService from 'turndown';

const turndownService = new TurndownService();
const clearTags = str => str.replace(/<p><br><\/p>/gi, '<br/>'); // Quill syntax replacement

turndownService.addRule('clearSpaces', {
  filter: 'p',
  replacement(content) {
    return `${content}<br/>`;
  }
});

export const getMarkdown = html => turndownService.turndown(clearTags(html));

export const getTypeId = link => link.match(/types\/(\d+)/)[1];
