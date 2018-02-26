import React from 'react';
import PropTypes from 'prop-types';
import Balance from 'components/Balance';
import ifIcon from './img/if.jpg';

const Hours = ({ user }) => {
  if (!user) return null;
  
  return (
    <div className="home__balance">
      <Balance id={user.id} showQuota={true}/>
    </div>
  );
};

const Header = ({ user, title }) => (
  <div className="home__header">
    <h1 className="topics__title">{title}</h1>
    <img src={ifIcon} className="home__logo" alt="infinity_logo" />        
    <Hours user={user} />
  </div>
);

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;