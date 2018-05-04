import { SET_MAIN_FULL } from 'actiontypes/settings';

const initialSettings = {
  isMainFull: false
};

export default (state = initialSettings, action) => {
  switch (action.type) {
    case SET_MAIN_FULL:
      return {
        ...state,
        isMainFull: action.value
      };
    default:
      return state;
  }
};
