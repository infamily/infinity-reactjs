import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serverService from 'services/server.service';

export default class ConfigRoute extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    server: PropTypes.string,
    user: PropTypes.object,
  }; 

  async componentWillMount() {
    await serverService.getDefault();
    const api = serverService.api;

    this.props.setServer(api);
  }

  render() {
    if (!this.props.server) return null;
    return <div>{this.props.children}</div>;
  }
}