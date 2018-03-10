import React, { Component } from 'react';
import PropTypes from 'prop-types';
import configs from 'configs';
import Transition from 'react-transition-group/Transition';
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
    TabPanelContent: PropTypes.func.isRequired,
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
    const { TabPanelContent } = this.props;
    const { isOpen, fullWidth } = this.state;
    const fullStyle = fullWidth ? ' tab_container--full' : '';

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
                <TabPanelContent close={this.close} toggleFullScreen={this.toggleFullScreen}/>
              </div>
            </div>
          )}
        </Transition>
      </div>
    )
  }
}
