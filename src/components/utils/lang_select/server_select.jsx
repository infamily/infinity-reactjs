import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import langService from '../../../services/lang.service';
import serverService from '../../../services/server.service';

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
    const Servers = () => servers.map((server, i) => {
      return <MenuItem className="select-lang__link" key={server} eventKey={i} onSelect={this.changeServer}>{server}</MenuItem>
    })

    return ( 
      <DropdownButton title="Server" pullRight={true} bsSize="large" dropup id="dropdown-size-large">
        <Servers />
      </DropdownButton> 
    );
  }
}

export default ServerButton; 