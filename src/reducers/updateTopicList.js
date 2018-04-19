import { SHOULD_UPDATE } from '../actiontypes/topicList';

export default (state = null, action) => {
  switch (action.type) {
    case SHOULD_UPDATE:
      return action.bool;
    default:
      return state;
  }
} 
