import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from 'components/FormSelect';
import transactionService from 'services/transaction.service';

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
            <input
              type="number"
              placeholder="Amount"
              min="0"
              max="999"
              name="amount"
              className="form-control"
              value={this.props.amount}
              onChange={this.props.handleChange}
              required
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <FormSelect
              name="currency"
              label="Currency"
              action={this.props.handleChange}
              value={this.props.currency}
            >
              {currencies.map(value => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="form-control"
              value={this.props.description}
              onChange={this.props.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
