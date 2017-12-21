import { combineReducers } from 'redux';
import user from './user';
import server from './server';

export default combineReducers({
  user,
  server
});
