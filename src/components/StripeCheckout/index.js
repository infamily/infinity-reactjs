import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import configs from 'configs';
import langService from 'services/lang.service';
import { postPayment } from './services';

export default class TakeMoney extends Component {
  onToken = async (token) => {
    await postPayment(token);
  }

  static propTypes = {
    ComponentClass: PropTypes.func.isRequired,
  }

  render() {
    const { 
      ComponentClass,
      ...rest
    } = this.props;
    return (
      <StripeCheckout
        token={this.onToken}
        locale={langService.current}
        stripeKey={configs.stripeKey}
        { ...rest }
      >
        <ComponentClass/>
      </StripeCheckout>
    )
  }
}