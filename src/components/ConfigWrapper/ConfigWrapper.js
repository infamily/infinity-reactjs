import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langService from 'services/lang.service';
import serverService from 'services/server.service';
import Loading from 'components/Loading';

export default class ConfigWrapper extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      serverName: 'the server',
    }
  }

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    userServerData: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    server: PropTypes.string,
  }; 

  async componentWillMount() {
    await this.setParams();
    this.setLoading(false);    
  }

  async componentWillReceiveProps(nextProps) {
    const getConfigs = (props) => props.match.params.configs;
    
    //check for new configs
    const nextConfigs = getConfigs(nextProps);
    if (getConfigs(this.props) !== nextConfigs) {
      this.setLoading(true);
      await this.setParams(nextConfigs);
      window.location.reload(false);      
    }
  }

  setParams = async (nextConfigs = null) => {
    const { match, setServer, signIn, userServerData } = this.props;
    const configs = nextConfigs || match.params.configs; // get configs
    const [server, lang] = configs.split(':');
    this.setState({ serverName: server });
    
    // set configs
    const serverURL = await serverService.changeServerByLink(server);
    serverURL && setServer(serverURL);
    await langService.changeLangByLink(lang);
    
    // switch user data
    const serverData = userServerData[serverService.api] || null;
    signIn(serverData);
  }

  setLoading(bool) {
    this.setState({ loading: bool });
  }
  
  render() {
    if (this.state.loading || !this.props.server) {
      return <Loading text={`Connecting ${this.state.serverName}...`}/>;
    }

    return <div>{this.props.children}</div>;
  }
}