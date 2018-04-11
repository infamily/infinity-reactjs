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
      console.log('???', 'params', new Date())
      
      this.setLoading(true);
      await this.setParams(nextConfigs);
      window.location.reload(false);
    }
  }

  setParams = async (nextConfigs = null) => {
    const { match, history, setServer, signIn, userServerData } = this.props;
    const params = nextConfigs || match.params.configs; // get configs
    const [server, lang] = params.split(':');
    this.setState({ serverName: server });
    
    // check configs
    const prevAPI = serverService.api;    
    const newURL = await serverService.changeServerByLink(server);
    const API = serverService.api;
    // no valid server

    console.log(server, newURL)
    if (!newURL && !API) {
      history.push('/'); // get the nearest server (DefaultWrapper)
      return;
    }

    // new API is provided    
    if (prevAPI !== API) {
      setServer(newURL); // set configs
    }
    
    // switch user authorization data
    const serverData = userServerData[API] || null;
    signIn(serverData);

    // set language
    await this.checkLanguage(lang);    
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