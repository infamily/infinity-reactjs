import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

export default class ConfigRoute extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    server: PropTypes.number.isRequired,
    userServerData: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }; 

  async componentWillMount() {
    const { match, setServer, signIn, userServerData } = this.props;
    const { configs } = match.params; // get configs
    const [server, lang] = configs.split(':');

    // set configs
    const serverNum = serverService.changeServerByLink(server);
    serverNum && setServer(serverNum);
    await langService.changeLangByLink(lang);

    // switch user data
    const serverData = userServerData[serverService.api] || null;
    signIn(serverData);
  }

  // async componentWillReceiveProps(nextProps) {
  //   const getConfigs = (props) => props.match.params.configs;
    
  //   if (getConfigs(this.props) !== getConfigs(nextProps)) {
  //     await this.setParams();
  //     window.location.reload(false);
  //   }
  // }

  setParams = async () => {
    const { match, setServer, signIn, userServerData } = this.props;
    const { configs } = match.params; // get configs
    const [server, lang] = configs.split(':');

    // set configs
    const serverNum = serverService.changeServerByLink(server);
    serverNum && setServer(serverNum);
    await langService.changeLangByLink(lang);

    // switch user data
    const serverData = userServerData[serverService.api] || null;
    signIn(serverData);
  }
  
  render() {
    return <div>{this.props.children}</div>;
  }
}