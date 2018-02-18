import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import langService from 'services/lang.service';
import serverService from 'services/server.service';
import './server_select.css';
import getMessages from './messages';
const messages = getMessages(langService.current);

class ServerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: props.server
    };
  }

  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    setServer: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    server: PropTypes.number.isRequired,
  };

  changeServer = index => {
    this.props.setServer(index);
    serverService.changeServer(index);
    this.setState({
      server: index
    });
    this.props.signOut(); // need to out, cause another server has no such token
    window.location.reload(false);
  }

  render() {
    const servers = serverService.api_servers;
    const names = langService.getServers();
    const { mobile } = this.props;
    const { server } = this.state;

    const style = (i) => server === i ? { backgroundColor: '#90B249' } : {};
    
    const Servers = () => servers.map((server, i) => {
      return <MenuItem className="select-lang__link" key={server} eventKey={i} onSelect={this.changeServer}>
        <div className="server_select__bullet" style={style(i)}> </div>
        {' ' + names[i]}
      </MenuItem>
    })

    const Status = () => ( 
      <span>{names[server]}</span>
    );
      
    return (
      <DropdownButton 
        id="dropdown-server"
        className={mobile ? "server_select__btn--mobile" : "server_select__btn"}
        pullRight={true} 
        dropup 
        bsSize={mobile ? "small" : null}
        title={<Status />} 
        >
        <MenuItem>{messages.server}</MenuItem>
        <MenuItem divider />
        <Servers />
      </DropdownButton> 
    );
  }
}

export default ServerButton; 
