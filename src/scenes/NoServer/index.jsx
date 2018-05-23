import React from 'react';
import PropTypes from 'prop-types';
import NotFound from 'scenes/NotFound';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const getServerName = str => str.match(/\?server=(.*)/);
const getMessage = str => {
  const server = getServerName(str);
  const name = server ? server[1] : <FormattedMessage {...messages.such} />;
  return <FormattedMessage {...messages.noServer} values={{ name }} />;
};

const NoServer = ({ location }) => (
  <NotFound text={getMessage(location.search)} />
);

NoServer.propTypes = {
  location: PropTypes.object.isRequired
};

export default NoServer;
