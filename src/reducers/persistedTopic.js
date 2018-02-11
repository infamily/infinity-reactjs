import { PERSIST_TOPIC, CLEAR_TOPIC } from '../actiontypes/persisted';

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_TOPIC:
      const newState = { ...state };
      newState[action.topic.id] = action.topic;
      return newState;
    case CLEAR_TOPIC: {
      const newState = { ...state };
      newState[action.topic.id] = null;
      return newState;
    }
    default:
      return state;
  }
} 
