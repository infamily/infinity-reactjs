import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from 'react-credit-cards';
import Modal from 'components/Modal';
import Payment from './Payment';
import { postPayment } from './services.js';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  defaultState,
} from './helpers';
import 'react-credit-cards/es/styles-compiled.css';
import './PayCheckout.css';

export default class PayCheckout extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      buttonText: '',
      ...defaultState,
    };
  }

  static propTypes = {
    ButtonComponent: PropTypes.func.isRequired,
  }

  showMessage = (buttonText) => {
    this.setState({ buttonText });
    setTimeout(() => {
      this.setState({ buttonText: '' });
    }, 3000);
  }

  handleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const response = await postPayment(this.state, 1); // 1 = stripe
    console.log(response, 'response');
    if (response.data) {
      this.setState({ ...defaultState });
      this.form.reset();      
      this.handleOpen();
    } else {
      this.setState({ loading: false });
      this.showMessage(response.error.message || 'Server error. Try again.');
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { 
      ButtonComponent,
    } = this.props;

    const { 
      isOpen,
      currency,
      amount,
      buttonText,
    } = this.state;

    const ButtonText = () => buttonText ? buttonText : <span>PAY {amount || 0} {currency}</span>;
    return (
      <div>
        <Modal isOpen={isOpen} close={this.handleOpen}>
          <div className="pay_checkout__box">
            <Cards
              number={this.state.number}
              name={this.state.name}
              expiry={this.state.expiry}
              cvc={this.state.cvc}
              focused={this.state.focused}
            />
            <br/>
          </div>
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                value={this.state.number}
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="tel"
                    name="expiry"
                    value={this.state.expiry}
                    className="form-control"
                    placeholder="MM/YY"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="tel"
                    name="cvc"
                    value={this.state.cvc}
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="tel"
                    name="zip"
                    value={this.state.zip}
                    className="form-control"
                    placeholder="ZIP"
                    pattern="\d{4,12}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
            </div>
            <Payment 
              amount={this.state.amount}
              description={this.state.description}
              currency={this.state.currency} 
              handleChange={this.handleChange}
            />
            <input type="hidden" name="issuer" value={this.state.issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block">
                {this.state.loading ? '...' : <ButtonText />}
              </button>
            </div>
          </form>
        </Modal>
        <div onClick={this.handleOpen}>
          <ButtonComponent />
        </div>
      </div>
    )
  }
}