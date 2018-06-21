import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from 'components/FormSelect';
import { FormattedMessage } from 'react-intl';
import transactionService from 'services/transaction.service';
import messages from './messages';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: []
    };
  }

  async componentWillMount() {
    const data = await transactionService.getCurrencies();
    const currencies = data.map(item => item.label);
    this.setState({ currencies });
  }

  static propTypes = {
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  render() {
    const { currencies } = this.state;

    if (!currencies.length) return null;

    return (
      <div className="row">
        <div className="well" />
        <div className="col-lg-6">
          <div className="form-group">
            <FormattedMessage {...messages.amountPlaceholder}>
              {msg => (
                <input
                  type="number"
                  placeholder={msg}
                  min="0"
                  max="999"
                  name="amount"
                  className="form-control"
                  value={this.props.amount}
                  onChange={this.props.handleChange}
                  required
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <FormattedMessage {...messages.currencyLabel}>
              {msg => (
                <FormSelect
                  name="currency"
                  label={msg}
                  action={this.props.handleChange}
                  value={this.props.currency}
                >
                  {currencies.map(value => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </FormSelect>
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <FormattedMessage {...messages.descriptionPlaceholder}>
              {msg => (
                <input
                  type="text"
                  placeholder={msg}
                  name="description"
                  className="form-control"
                  value={this.props.description}
                  onChange={this.props.handleChange}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
}
