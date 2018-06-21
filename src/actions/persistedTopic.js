import { PERSIST_TOPIC, CLEAR_TOPIC } from '../actiontypes/persisted';

export function persistTopic(topic) {
  return {
    type: PERSIST_TOPIC,
    topic
  };
}

export function clearTopic() {
  return {
    type: CLEAR_TOPIC
  };
}
