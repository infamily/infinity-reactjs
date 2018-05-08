import React from 'react';
import './LoadingElements.css';

export default ({ size }) => {
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
