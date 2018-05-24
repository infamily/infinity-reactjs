import React from 'react';
import PropTypes from 'prop-types';
import ifIcon from 'images/if_min.png';
import './Loading.css';

const Loading = ({ text }) => (
  <div className="loading">
    <img src={ifIcon} className="loading__img pulse" alt="infinity family" />
    {text && (
      <p className="loading__text">
        <small>{text}</small>
      </p>
    )}
  </div>
);

Loading.propTypes = {
  text: PropTypes.string.isRequired
};

export default Loading;
