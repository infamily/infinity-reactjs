import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from '../home';
import Topic from '../topic';
import How from '../how';
import What from '../what';
import NotFound from '../notFound';
import OtpLogin from '../otp-login';
import TopicView from '../topic_view';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Home}/>
          <Route path={process.env.PUBLIC_URL + "/topic/:id"} component={Topic}/>
          <Route path={process.env.PUBLIC_URL + "/page/how"} component={How}/>
          <Route path={process.env.PUBLIC_URL + "/page/what"} component={What}/>
          <Route path={process.env.PUBLIC_URL + "/page/otp"} component={OtpLogin}/>
          <Route path={process.env.PUBLIC_URL + "/new-topic"} component={TopicView}/>
          <Route path={process.env.PUBLIC_URL + "/edit/:id"} component={TopicView}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
