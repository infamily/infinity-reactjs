import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import configs from 'configs';
import Transition from 'react-transition-group/Transition';
import StreamTab from 'scenes/StreamTab';
import Topic from 'scenes/Topic';
import TopicView from 'scenes/TopicView';
import transitionStyles from './transition';
import './TabPanel.css';

export default class TabPanel extends Component {
  constructor() {
    super();
    this.state = { isOpen: false, fullWidth: false };
  }

  static defultProps = {
    user: null
  };

  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.open();
  }

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    const { push } = this.props.history;
    this.setState({ isOpen: false });
    setTimeout(() => push(`${configs.linkBase()}/`), 200);
  };

  toggleFullScreen = () => {
    this.setState(prevState => ({
      fullWidth: !prevState.fullWidth
    }));
  };

  render() {
    const {
      user,
      match: { path }
    } = this.props;
    const { isOpen, fullWidth } = this.state;
    const fullStyle = fullWidth ? 'tab_container--full' : '';

    const TabWrapper = TabPanelContent => props => (
      <TabPanelContent
        isOpen={isOpen}
        close={this.close}
        toggleFullScreen={this.toggleFullScreen}
        {...props}
      />
    );

    const StreamComponent = () =>
      user && (
        <StreamTab
          isOpen={isOpen}
          close={this.close}
          toggleFullScreen={this.toggleFullScreen}
        />
      );

    return (
      <div>
        <Transition in={isOpen} timeout={0}>
          {state => (
            <div className="tab_layout" style={{ ...transitionStyles[state] }}>
              <div
                className={`tab_container ${fullStyle}`}
                style={{ ...transitionStyles[state] }}
              >
                <Switch>
                  <Route
                    path={`${path}/add-child/:p`}
                    component={TabWrapper(TopicView)}
                  />
                  <Route
                    path={`${path}/edit/:eId`}
                    component={TabWrapper(TopicView)}
                  />
                  <Route
                    path={`${path}/new-topic`}
                    component={TabWrapper(TopicView)}
                  />
                  <Route
                    path={`${path}topic/:id/comment/:commentId`}
                    component={TabWrapper(Topic)}
                  />
                  <Route
                    path={`${path}/topic/:id`}
                    component={TabWrapper(Topic)}
                  />
                  <Route path={`${path}/data`} render={StreamComponent} />
                </Switch>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
