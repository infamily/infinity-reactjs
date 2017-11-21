import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Topic from './components/topic';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/topic/:id" component={Topic}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
