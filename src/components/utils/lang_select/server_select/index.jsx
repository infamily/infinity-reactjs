import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import langService from '../../../../services/lang.service';
import serverService from '../../../../services/server.service';
import './server_select.css';

import serverImg from './img/server.png';

class ServerButton extends Component {
  constructor() {
    super();
    this.state = {
      server: 0
    };
  } 

  changeServer = index => {
    serverService.changeServer(index);
    this.setServer(index);
  }

  setServer = index => {
    this.setState({
      server: index
    });
  }

  render() {
    const servers = langService.getServers();

    const style = (i) => this.state.server === i ? { backgroundColor: '#90B249' } : {};
    
    const Servers = () => servers.map((server, i) => {
      return <MenuItem className="select-lang__link" key={server} eventKey={i} onSelect={this.changeServer}>
        <div className="server_select__bullet" style={style(i)}> </div>
        {' ' + server}
      </MenuItem>
    })

    return ( 
      <DropdownButton 
      pullRight={true} 
      dropup 
      bsSize="large"
      title={<img className="server_select__img" src={serverImg} />} 
      id="dropdown-size-large">
        <Servers />
      </DropdownButton> 
    );
  }
}

export default ServerButton; 