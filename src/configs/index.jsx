import React from 'react';
import serverService from 'services/server.service';
import langService from 'services/lang.service';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const getApi = () => {
  const { api } = serverService;
  return api;
};
const getLink = () => {
  const api = getApi();

  const server = api && api.split('//')[1];
  const organization = server && server.split('inf.')[1];
  const serverName = organization || server;

  return `/${langService.current}/@`;
};

const getServer = () => `https://${window.location.host}/#${getLink()}`;

export default {
  topic_types: [
    <FormattedMessage {...messages.need} />,
    <FormattedMessage {...messages.goal} />,
    <FormattedMessage {...messages.idea} />,
    <FormattedMessage {...messages.plan} />,
    <FormattedMessage {...messages.step} />,
    <FormattedMessage {...messages.task} />
  ],
  flags: [
    <FormattedMessage {...messages.all} />,
    <FormattedMessage {...messages.goal} />,
    <FormattedMessage {...messages.idea} />,
    <FormattedMessage {...messages.plan} />,
    <FormattedMessage {...messages.step} />,
    <FormattedMessage {...messages.task} />
  ],
  colors: ['#CD6B7F', '#90B249', '#56BFC5', '#FF9955', '#AF9CC9', '#D76B99'],
  objectColors: ['#FF8C7F', '#FFD84F', '#77EB7E', '#1CC6FF', '#91A9A7'],
  getServer,
  linkBase: getLink
};
