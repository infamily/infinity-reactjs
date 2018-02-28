import React from 'react';
import PropTypes from 'prop-types';
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

const Header = ({ user, title }) => {
  return (
    <div className="header">
      <h1 className="topics__title">{title}</h1>
      <Hours user={user} />
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;