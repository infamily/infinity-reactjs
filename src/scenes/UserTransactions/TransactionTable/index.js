import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Loading from 'components/Loading';
import './transactions.css';

export default class Transactions extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  };

  render() {
    const { data } = this.props;

    const Row = ({ type, url }) => (
      <tr key={url}>
        <td>{type === 0 ? 'Time' : 'Money'}</td>
        <td><a href={url} target="_blank">{url}</a></td>
      </tr>
    );

    if (!data) return <Loading />;
    if (!data.length) return <span>Empty =(</span>;

    return (
      <Table className="transactions__table" striped bordered condensed hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => Row(item))}
        </tbody>
      </Table>
    );
  }
}