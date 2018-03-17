import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Loading from 'components/Loading';
import { Button } from 'react-bootstrap';
import './transactions.css';

export default class Transactions extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
  };

  render() {
    const { data } = this.props;
    const types = ['Time', 'Money'];
    
    const Row = ({ type, url }) => (
      <tr key={url}>
        <td>{types[type] || 'None'}</td>
        <td>
          <a href={url} target="_blank">{url}</a>
        </td>
        <td>
          <Button
            bsSize="xsmall"
            bsStyle="success"
            disabled
            className="investments__sell">
            Sell
          </Button>
        </td>
      </tr>
    );

    if (!data) return <Loading />;
    if (!data.length) return <span>Empty :(</span>;

    return (
      <Table responsive striped condensed hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Contribution</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => Row(item))}
        </tbody>
      </Table>
    );
  }
}