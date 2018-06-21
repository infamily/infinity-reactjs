import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.css';

const CheckBox = ({ value, error, children, action }) => {
  const styleBox = value ? 'check_box__checked' : '';
  const styleError = error ? 'check_box__container--error' : '';

  return (
    <div className={`check_box__container ${styleError}`}>
      <div className={`check_box ${styleBox}`} onClick={action} />
      <p>
        <small>{children}</small>
      </p>
    </div>
  );
};

CheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired
};

export default CheckBox;
