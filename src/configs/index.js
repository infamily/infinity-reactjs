import serverService from 'services/server.service';
import langService from 'services/lang.service';

const getLink = () => {
  const server = serverService.api && serverService.api.split('//')[1];
  const organization = server && server.split('inf.')[1];
  const serverName = organization || server;

  return `/${serverName}:${langService.current}/@`;
};

const getServer = () => `https://${window.location.host}/#${getLink()}`;

export default {
  topic_types: ['Need', 'Goal', 'Idea', 'Plan', 'Step', 'Task'],
  flags: ['All', 'Goal', 'Idea', 'Plan', 'Step', 'Task'],
  colors: ['#CD6B7F', '#90B249', '#56BFC5', '#FF9955', '#AF9CC9', '#D76B99'],
  objectColors: ['#FF8C7F', '#FFD84F', '#77EB7E', '#1CC6FF', '#91A9A7'],
  getServer,
  linkBase: getLink
  // stripeKey: 'pk_test_YNkIMdMLnwHG3ML2RDXwf44b',
};
