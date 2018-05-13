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

export const parseCategories = array =>
  array &&
  array.map(item => {
    const { name, url, definition } = item;
    return { value: name, label: name, url, definition };
  });

export const getTypeId = link => link.match(/types\/(\d+)/)[1];
