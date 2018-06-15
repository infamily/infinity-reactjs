import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'components/Layout';
import messages from './messages';
import './SplashScreen.css';

export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: true
    };
  }

  render() {
    if (!this.state.status) return null;
    return (
      <div className="splash__container">
        <div className="splash__content">
          <h1>
            <FormattedMessage {...messages.title} />
          </h1>
          <p>
            <FormattedMessage {...messages.subtitle} />
          </p>
          <Button onClick={() => this.setState({ status: false })}>
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}
