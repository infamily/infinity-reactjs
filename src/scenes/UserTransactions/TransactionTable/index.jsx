import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import './Transactions.css';

export default class Transactions extends PureComponent {
  static propTypes = {
    data: PropTypes.array
  };

  render() {
    const { data } = this.props;
    const types = [
      <FormattedMessage {...messages.time} />,
      <FormattedMessage {...messages.money} />
    ];

    const Row = ({ type, url }) => (
      <tr key={url}>
        <td>{types[type] || <FormattedMessage {...messages.none} />}</td>
        <td>
          <a href={url} target="_blank">
            {url}
          </a>
        </td>
        <td>
          <Button
            bsSize="xsmall"
            bsStyle="success"
            disabled
            className="investments__sell"
          >
            <FormattedMessage {...messages.sell} />
          </Button>
        </td>
      </tr>
    );

    if (!data) return <Loading />;
    if (!data.length)
      return (
        <span>
          <FormattedMessage {...messages.empty} /> )=
        </span>
      );

    return (
      <Table responsive striped condensed hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage {...messages.type} />
            </th>
            <th>
              <FormattedMessage {...messages.contribution} />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>{data.map(item => Row(item))}</tbody>
      </Table>
    );
  }
}
