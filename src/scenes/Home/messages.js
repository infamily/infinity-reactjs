import { defineMessages } from 'react-intl';

export default defineMessages({
  menuTitle: {
    id: 'infinity.scenes.Home.Menu.title',
    defaultMessage: 'Home'
  },
  noTopics: {
    id: 'infinity.scenes.Home.TopicList.noTopics',
    defaultMessage: 'No topics. Try to change filter parameters.'
  },
  filterReset: {
    id: 'infinity.scenes.Home.TopicList.filterReset',
    defaultMessage: 'Reset'
  },
  filteredByParents: {
    id: 'infinity.scenes.Home.TopicList.filteredByParents',
    defaultMessage: 'Parents of the current topic are shown.'
  },
  filteredByChildren: {
    id: 'infinity.scenes.Home.TopicList.filteredByChildren',
    defaultMessage: 'Children of the current topic are shown.'
  }
});
