import React from 'react';
// import PropTypes from 'prop-types';
import './StreamTab.css';

export default () => (

  <div className="tab_container">
    <div className="stream_tab">
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