import { createReducer }     from '../utils';
import { TEXT_SUBMIT }       from 'constants/counter';

const initialState = { text: 'init' };
export default createReducer(initialState, {
  [TEXT_SUBMIT] : (state) => state.text = 'changed'
});
