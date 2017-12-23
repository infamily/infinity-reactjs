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

  changeLanguage = (index) => {
    langService.changeLang(index);
    this.setLanguage();
    window.location.reload(false);
  }

  setLanguage = () => {
    const lang = langService.language;
    this.setState({
      lang: lang.name
    });
  }

  render() {
    const Languages = () => langService.languages.map((lang, i) => {
      return (
        <MenuItem className="select-lang__link" key={lang.lang} eventKey={i} onSelect={this.changeLanguage}>
          {lang.name}
        </MenuItem>
      );
    });

    const LangMenu = ({ mobile }) =>
      <div className={mobile ? "select-lang select-lang--mobile" : "select-lang"}>
        <ButtonGroup>
          <DropdownButton
            id="dropdown-language"
            title={this.state.lang} 
            pullRight={true} 
            bsSize={mobile ? "small" : null} 
            dropup
          >
            <Languages />
          </DropdownButton>
          <ServerButton mobile={mobile}/>
        </ButtonGroup>
      </div>;

    return (
      <div>
        <LangMenu mobile={true} />
        <LangMenu mobile={false} />
      </div>
    );
  }
}

export default Language; 
