import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap'; 
import configs from 'configs';
import './menu.css'; 

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || 'Menu'
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
    user: PropTypes.object,
  }; 

  signOut = () => {
    this.props.signOut(); 
  }

  new = () => {
    this.props.history.push('/new-topic'); 
  }

  getName(user) {
    const name = user && user.username;
    return name;
  }


  render() {
    const isNew = this.props.location.pathname !== "/new-topic";
    const title = this.getName(this.props.user) || this.state.page;

    const NewTopic = ({ mobile }) => isNew 
      ? <Button bsStyle="success" onClick={this.new} bsSize={mobile ? "small" : null}>
        {mobile ? 'New' : 'New Topic'}
      </Button> 
      : null;

    const MainMenu = ({ mobile }) => (
      <ButtonGroup className={mobile ? "main-menu main-menu--mobile" : "main-menu"}>
        <DropdownButton title={title} dropup bsSize={mobile ? "small" : null} id="dropdown-size-large">
          <Link to={configs.linkBase()} className="main-menu__link">Home</Link>
          <Link to={configs.linkBase() + "/page/what"} className="main-menu__link">What?</Link>
          <Link to={configs.linkBase() + "/page/how"} className="main-menu__link">How?</Link>
          <MenuItem divider />
          {
            this.props.user
              ? <div className="main-menu__link" onClick={this.signOut}>Sign Out</div>
              : <Link to="/page/otp" className="main-menu__link">Sign In</Link>
          }
        </DropdownButton>
        <NewTopic mobile={mobile}/>
      </ButtonGroup>
    );

    return (
      <MainMenu mobile={this.props.mobile} />
    );
  }
}

export default Menu; 
