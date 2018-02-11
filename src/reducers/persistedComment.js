import { PERSIST_COMMENT, CLEAR_COMMENT } from '../actiontypes/persisted';

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_COMMENT:
      const { id, body } = action;
      return { id, body };
    case CLEAR_COMMENT: {
      return {};
    }
    default:
      return state;
  }
} 
