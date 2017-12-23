import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import langService from '../../../../services/lang.service';
import serverService from '../../../../services/server.service';
import './server_select.css';

class ServerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: props.server
    };
  }

  async componentWillMount() {
    const { server } = this.state;

    if (server === null) {
      const first = await serverService.getDefault();
      this.props.setServer(first);
      this.setState({ server: first });
    } else {
      serverService.changeServer(server);
    }
  }

  changeServer = index => {
    this.props.setServer(index);
    serverService.changeServer(index);
    this.setState({
      server: index
    });
    window.location.reload(false);
  }

  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    setServer: PropTypes.func.isRequired,
    server: PropTypes.number.isRequired,
  };


  render() {
    const servers = langService.getServers();
    const { mobile } = this.props;
    const { server } = this.state;

    const style = (i) => server === i ? { backgroundColor: '#90B249' } : {};
    
    const Servers = () => servers.map((server, i) => {
      return <MenuItem className="select-lang__link" key={server} eventKey={i} onSelect={this.changeServer}>
        <div className="server_select__bullet" style={style(i)}> </div>
        {' ' + server}
      </MenuItem>
    })

    const Status = () => ( 
      <span>{servers[server]}</span>
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
        <MenuItem>Server</MenuItem>
        <MenuItem divider />
        <Servers />
      </DropdownButton> 
    );
  }
}

export default ServerButton; 