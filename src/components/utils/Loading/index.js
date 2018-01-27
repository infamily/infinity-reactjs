import React from 'react';
import ifIcon from '../../../img/if.jpg';
import './loading.css';

export default () => (
  // <p className="loading"><span>.</span><span>.</span><span>.</span></p>
  <img src={ifIcon} className="loading__img pulse" alt="infinity family"/>
);