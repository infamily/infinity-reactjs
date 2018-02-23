import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

export default class ConfigRoute extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    server: PropTypes.string.isRequired,
    userServerData: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }; 

  async componentWillMount() {
    await this.setParams();
  }

  async componentWillReceiveProps(nextProps) {
    const getConfigs = (props) => props.match.params.configs;
    
    //check for new configs
    const nextConfigs = getConfigs(nextProps);
    if (getConfigs(this.props) !== nextConfigs) {
      await this.setParams(nextConfigs);
      window.location.reload(false);
    }
  }

  setParams = async (nextConfigs = null) => {
    const { match, setServer, signIn, userServerData } = this.props;
    const configs = nextConfigs || match.params.configs; // get configs
    const [server, lang] = configs.split(':');
    
    // set configs
    const serverURL = await serverService.changeServerByLink(server);
    serverURL && setServer(serverURL);
    await langService.changeLangByLink(lang);
    
    // switch user data
    const serverData = userServerData[serverService.api] || null;
    signIn(serverData);
  }
  
  render() {
    return <div>{this.props.children}</div>;
  }
}