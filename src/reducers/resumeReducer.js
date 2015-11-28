import { createReducer } from '../utils';
import { SAVE_RESUME, DROP_BULLET } from 'constants/resumeConstants';

const initialState = {
};

export default createReducer(initialState, {

  [SAVE_RESUME]: (state, payload) => {
    console.log('save resume state: ', state)
    console.log('save resume payload: ', payload)

    return Object.assign({}, state, {
      blocks: payload.blocks.map(item => item),
      resumeTitle: payload.resumeTitle
    });
  },

  [DROP_BULLET]: (state, payload) => {
    console.log('bullet drop payload: ', payload)
    console.log('state: ', state)
    return Object.assign({}, state, {
      blocks: payload.blocks.map(item => item),
      droppedBullet: payload.blocks[payload.droppedBullet.id].body = payload.droppedBullet.body
    })
  }
});
