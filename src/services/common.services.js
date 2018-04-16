import showdown from 'showdown';
import ReactHtmlParser from 'react-html-parser';
const mdConverter = new showdown.Converter();

export const makeHtml = (markdown) => {
  const html = mdConverter.makeHtml(markdown);
  return ReactHtmlParser(html);
}

export const makeRawHtml = (markdown) => {
  return mdConverter.makeHtml(markdown);
}