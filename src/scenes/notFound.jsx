import React from 'react';
import PropTypes from 'prop-types';
import MenuBar from 'scenes/MenuBar';

const NotFound = props => (
  <div className="main">
    <h2>{props.text} -_-</h2>
    <MenuBar page="Menu" />
  </div>
);

NotFound.propTypes = {
  text: PropTypes.string
};

NotFound.defaultProps = {
  text: '404. No such content.'
};

export default NotFound;
