import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from 'scenes/MenuBar';
import HomeButton from 'components/HomeButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import transactionService from './services';
import TransactionTable from './TransactionTable';
import './UserTransactions.css';

export default class UserTransactions extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      balance: {}
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  async componentWillMount() {
    const { match } = this.props;
    const data = await transactionService.getHistory(match.params.id);
    const balance = await transactionService.getBalance(match.params.id);
    this.setState({ data, balance });
  }

  render() {
    const { data, balance } = this.state;

    return (
      <div className="main">
        <HomeButton />
        <h1 className="user_contribution__header">
          <FormattedMessage {...messages.by} /> {balance.username}
        </h1>
        <TransactionTable data={data} />
        <MenuBar />
      </div>
    );
  }
}
