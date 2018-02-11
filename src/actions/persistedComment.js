import { PERSIST_COMMENT, CLEAR_COMMENT } from '../actiontypes/persisted'; 

export function persistComment({ id, body }) {
  return {
    type: PERSIST_COMMENT,
    id,
    body,
  }
}

export function clearComment() {
  return {
    type: CLEAR_COMMENT,
  }
}