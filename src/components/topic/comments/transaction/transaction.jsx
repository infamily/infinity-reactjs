import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  ButtonGroup, 
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,  
  ProgressBar, 
  Modal 
} from 'react-bootstrap';
import Select from 'react-select';

import currencies from './currencies';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.comment.remains * 20,
      symbol_native: '$',
      currency: 'USD',
    }
  }

  static propTypes = {
    user: PropTypes.object,
    investState: PropTypes.func.isRequired,
    state: PropTypes.bool.isRequired,
    comment: PropTypes.object.isRequired,
  };

  makeTransaction = () => {
    
    console.log(this.state)
    console.log('done')
  }

  selectCurrency = item => {
    item && this.setState({
      currency: item.value,
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
    const { currency, amount, symbol_native } = this.state;

    // console.log(comment)
    
    return (
      <Modal show={state} className="topic_view__modal">
        <Modal.Header>
          <Modal.Title>Investor Form</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Amount</ControlLabel>
            <InputGroup>
              <InputGroup.Addon>{symbol_native}</InputGroup.Addon>
              <FormControl
                // className="topic_view__field"
                type="text"
                name="amount"
                label="Title"
                value={amount}
                onChange={this.handleChange}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Currency</ControlLabel>
            <Select
              // className="topic_view__select"
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