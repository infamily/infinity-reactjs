import { SET_SERVER } from '../actiontypes/server';

export function setServer(index) {
  return {
    type: SET_SERVER,
    index,
  }
}