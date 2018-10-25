import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import CheckBox from 'components/CheckBox';
import ifIcon from 'images/if.png';
import otpService from 'scenes/OtpLogin/services';
import { getErrorMessage } from '../helpers';
import messages from '../messages';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.ignoreCaptcha) {
      this.setState({ captcha_1: '123' });
    }
  }

  refresh = async e => {
    if (e) e.preventDefault();
    try {
      const data = await otpService.getCaptcha();
      this.updateCaptcha(data);
    } catch (err) {
      this.setPopUp({
        title: <FormattedMessage {...messages.serverErrTitle} />,
        text: err
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
          title: <FormattedMessage {...messages.signInErrorTitle} />,
          text: <FormattedMessage {...messages.allFilledOut} />
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
      if (error.response !== undefined) {
        const formattedText = getErrorMessage(error.response.data);
        this.setPopUp({
          title: <FormattedMessage {...messages.signInErrorTitle} />,
          text: <FormattedMessage {...formattedText} />
        });
      }
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

    const captchaDisplay = this.props.ignoreCaptcha ? 'none' : 'block';

    return (
      <div>
        <img src={ifIcon} className="otp__logo" alt="infinity" />
        <div className="center-block otp__box">
          <h1 className="otp__header">
            <FormattedMessage {...messages.signInTitle} />
          </h1>
          <form onSubmit={this.onEmailSubmit} testid="emailSubmitForm">
            <div className="form-group">
              <FormattedMessage {...messages.emailPlaceholder}>
                {msg => (
                  <input
                    className="form-control otp__input"
                    name="email"
                    type="email"
                    required
                    placeholder={msg}
                    value={email}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </div>
            <div
              id="div_id_captcha"
              className="form-group"
              style={{ display: captchaDisplay }}
            >
              <div className="row">
                <div className="col-md-8">
                  <input
                    name="captcha_0"
                    type="hidden"
                    value={captcha_0}
                    required
                  />
                  <FormattedMessage {...messages.captchaPlaceholder}>
                    {msg => (
                      <input
                        className="form-control otp__input"
                        value={captcha_1}
                        name="captcha_1"
                        spellCheck="false"
                        placeholder={msg}
                        required
                        onChange={this.handleChange}
                      />
                    )}
                  </FormattedMessage>
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
                <Fragment>
                  <span onClick={this.handleToS} testid="tosText">
                    <FormattedMessage {...messages.tosRead} />{' '}
                  </span>
                  <Link to="/terms">
                    <FormattedMessage {...messages.tos} />
                  </Link>
                </Fragment>
              </CheckBox>
            </div>
            <button type="submit" className="primaryAction btn btn-lg otp__btn">
              <FormattedMessage {...messages.continue} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
