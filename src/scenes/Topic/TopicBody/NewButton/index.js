import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './new_button.css';

const NewButton = ({ title, to }) => (
  <Link to={to}><span className="new_btn">{title}</span></Link>
);

NewButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NewButton;
