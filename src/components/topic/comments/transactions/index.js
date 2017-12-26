import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Table } from 'react-bootstrap';

import transactionService from '../../../../services/transaction.service';
import './transactions.css';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const data = await transactionService.getTransactions(id);

    const transactions = data.map(item => ({ 
      name: item.payment_sender.username,
      amount: item.matched_hours,
      key: item.url.slice(-3),
    }));

    this.setState({
      transactions,
    });
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  round(x) {
    return Math.round(x * 100) / 100;
  }

  render() {
    console.log(this.state)
    const { transactions } = this.state;
    const header = (`Transactions (${transactions.length})`)
    const Header = () => (
      <span className="transactions__header">{header}</span>
    );
    
    const Row = ({key, name, amount}) => (
      <tr key={key}>
        <td>{name}</td>
        <td>{this.round(amount)}h</td>
      </tr>
    );

    if (!transactions.length) return null;

    return (
      <div className="transactions__panel">
        <Panel 
          // bsClass="transactions__line"
          collapsible 
          defaultExpanded={false} 
          header={Header()}>
          <Table striped bordered condensed hover>
            <tbody>
              {transactions.map(item => Row(item))}
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }
}