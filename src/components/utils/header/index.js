import React from 'react';
import PropTypes from 'prop-types';
import Balance from '../balance';
import ifIcon from './img/if.jpg';

const Hours = ({ user }) => {
  if (!user) return null;
  
  return (
    <div className="home__balance">
      Balance
      <Balance id={user.id} />
    </div>
  );
};

const Header = ({ user, title }) => (
  <div className="home__header">
    <img src={ifIcon} className="home__logo" alt="infinity_logo" />
    <h1 className="topics__title">{title}</h1>
    <Hours user={user} />
  </div>
);

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;