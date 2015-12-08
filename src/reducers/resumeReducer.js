import { createReducer } from '../utils';
import Immutable from 'immutable';
import _ from 'underscore';

import { ADD_BLOCK,
         ADD_BULLET,
         CLIENT_IS_DIRTY_UPDATE,
         HIDE_BLOCK,
         HIDE_BULLET,
         MOVE_BLOCK,
         MOVE_BULLET,
         SERVER_IS_SAVING_UPDATE,
         UPDATE_LOCAL_STATE,
         UPDATE_LOCAL_STATE_BLOCKS,
         UPDATE_LOCAL_STATE_BULLETS,
         UPDATE_LOCAL_STATE_FOOTER,
         UPDATE_LOCAL_STATE_HEADER,
         UPDATE_LOCAL_STATE_SAVEPRINT,
         UPDATE_RESUME_WITH_SERVER_RESPONSE } from 'constants/resumeConstants';


// resumeState.resumeTitle is what the front end sees; req.body.resumeTitle is what the server sees.
const initialState = {
  resumeId: 1,
  resumeTitle: 'Resume Version Name',
  resumeTheme: 'Default',
  serverIsSaving: 'no',
  clientFormIsDirty: false,
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
    blockType: 'bullets',
    archived: false,
    companyName: 'Company Name',
    jobTitle: 'Bossman',
    years: '2015',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 1,
      archived: false,
      parentBlockId: 1,
      text: 'My first bullet'
    }, {
      bulletId: 2,
      archived: false,
      parentBlockId: 1,
      text: 'Then I productionalized everything, like the Bossman that I am.'
    }]
  }, {
    blockId: 2,
    blockType: 'bullets',
    archived: false,
    companyName: 'Second Corp.',
    jobTitle: 'Lackey',
    years: '2014, 2013',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 3,
      archived: false,
      parentBlockId: 2,
      text: 'I believe in sentences that end with punctuation'
    }, {
      bulletId: 4,
      archived: false,
      parentBlockId: 2,
      text: 'This is an inflexible belief.'
    }]
  }, {
    blockId: 3,
    blockType: 'bullets',
    archived: false,
    companyName: 'Third Chance',
    jobTitle: 'Intern',
    years: '2012-2011',
    location: 'San Francisco, CA',
    bulletChildren: [{
      bulletId: 5,
      archived: false,
      parentBlockId: 3,
      text: 'Not a great life here, alas.'
    }, {
      bulletId: 6,
      archived: false,
      parentBlockId: 3,
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

  [ADD_BLOCK]: (state, payload) => {
    const newState = { ...state };
    const blockId = Date.now();
    const bulletId = Date.now() + 1;
    let newBlock;

    if (payload === 'bullets') {
      newBlock = {
        blockId: blockId,
        blockType: 'bullets',
        archived: false,
        companyName: 'Company/Project/School Name',
        jobTitle: 'Job Title / Project Role / Degree',
        years: 'StartYear - EndYear, if applicable',
        location: 'City, State / Project URL',
        bulletChildren: [{
          bulletId: bulletId + 1,
          archived: false,
          parentBlockId: blockId,
          text: 'New bullet'
        }, {
          bulletId: bulletId + 2,
          archived: false,
          parentBlockId: blockId,
          text: 'New bullet'
        }]
      };
    } else if (payload === 'no bullets') {
      newBlock = {
        blockId: blockId,
        blockType: 'no bullets',
        archived: false,
        companyName: 'Heading',
        location: 'text, if applicable',
        bulletChildren: [{
          bulletId: bulletId + 1,
          archived: false,
          parentBlockId: blockId,
          text: 'This won\'t be seen'
        }, {
          bulletId: bulletId + 2,
          archived: false,
          parentBlockId: blockId,
          text: 'This won\'t be seen'
        }]
      };
    } else {} // define additional block types here

    newState.blockChildren.push(newBlock);
    return newState;
  },

  [ADD_BULLET]: (state, payload) => {
    const newState = { ...state };
    const newBullet = {
      bulletId: Date.now(),
      archived: false,
      parentBlockId: payload,
      text: 'New Bullet'
    };
    const targetBlock = _.filter(newState.blockChildren, child => child.blockId === payload);
    targetBlock[0].bulletChildren.push(newBullet);
    return newState;
  },

  [CLIENT_IS_DIRTY_UPDATE]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.clientFormIsDirty = payload;
    return newState;
  },

  [HIDE_BLOCK]: (state, payload) => {
    const newState = { ...state };
    const targetBlock = _.filter(newState.blockChildren, child => child.blockId === payload);
    targetBlock[0].archived = true;
    return newState;
  },

  [HIDE_BULLET]: (state, payload) => {
    const newState = { ...state };
    const targetBullet = _.chain(newState.blockChildren)
                          .map(block => block.bulletChildren)
                          .flatten()
                          .filter(bullet => bullet.bulletId === payload)
                          .value();
    targetBullet[0].archived = true;
    return newState;
  },

  [MOVE_BLOCK]: (state, payload) => {
    const immutableBlockChildren = Immutable.List(state.blockChildren);

    return Object.assign({}, state, {
      blockChildren: immutableBlockChildren.splice(payload.blockIndex, 1).splice(payload.atIndex, 0, payload.block).toJS()
    });
  },

  [MOVE_BULLET]: (state, payload) => {
    const parentBlock = payload.blockChildren[payload.parentBlockIndex];
    const immutableBulletChildren = Immutable.List(parentBlock.bulletChildren);

    const newState = Object.assign({}, state);
    newState.blockChildren[payload.parentBlockIndex].bulletChildren = immutableBulletChildren.splice(payload.bulletIndex, 1).splice(payload.atIndex, 0, payload.bullet).toJS();
    return newState;
  },

  [SERVER_IS_SAVING_UPDATE]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.serverIsSaving = payload;
    return newState;
  },

  [UPDATE_LOCAL_STATE]: (state, payload) => {
    const newProperty = {};
    newProperty[payload.textFieldName] = payload.userInput;
    return Object.assign({}, state,
      newProperty);
  },

  [UPDATE_LOCAL_STATE_BLOCKS]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.blockChildren[payload.blockIndex][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_BULLETS]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.blockChildren[payload.parentBlockIndex].bulletChildren[payload.bulletIndex][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_FOOTER]: (state, payload) => {
    const newState = Object.assign({}, state);
    if (payload.textFieldName.slice(0, 6) === 'school') {
      newState.resumeFooter[payload.textFieldName.slice(0, 7)][payload.textFieldName.slice(8)] = payload.userInput;
    } else {
      newState.resumeFooter[payload.textFieldName] = payload.userInput;
    }
    return newState;
  },

  [UPDATE_LOCAL_STATE_HEADER]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState.resumeHeader[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_SAVEPRINT]: (state, payload) => {
    const newState = Object.assign({}, state);
    newState[payload.textFieldName] = payload.userInput;
  },

  [UPDATE_RESUME_WITH_SERVER_RESPONSE]: (state, payload) => {
    return {
      ...state,
      ...payload
    };
  }

});
