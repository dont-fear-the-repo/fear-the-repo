import { createReducer } from '../utils';
import { LOGIN_USER, SIGNUP_USER, LOGOUT} from 'constants/titleBarConstants';


const initialState = {
  activePopover: '',
  anchorEl: '',
  loggedIn: false,
  email: '',
  resumeId: '',
  userID: ''
};

export default createReducer(initialState, {

  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      email: payload.email,
      loggedIn: true,
      resumeId: payload.resumeId,
      userID: payload.id
    });
  },

  [SIGNUP_USER]: (state, payload) => {
    // TODO: signup user!
    return Object.assign({}, state, {
      email: payload.email,
      resumeId: payload.resumeId,
      userID: payload.id
    });
  },

  [LOGOUT]: (state) => {
    return Object.assign({}, state, {
      loggedIn: false,
      email: 'guest',
      resumeId:'',
      userID: ''
    });
  }

});
