import { combineReducers } from 'redux';
import user from './user';
import server from './server';
import persistedComment from './persistedComment';
import persistedTopic from './persistedTopic';

export default combineReducers({
  user,
  server,
  persistedComment,
  persistedTopic,
});
