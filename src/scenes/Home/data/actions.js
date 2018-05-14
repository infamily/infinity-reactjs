import { CHANGE_HOME_PARAMS } from './actiontypes';

export function changeHomeParams(params) {
  return {
    type: CHANGE_HOME_PARAMS,
    params
  };
}
