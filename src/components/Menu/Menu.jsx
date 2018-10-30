import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ButtonGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import configs from 'configs';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || <FormattedMessage {...messages.menuDefautlTitle} />
    };
  }

  static defaultProps = {
    page: null,
    user: null
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    signOut: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  signOut = () => {
    this.props.signOut();
  };

  new = () => {
    this.props.history.push(`${configs.linkBase()}/split/new-topic`);
  };

  getName = user => {
    const name = user && user.username;
    return name;
  };

  render() {
    const { pathname } = this.props.location;
    const isNew = !pathname.includes('new-topic');
    const title = this.getName(this.props.user) || this.state.page;

    const NewTopic = ({ mobile }) =>
      isNew ? (
        <Button
          bsStyle="success"
          onClick={this.new}
          bsSize={mobile ? 'small' : null}
        >
          {mobile ? (
            <FormattedMessage {...messages.new} />
          ) : (
            <FormattedMessage {...messages.newTopic} />
          )}
        </Button>
      ) : null;

    const MainMenu = ({ mobile }) => (
      <ButtonGroup
        className={classNames('main-menu', { 'main-menu--mobile': mobile })}
      >
        <DropdownButton
          title={title}
          dropup
          bsSize={mobile ? 'small' : null}
          id="dropdown-size-large"
        >
          <Link to={configs.linkBase()} className="main-menu__link">
            <FormattedMessage {...messages.home} />
          </Link>
          {/*<Link
            to={`${configs.linkBase()}/page/what`}
            className="main-menu__link"
          >
            <FormattedMessage {...messages.what} />
          </Link>
          <Link
            to={`${configs.linkBase()}/page/how`}
            className="main-menu__link"
          >
            <FormattedMessage {...messages.how} />
          </Link> */}
          <MenuItem divider />
          {this.props.user ? (
            <div className="main-menu__link" onClick={this.signOut}>
              <FormattedMessage {...messages.signOut} />
            </div>
          ) : (
            <Link to="/page/otp" className="main-menu__link">
              <FormattedMessage {...messages.signIn} />
            </Link>
          )}
        </DropdownButton>
        <NewTopic mobile={mobile} />
      </ButtonGroup>
    );

    return <MainMenu mobile={this.props.mobile} />;
  }
}

export default Menu;
