import { SAVE_RESUME, DROP_BULLET } from 'constants/resumeConstants';

export function saveResume (payload) {
  return {
    type: SAVE_RESUME,
    payload: payload
  };
}

export function dropBullet (payload) {
  return {
    type: DROP_BULLET,
    payload: payload
  };
}
