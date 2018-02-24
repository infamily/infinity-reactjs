import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Instance extends Component {
  constructor() {
    super();
    this.state = {
      end: 200, // max json length
    }
  }
  
  static propTypes = {
    data: PropTypes.object.isRequired,
    showInstance: PropTypes.func.isRequired,
  }
  
  show = () => {
    // this.setState({ end: 1000 })
  }

  hide = () => {
    // this.setState({ end: 200 })
  }

  render() {
    const { end } = this.state;
    const { data, showInstance } = this.props;
    const hasData = Object.keys(data.data).length; // check for instance data
    const hoverStyle = hasData ? ' instance--hasdata' : ' instance--nodata';
    
    const Body = () => (data.data.title && data.data.body)
      ? <div>
          <p>{data.data.title}</p>  
          <span className="instance__text">{data.data.body}</span>  
        </div>
      : <pre onMouseOver ={this.show} onMouseLeave={this.hide}><code className="json">
          {JSON.stringify(data, null, 2).slice(0, end)}
        </code></pre>;
    
    const Show = () => <p onClick={() => hasData && showInstance(data)} className="instance__show">SHOW</p>;

    return (
      <div className="stream_tab__instance-box">
        <div className={"stream_tab__instance" + hoverStyle}>
          {hasData ? <Show /> : null}
          <Body />
        </div>
      </div>
    );
  }
}
