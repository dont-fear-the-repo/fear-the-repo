import { LOGIN_USER, SIGNUP_USER } from 'constants/titleBarConstants';

export function loginUser(payload) {
  return {
    type: LOGIN_USER,
    payload: payload
  }
}

export function signupUser(payload) {
  return {
    type: SIGNUP_USER,
    payload: payload
  }
}
