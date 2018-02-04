import React, { Component } from 'react';  
import Menu from './components/menu';

class NotFound extends Component {

  render() { 

    return (
      <div className="main">
        <h1>404. No such content. ):</h1>
        <Menu page='Menu'/>
      </div>
    );
  }
}

export default NotFound; 