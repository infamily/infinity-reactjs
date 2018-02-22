import { SET_SERVER } from '../actiontypes/server';

export default (state = null, action) => {
  switch (action.type) {
    case SET_SERVER:
      return action.server;
    default:
      return state;
  }
} 
