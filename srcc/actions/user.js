import * as UserActionTypes from '../actiontypes/user';

export function signIn(user) {
  return {
    type: UserActionTypes.SIGNED_IN,
    user
  };
}

export function signOut() {
  return {
    type: UserActionTypes.SIGNED_OUT
  };
}

export function setBalance(data) {
  return {
    type: UserActionTypes.SET_BALANCE,
    data
  };
}
