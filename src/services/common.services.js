import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';

showdown.extension('preview', () => [
  {
    type: 'html',
    filter(text) {
      const content = `${text}`.replace(/<a\s+href=/gi, '<i data=');
      const result = `${content}`.replace(/<\/a>/gi, '</i>');
      return result;
    }
  }
]);

const mdConverter = new showdown.Converter();
const previewConverter = new showdown.Converter({
  extensions: ['preview']
});

export const makeHtml = markdown => {
  const html = mdConverter.makeHtml(markdown);
  return ReactHtmlParser(html);
};

export const makePreviewHtml = markdown => {
  const html = previewConverter.makeHtml(markdown); // clear links
  return ReactHtmlParser(html);
};

export const makeRawHtml = markdown => mdConverter.makeHtml(markdown);
