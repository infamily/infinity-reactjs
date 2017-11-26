import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap'; 

import './menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || 'Menu'
    }
  }

  static propTypes = {
    match: PropTypes.string
  };

  render() {

    return (
      <div className="main-menu">
        <ButtonToolbar>
          <DropdownButton title={this.state.page} dropup bsSize="large" id="dropdown-size-large">
            <Link to="/" className="main-menu__link">Home </Link>
            <Link to="/page/what" className="main-menu__link">What?</Link>
            <Link to="/page/how" className="main-menu__link">How?</Link>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Menu; 