import React from 'react';
import PropTypes from 'prop-types';
import UserBalance from 'components/Balance/UserBalance';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './Header.css';

const Hours = user => {
  if (!user) return null;

  return (
    <div className="header__balance">
      <UserBalance id={user.id} showQuota />
    </div>
  );
};

const Header = ({ user }) => (
  <div className="header">
    <h1 className="topics__title">
      <FormattedMessage {...messages.title} />
    </h1>
    <p className="header__text">
      <FormattedMessage {...messages.subtitle} />
    </p>
    {Hours(user)}
  </div>
);

Header.propTypes = {
  user: PropTypes.object
};

Header.defaultProps = {
  user: null
};

export default Header;
