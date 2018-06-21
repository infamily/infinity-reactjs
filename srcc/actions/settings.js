import { SET_MAIN_FULL } from '../actiontypes/settings';

export function setMainFull(value) {
  return {
    type: SET_MAIN_FULL,
    value
  };
}
