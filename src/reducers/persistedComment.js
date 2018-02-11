import { PERSIST_COMMENT, CLEAR_COMMENT } from '../actiontypes/persisted';

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_COMMENT:
      const newState = {};
      newState.id = action.topic_id;
      newState.body = action.body;
      return newState;
    case CLEAR_COMMENT: {
      return {};
    }
    default:
      return state;
  }
} 
