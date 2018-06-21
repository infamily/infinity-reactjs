import { SET_SERVER } from '../actiontypes/server';

export function setServer(server) {
  return {
    type: SET_SERVER,
    server
  };
}
