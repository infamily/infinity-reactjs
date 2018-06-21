import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Show from '../Show';

export default class Instance extends Component {
  constructor() {
    super();
    this.state = {
      end: 200 // max json length
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    showInstance: PropTypes.func.isRequired
  };

  render() {
    const { end } = this.state;
    const { data, showInstance } = this.props;
    const hasData = Object.keys(data.data).length; // check for instance data
    const hoverStyle = hasData ? 'instance--hasdata' : 'instance--nodata';

    const Body = () =>
      data.data.title && data.data.body ? (
        <div>
          <p>{data.data.title}</p>
          <span className="instance__text">{data.data.body}</span>
        </div>
      ) : (
        <pre>
          <code className="json">
            {JSON.stringify(data, null, 2).slice(0, end)}
          </code>
        </pre>
      );

    return (
      <div className="stream_tab__instance-box">
        <div className={`stream_tab__instance ${hoverStyle}`}>
          {hasData ? <Show action={() => showInstance(data)} /> : null}
          <Body />
        </div>
      </div>
    );
  }
}
