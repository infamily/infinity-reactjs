import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from './service';
import './balance.css';
import { Link } from 'react-router-dom';

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
    const data = await get(id);
    const balance = data !== undefined ? data.balance : -1;
    const hours = parseFloat(balance).toFixed(2);
    this.setState({ hours });
  }

  render() {
    const { hours } = this.state;
    const { id } = this.props;
    
    if (!hours || hours < 0) return null;

    return (
      <Link to={"/user-transactions/" + id}>
        <div className="balance__hours">
          <span className="balance__counter"> {this.state.hours}h </span>
        </div>
      </Link>
    );
  }
};

export default Balance;
