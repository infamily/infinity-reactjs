import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Table } from 'react-bootstrap';

import transactionService from 'services/transaction.service';
import './transactions.css';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    }
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  async componentDidMount() {
    const { id } = this.props;
    const data = await transactionService.getTransactions(id);
    const currencies = await transactionService.getCurrencies();
    
    const transactions = data.map(item => ({
      symbol: getSymbol(item.payment_currency),
      sender: item.payment_sender.username,
      recipient: item.payment_recipient.username,
      amount: item.payment_amount,
      matched: item.matched_hours,
      key: item.url.slice(-3),
    }));

    this.setState({
      transactions,
    });

    function getSymbol(id) {
      const currency = currencies.find(item => item.id === id);
      return currency.label || ' ';
    }
  }

  round(x) {
    return Math.round(x * 100) / 100;
  }

  render() {
    const { transactions } = this.state;
    const header = (`Investment (${transactions.length})`)
    const Header = () => (
      <p className="transactions__header">{header}</p>
    );

    const Row = ({ key, sender, recipient, amount, matched, symbol}) => (
      <tr key={key}>
        <td>{sender}</td>
        <td> {this.round(amount)} {symbol} ({this.round(matched)}h)</td>
        <td>{recipient}</td>
      </tr>
    );

    if (!transactions.length) return null;

    return (
      <div className="transactions__panel">
        <Panel 
          bsClass="transactions__line"
          collapsible 
          defaultExpanded={false} 
          header={Header()}>
          <Table className="transactions__table" striped bordered condensed hover>
            <tbody>
              {transactions.map(item => Row(item))}
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }
}