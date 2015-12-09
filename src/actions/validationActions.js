import { DISABLE_SUBMIT,
         DISPLAY_AUTH_MESSAGE,
         ENABLE_SUBMIT,
         UPDATE_ERROR_MESSAGE } from 'constants/validationConstants';


export function disableSubmit(payload) {
  return {
    type: DISABLE_SUBMIT,
    payload
  };
}

export function displayAuthMessage(payload) {
  return {
    type: DISPLAY_AUTH_MESSAGE,
    payload
  };
}

export function enableSubmit(payload) {
  return {
    type: ENABLE_SUBMIT,
    payload
  };
}

export function updateErrorMessage(payload) {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload
  };
}
