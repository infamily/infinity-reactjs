import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from 'react-credit-cards';
import Modal from 'components/Modal';
import { postPayment } from './services.js';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './helpers';
import 'react-credit-cards/es/styles-compiled.css';
import './PayCheckout.css';

export default class PayCheckout extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: '',
      issuer: '',
    };
  }

  static propTypes = {
    ButtonComponent: PropTypes.func.isRequired,
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

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { 
      ButtonComponent,
      ...rest
    } = this.props;
    const { 
      isOpen
    } = this.state;

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
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="MM/YY"
                pattern="\d\d/\d\d"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="ZIP"
                pattern="\d{3,4}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input type="hidden" name="issuer" value={this.state.issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
        </Modal>
        <ButtonComponent onClick={this.handleOpen} />
      </div>
    )
  }
}