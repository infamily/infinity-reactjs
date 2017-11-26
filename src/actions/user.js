import * as UserActionTypes from '../actiontypes/auth' 

export function signUp(email, password) {
  return dispatch => { 
  }
}

export function signIn(email, password) {
  return dispatch => { 
  }
}

export function signOut() {
  return dispatch => { 
  }
} 

function signedIn(user) {
  return {
    type: UserActionTypes.SIGNED_IN,
    user
  }
}

function signedOut() {
  return {
    type: UserActionTypes.SIGNED_OUT
  }
}

function saveToken() {
  return {
    type: UserActionTypes.SIGNED_OUT
  }
}
