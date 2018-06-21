import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './NewButton.css';

const NewButton = ({ title, action }) => (
  <Button className="new_btn" onClick={action} block>
    <span>{title}</span>
  </Button>
);

NewButton.propTypes = {
  action: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired
};

export default NewButton;
