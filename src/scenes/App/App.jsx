import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import configs from 'configs';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Home from 'scenes/Home';
import Topic from 'scenes/Topic';
import ShowCaseTopic from 'scenes/ShowCaseTopic';
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
import Terms from 'scenes/Terms';
import serverService from 'services/server.service';
import langService from 'services/lang.service';
import { translationMessages } from '../../i18n';
import './App.css';

const getLang = () => {
  // due to lang set was changed(zh to cn)
  const { current } = langService;
  const cnFix = current === 'cn' && 'zh';
  return cnFix || current;
};

class App extends Component {
  async componentWillMount() {
    const { server } = this.props;
    if (server) serverService.setDefault(server);
  }

  static propTypes = {
    user: PropTypes.object,
    server: PropTypes.string
  };

  static defaultProps = {
    user: null,
    server: null
  };

  render() {
    const { user, server } = this.props;
    const Routes = ({ match: { path } }) => (
      <Switch>
        {/* {server && <Redirect exact from="/" to={configs.linkBase()} />} */}
        <Route exact path={path} component={Home} />
        <Route path={`${path}split`} component={Home} />
        <Route path={`${path}topic/:id/comment/:commentId`} component={Topic} />
        <Route path={`${path}topic/:id`} component={Topic} />
        <Route path={`${path}show-case/:id`} component={ShowCaseTopic} />
        <Route path={`${path}page/how`} component={How} />
        <Route path={`${path}page/what`} component={What} />
        <Route path={`${path}page/otp`} component={OtpLogin} />
        <Route path={`${path}new-topic`} component={TopicView} />
        <Route path={`${path}edit/:eId`} component={TopicView} />
        <Route path={`${path}types/:id`} component={TypePage} />
        <Route path={`${path}types/`} component={TypeList} />
        <Route path={`${path}add-child/:p`} component={TopicView} />
        <Route path={`${path}terms`} component={Terms} />
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
        {server && (
          <div>
            {/*<TabToggle match={match} show={!!user} />*/}
            <Route path={`${match.path}split`} component={TabPanel} />
          </div>
        )}
      </div>
    );

    const lang = getLang();
    return (
      <IntlProvider
        locale={lang}
        key={lang}
        messages={translationMessages[lang]}
      >
        <HashRouter>
          <div>
            <Switch>
              <Route
                path="/:configs/@/"
                component={SetWrapper(ConfigWrapper)}
              />
              <Route path="/" component={SetWrapper(DefaultWrapper)} />
            </Switch>
          </div>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
