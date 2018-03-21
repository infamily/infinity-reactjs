import React, { Component } from 'react';  
import MenuBar from 'scenes/MenuBar';

class NotFound extends Component {

  render() { 

    return (
      <div className="main">
        <h1>404. No such content. ):</h1>
        <MenuBar page='Menu'/>
      </div>
    );
  }
}

export default NotFound; 