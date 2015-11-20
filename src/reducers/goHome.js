import { createReducer }     from '../utils';
import { GO_HOME } from 'constants/goHome';

const initialState = 0;
export default createReducer(initialState, {
  [GO_HOME] : (state) => state + 1
});
