import React, { Component } from 'react'; 
import langService from 'services/lang.service.js';
import MenuBar from 'scenes/MenuBar';
import { makeHtml } from 'services/common.services';

class What extends Component {  
  
  render() {
    const rowHtml = langService.whatContent().reduce((line, newline) => {
      return line + newline;
    });
    const Content = () => makeHtml(rowHtml); 
    
    return (
      <div className="main">
        <Content/>
        <MenuBar page='What?'/>
      </div>
    );
  }
}

export default What; 