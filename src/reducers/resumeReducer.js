import { createReducer } from '../utils';
import { SAVE_RESUME, DROP_BULLET } from 'constants/resumeConstants';

const initialState = {
};

export default createReducer(initialState, {

  [SAVE_RESUME]: (state, payload) => {
    return Object.assign({}, state, {
      blocks: payload.blocks,
      resumeTitle: payload.resumeTitle
    });
  },

  [DROP_BULLET]: (state, payload) => {
    const targetIndex = () => {
      for (let index = 0; index < payload.blocks.length; index++) {
        if (payload.blocks[index].id === payload.targetBlock.id) {
          return index;
        }
      }
    }();

    // hasBullets: I really want to toggle hasBullets on the targetBlock, not necessarily add it to the global state object

    return Object.assign({}, state, {
      blocks: payload.blocks,
      droppedBullet: payload.blocks[targetIndex].body.push(payload.droppedBullet.body),
      hasBullets: payload.blocks[targetIndex].hasBullets = true
    });
  }
});
