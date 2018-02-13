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
  }
  
  handleChange = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { data } = this.props;
    const hoverStyle = Object.keys(data.data).length // check for data
      ? ' instance--hasdata' : ' instance--nodata';
    
    const Body = () => (data.identifiers && data.description)
      ? <div>
          <p>{data.identifiers}</p>  
          <i className="instance__tag">{data.description}</i>  
        </div>
      : <pre><code className="json">
        {JSON.stringify(data, null, 2).slice(0, 200)}
        </code></pre>;

    return (
      <div className={"stream_tab__instance" + hoverStyle}>
        <Body />
      </div>
    );
  }
}
