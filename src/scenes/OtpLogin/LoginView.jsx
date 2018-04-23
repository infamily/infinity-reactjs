import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import ifIcon from 'images/if.png';

export default class LoginView extends Component {
  constructor() {
    super();
    this.state = { password: '' };
  }

  static propTypes = {
    view: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
  };

  submit = () => {
    const { password } = this.state;
    this.props.changePassword(password);
    this.login.login();
  };

  goBack = () => {
    this.props.changeView('email');
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { password } = this.state;

    if (this.props.view !== 'login') return null;

    return (
      <div>
        <Alert bsStyle="info" className="otp__alert">
          <strong>One time password</strong> has been send to your email.
        </Alert>
        <img src={ifIcon} className="otp__logo" alt="infinity" />
        <div className="center-block otp__box">
          <div>
            <div className="form-group">
              <input
                className="form-control otp__input"
                value={password}
                name="password"
                type="password"
                placeholder="One time password"
                required
                onChange={this.handleChange}
              />
            </div>
            <button
              className="primaryAction btn otp__btn"
              onClick={this.goBack}
            >
              Resend code
            </button>
            <button className="btn btn-primary otp__btn" onClick={this.submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
