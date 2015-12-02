import { createReducer } from '../utils';
import { UPDATE_RESUME_WITH_SERVER_RESPONSE, DROP_BULLET, UPDATE_LOCAL_STATE, MOVE_BLOCK } from 'constants/resumeConstants';


// resumeState.resumeTitle is what the front end sees; req.body.resumeTitle is what the server sees.
const initialState = {
  resumeId: 1,
  resumeTitle: 'My Rageume',
  resumeTheme: 'stringOfThemeName'
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
  blockChildren: [{
    blockId: 1,
    companyName: 'First Acme',
    jobTitle: 'Bossman',
    year: '2015',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      text: 'My first bullet'
    }, {
      bulletId: 2,
      text: 'Then I productionalized everything, like the Bossman that I am.'
    }]
  }, {
    blockId: 2,
    companyName: 'Second Corp.',
    jobTitle: 'Lackey',
    year: '2014',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      text: 'I believe in sentences that end with punctuation'
    }, {
      bulletId: 2,
      text: 'This is an inflexible belief.'
    }]
  }, {
    blockId: 3,
    companyName: 'Third Chance',
    jobTitle: 'Intern',
    year: '2012',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      text: 'Not a great life here, alas.'
    }, {
      bulletId: 2,
      text: 'But I played with a lot of paperclips!'
    }]
  }],
  resumeFooter: {
    school1: {
      name: 'MakerSquare',
      degree: 'Software Engineer',
      schoolEndYear: '2012',
      location: 'Chicago'
    },
    school2: {
      name: 'Trololo',
      degree: 'BS',
      schoolEndYear: '2008',
      location: 'Boston'
    },
    personalStatement: 'I like cats, but only sometimes, eating ramen, basketball, and taking long walks because BART is broken again.'
  }
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
    // console.log('state: ', state)
    console.log('block dragged id: ', payload.block.blockId, ' wants to be inserted at:', payload.atIndex)

    return Object.assign({}, state, {
      blockChildren: payload.blockChildren.slice().splice([ [payload.index, 1], [payload.atIndex, 0, payload.block] ])
    });
  }
});

/*
      blockChildren: state.blockChildren.splice([payload.index, 1], [payload.atIndex, 0, payload.block])
*/
