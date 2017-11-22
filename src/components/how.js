import React, { Component } from 'react'; 
import langService from '../services/lang.service.js';

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();

class How extends Component { 

  render() {
    const rowHtml = langService.howContent().reduce((line, newline) => {
      return line + newline;
    });
    const Content = () => ReactHtmlParser(mdConverter.makeHtml(rowHtml)); 
    
    return (
      <div className="main">
        <Content/>
      </div>
    );
  }
}

export default How; 