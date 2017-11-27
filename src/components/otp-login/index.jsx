import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import configs from '../../configs';
import './otp-login.css';

export default class OtpLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'view',
      email: '',
      captcha_0: '',
      captcha_1: '',
      password: '',
      captcha: {
        key: '',
        image_url: ''
      },
      token: '',
      hasError: false,
      signedIn: false,
      error: '',
    };

    this.refresh = this.refresh.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (!this.state.captcha.key) {
      this.refresh();
    }
  } 

  componentDidCatch(error, info) { 
    this.setState({ hasError: true }); 
    console.log(error, info);
  }

  onError(error) {
    this.setState({ hasError: true, error: error });
    console.error(error);
  }

  async refresh(e) {
    e && e.preventDefault();
    const { data } = await axios.get(configs.otp_api + '/otp/singup/');
    this.updateCaptcha(data);
  }

  updateCaptcha(data) {
    // console.log(data)
    
    const image_url = configs.otp_api + data['image_url'];
    const key = data['key'];
    
    this.setState({
      view: 'email',
      captcha_0: key,
      captcha_1: '',
      captcha: {
        key: key,
        image_url: image_url
      }
    }); 
  }

  async signup(e) {
    e.preventDefault();    
    try {
      const { email, captcha_0, captcha_1 } = this.state;
      if (!email || !captcha_1) {
        this.onError('All fields should be fill out.');
        return;
      }
      
      const params = { email, captcha_0, captcha_1 };
      const { data } = await axios.post(configs.otp_api + '/otp/singup/', params);
      // this.refresh();
      console.log('token', data['token'])
      this.setState({
        token: data['token'],
        view: 'login',
      });
    } catch(e) {
      console.log(e)
      this.updateCaptcha(e.error);
    }
  }

  async login(e) {
    e.preventDefault();
    const { token, password } = this.state;
    const headers = { 'Authorization': 'Token ' + token };
    const res = await axios.post(configs.otp_api + '/otp/login/', { password }, { headers });
    console.log(res)
    this.setState({ signedIn: true });
    // Global.saveToken(this.token);
    // this.goToHome();
  }

  goToHome() {
    console.log(this.state)
    this.props.history.push('/');
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state)
  } 

  render() {
    const { view, email, captcha_0, captcha_1, captcha, password } = this.state;
    const params = { email, captcha_0, captcha_1 };
    const paramsLogin = { password };

    const SignedPopUp = () => 
      <div >
        <Modal show={this.state.signedIn} className="otp__modal">
          <Modal.Header>
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Your email is {this.state.email}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.goToHome}>Home</Button> 
          </Modal.Footer>

        </Modal>
      </div>;
    
    switch(view) {
      case 'email': {
        return (
          <div className="center-block otp__box"> 
            <h1>Sign In</h1>
            <form>
              <div className="form-group">
                <input 
                  className="form-control otp__input"
                  name="email" 
                  type="email" 
                  required
                  placeholder="E-mail address"
                  value={params.email} 
                  onChange={this.handleChange}
                />
              </div>
              <div id="div_id_captcha" className="form-group">
                <div className="row">
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <input id="id_captcha_0" name="captcha_0" type="hidden" value={params.captcha_0} required />
                    <input 
                      className="form-control otp__input" 
                      value={params.captcha_1} 
                      id="id_captcha_1"
                      name="captcha_1" 
                      spellCheck="false"
                      placeholder="Captcha"
                      required 
                      onChange={this.handleChange}
                    />
                    </div>
                    <div className="otp__captcha">
                      <img src={captcha.image_url} alt="captcha" />
                      <button className="primaryAction btn otp__btn" onClick={this.refresh}>&#8634;</button>
                    </div>
                  </div>
              </div>
              <button className="primaryAction btn btn-lg otp__btn" onClick={this.signup}>CONTINUE</button>
            </form>
          </div>   
        ); 
      }
      case 'login': {
        return(
          <div>
            <SignedPopUp />          
            <Alert bsStyle="info" className="otp__alert">
              <strong>One time password</strong> has been send to your email.
            </Alert>
            <div className="center-block otp__box">
              <h1>Sign In</h1>
              <form>
                <div className="form-group">
                  <input 
                    className="form-control otp__input" 
                    value={paramsLogin.password} 
                    name="password" 
                    type="password"
                    placeholder="One time password"                    
                    required 
                    onChange={this.handleChange}
                  />
                </div>
                <button className="primaryAction btn otp__btn" onClick={this.refresh}>Resend token</button>
                <button className="primaryAction btn btn-primary otp__btn" onClick={this.login}>Submit</button>
              </form>
            </div>
          </div>
        );
      }

      default:
        return null;
    } 
  }
}
