
import { createReducer } from '../utils';
import { LOGIN_USER, LOGOUT} from 'constants/titleBarConstants';

const initialState = {
  activePopover: '',
  anchorEl: '',
  loggedIn: false,
  username: 'guest'
};

export default createReducer(initialState, {

  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      username: payload.username,
      loggedIn: true
    });
  },

  [LOGOUT]: (state) => {
    return Object.assign({}, state, {
      loggedIn: false,
      username: 'guest'
    });
  }

});
