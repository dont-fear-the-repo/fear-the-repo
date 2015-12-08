import { DISABLE_SUBMIT,
         DISPLAY_ERROR_MESSAGE,
         ENABLE_SUBMIT,
         HIDE_ERROR_MESSAGE,
         UPDATE_ERROR_MESSAGE } from 'constants/validationConstants';


export function disableSubmit(payload) {
  return {
    type: DISABLE_SUBMIT,
    payload
  };
}

export function displayErrorMessage(payload) {
  return {
    type: DISPLAY_ERROR_MESSAGE,
    payload
  };
}

export function enableSubmit(payload) {
  return {
    type: ENABLE_SUBMIT,
    payload
  };
}

export function hideErrorMessage(payload) {
  return {
    type: HIDE_ERROR_MESSAGE,
    payload
  };
}

export function updateErrorMessage(payload) {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload
  };
}
