import React from 'react';
import langService from 'services/lang.service';
import MenuBar from 'scenes/MenuBar';
import { makeHtml } from 'services/common.services';

const What = () => {
  const rowHtml = langService
    .whatContent()
    .reduce((line, newline) => line + newline);
  const Content = () => makeHtml(rowHtml);

  return (
    <div className="main">
      <Content />
      <MenuBar page="What?" />
    </div>
  );
};

export default What;
