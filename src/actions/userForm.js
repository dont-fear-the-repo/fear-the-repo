import { SAVE_FORM } from 'constants/userForm';

export function saveForm(payload) {
  return {
    type: SAVE_FORM,
    payload: payload
  }
}
