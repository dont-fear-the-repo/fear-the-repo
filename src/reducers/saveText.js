import { createReducer }     from '../utils';
import { SAVE_TEXT } from 'constants/saveText';

const initialState = {
  someProp: 'fucking',
  anotherProp: 'React'
};
export default createReducer(initialState, {
  // so this isn't incrementing the counter; it's changing the state?
  [SAVE_TEXT] : (state, payload) => {

    console.log('the fucking payload:', payload)
    return Object.assign({}, state, {
      someProp: payload,
      lastProp: 'and Redux'
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
