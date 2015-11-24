import { SAVE_FORM, ENABLE_SUBMIT, DISABLE_SUBMIT } from 'constants/userFormConstants';

export function saveForm(payload) {
  return {
    type: SAVE_FORM,
    payload: payload
  };
}

export function enableSubmit(payload) {
  return {
    type: ENABLE_SUBMIT,
    payload: payload
  };
}

export function disableSubmit(payload) {
  return {
    type: DISABLE_SUBMIT,
    payload: payload
  };
}
