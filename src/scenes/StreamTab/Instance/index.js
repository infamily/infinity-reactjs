import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Instance extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  
  static propTypes = {
    data: PropTypes.object.isRequired,
    showInstance: PropTypes.func.isRequired,
  }
  
  handleChange = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { data, showInstance } = this.props;
    const hasData = Object.keys(data.data).length; // check for instance data
    const hoverStyle = hasData ? ' instance--hasdata' : ' instance--nodata';
    
    const Body = () => (data.identifiers && data.description)
      ? <div>
          <p>{data.identifiers}</p>  
          <span className="instance__text">{data.description}</span>  
        </div>
      : <pre><code className="json">
        {JSON.stringify(data, null, 2).slice(0, 200)}
        </code></pre>;

    return (
      <div className={"stream_tab__instance" + hoverStyle} onClick={() => hasData && showInstance(data)}>
        <Body/>
      </div>
    );
  }
}
