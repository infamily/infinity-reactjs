import { PERSIST_COMMENT, CLEAR_COMMENT } from '../actiontypes/persisted';

// to do: move persisted data to the topicView scene

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_COMMENT:
      return {
        id: action.id,
        body: action.body
      };
    case CLEAR_COMMENT: {
      return {};
    }
    default:
      return state;
  }
};
