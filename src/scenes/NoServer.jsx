import React from 'react';
import PropTypes from 'prop-types';
import NotFound from 'scenes/NotFound';

const getServerName = str => str.match(/\?server=(.*)/);
const getMessage = str => {
  const server = getServerName(str);
  const name = server ? server[1] : 'such';
  return `There is no ${name} server.`;
};

const NoServer = ({ location }) => (
  <NotFound text={getMessage(location.search)} />
);

NoServer.propTypes = {
  location: PropTypes.object.isRequired
};

export default NoServer;
