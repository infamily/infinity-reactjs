import React from 'react';
import PropTypes from 'prop-types';
import UserBalance from 'components/Balance/UserBalance';
import './Header.css';

const Hours = ({ user }) => {
  if (!user) return null;

  return (
    <div className="header__balance">
      <UserBalance id={user.id} showQuota />
    </div>
  );
};

const Header = ({ user, title }) => (
  <div className="header">
    <h1 className="topics__title">{title}</h1>
    <p className="header__text">
      Open chats and projects to realise global goals
    </p>
    <Hours user={user} />
  </div>
);

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
