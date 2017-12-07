import React, { Component } from 'react';
import { ButtonGroup , DropdownButton, MenuItem } from 'react-bootstrap';
import langService from '../../../services/lang.service';
import ServerButton from './server_select';

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
        <ButtonGroup>
          <DropdownButton title={this.state.lang} pullRight={true} bsSize="large" dropup id="dropdown-size-large">
            <Languages />
          </DropdownButton>
          <ServerButton />
        </ButtonGroup>
      </div>
    );
  }
}

export default Language; 