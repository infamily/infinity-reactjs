import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import configs from 'configs';
import Transition from 'react-transition-group/Transition';
import StreamTab from 'scenes/StreamTab';
import Topic from 'scenes/Topic';
import { transitionStyles } from './transition';
import './TabPanel.css';

export default class TabPanel extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      fullWidth: false,      
    }
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.open();
  }

  open = () => {
    this.setState({ isOpen: true });
  }

  close = () => {
    this.setState({ isOpen: false });
    setTimeout(() => this.props.history.push(configs.linkBase() + '/'), 300);
  }

  toggleFullScreen = () => {
    this.setState((prevState => (
      { fullWidth: !prevState.fullWidth }
    )));
  }

  render() {
    const { user, match } = this.props;
    const { isOpen, fullWidth } = this.state;
    const fullStyle = fullWidth ? ' tab_container--full' : '';
    
    const TabWrapper = (TabPanelContent) => (props) => (
      <TabPanelContent
        isOpen={isOpen}
        close={this.close}
        toggleFullScreen={this.toggleFullScreen}
        {...props}
      />
    );

    const StreamComponent = () => user && (
      <StreamTab
        isOpen={isOpen}
        close={this.close}
        toggleFullScreen={this.toggleFullScreen}
      />
    );

    return (
      <div>
        <Transition in={isOpen} timeout={0}>
          {(state) => (
            <div className="tab_layout" style={{
              ...transitionStyles[state]
            }}>
              <div className={"tab_container" + fullStyle} style={{
                ...transitionStyles[state]
              }}>
                <Switch>
                  <Route path={match.path + "/topic/:id"} component={TabWrapper(Topic)} />
                  <Route path={match.path + "/data"} render={StreamComponent} />
                </Switch>
              </div>
            </div>
          )}
        </Transition>
      </div>
    )
  }
}
