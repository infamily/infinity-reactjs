import { CHANGE_TEXT } from './actiontypes';

const initialState = {
  text: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT: {
      const newState = { ...state };
      newState.text = action.text;
      return newState;
    }
    default:
      return state;
  }
};
