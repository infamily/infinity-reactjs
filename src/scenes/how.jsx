import React, { PureComponent } from 'react';
import MenuBar from 'scenes/MenuBar';
import langService from 'services/lang.service';
import { makeHtml } from 'services/common.services';

class How extends PureComponent {
  render() {
    const raw = langService
      .howContent()
      .reduce((line, newline) => line + newline);

    return (
      <div className="main">
        {makeHtml(raw)}
        <MenuBar />
      </div>
    );
  }
}

export default How;
