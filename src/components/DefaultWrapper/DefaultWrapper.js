import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
import serverService from 'services/server.service';

export default class ConfigRoute extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    server: PropTypes.string,
    user: PropTypes.object,
  }; 

  async componentWillMount() {
    await serverService.getDefault();
    console.log(serverService.api);
    
    this.props.setServer(serverService.api);
  }

  render() {
    if (!this.props.server) return <Loading />;
    return <div>{this.props.children}</div>;
  }
}