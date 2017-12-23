import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap'; 

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
    user: PropTypes.object,
  }; 

  signOut = () => {
    this.props.signOut(); 
  }

  new = () => {
    this.props.history.push('/new-topic'); 
  }

  render() {
    const isNew = this.props.location.pathname !== "/new-topic";
    const NewTopic = ({ mobile }) => isNew 
      ? <Button bsStyle="success" onClick={this.new} bsSize={mobile ? "small" : null}>New Topic</Button> 
      : null;

    const MainMenu = ({ mobile }) => (
      <div className={mobile ? "main-menu main-menu--mobile" : "main-menu"}>
        <ButtonGroup>
          <DropdownButton title={this.state.page} dropup bsSize={mobile ? "small" : null} id="dropdown-size-large">
            <Link to="/" className="main-menu__link">Home </Link>
            <Link to="/page/what" className="main-menu__link">What?</Link>
            <Link to="/page/how" className="main-menu__link">How?</Link>
            <MenuItem divider />
            {
              this.props.user
                ? <div className="main-menu__link" onClick={this.signOut}>Sign Out</div>
                : <Link to="/page/otp" className="main-menu__link">Sign In</Link>
            }
          </DropdownButton>
          <NewTopic mobile={mobile}/>
        </ButtonGroup>
      </div>
    );

    return (
      <div>
       <MainMenu mobile={true} />
       <MainMenu mobile={false} />
      </div>      
    );
  }
}

export default Menu; 