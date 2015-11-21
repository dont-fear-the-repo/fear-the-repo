import { createReducer }     from '../utils';
import { SAVE_TEXT } from 'constants/saveText';

const initialState = {firstName: 'Foo', lastName: 'Bar'};
export default createReducer(initialState, {
  [SAVE_TEXT] : (state, payload) => {
    console.log(payload)
    state.firstName = "I CHANGED MY FIRST NAME!";
    state.position= "the boss";



    return state;
  }
});
