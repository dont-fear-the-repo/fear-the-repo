import { SAVE_FORM } from 'constants/userFormConstants';

export function saveForm(payload) {
  return {
    type: SAVE_FORM,
    payload: payload
  }
}
