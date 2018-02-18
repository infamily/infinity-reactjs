import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setServer } from 'actions/server';
import langService from 'services/lang.service';
import serverService from 'services/server.service';

class ConfigRoute extends PureComponent {

  async componentWillMount() {
    const { history, location, match, setServer } = this.props;
    const { server, lang } = match.params; // get configs
    
    const pathname = location.pathname;
    const route = pathname.split('@')[1]; // get route
    
    // set configs
    const serverNum = serverService.changeServerByLink(server);
    serverNum && setServer(serverNum);
    await langService.changeLangByLink(lang);

    route ? history.push(route) : history.push('/'); // go to route
  }
  
  render() {
    return null;
  }
}

export default connect(null, { setServer })(ConfigRoute);