import { SHOULD_UPDATE } from '../actiontypes/topicList';

export function setUpdateTopicList(bool) {
  return {
    type: SHOULD_UPDATE,
    bool,
  }
};