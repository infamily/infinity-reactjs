import React from 'react';
import PropTypes from 'prop-types';
import MenuBar from 'scenes/MenuBar';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const NotFound = props => (
  <div className="main">
    <h2>{props.text} -_-</h2>
    <MenuBar />
  </div>
);

NotFound.propTypes = {
  text: PropTypes.string
};

NotFound.defaultProps = {
  text: <FormattedMessage {...messages.noContent} />
};

export default NotFound;
