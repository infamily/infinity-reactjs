import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Balance from 'components/Balance';
import './Header.css';

const Hours = ({ user }) => {
  if (!user) return null;
  
  return (
    <div className="header__balance">
      <Balance id={user.id} showQuota={true}/>
    </div>
  );
};

const Header = ({ user, title, history }) => {
  const push = (key) => history.push(key);

  return (
    <div>
      <div className="header">
        <h1 className="topics__title">{title}</h1>
        <Hours user={user} />
      </div>
      <div className="header">
        <DropdownButton title="All programms" bsSize="xsmall" onSelect={push}>
          <MenuItem eventKey="/types">Types</MenuItem>
          <MenuItem eventKey="/">Topics</MenuItem>
        </DropdownButton>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default Header;