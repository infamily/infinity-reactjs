import React from 'react';
import { Link } from 'react-router-dom';
import configs from 'configs';
import './TabToggle.css';

const TabToggle = () => (
  <Link to={configs.linkBase() + "/split/stream"}>
    <div className="tab_toggle">
      Data
    </div>
  </Link>
);

export default TabToggle;