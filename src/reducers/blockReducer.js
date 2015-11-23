import { createReducer } from '../utils';
import { MOVE_BLOCK } from 'constants/blockConstants';

const initialState = {
};

export default createReducer(initialState, {

  [MOVE_BLOCK]: (state, payload) => {
    return Object.assign({}, state, {
      position: payload.position
    });
  }

});
