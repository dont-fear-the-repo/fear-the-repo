import { createReducer } from '../utils';
import Immutable from 'immutable';
import _ from 'underscore';

import { dummyResume,
         blankBulletBlock,
         blankNoBulletBlock } from 'utils/dummyResume';

import { ADD_BLOCK,
         ADD_BULLET,
         CLIENT_IS_DIRTY_UPDATE,
         HIDE_BLOCK,
         HIDE_BULLET,
         MOVE_BLOCK,
         MOVE_BULLET,
         POPULATE_DATA_FROM_LINKEDIN,
         RESET_RESUME,
         SERVER_IS_SAVING_UPDATE,
         UPDATE_LOCAL_STATE,
         UPDATE_LOCAL_STATE_BLOCKS,
         UPDATE_LOCAL_STATE_BULLETS,
         UPDATE_LOCAL_STATE_FOOTER,
         UPDATE_LOCAL_STATE_HEADER,
         UPDATE_LOCAL_STATE_SAVEPRINT,
         UPDATE_RESUME_WITH_SERVER_RESPONSE,
         UPDATE_THESAURUS_RESULTS,
         WORD_SEARCH } from 'constants/resumeConstants';


// resumeState.resumeTitle is what the front end sees
// req.body.resumeTitle is what the server sees

const initialState = dummyResume;

export default createReducer(initialState, {

  [ADD_BLOCK]: (state, payload) => {
    const newState = { ...state };
    let newBlock;

    if (payload === 'bullets') {
      newBlock = blankBulletBlock();
    } else if (payload === 'no bullets') {
      newBlock = blankNoBulletBlock();
    }  // add additional block types here

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
    const newState = { ...state };
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
    const newBlockChildren = immutableBlockChildren.splice(payload.blockIndex, 1)
                                                   .splice(payload.atIndex, 0, payload.block)
                                                   .toJS();
    return {
      ...state,
      blockChildren: newBlockChildren
    };
  },

  [MOVE_BULLET]: (state, payload) => {
    const newState = { ...state };
    const parentBlock = payload.blockChildren[payload.parentBlockIndex];
    const immutableBulletChildren = Immutable.List(parentBlock.bulletChildren);

    newState.blockChildren[payload.parentBlockIndex].bulletChildren = immutableBulletChildren.splice(payload.bulletIndex, 1)
                                                                                             .splice(payload.atIndex, 0, payload.bullet)
                                                                                             .toJS();
    return newState;
  },

  [POPULATE_DATA_FROM_LINKEDIN]: (state, payload) => {
    let _companyName, _endYear, _jobTitle, _startYear, _text;

    if (payload.positions._total) {
      _companyName = payload.positions.values[0].company.name || '[company name]';
      _jobTitle = payload.positions.values[0].company.title || '[job title]';
      _text = payload.positions.values[0].summary ||  '[contribution to project]';
      _startYear = payload.positions.values[0].startDate.year ||  '[enter start year]';
      if (payload.positions.values[0].isCurrent) {
        _endYear = new Date().getFullYear();
      } else {
        _endYear = payload.positions.values[0].endDate.year || '[enter end year]';
      }
    } else {
      _companyName =  '[company name]';
      _jobTitle = '[job title]';
      _text = '[contribution to project]';
      _startYear = '[enter start year]';
      _endYear = '[enter end year]';
    }

    const newState = { ...state };
    newState.resumeHeader = {
      name: (payload.firstName || 'Your') + ' ' + (payload.lastName || 'Full Name'),
      webLinkedin: payload.publicProfileUrl || 'LinkedIn.com/in/YourLinkedIn',
      displayEmail: payload.emailAddress || 'LinkedIn.com/in/YourLinkedIn',
      city: payload.location.name || 'Your City'
    };
    newState.blockChildren[2] = {
      blockId: 3,
      blockType: 'bullets',
      archived: false,
      companyName: _companyName,
      jobTitle: _jobTitle,
      bulletChildren: [{
        bulletId: 105,
        archived: false,
        parentBlockId: 3,
        text: _text
      }, {
        bulletId: 106,
        archived: false,
        parentBlockId: 3,
        text: '[contribution to project]'
      }],
      years: _endYear + '-' + _startYear,
      location: '[enter location]'
    };
    return newState;
  },

  [RESET_RESUME]: (state) => {
    return {
      ...state,
      dummyResume
    };
  },

  [SERVER_IS_SAVING_UPDATE]: (state, payload) => {
    const newState = { ...state };
    newState.serverIsSaving = payload;
    return newState;
  },

  [UPDATE_LOCAL_STATE]: (state, payload) => {
    const newProperty = {};
    newProperty[payload.textFieldName] = payload.userInput;
    return {
      ...state,
      newProperty
    };
  },

  [UPDATE_LOCAL_STATE_BLOCKS]: (state, payload) => {
    const newState = { ...state };
    newState.blockChildren[payload.blockIndex][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_BULLETS]: (state, payload) => {
    const newState = { ...state };
    newState.blockChildren[payload.parentBlockIndex].bulletChildren[payload.bulletIndex][payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_FOOTER]: (state, payload) => {
    const newState = { ...state };
    if (payload.textFieldName.slice(0, 6) === 'school') {
      newState.resumeFooter[payload.textFieldName.slice(0, 7)][payload.textFieldName.slice(8)] = payload.userInput;
    } else {
      newState.resumeFooter[payload.textFieldName] = payload.userInput;
    }
    return newState;
  },

  [UPDATE_LOCAL_STATE_HEADER]: (state, payload) => {
    const newState = { ...state };
    newState.resumeHeader[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_LOCAL_STATE_SAVEPRINT]: (state, payload) => {
    const newState = { ...state };
    newState[payload.textFieldName] = payload.userInput;
    return newState;
  },

  [UPDATE_RESUME_WITH_SERVER_RESPONSE]: (state, payload) => {
    return {
      ...state,
      ...payload
    };
  },

  [UPDATE_THESAURUS_RESULTS]: (state, payload) => {
    const thesaurusResults = {};

    if (payload.error !== undefined) {
      _.extend(thesaurusResults, payload);
    } else {
      _.each(payload, (type, key) => {
        if (type.syn !== undefined) {
          if (type.syn.length > 15) {
            type.syn = _.first(type.syn, 15);
          }
          thesaurusResults[key] = type.syn.join(', ');
        }
      });
    }

    return {
      ...state,
      thesaurusResults
    };
  },

  [WORD_SEARCH]: (state, payload) => {
    const searchResults = _.chain(state.blockChildren)
                           .map(block => block.bulletChildren)
                           .flatten()
                           .filter(bullet => bullet.archived === false)
                           .map(bullet => bullet.text)
                           .map(snippet => snippet.toLowerCase().split(' '))
                           .flatten()
                           .filter(word => word.indexOf(payload) !== -1)
                           .value();
    return {
      ...state,
      wordCount: searchResults.length
    };
  }

});
