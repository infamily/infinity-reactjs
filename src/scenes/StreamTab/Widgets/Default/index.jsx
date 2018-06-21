import React, { Component } from 'react';
import PropTypes from 'prop-types';
import configs from 'configs';
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
    const hoverStyle = hasData ? 'hasdata' : 'nodata';
    const color = configs.objectColors[data.role];
    const objectStyle = { borderColor: color };

    const Body = () =>
      data.identifiers && data.description ? (
        <div>
          <p>{data.identifiers}</p>
          <span className="instance__text">{data.description}</span>
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
        <div
          className={`stream_tab__instance instance--${hoverStyle}`}
          style={objectStyle}
        >
          {hasData ? <Show action={() => showInstance(data)} /> : null}
          <Body />
        </div>
      </div>
    );
  }
}
