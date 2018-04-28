import React, { PureComponent } from 'react';
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
import NoServer from 'scenes/NoServer';
import './App.css';

class App extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { user, server } = this.props;

    const Routes = ({ match: { path } }) => (
      <Switch>
        <Route exact path={path} component={Home} />
        <Route path={`${path}split`} component={Home} />
        <Route path={`${path}topic/:id/comment/:commentId`} component={Topic} />
        <Route path={`${path}topic/:id`} component={Topic} />
        <Route path={`${path}page/how`} component={How} />
        <Route path={`${path}page/what`} component={What} />
        <Route path={`${path}page/otp`} component={OtpLogin} />
        <Route path={`${path}new-topic`} component={TopicView} />
        <Route path={`${path}edit/:eId`} component={TopicView} />
        <Route path={`${path}types/:id`} component={TypePage} />
        <Route path={`${path}types/`} component={TypeList} />
        <Route path={`${path}add-child/:p`} component={TopicView} />
        <Route path={`${path}no-server`} component={NoServer} />
        <Route
          path={`${path}user-investment/:id`}
          component={UserTransactions}
        />
        <Route component={NotFound} />
      </Switch>
    );

    // SetWrapper defines whether need to set new configs(by Wrapper prop)
    const SetWrapper = Wrapper => ({ match }) => (
      <div className="main_layout">
        <div className="app_container">
          <Wrapper>
            <Route path={match.path} component={Routes} />
          </Wrapper>
        </div>
        {user && server && <TabToggle match={match} />}
        <Route path={`${match.path}split`} component={TabPanel} />
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
