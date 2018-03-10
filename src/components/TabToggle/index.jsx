import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import configs from 'configs';
import './TabToggle.css';

const TabComponent = () => (
  <Link to={configs.linkBase() + "/split/stream"}>
    <div className="tab_toggle">
      Data
    </div>
  </Link>
);

const TabToggle = ({ match }) => (
  <Switch>
    <Route exact path={match.path + "split/stream"} component={null} />
    <Route exact path={match.path} component={TabComponent} />
  </Switch>
)

TabToggle.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TabToggle;