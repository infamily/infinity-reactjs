import * as UserActionTypes from '../actiontypes/user'; 

export function saveToken(token) {
  return {
    type: UserActionTypes.SAVE_TOKEN,
    token
  }
}

export function signOut() {
  return {
    type: UserActionTypes.SIGNED_OUT
  }
}