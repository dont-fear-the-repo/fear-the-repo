import { createReducer } from '../utils';
import { SAVE_RESUME } from 'constants/resumeConstants';

const initialState = {
};

export default createReducer(initialState, {

  [SAVE_RESUME]: (state, payload) => {
    return Object.assign({}, state, {
      order: payload.map(item => item.companyName)
    })
  }
})
