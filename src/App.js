import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Topic from './components/topic';
import How from './components/how';
import What from './components/what';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/topic/:id" component={Topic}/>
          <Route path="/page/how" component={How}/>
          <Route path="/page/what" component={What}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
