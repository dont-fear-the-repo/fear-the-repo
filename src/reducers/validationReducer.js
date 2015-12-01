import { createReducer } from '../utils';
import { ENABLE_SUBMIT, DISABLE_SUBMIT } from 'constants/validationConstants';


const initialState = {
  canSubmit: false
};

export default createReducer(initialState, {

  [ENABLE_SUBMIT]: (state) => {
    console.log('enabling');
    return {
      ...state,
      canSubmit: true
    };
  },

  [DISABLE_SUBMIT]: (state) => {
    console.log('disabling');
    return {
      ...state,
      canSubmit: false
    };
  }

});
