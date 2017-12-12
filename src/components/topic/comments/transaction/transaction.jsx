import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,  
  Modal 
} from 'react-bootstrap';
import Select from 'react-select';
import './transaction.css';

import transactionService from '../../../../services/transaction.service';
import currencies from './currencies';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_amount: props.comment.remains,
      symbol_native: 'HUR',
      payment_currency: '2',
      currency: 'HUR',
    }
  }

  static propTypes = {
    user: PropTypes.object,
    investState: PropTypes.func.isRequired,
    state: PropTypes.bool.isRequired,
    comment: PropTypes.object.isRequired,
  };

  makeTransaction = async () => {
    const { user, comment } = this.props;
    const { payment_currency, payment_amount } = this.state;

    const data = {
      payment_currency,
      payment_amount
    };

    const result = await transactionService.createTransaction(data, comment, user);
    console.log(result);
  }

  selectCurrency = item => {
    item && this.setState({
      currency: item.value,
      payment_currency: item.index,
      symbol_native: item.symbol_native,
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { comment, state, investState } = this.props;
    const { currency, payment_amount, symbol_native } = this.state;

    return (
      <Modal show={state} className="transaction__modal">
        <Modal.Header>
          <Modal.Title>Receiver: {comment.owner.username}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Amount</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>{symbol_native}</InputGroup.Addon>
              <FormControl
                type="number"
                name="payment_amount"
                value={payment_amount}
                onChange={this.handleChange}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Currency</ControlLabel>
            <Select
              name="currency"
              clearable={false}
              resetValue={currencies[0]}
              value={currency}
              options={currencies}
              onChange={this.selectCurrency}
            />
          </FormGroup>
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.makeTransaction}>Invest</Button>
          <Button onClick={() => investState({})}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}