import React, { Component } from 'react';
import './StreamTab.css';
  // import {
  //   Glyphicon,
  // } from 'react-bootstrap';

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
    const TabToggle = () => (
      <div className="stream_tab__toggle" onClick={this.open}>
        Stream
      </div>
    );

    if (!isOpen) return <TabToggle />;
    
    return (
      <div className="tab_container">
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
    );
  }
}
