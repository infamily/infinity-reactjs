import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import langService from 'services/lang.service';
import configs from 'configs';
import ServerButton from './ServerSelect';
import './LangSelect.css';

const getLangName = mobile => {
  const langServ = langService.language;
  const short = langServ.lang.toUpperCase();
  const lang = !mobile ? langServ.name : short;
  return lang;
};

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: getLangName(props.mobile),
      languages: []
    };
  }

  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  async componentWillMount() {
    this.setState({ languages: langService.languages });
    this.setLanguage();
  }

  changeLanguage = index => {
    langService.changeLang(index);
    this.setLanguage();
    this.props.history.push(configs.linkBase());
  };

  setLanguage = () => {
    this.setState({
      lang: getLangName(this.props.mobile)
    });
  };

  render() {
    const { languages } = this.state;
    const Languages = () =>
      languages.map((lang, i) => (
        <MenuItem
          className="select-lang__link"
          key={lang.lang}
          eventKey={i}
          onSelect={this.changeLanguage}
        >
          {lang.name}
        </MenuItem>
      ));

    const LangMenu = ({ mobile }) => (
      <ButtonGroup
        className={mobile ? 'select-lang select-lang--mobile' : 'select-lang'}
      >
        <DropdownButton
          id="dropdown-language"
          title={this.state.lang}
          pullRight
          bsSize={mobile ? 'small' : null}
          dropup
        >
          <Languages />
        </DropdownButton>
        <ServerButton mobile={mobile} />
      </ButtonGroup>
    );

    return <LangMenu mobile={this.props.mobile} />;
  }
}

export default Language;
