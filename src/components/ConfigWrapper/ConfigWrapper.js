import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langService from 'services/lang.service';
import serverService from 'services/server.service';
import Loading from 'components/Loading';
import configs from 'configs';

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
    const { match, history, setServer, signIn, userServerData } = this.props;
    const params = nextConfigs || match.params.configs; // get configs
    const [server, lang] = params.split(':');
    await this.checkLanguage(lang);
    this.setState({ serverName: server });
    
    // set configs
    const serverURL = await serverService.changeServerByLink(server);
    const api = serverService.api;
    
    if (serverURL) {
      setServer(serverURL);
    } else {
      history.push('/'); // no valid server. let's get it (DefaultWrapper)
    }
    
    // switch user data
    const serverData = userServerData[api] || null;
    signIn(serverData);
  }

  checkLanguage = async (lang) => {
    if (!lang) {
      const { history } = this.props;
      const link = configs.linkBase();
      history.replace(link);
    } else {
      await langService.changeLangByLink(lang);
    }
  }

  setLoading(bool) {
    this.setState({ loading: bool });
  }
  
  render() {
    if (this.state.loading || !this.props.server) {
      return <Loading text={`Connecting ${this.state.serverName}...`} />;
    }

    return <div>{this.props.children}</div>;
  }
}