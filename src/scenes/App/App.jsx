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

    const Routes = ({ match }) => (
      <Switch>
        <Route exact path={match.path} component={Home} />
        <Route path={match.path + "topic/:id/:server"} component={Topic} />
        <Route path={match.path + "topic/:id"} component={Topic} />
        <Route path={match.path + "page/how"} component={How} />
        <Route path={match.path + "page/what"} component={What} />
        <Route path={match.path + "page/otp"} component={OtpLogin} />
        <Route path={match.path + "new-topic"} component={TopicView} />
        <Route path={match.path + "edit/:id"} component={TopicView} />
        <Route path={match.path + "types/:id"} component={TypePage} />
        <Route path={match.path + "types/"} component={TypeList} />
        <Route path={match.path + "add-child/:p"} component={TopicView} />
        <Route path={match.path + "user-transactions/:id"} component={UserTransactions} />
      </Switch>
    );

    const ConfigWrapper = ({ match }) => (
      <ConfigRoute>
        <Route path={match.path} component={Routes} />
      </ConfigRoute>
    );

    return (
      <HashRouter>
        <div className="main_layout">
          <div className="app_container">
            <Switch>
              <Route path="/:server/:lang/@/" component={ConfigWrapper} />
              <Route path="/" component={Routes} />
              <Route component={NotFound} />
            </Switch>
          </div>
          {user && <StreamTab />}
        </div>
      </HashRouter>
    );
  }
}

export default App;