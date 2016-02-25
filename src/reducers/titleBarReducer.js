import { createReducer } from '../utils';
import { LOGIN_USER,
         SIGNUP_USER,
         LOGOUT} from 'constants/titleBarConstants';


const initialState = {
  activePopover: '',
  anchorEl: '',
  email: '',
  loggedIn: false,
  resumeId: '',
  userID: ''
};

export default createReducer(initialState, {

  [LOGIN_USER]: (state, payload) => {
    return {
      ...state,
      email: payload.email,
      loggedIn: true,
      resumeId: payload.resumeId,
      userID: payload.id
    };
  },

  [LOGOUT]: (state) => {
    return {
      ...state,
      email: 'guest',
      loggedIn: false,
      resumeId:'',
      userID: ''
    };
  },

  [SIGNUP_USER]: (state, payload) => {
    return {
      ...state,
      email: payload.email,
      resumeId: payload.resumeId,
      userID: payload.id
    };
  }

});
