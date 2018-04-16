import React, { Component } from 'react'; 
import MenuBar from 'scenes/MenuBar';
import langService from 'services/lang.service.js'; 
import { makeHtml } from 'services/common.services';

class How extends Component {

  render() {
    const raw = langService.howContent().reduce((line, newline) => {
      return line + newline;
    });
    
    return (
      <div className="main">
        {makeHtml(raw)}
        <MenuBar page='How?'/>
      </div>
    );
  }
}

export default How; 