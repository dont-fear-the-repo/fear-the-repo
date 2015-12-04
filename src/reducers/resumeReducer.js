import {  createReducer } from '../utils';
import {  UPDATE_RESUME_WITH_SERVER_RESPONSE, DROP_BULLET, UPDATE_LOCAL_STATE, UPDATE_LOCAL_STATE_HEADER, UPDATE_LOCAL_STATE_FOOTER, UPDATE_LOCAL_STATE_SAVEPRINT, UPDATE_LOCAL_STATE_BLOCKS, MOVE_BLOCK, MOVE_BULLET } from 'constants/resumeConstants';
import Immutable from 'immutable';


// resumeState.resumeTitle is what the front end sees; req.body.resumeTitle is what the server sees.
const initialState = {
  resumeId: 1,
  resumeTitle: 'Resume Version Name',
  resumeTheme: 'Default',
  resumeHeader: {
    name: 'Full Name',
    profession: 'Profession',
    city: 'City',
    state: 'State',
    displayEmail: 'email@email.com',
    phone: '(124) 125-4737',
    webLinkedin: 'linkedin.com/myname',
    webOther: 'github.com/number23'
  },
  blockChildren: [{
    blockId: 1,
    companyName: 'Company Name',
    jobTitle: 'Bossman',
    years: '2015',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      text: 'My first bullet',
      parentBlockId: 1
    }, {
      bulletId: 2,
      text: 'Then I productionalized everything, like the Bossman that I am.',
      parentBlockId: 1
    }]
  }, {
    blockId: 2,
    companyName: 'Second Corp.',
    jobTitle: 'Lackey',
    years: '2014, 2013',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 3,
      text: 'I believe in sentences that end with punctuation',
      parentBlockId: 2
    }, {
      bulletId: 4,
      text: 'This is an inflexible belief.',
      parentBlockId: 2
    }]
  }, {
    blockId: 3,
    companyName: 'Third Chance',
    jobTitle: 'Intern',
    years: '2012-2011',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 5,
      text: 'Not a great life here, alas.',
      parentBlockId: 3
    }, {
      bulletId: 6,
      text: 'But I played with a lot of paperclips!',
      parentBlockId: 3
    }]
  }],
  resumeFooter: {
    school1: {
      name: 'School Name',
      degree: 'Degree',
      schoolEndYear: 'Year',
      location: 'City'
    },
    school2: {
      name: 'School Name',
      degree: 'Degree',
      schoolEndYear: 'Year',
      location: 'City'
    },
    personalStatement: 'Personal Statement / Hobbies'
  }
};


export default createReducer(initialState, {

  [UPDATE_LOCAL_STATE]: (state, payload) => {
    const newState = {};
    newState[payload.textFieldName] = payload.userInput;
    return Object.assign({}, state, newState);
  },

  [UPDATE_LOCAL_STATE_HEADER]: (state, payload) => {
    let newState = Object.assign({}, state);
    newState.resumeHeader[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_FOOTER]: (state, payload) => {
    let newState = Object.assign({}, state);
    if (payload.textFieldName.slice(0,6) === 'school'){
      newState.resumeFooter[payload.textFieldName.slice(0,7)][payload.textFieldName.slice(8)] = payload.userInput;
    } else {
      newState.resumeFooter[payload.textFieldName] = payload.userInput;
    }
    return newState;
  },

  [UPDATE_LOCAL_STATE_SAVEPRINT]: (state, payload) => {
    let newState = Object.assign({}, state);
    newState[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_BLOCKS]: (state, payload) => {
    // !!!!!!!
    // this funciton is definitely not correct yet, see Andrew's commit for truth?
    let newState = Object.assign({}, state);
    newState.blockChildren[0][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_RESUME_WITH_SERVER_RESPONSE]: (state, payload) => {
    console.log(payload);
    return {
      ...state,
      ...payload
    };
  },

  // [DROP_BULLET]: (state, payload) => {
  //   // Can we just grab this.blockId from view?
  //   const targetIndex = () => {
  //     for (let index = 0; index < state.blockChildren.length; index++) {
  //       if (state.blockChildren[index].blockId === state.targetBlock.blockId) {
  //         return index;
  //       }
  //     }
  //   }();

  //   return Object.assign({}, state, {
  //     blockChildren: state.blockChildren,
  //     droppedBullet: state.blockChildren[targetIndex].body.push(state.droppedBullet.body)
  //   });
  // },

  [MOVE_BLOCK]: (state, payload) => {
    const immutableBlockChildren = Immutable.List(state.blockChildren);

    return Object.assign({}, state, {
      blockChildren: immutableBlockChildren.splice(payload.blockIndex, 1).splice(payload.atIndex, 0, payload.block).toJS()
    });
  },

  [MOVE_BULLET]: (state, payload) => {

    console.log('payload: ', payload)

    const parentBlock = payload.blockChildren[payload.parentBlockIndex];
    const immutableBulletChildren = Immutable.List(parentBlock.bulletChildren)
    const parentBlockIndex = payload.parentBlockIndex;

    console.log('parentBlock: ', parentBlock)


    /* bulletChildren reorders itself liek it should, but rather than applying the change to the root directory of state, we need to get into state.blockChildren[payload.parentBlockIndex] (aka parentBlock) and update parentBlock's bulletChildren array

      HOW DO WE GET IN THERE?!?!

      Tried and failed. See below for corresponding code:
        1. Pass parentBlock in as Object.assign's second argument
            - this overwrites all of state.resumeReducer with parentBlock props
        2. Define third argument update object prior to .assign
            - in third argument, property name must be a string with no dot or bracket notation
            - tried defining that object prior to the .assign method, specifying the target location (bulletChildren within parentBlock) and passing it in
        3. Copy just the parentBlock portion of state
            - I THINK what I was doing was:
              - copy just the parentBlock portion of state
              - define the updating action
              - return just that new chunk of state
        4. Use nested object/arr as third argument
            - commented out code is incorrect but demonstrates:
              - blockChildren changed to {}
              - updates with key of 0 and array of bulletChildren
            - it doesn't like:
              a) parens after .splice
                - so set that whole chained function to a var (splice) and passed var in
                - then complains about parentBlockIndex ('Unexpected type cast')

    */

// #1 -------------------------------------
    // return Object.assign({}, parentBlock, obj);

// #2 -------------------------------------
    // let obj = {};
    // const bulletChildren = parentBlock.bulletChildren;
    // obj[bulletChildren] = immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS();

// #3 -------------------------------------
    // let newState = Object.assign({}, state.blockChildren[payload.parentBlockIndex]);
    // newState.bulletChildren = immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS();
    // return newState;

// #4 -------------------------------------
    // return Object.assign({}, state, {
    //   blockChildren: {
    //     0: {
    //       bulletChildren: immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS()
    //     }
    //   }
    // });

// #4a -------------------------------------
    // const splice = immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS();

    // return Object.assign({}, state, {
    //   blockChildren: [
    //     parentBlockIndex: {
    //       bulletChildren: splice
    //     }
    //   ]
    // });


// ---------------------------

    return Object.assign({}, state, {
      blockChildren: [
        parentBlockIndex: {
          bulletChildren: immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS()
        }
      ]
    });

  }
});


/*
*/

    // const blocks = state.blockChildren;
    // let bullets = [];

    // blocks.map(block =>
    //   block.bulletChildren.map(bullet =>
    //     bullets.push(bullet)
    //   ));


    // const immutableBulletChildren = Immutable.List(bullets);
