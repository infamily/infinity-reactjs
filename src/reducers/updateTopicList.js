import { SHOULD_UPDATE } from '../actiontypes/topicList';

export default (state = false, action) => {
  switch (action.type) {
    case SHOULD_UPDATE:
      return action.bool;
    default:
      return state;
  }
};
