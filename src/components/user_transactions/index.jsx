import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Menu from '../utils/menu';
import Language from '../utils/lang_select';
import transactionService from './services';
import TransctionTable from './TransctionTable';
import './user_transactions.css'; 

export default class UserTransactions extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      balance: {},
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  async componentWillMount() {
    const { match } = this.props;
    const data = await transactionService.getTransactionHistory(match.params.id);
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
        <NavLink to="/" className="topics__back">&#10094; Home</NavLink>
        <h1 className="user_transactions__header">Transactions by {balance.username}</h1>
        <TransctionTable data={data} />
        <Language />
        <Menu page='Menu' />
      </div>
    );
  }
}
