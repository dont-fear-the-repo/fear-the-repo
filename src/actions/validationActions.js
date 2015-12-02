import { ENABLE_SUBMIT, DISABLE_SUBMIT } from 'constants/validationConstants';

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
