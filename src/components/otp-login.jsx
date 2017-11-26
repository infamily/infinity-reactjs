import React, { Component } from 'react';  
import axios from 'axios';
import configs from '../configs';

export default class OtpLogin extends Component {
  constructor(props) {
    super();

    this.state = {
      view: 'email',
      params: {
        'email': '',
        'captcha_0': '',
        'captcha_1': '',
      },
      paramsLogin: {
        password: ''
      },
      captcha: {
        key: '',
        image_url: ''
      },
      token: '', 
      hasError: {
        state: false,
        error: ''
      }
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidCatch(error, info) { 
    this.setState({ 
      hasError: {
        state: true,
        error: error
      }
    });
    
    console.log(error, info);
  }

  onError(error) {
    console.error(error);
  }

  async refresh() {
    const { data } = await axios.get(configs.otp_api + '/otp/singup/');
    this.updateCaptcha(data);
  }

  updateCaptcha(data) {
    const image_url = configs.otp_api + data['image_url'];
    const key = data['key'];
    
    this.setState({
      params: { 
        'captcha_0': key,
        'captcha_1': '',
      }, 
      captcha: {
        key: key,
        image_url: image_url
      },
    });

    console.log(this.state);    
  }

  async signup() {
    try {
      const { data } = await axios.post(configs.otp_api + '/otp/singup/', this.state.params);
      this.refresh();
      this.setState({
        token: data['token'],
        view: 'login',
      });
    } catch(e) {
      this.updateCaptcha(e.error);
    }
  }

  async login() {
    const headers = { 'Authorization': 'Token ' + this.state.token };
    const { data } = await axios.post(configs.otp_api + '/otp/login/', this.state.paramsLogin, headers);
    // Global.saveToken(this.token);
    this.goToHome();
  }

  goToHome() {
    // this.router.navigateByUrl('/');
  }

  handleChange = e => {
    const { name } = e.target;
    console.log(e.target.value);
    
    const state = name !== 'password'
      ? { params: {} }
      : { paramsLogin: {} };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    const { view, params, captcha, paramsLogin } = this.state;

    if (this.state.hasError.state) {
      return( 
        <div>
          <h1>Something went wrong:</h1>
          <p>{this.state.hasError.error}</p>
        </div>
      );
    } 

    switch(view) {
      case 'email': {
        return (
          <div className="col-md-6 offset-md-3">
            <h1>Sign Up</h1>
            <form>
              <div className="form-group">
                <label htmlFor="id_email">Email:</label>
                <input 
                  className="form-control" 
                  id="id_email" 
                  name="email" 
                  value={params.email} 
                  type="email" 
                  required 
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
              </div>
              <div id="div_id_captcha" className="form-group">
                <label htmlFor="id_captcha_1">Captcha:</label>
                <div className="row">
                  <div className="col-xs-4">
                    <img src={captcha.image_url} alt="captcha" className="captcha" />
                  </div>
                  <div className="col-xs-8">
                    <input id="id_captcha_0" name="captcha_0" type="hidden" value={params.captcha_0} required />
                    <input 
                      className="form-control" 
                      value={params.captcha_1} 
                      id="id_captcha_1"
                      name="captcha_1" 
                      spellCheck="false" 
                      required 
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <button className="primaryAction btn" onClick={this.refresh}>Other Captcha</button>
              <button className="primaryAction btn btn-primary" onClick={this.signup}>Sign In</button>
            </form>
          </div>   
        ); 
      }
      case 'captcha': {

      }
      case 'login': {
        return(
          <div className="col-md-6 offset-md-3">
            <h1>Sign In</h1>
            <form>
              <div className="form-group">
                <label htmlFor="id_password">Password:</label>
                <input 
                  className="form-control" 
                  value={paramsLogin.password} 
                  name="password" 
                  type="password" 
                  required 
                  onChange={this.handleChange}
                />
              </div>
              <button className="primaryAction btn" onClick={this.refresh}>Resend token</button>
              <button className="primaryAction btn btn-primary" onClick={this.login}>Submit</button>
            </form>
          </div>   
        );
      }
    } 
  }
}
