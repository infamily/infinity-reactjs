import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import serverService from 'services/server.service';
import PropTypes from 'prop-types';
import MenuBar from 'scenes/MenuBar';
import EmailView from './EmailView';
import LoginView from './LoginView';
import { formatUserData, getErrorMessage } from './helpers';
import otpService from './services';
import messages from './messages';
import './OtpLogin.css';

export default class OtpLogin extends Component {
  constructor() {
    super();
    this.state = {
      view: 'view', // email || login
      email: '',
      popUp: { state: false, title: '', text: '' },
      ignoreCaptcha: false
    };
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    persistedComment: PropTypes.object.isRequired,
    persistedTopic: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  async componentWillMount() {
    const constance = await serverService.get('/constance/');
    const { ignore_captcha } = constance.data;
    this.setState({ ignoreCaptcha: ignore_captcha });
  }

  login = async password => {
    try {
      const { email } = this.state;
      if (!password) {
        this.setPopUp({
          title: <FormattedMessage {...messages.signInErrorTitle} />,
          text: <FormattedMessage {...messages.signInErrorfillOut} />
        });
        return;
      }
      const params = { one_time_password: password, email };

      const raw = await otpService.userLogin(params);
      const data = formatUserData(raw);

      this.props.signIn(data);
      this.redirectTo();
    } catch (e) {
      if (e.response.status === 400) {
        this.setPopUp({
          title: <FormattedMessage {...messages.signInErrorTitle} />,
          text: <FormattedMessage {...messages.signInErrorWrongCode} />
        });
      } else {
        const formattedData = getErrorMessage(e.response.data);
        this.setPopUp({
          title: <FormattedMessage {...messages.commonErrorTitle} />,
          text: <FormattedMessage {...formattedData} />
        });
      }
    }
  };

  goBack = () => {
    this.changeView('email');
  };

  redirectTo = () => {
    const { history, persistedComment, persistedTopic } = this.props;
    let path = '/';

    if (persistedComment.id) {
      path = `/topic/${persistedComment.id}`;
    }

    if (persistedTopic.topic_title) {
      path = '/new-topic';
    }

    history.push(path);
  };

  setPopUp = ({ title, text }) => {
    this.setState({
      popUp: {
        state: true,
        title,
        text
      }
    });
  };

  resetPopUp = () => {
    this.setState({
      popUp: {
        state: false,
        title: '',
        text: ''
      }
    });
  };

  changeEmail = email => {
    this.setState({ email });
  };

  changeView = view => {
    this.setState({ view });
  };

  render() {
    const { popUp, view } = this.state;

    const PopUp = () => (
      <div>
        <Modal show={popUp.state} className="otp__modal">
          <Modal.Header>
            <Modal.Title>{popUp.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{popUp.text}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.resetPopUp}>
              <FormattedMessage id="infinity.common.buttons.close" />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    return (
      <div className="main">
        <PopUp />
        <EmailView
          view={view}
          changeView={this.changeView}
          setPopUp={this.setPopUp}
          changeEmail={this.changeEmail}
          ignoreCaptcha={this.state.ignoreCaptcha}
        />
        <LoginView
          view={view}
          goBack={this.goBack}
          login={this.login}
          changePassword={this.changePassword}
        />
        <MenuBar />
      </div>
    );
  }
}
