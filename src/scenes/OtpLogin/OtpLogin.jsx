import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import otpService from './services';
import errorService from './services/error';
import helpers from './services/helpers';
import MenuBar from 'scenes/MenuBar';
import EmailView from './EmailView';
import LoginView from './LoginView';
import './OtpLogin.css';

export default class OtpLogin extends Component {
  constructor() {
    super();
    this.state = {
      view: 'view',
      email: '',
      password: '',
      popUp: { state: false, title: '', text: '' }
    };
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    persistedComment: PropTypes.object.isRequired,
    persistedTopic: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  login = async password => {
    try {
      const { email } = this.state;
      if (!password) {
        this.setPopUp({
          title: 'Sign In Error',
          text: 'The filed should be fill out.'
        });
        return;
      }
      const params = { one_time_password: password, email };

      const raw = await otpService.userLogin(params);
      const data = helpers.formatUserData(raw);

      this.props.signIn(data);
      this.redirectTo();
    } catch (e) {
      if (e.response.status === 400) {
        this.setPopUp({
          title: 'Sign In Error',
          text: 'Wrong code. Try again.'
        });
      } else {
        const text = errorService.getErrorMessage(e.response.data);
        this.setPopUp({
          title: 'Something went wrong.',
          text
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

    if (persistedTopic.hasOwnProperty('topic_title')) {
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

  changePassword = password => {
    this.setState({ password });
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
            <Button onClick={this.resetPopUp}>Close</Button>
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
