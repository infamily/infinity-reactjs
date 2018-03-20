import React from 'react';
import ifIcon from 'images/if_min.png';
import './loading.css';

export default (props) => (
  <div className="loading">
    <img src={ifIcon} className="loading__img pulse" alt="infinity family"/>
    {props.text && <small className="loading__text">{props.text}</small>}
  </div>
);