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
    console.log('previous state: ', state)
    console.log('bullet drop payload: ', payload)

    // need to replace body of block with matching ID of drop, not matching index
    // this is the logic I want, but how can I pass the targetIndex down to the return statement?
    var targetIndex = () => {
      for (var i = 0; i < payload.blocks.length; i++) {
        if (payload.blocks[i].id === payload.targetBlock.id) {
          return i;
        }
      }
    }

    // This logs the whole function expression, and not the return value. Any idea why?
    console.log('targetIndex: ', targetIndex)

    return Object.assign({}, state, {
      droppedBullet: payload.blocks[payload.targetBlock.id].body = payload.droppedBullet.body,
      hasBullets: payload.blocks[payload.targetBlock.id].hasBullets = true,
      blocks: payload.blocks.map(item => item)
      // Do I want to be editing state.blocks or payload.blocks?
    })
  }
});
