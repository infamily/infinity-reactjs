import * as UserActionTypes from '../actiontypes/user';

export default (state = null, action) => {
  switch (action.type) {
    case UserActionTypes.SAVE_TOKEN:
      return action.token;
    case UserActionTypes.SIGNED_OUT:
      return null;
    default:
      return state;
  }
} 
