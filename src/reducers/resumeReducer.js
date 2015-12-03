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
    years: '2012-2011',
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
      blockChildren: immutableBlockChildren.splice(payload.index, 1).splice(payload.atIndex, 0, payload.block).toJS()
    });
  },

  [MOVE_BULLET]: (state, payload) => {

    console.log('payload: ', payload)

    const parentBlock = state.blockChildren[payload.parentBlockIndex];
    console.log('parentBlock: ', parentBlock)

    // const blocks = state.blockChildren;
    // let bullets = [];

    // blocks.map(block =>
    //   block.bulletChildren.map(bullet =>
    //     bullets.push(bullet)
    //   ));


    // const immutableBulletChildren = Immutable.List(bullets);

    const immutableBulletChildren = Immutable.List(parentBlock.bulletChildren)

    let obj = {};
    const blockChildren = parentBlock.bulletChildren;
    obj.blockChildren = immutableBulletChildren.splice(payload.index, 1).splice(payload.atIndex, 0, payload.bullet).toJS();;

    console.log('obj: ', obj)

    // immutableBulletChildren.splice(payload.index, 1).splice(payload.atIndex, 0, payload.bullet).toJS();

    // TODO
    // get index of block where dragged bullet lives

    // blocks.map(block =>
    //   block.bulletChildren.map(bullet =>
    //     ))

  // want to update blockChildren[index of block where dragged bullet lives].bulletChildren
                                // [payload.parentBlockId]

    return Object.assign({}, state, obj);
  }
});
