import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import MenuBar from 'scenes/MenuBar';
import transactionService from './services';
import TransactionTable from './TransactionTable';
import './user_transactions.css';

export default class UserTransactions extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      balance: {},
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  async componentWillMount() {
    const { match } = this.props;
    const data = await transactionService.getHistory(match.params.id);
    const balance = await transactionService.getBalance(match.params.id);
    this.setState({ data, balance });
  }

  render() {
    const {
      data,
      balance,
    } = this.state;

    return (
      <div className="main">
        <NavLink to="/" className="nav__back">&#10094; Home</NavLink>
        <h1 className="user_contribution__header">Investment by {balance.username}</h1>
        <TransactionTable data={data} />
        <MenuBar page='Menu' />
      </div>
    );
  }
}
