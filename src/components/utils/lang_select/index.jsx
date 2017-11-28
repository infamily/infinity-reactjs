import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import langService from '../../../services/lang.service';

import './lang_select.css';

class Language extends Component {
  constructor() {
    super();
    this.state = {
      lang: 'Language'
    }
  }

  componentWillMount() {
    this.setLanguage();
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
      return <MenuItem className="select-lang__link" key={lang} eventKey={i} onSelect={this.changeLanguage}>{lang}</MenuItem>
    })

    return (
      <div className="select-lang">
        <ButtonToolbar>
          <DropdownButton title={this.state.lang} pullRight={true} dropup bsSize="large" id="dropdown-size-large">
            <Languages />
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Language; 