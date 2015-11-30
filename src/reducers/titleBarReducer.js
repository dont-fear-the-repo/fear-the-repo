import { createReducer } from '../utils';
import { LOGIN_USER, SIGNUP_USER, LOGOUT} from 'constants/titleBarConstants';

function isLoggedIn() {
  const cookies = document.cookie.split(';');
  let loggedin = false;
  for (const cookie of cookies) {
    if (cookie.slice(0, 11) === 'connect.sid' || cookie.slice(1, 12) === 'connect.sid') {
      loggedin = true;
      break;
    }
  }
  return loggedin;
}

function hasUsername() {
  const results = localStorage.getItem('username');
  return results || 'guest';
}

const initialState = {
  activePopover: '',
  anchorEl: '',
  Loggedin: isLoggedIn(),
  username: hasUsername()
};

export default createReducer(initialState, {

  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      username: payload.username,
      Loggedin: true
    });
  },

  [SIGNUP_USER]: (state, payload) => {
    // TODO: signup user!
    return Object.assign({}, state, {
      username: payload.username
    });
  }, [LOGOUT]: (state) => {
    return Object.assign({}, state, {
      Loggedin: false,
      username: 'guest'
    });
  }

});
