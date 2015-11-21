import { createReducer }     from '../utils';
import { SAVE_TEXT } from 'constants/saveText';

const initialState = {
  name: '',
  email: '',
  phone: 0,
  address: ''
};
export default createReducer(initialState, {
  // so this isn't incrementing the counter; it's changing the state?
  [SAVE_TEXT] : (state, payload) => {
    console.log('payload:', payload)
    return Object.assign({}, state, {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address
    });
  }
});

/*
function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}

(state, { type, payload }) => {
    const handler = SAVE_TEXT;

    return  handler(state, payload);
  };
}



*/
