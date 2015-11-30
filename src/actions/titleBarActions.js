import { LOGIN_USER, SIGNUP_USER, LOGOUT} from 'constants/titleBarConstants';

export function loginUser(payload) {
  return {
    type: LOGIN_USER,
    payload: payload
  };
}

export function signupUser(payload) {
  return {
    type: SIGNUP_USER,
    payload: payload
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
