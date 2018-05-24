import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';
import './SignInLine.css';

const SignInLine = ({ text }) => (
  <div className="">
    <p>
      <Link to="/page/otp">
        <FormattedMessage {...messages.signIn} />
      </Link>{' '}
      {text}.
    </p>
  </div>
);

SignInLine.propTypes = {
  text: PropTypes.string.isRequired
};

export default SignInLine;
