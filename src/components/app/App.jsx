import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import serverService from '../../services/server.service';
import './App.css';

import Home from '../home';
import Topic from '../topic';
import How from '../how';
import What from '../what';
import NotFound from '../notFound';
import OtpLogin from '../otp-login';
import TopicView from '../topic_view';

class App extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    server: PropTypes.number,
  };
  
  async componentWillMount() {
    await serverService.getDefault();
    const index = serverService.index;
    this.props.setServer(index);
  }

  render() {
    if (this.props.server === null) return null;

    return (
      <HashRouter>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/topic/:id"} component={Topic}/>
          <Route path={"/page/how"} component={How}/>
          <Route path={"/page/what"} component={What}/>
          <Route path={"/page/otp"} component={OtpLogin}/>
          <Route path={"/new-topic"} component={TopicView}/>
          <Route path={"/edit/:id"} component={TopicView}/>
          <Route component={NotFound}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
