import * as UserActionTypes from '../actiontypes/user';

export default (state = null, action) => {
  switch (action.type) {
    case UserActionTypes.SET_BALANCE:
      return action.data;
    case UserActionTypes.SIGNED_OUT:
      return null;
    default:
      return state;
  }
};
