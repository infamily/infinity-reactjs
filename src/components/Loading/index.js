import React from 'react';
import ifIcon from 'images/if_min.png';
import './loading.css';

export default (props) => (
  <div className="loading">
    <img src={ifIcon} className="loading__img pulse" alt="infinity family"/>
    {props.text && (
      <p className="loading__text"><small>{props.text}</small></p>
    )}
  </div>
);