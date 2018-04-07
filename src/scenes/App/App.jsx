import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import configs from 'configs';
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
import ConfigWrapper from 'components/ConfigWrapper';
import DefaultWrapper from 'components/DefaultWrapper';
import ProgramToggle from 'components/ProgramToggle';
import TabToggle from 'components/TabToggle';
import TabPanel from 'scenes/TabPanel';
import './App.css';

class App extends Component {

  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { user, server } = this.props;

    const Routes = ({ match }) => (
      <Switch>
        <Route exact path={match.path} component={Home} />
        <Route path={match.path + "split"} component={Home} />
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
        <Route path={match.path + "user-investment/:id"} component={UserTransactions} />
        <Route component={NotFound} />        
      </Switch>
    );

    // SetWrapper defines whether need to set new configs(by Wrapper prop)
    const SetWrapper = (Wrapper) => ({ match }) => (
      <div className="main_layout">
        <div className="app_container">
          <Wrapper>
            <Route path={match.path} component={Routes} />
          </Wrapper>
        </div>
        {(user && server) && <TabToggle match={match} />}
        <Route path={match.path + "split"} component={TabPanel} />
      </div>
    );

    return (
      <HashRouter>
        <div>
          <ProgramToggle />
          <Switch>
            {server && <Redirect exact from="/" to={configs.linkBase()} />}
            <Route path="/:configs/@/" component={SetWrapper(ConfigWrapper)} />
            <Route path="/" component={SetWrapper(DefaultWrapper)} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
