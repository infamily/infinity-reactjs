import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'; 
import langService from '../../../services/lang.service';

import './account.css';

//props-types signout
//props-types history

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'Language'
    }
    console.log(this.props)
  }
  
  componentWillMount() {
    this.setLanguage();
  }

  goToLogin = () => {
    this.props.history.push('/page/otp');
  }

  signOut = () => {
    this.props.signOut();
  }

  changeLanguage = (index, e) => {
    langService.changeLang(index);
    this.setLanguage();
    window.location.reload(false);
  }
  
  setLanguage = () => {
    const lang = langService.language_names[langService.lang_index]; 
    this.setState({
      lang: lang
    });
  }

  render() {
    const Languages = () => langService.language_names.map((lang, i) => {
      return <MenuItem className="account__link" key={lang} eventKey={i} onSelect={this.changeLanguage}>{lang}</MenuItem>
    })

    return (
      <div className="account">
        <ButtonToolbar>
          <DropdownButton title="Account" pullRight={true} dropup bsSize="large" id="dropdown-size-large">
            <Languages />
            <MenuItem divider />
              { 
                this.props.token
                ? <MenuItem className="account__link" onSelect={this.signOut}>Sign Out</MenuItem>
                : <MenuItem className="account__link" onSelect={this.goToLogin}>Sign In</MenuItem>
              }
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Account; 