import { SAVE_RESUME } from 'constants/resumeConstants';

export function saveResume (payload) {
  return {
    type: SAVE_RESUME,
    payload: payload
  };
}
