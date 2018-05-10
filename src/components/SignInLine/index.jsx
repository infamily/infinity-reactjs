import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SignInLine.css';

const SignInLine = ({ text }) => (
  <div className="">
    <p>
      <Link to="/page/otp">Sign in</Link> {text}.
    </p>
  </div>
);

SignInLine.propTypes = {
  text: PropTypes.string.isRequired
};

export default SignInLine;
