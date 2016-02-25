import { createReducer } from '../utils';
import { errorMessages } from 'utils/errorMessages';
import { DISABLE_SUBMIT,
         DISPLAY_AUTH_MESSAGE,
         ENABLE_SUBMIT,
         UPDATE_ERROR_MESSAGE } from 'constants/validationConstants';


const initialState = {
  canSubmitAuth: false,
  canSubmitResume: false,
  currentAuthMessage: '',
  currentErrorMessage: ''
};

export default createReducer(initialState, {

  [DISABLE_SUBMIT]: (state, payload) => {
    const newState = { ...state };
    newState['canSubmit' + payload] = false;
    return newState;
  },

  [DISPLAY_AUTH_MESSAGE]: (state, payload) => {
    return {
      ...state,
      currentAuthMessage: errorMessages[payload]
    };
  },

  [ENABLE_SUBMIT]: (state, payload) => {
    const newState = { ...state };
    newState['canSubmit' + payload] = true;
    return newState;
  },

  [UPDATE_ERROR_MESSAGE]: (state, payload) => {
    return {
      ...state,
      currentErrorMessage: errorMessages[payload]
    };
  }

});
