import { createReducer } from '../utils';
import { LOGIN_USER, SIGNUP_USER, LOGOUT} from 'constants/titleBarConstants';

function isLoggedIn() {
  const ca = document.cookie.split(';');  // FIXME: what does 'ca' stand for? This variable needs a better name.
  let loggedIn = false;
  for (let i of ca) {  // FIXME: is 'ca' an array? Why is object iteration being used here?
    if (i.slice(0, 11) === 'connect.sid' || i.slice(1, 12) === 'connect.sid') {
      loggedIn = true;
      break;
    }
  }
  return loggedIn;
}

function hasUsername() {
  const results = localStorage.getItem('username');
  return results || 'guest';
}

const initialState = {
  activePopover: '',
  anchorEl: '',
  loggedIn: isLoggedIn(),
  username: hasUsername()
};

export default createReducer(initialState, {

  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      username: payload.username,
      loggedIn: true
    });
  },

  [SIGNUP_USER]: (state, payload) => {
    // TODO: signup user!
    return Object.assign({}, state, {
      username: payload.username
    });
  },

  [LOGOUT]: (state) => {
    return Object.assign({}, state, {
      loggedIn: false,
      username: 'guest'
    });
  }

});
