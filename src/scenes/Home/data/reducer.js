import { CHANGE_HOME_PARAMS } from './actiontypes';

const initialState = {
  flag: 0,
  view: 'grid', // line | grid
  topicSource: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HOME_PARAMS: {
      const { params } = action;
      const newState = { ...state, ...params };
      return newState;
    }
    default:
      return state;
  }
};
