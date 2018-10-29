import { PERSIST_COMMENT, CLEAR_COMMENT } from '../actiontypes/persisted';

export function persistComment({ id, body, blockchain }) {
  return {
    type: PERSIST_COMMENT,
    id,
    body,
    blockchain
  };
}

export function clearComment() {
  return {
    type: CLEAR_COMMENT
  };
}
