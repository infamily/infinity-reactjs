import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import otpService from './services';
import errorService from './services/error';
import helpers from './services/helpers';
import MenuBar from 'scenes/MenuBar'; 
import EmailView from './EmailView'; 
import ifIcon from 'images/if.png';
import './otp-login.css'; 

export default class OtpLogin extends Component {
  constructor() {
    super();

    this.state = {
      view: 'view',
      popUp: {
        state: false,
        title: '',
        text: ''
      },
      email: '',
      password: '',
    };
  }

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired, 
    persistedComment: PropTypes.object.isRequired, 
    persistedTopic: PropTypes.object.isRequired, 
    user: PropTypes.object,
  }; 


  login = async (e) => {
    e.preventDefault();
    
    try {
      const { password, email } = this.state;
      if (!password) {
        this.setPopUp({
          title: 'Sign In Error',
          text: 'The filed should be fill out.'
        });
        return;
      }
      const params = {
        one_time_password: password,
        email,
      };

      const raw = await otpService.userLogin(params);
      const data = helpers.formatUserData(raw);

      this.props.signIn(data);
      this.redirectTo();
    } catch(e) {
      if (e.response.status === 400) {
        this.setPopUp({
          title: 'Sign In Error',
          text: 'Wrong code. Try again.'
        });
      } else {
        const text = errorService.getErrorMessage(e.response.data);
        this.setPopUp({
          title: 'Something went wrong.',
          text,
        });
      }
    }
  }

  redirectTo = () => {
    const { history, persistedComment, persistedTopic } = this.props;
    let path = '/';

    if (persistedComment.id) {
      path = '/topic/' + persistedComment.id;
    }
    
    if (persistedTopic.hasOwnProperty('topic_title')) {
      path = '/new-topic';
    }

    history.push(path);
  }

  setPopUp = ({ title, text }) => {
    this.setState({
      popUp: {
        state: true,
        title,
        text,
      }
    });
  }

  resetPopUp = () => {
    this.setState({
      popUp: {
        state: false,
        title: '',
        text: ''
      }
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }); 
  }

  changeEmail = (email) => {
    this.setState({
      email,
    }); 
  }

  changeView = (view) => {
    this.setState({
      view,
    }); 
  } 

  render() {
    const { 
      popUp,
      view,
      password,
    } = this.state;

    const PopUp = () => (
      <div >
        <Modal show={popUp.state} className="otp__modal">
          <Modal.Header>
            <Modal.Title>{popUp.title}</Modal.Title>
          </Modal.Header> 
          <Modal.Body>
            {popUp.text}
          </Modal.Body> 
          <Modal.Footer>
            <Button onClick={this.resetPopUp}>Close</Button> 
          </Modal.Footer> 
        </Modal>
      </div>
    );
    
    return (
      <div>
        <PopUp />      
        <EmailView 
          view={view} 
          changeView={this.changeView} 
          setPopUp={this.setPopUp}
          changeEmail={this.changeEmail}          
        />
        {view !== 'login' ? null : (
          <div>
            <Alert bsStyle="info" className="otp__alert">
              <strong>One time password</strong> has been send to your email.
            </Alert>
            <img src={ifIcon} className="otp__logo" alt="infinity" />
            <div className="center-block otp__box">
              <form>
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
                <button className="primaryAction btn otp__btn" onClick={this.refresh}>Resend code</button>
                <button className="btn btn-primary otp__btn" onClick={this.login}>Submit</button>
              </form>
            </div>
          </div>
        )}
        <MenuBar />
      </div>
    );
  }
}
