import { combineReducers } from 'redux';
import user from './user';
import server from './server';
import persistedComment from './persistedComment';
import persistedTopic from './persistedTopic';
import userServerData from './userServerData';
import balance from './userBalance';
import shouldUpdateTopicList from './updateTopicList';

export default combineReducers({
  user,
  server,
  balance,
  persistedComment,
  userServerData,
  persistedTopic,
  shouldUpdateTopicList,
});
