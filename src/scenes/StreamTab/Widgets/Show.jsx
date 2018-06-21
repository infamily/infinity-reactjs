import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from 'scenes/StreamTab/messages';

const Show = ({ action }) => (
  <p onClick={action} className="instance__show">
    <FormattedMessage {...messages.show} />
  </p>
);

Show.propTypes = {
  action: PropTypes.func.isRequired
};

export default Show;
