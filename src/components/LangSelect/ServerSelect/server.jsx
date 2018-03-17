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
    signIn: PropTypes.func.isRequired,
    server: PropTypes.string.isRequired,
    userServerData: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  changeServer = api => {
    const { userServerData, setServer, signIn, history } = this.props;

    setServer(api); // set server in store
    serverService.changeServer(api); // set server in service
    this.setState({ server: api }); // set server in local state
    console.log(api, 'api');
    
    // switch user data
    const serverData = userServerData[serverService.api] || null;
    signIn(serverData);
    const url = api.split('//')[1];
    history.push('/' + url + '/@');
  }

  getName = (api) => {
    const names = langService.getServers();
    const server = api.split('//')[1];
    const organization = api.split('inf.')[1];
    const name = organization || server;
    return names[name] || name;
  }

  render() {
    const servers = serverService.api_servers;
    const { mobile } = this.props;
    const { server } = this.state;

    const style = (api) => server === api ? { backgroundColor: '#90B249' } : {};
    
    const Servers = () => servers.map((api) => (
      <MenuItem className="select-lang__link" key={api} eventKey={api} onSelect={this.changeServer}>
        <div className="server_select__bullet" style={style(api)}> </div>
        {' ' + this.getName(api)}
      </MenuItem>
    ));
    
    return (
      <DropdownButton 
        id="dropdown-server"
        className={mobile ? "server_select__btn--mobile" : "server_select__btn"}
        pullRight={true} 
        dropup 
        bsSize={mobile ? "small" : null}
        title={this.getName(server)}>
        <MenuItem>{messages.server}</MenuItem>
        <MenuItem divider />
        <Servers />
      </DropdownButton> 
    );
  }
}

export default ServerButton; 
