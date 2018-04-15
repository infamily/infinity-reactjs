import TurndownService from 'turndown';
const turndownService = new TurndownService();

export const getMarkdown = (html) => {
  return turndownService.turndown(html);
} 