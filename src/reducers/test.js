import { createReducer }     from '../utils';
import { TEST_CONSTANT } from 'constants/test';

const initialState = 'FUCK OFF REACT';
export default createReducer(initialState, {
  [TEST_CONSTANT]: (state, action) => {
    return 'FUCK YOU REACT';
  }
});

// export default function testReducer(state = initialState, action) {
//   switch (action.type) {
//     case TEST_CONSTANT:
//       console.log('HOLLA')
//       return state
      // Object.assign({}, state, {
      //   test: 'holla!!!!!',
      //   counter: 43
      // })
//     default: return state
//   }
// }
