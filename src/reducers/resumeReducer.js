import { createReducer } from '../utils';
import { SAVE_RESUME, DROP_BULLET } from 'constants/resumeConstants';

const initialState = {
  resumeId: 1,
  resumeTitle: 'My Rageume',
  resumeHeader: {
    name: 'Your Name Here',
    email: 'myemail@gmail.com',
    phone: '124-125-4737',
    headerLocation: 'SF, CA',
    linkedin: 'linkedin.com/myname',
    github: 'github.com/number23'
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

  [SAVE_RESUME]: (state, payload) => {
    return Object.assign({}, state, {
      blockChildren: payload.blockChildren,
      resumeTitle: payload.resumeTitle,
      resumeHeader: payload.resumeHeader
    });
  },

  [DROP_BULLET]: (state, payload) => {
    console.log('state: ', state)
    console.log('payload: ', payload)

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
  }
});
