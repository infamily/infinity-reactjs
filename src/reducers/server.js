import { SET_SERVER } from '../actiontypes/server';

export default (state = 0, action) => {
  switch (action.type) {
    case SET_SERVER:
      return action.index;
    default:
      return state;
  }
} 
