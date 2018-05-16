import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import configs from 'configs';
import './TabToggle.css';

const TabComponent = () => (
  <Link to={`${configs.linkBase()}/split/data`}>
    <div className="tab_toggle">
      <span className="tab_toggle__sign">&#10094;</span>
      Objects
    </div>
  </Link>
);

const TabToggle = ({ match, show }) =>
  show && (
    <Switch>
      <Route exact path={`${match.path}split/data`} component={null} />
      <Route path={`${match.path}split/topic`} component={TabComponent} />
      <Route exact path={match.path} component={TabComponent} />
    </Switch>
  );

TabToggle.propTypes = {
  match: PropTypes.object.isRequired,
  show: PropTypes.bool
};

TabToggle.defaultProps = {
  show: false
};

export default TabToggle;
