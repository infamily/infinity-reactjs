import serverService from 'services/server.service';
import langService from 'services/lang.service';

const getLink = () => {
  const server = serverService.api.split('//')[1];
  return `/${server}/${langService.current}/@`
}

export default {
  topic_types: ['Need', 'Goal', 'Idea', 'Plan', 'Step', 'Task'],
  flags: ['All', 'Goal', 'Idea', 'Plan', 'Step', 'Task'],
  server: 'https://' + window.location.host,
  colors: [
    '#CD6B7F',
    '#90B249',
    '#56BFC5',
    '#2E5B96',
    '#AF9CC9',
    '#D76B99',
  ],
  linkBase: getLink(),
}