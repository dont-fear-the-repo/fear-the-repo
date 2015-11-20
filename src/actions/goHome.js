import {  GO_HOME } from 'constants/goHome';
import { SAVE_TEXT } from 'constants/saveText';

// add type, add data payload, save this to state?

export function goHome() {
  return {
    type: GO_HOME
  }
}

export function saveText(payload) {
  return {
    type: SAVE_TEXT,
    payload: payload
  }
}

