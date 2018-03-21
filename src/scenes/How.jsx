import React, { Component } from 'react'; 
import langService from 'services/lang.service.js'; 
import MenuBar from 'scenes/MenuBar';

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
        <MenuBar page='How?'/>
      </div>
    );
  }
}

export default How; 