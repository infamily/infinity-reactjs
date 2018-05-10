import {
  CHANGE_FLAG,
  CHANGE_QUERY,
  CHANGE_TOPIC_SOURCE,
  CHANGE_VIEW,
  CHANGE_PAGE
} from './actiontypes';
import store_home from './services/store_home';

const initialState = {
  page: store_home.home_page || 1,
  flag: store_home.flag || 0,
  query: '',
  view: 'grid',
  topicSource: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUERY: {
      const newState = { ...state };
      newState.query = action.query;
      return newState;
    }
    case CHANGE_FLAG: {
      const newState = { ...state };
      newState.flag = action.flag;
      return newState;
    }
    case CHANGE_TOPIC_SOURCE: {
      const newState = { ...state };
      newState.topicSource = action.topicSource;
      return newState;
    }
    case CHANGE_VIEW: {
      const newState = { ...state };
      newState.view = action.view;
      return newState;
    }
    case CHANGE_PAGE: {
      const newState = { ...state };
      newState.page = action.page;
      return newState;
    }
    default:
      return state;
  }
};
