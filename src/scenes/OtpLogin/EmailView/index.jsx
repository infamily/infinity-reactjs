import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckBox from 'components/CheckBox';
import ifIcon from 'images/if.png';
import otpService from 'scenes/OtpLogin/services';
import errorService from 'scenes/OtpLogin/services/error';

const initialState = {
  captcha_1: ''
};

export default class EmailView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      captcha_0: '',
      captcha_1: '',
      captcha: {
        key: '',
        image_url: ''
      },
      tosAgreement: false,
      tosError: false
    };
  }

  static propTypes = {
    view: PropTypes.string.isRequired,
    setPopUp: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.state.captcha.key) this.refresh();
  }

  refresh = async e => {
    e && e.preventDefault();
    try {
      const data = await otpService.getCaptcha();
      this.updateCaptcha(data);
    } catch (e) {
      this.setPopUp({
        title: 'Network Error',
        text: e
      });
    }
  };

  updateCaptcha(data) {
    if (data.key) {
      const image_url = otpService.getImage(data);

      this.setState({
        captcha_0: data.key,
        captcha_1: '',
        captcha: {
          key: data.key,
          image_url
        }
      });
      this.props.changeView('email');
    }
  }

  setPopUp = params => {
    this.props.setPopUp(params);
  };

  onEmailSubmit = async e => {
    e.preventDefault();

    try {
      const { email, captcha_0, captcha_1, tosAgreement } = this.state;
      if (!email || !captcha_1) {
        this.setPopUp({
          title: 'Sign In Error',
          text: 'All fields should be fill out.'
        });
        return;
      }

      if (!tosAgreement) {
        this.handleToSError();
        return;
      }

      const captcha = {
        hashkey: captcha_0,
        response: captcha_1
      };

      this.props.changeEmail(email);
      const params = { email, captcha };
      await otpService.signUp(params);

      this.setState({ ...initialState });
      this.props.changeView('login');
    } catch (error) {
      const text = errorService.getErrorMessage(error.response.data);
      this.setPopUp({
        title: 'Sign Up Error',
        text: text || 'Something went wrong. Try again.'
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleToS = () => {
    this.setState(prevState => ({
      tosAgreement: !prevState.tosAgreement,
      tosError: false
    }));
  };

  handleToSError = () => {
    this.setState({
      tosError: true
    });
  };

  render() {
    const {
      email,
      captcha_0,
      captcha_1,
      captcha,
      tosAgreement,
      tosError
    } = this.state;

    if (this.props.view !== 'email') return null;

    return (
      <div>
        <img src={ifIcon} className="otp__logo" alt="infinity" />
        <div className="center-block otp__box">
          <h1 className="otp__header">Sign In</h1>
          <form onSubmit={this.onEmailSubmit} testId="emailSubmitForm">
            <div className="form-group">
              <input
                className="form-control otp__input"
                name="email"
                type="email"
                required
                placeholder="E-mail address"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div id="div_id_captcha" className="form-group">
              <div className="row">
                <div className="col-md-8">
                  <input
                    name="captcha_0"
                    type="hidden"
                    value={captcha_0}
                    required
                  />
                  <input
                    className="form-control otp__input"
                    value={captcha_1}
                    name="captcha_1"
                    spellCheck="false"
                    placeholder="Captcha"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="otp__captcha">
                  <img src={captcha.image_url} alt="captcha" />
                  <a
                    className="primaryAction btn otp__btn"
                    onClick={this.refresh}
                  >
                    &#8634;
                  </a>
                </div>
              </div>
            </div>
            <div>
              <CheckBox
                value={tosAgreement}
                error={tosError}
                action={this.handleToS}
              >
                <span onClick={this.handleToS} testId="tosText">
                  I have read and agree to the{' '}
                </span>
                <Link to="/terms">Terms of Service</Link>
              </CheckBox>
            </div>
            <button type="submit" className="primaryAction btn btn-lg otp__btn">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    );
  }
}
