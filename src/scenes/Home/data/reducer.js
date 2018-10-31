import { CHANGE_HOME_PARAMS } from './actiontypes';

const initialState = {
  flag: 0,
  view: 'line', // line | grid
  topicSource: 1,
  categories: [],
  childrenById: null,
  parentsById: null
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
