import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Table } from 'react-bootstrap';
import './transactions.css';
import { spawn } from 'child_process';

export default class Transactions extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.props;

    const Row = ({ type, transaction }) => (
      <tr key={transaction}>
        <td>{type}</td>
        <td><a href={transaction}>{transaction}</a></td>
      </tr>
    );

    if (!data.length) return <span>Empty =(</span>;

    return (
      <Table className="transactions__table" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => Row(item))}
        </tbody>
      </Table>
    );
  }
}