import { createReducer } from '../utils';
import { SAVE_RESUME } from 'constants/resumeConstants';

const initialState = {
};

export default createReducer(initialState, {

  [SAVE_RESUME]: (state, payload) => {
    return Object.assign({}, state, {
      order: payload.blocks.map(item => item.companyName),
      resumeTitle: payload.resumeTitle
    });
  }
});
