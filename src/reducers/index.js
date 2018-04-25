import { combineReducers } from 'redux';
import user from './user';
import server from './server';
import persistedComment from './persistedComment';
import persistedTopic from './persistedTopic';
import userServerData from './userServerData';
import balance from './userBalance';
import shouldUpdateTopicList from './updateTopicList';
import scenes from './scenesReducer';

export default combineReducers({
  user,
  server,
  userServerData,
  balance,
  persistedComment,
  persistedTopic,
  shouldUpdateTopicList,
  scenes
});
