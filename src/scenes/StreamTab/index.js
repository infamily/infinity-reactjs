import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import './StreamTab.css';
import { transitionStyles } from './style';

export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
  }

  open = () => {
    this.setState({ isOpen: true });
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const TabToggle = () => ( !isOpen &&
      <div className="stream_tab__toggle" onClick={this.open}>
        Stream
      </div>
    );

    return (
      <div>
        <TabToggle />
        <Transition in={isOpen} timeout={0}>
          {(state) => (
            <div className="tab_container" style={{
              ...transitionStyles[state]
            }}>
              <div className="stream_tab">
                <span onClick={this.close} className="stream_tab__close"></span>
                <h4 className="stream_tab__header">Schema</h4>
                <div className="stream_tab__container">
                  <div className="stream_tab__instance"></div>
                  <div className="stream_tab__instance"></div>
                  <div className="stream_tab__instance"></div>
                  <div className="stream_tab__instance"></div>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
