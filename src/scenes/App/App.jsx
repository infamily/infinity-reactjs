import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import serverService from 'services/server.service';
import Home from 'scenes/Home';
import Topic from 'scenes/Topic';
import How from 'scenes/How';
import What from 'scenes/What';
import NotFound from 'scenes/NotFound';
import OtpLogin from 'scenes/OtpLogin';
import TopicView from 'scenes/TopicView';
import TypeList from 'scenes/TypeList';
import TypePage from 'scenes/TypeView';
import UserTransactions from 'scenes/UserTransactions';
import StreamTab from 'scenes/StreamTab';
import ConfigRoute from 'components/ConfigRoute';
import './App.css';

class App extends Component {

  static propTypes = {
    setServer: PropTypes.func.isRequired,
    server: PropTypes.number,
    user: PropTypes.object,
  };
  
  async componentWillMount() {
    await serverService.getDefault();
    const index = serverService.index;
    this.props.setServer(index);
  }

  render() {
    const { server, user } = this.props;
    if (server === null) return null;

    const Routes = () => (
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path="/topic/:id/:server" component={Topic} />
        <Route path="/topic/:id" component={Topic} />
        <Route path="/page/how" component={How} />
        <Route path="/page/what" component={What} />
        <Route path="/page/otp" component={OtpLogin} />
        <Route path="/new-topic" component={TopicView} />
        <Route path="/edit/:id" component={TopicView} />
        <Route path="/types/:id" component={TypePage} />
        <Route path="/types/" component={TypeList} />
        <Route path="/add-child/:p" component={TopicView} />
        <Route path="/user-transactions/:id" component={UserTransactions} />
        <Route path="/:server/:lang/@" component={ConfigRoute} />
        <Route component={NotFound} />     
      </Switch>
    );

    return (
      <HashRouter>
        <div className="main_layout">
          <div className="app_container">
            <Route path="/" component={Routes} />       
          </div>
          {user && <StreamTab />}
        </div>
      </HashRouter>
    );
  }
}

export default App;
