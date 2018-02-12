import { PERSIST_TOPIC, CLEAR_TOPIC } from '../actiontypes/persisted';

export default (state = {}, action) => {
  switch (action.type) {
    case PERSIST_TOPIC:
      return action.topic;
    case CLEAR_TOPIC: {
      return {};
    }
    default:
      return state;
  }
} 
