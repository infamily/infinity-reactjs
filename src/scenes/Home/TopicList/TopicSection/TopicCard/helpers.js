import marked from 'marked';

const htmlEscapeToText = text =>
  text.replace(/\&\#[0-9]*;|&amp;/g, escapeCode => {
    if (escapeCode.match(/amp/)) {
      return '&';
    }

    return String.fromCharCode(escapeCode.match(/[0-9]+/));
  });

// return a custom renderer for marked.
const renderPlain = () => {
  const render = new marked.Renderer();

  // render just the text of a link
  render.link = (href, title, text) => text;

  // render just the text of a paragraph
  render.paragraph = text => `${htmlEscapeToText(text)}\r\n`;

  // render just the text of a heading element, but indecate level
  render.heading = (text, level) => `${level} ) ${text}`;

  // render nothing for images
  render.image = (href, title, text) => '';

  return render;
};

export const toPlain = md =>
  marked(md, {
    renderer: renderPlain()
  });
