import { createReducer } from '../utils';
import { DISABLE_SUBMIT,
         DISPLAY_ERROR_MESSAGE,
         ENABLE_SUBMIT,
         HIDE_ERROR_MESSAGE } from 'constants/validationConstants';


const initialState = {
  canSubmitAuth: false,
  canSubmitResume: false,
  displayErrorMessage: false
};

export default createReducer(initialState, {

  [DISABLE_SUBMIT]: (state, payload) => {
    console.log('disabling');
    const newState = { ...state };
    newState['canSubmit' + payload] = false;
    return newState;
  },

  [DISPLAY_ERROR_MESSAGE]: (state, payload) => {
    return {
      ...state,
      displayErrorMessage: payload
    };
  },

  [ENABLE_SUBMIT]: (state, payload) => {
    console.log('enabling');
    const newState = { ...state };
    newState['canSubmit' + payload] = true;
    return newState;
  },

  [HIDE_ERROR_MESSAGE]: (state) => {
    return {
      ...state,
      displayErrorMessage: false
    };
  }

});
