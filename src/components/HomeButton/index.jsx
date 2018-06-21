import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default () => (
  <Link to="/" className="nav__back">
    <span>
      &#10094; <FormattedMessage {...messages.homeLink} />
    </span>
  </Link>
);
