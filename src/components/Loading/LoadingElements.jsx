import React from 'react';
import PropTypes from 'prop-types';
import './LoadingElements.css';

// to do: make it more flexible
const LoadingElements = ({ size }) => {
  const style = size ? { fontSize: `${size}px` } : {};
  return (
    <p
      className="loading_elements"
      style={{ clear: 'both', padding: size ? 0 : 30 }}
    >
      <span style={style}>.</span>
      <span style={style}>.</span>
      <span style={style}>.</span>
    </p>
  );
};

LoadingElements.defaultProps = {
  size: null
};

LoadingElements.propTypes = {
  size: PropTypes.number
};

export default LoadingElements;
