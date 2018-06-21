import * as UserActionTypes from '../actiontypes/user';
import serverService from 'services/server.service';

export default (state = {}, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNED_IN: {
      const newState = { ...state };
      newState[serverService.api] = action.user;
      return newState;
    }

    case UserActionTypes.SIGNED_OUT: {
      const newState = { ...state };
      newState[serverService.api] = null;
      return newState;
    }

    default:
      return state;
  }
};
