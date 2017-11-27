import React, { Component } from 'react'; 
import langService from '../services/lang.service.js';
import Language from './utils/account';
import Menu from './utils/menu'; 

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();

class What extends Component {  
  
  render() {
    const rowHtml = langService.whatContent().reduce((line, newline) => {
      return line + newline;
    });
    const Content = () => ReactHtmlParser(mdConverter.makeHtml(rowHtml)); 
    
    return (
      <div className="main">
        <Content/>
        <Menu page='What?'/>
        <Language />
      </div>
    );
  }
}

export default What; 