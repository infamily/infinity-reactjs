import * as UserActionTypes from '../actiontypes/user';

export default (state = null, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNED_IN:
      return action.user;
    case UserActionTypes.SIGNED_OUT:
      return null;
    default:
      return state;
  }
} 
