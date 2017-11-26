import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from '../home';
import Topic from '../topic';
import How from '../how';
import What from '../what';
import NotFound from '../notFound';
import OtpLogin from '../otp-login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/topic/:id" component={Topic}/>
          <Route path="/page/how" component={How}/>
          <Route path="/page/what" component={What}/>
          <Route path="/page/otp" component={OtpLogin}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
