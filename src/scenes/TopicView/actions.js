import { CHANGE_TEXT } from './actiontypes';

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    text
  };
}
