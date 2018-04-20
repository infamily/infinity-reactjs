import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './new_button.css';

const NewButton = ({ title, action }) => (
  <Button className="new_btn" onClick={action} block>
    <span>{title}</span>
  </Button>
);

NewButton.propTypes = {
  action: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default NewButton;
