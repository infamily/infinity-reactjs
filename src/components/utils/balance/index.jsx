import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from './service';
import './balance.css';

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      hours: null
    };
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  async componentWillMount() {
    const { id } = this.props;
    const { balance } = await get(id);
    const hours = parseFloat(balance).toFixed(1);
    this.setState({ hours });
  }

  render() {
    if(!this.state.hours) return null;

    return (
      <div className="balance__hours">
        <span className="balance__counter"> {this.state.hours}h </span>
      </div>
    );
  }
};

export default Balance;
