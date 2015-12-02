import { createReducer } from '../utils';
import { UPDATE_RESUME_WITH_SERVER_RESPONSE, DROP_BULLET, UPDATE_LOCAL_STATE, MOVE_BLOCK } from 'constants/resumeConstants';

const initialState = {
  resumeId: 1,
  resumeTitle: 'My Rageume',
  resumeHeader: {
    name: 'Your Name Here',
    profession: 'Plumber',
    city: 'San Francsico',
    state: 'CA',
    displayEmail: 'myemail@gmail.com',
    phone: '124-125-4737',
    webLinkedin: 'linkedin.com/myname',
    webOther: 'github.com/number23'
  },
  blockChildren: [
    { blockId: 1,
      bulletChildren: [{bulletId: 1, text: 'My first bullet'}, {bulletId: 2, text: 'SECONDS'}],
      companyName: 'Company 1',
      jobTitle: 'Bossman',
      year: '2015',
      location: 'San Francisco, CA'
    },
    { blockId: 2,
      bulletChildren: [{bulletId: 2, text: 'Such a lame job'}],
      companyName: 'Company 2',
      jobTitle: 'Noob',
      year: '2013',
      location: 'New York, NY'
    },
    { blockId: 100,
      bulletChildren: [],
      title: 'archived'
    }
  ]
};

export default createReducer(initialState, {

  [UPDATE_LOCAL_STATE]: (state, payload) => {
    console.log("payload", payload);
    const obj = {};
    obj[payload.textFieldName] = payload.userInput;
    console.log("obj", obj);

    return Object.assign({}, state, obj);
  },

  [UPDATE_RESUME_WITH_SERVER_RESPONSE]: (state, payload) => {
    console.log(payload);
    return {
      ...state,
      ...payload
    };
  },

  [DROP_BULLET]: (state, payload) => {
    // Can we just grab this.blockId from view?
    const targetIndex = () => {
      for (let index = 0; index < state.blockChildren.length; index++) {
        if (state.blockChildren[index].blockId === state.targetBlock.blockId) {
          return index;
        }
      }
    }();

    return Object.assign({}, state, {
      blockChildren: state.blockChildren,
      droppedBullet: state.blockChildren[targetIndex].body.push(state.droppedBullet.body)
    });
  },

  [MOVE_BLOCK]: (state, payload) => {
    console.log('state: ', state)
    console.log('payload: ', payload)

    return Object.assign({}, state, {
      blockChildren: payload.blockChildren.slice().splice([ [payload.index, 1], [payload.atIndex, 0, payload.block] ])
    });
  }
});

/*
      blockChildren: state.blockChildren.splice([payload.index, 1], [payload.atIndex, 0, payload.block])
*/
