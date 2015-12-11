import { ADD_BLOCK,
         ADD_BULLET,
         CLIENT_IS_DIRTY_UPDATE,
         DROP_BULLET,
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

////////////////////////////////////////////////////////////////////////
//                                                                    //
// TODO: needs to catch errors from the server, and set state flags   //
//                                                                    //
////////////////////////////////////////////////////////////////////////


export function addBlock(payload) {
  return {
    type: ADD_BLOCK,
    payload
  };
}

export function addBullet(payload) {
  return {
    type: ADD_BULLET,
    payload
  };
}

export function clientIsDirtyUpdate(payload) {
  return {
    type: CLIENT_IS_DIRTY_UPDATE,
    payload: payload
  };
}

export function dropBullet(payload) {
  return {
    type: DROP_BULLET,
    payload: payload
  };
}

export function hideBlock(payload) {
  return {
    type: HIDE_BLOCK,
    payload
  };
}

export function hideBullet(payload) {
  return {
    type: HIDE_BULLET,
    payload
  };
}

export function moveBlock(payload) {
  return {
    type: MOVE_BLOCK,
    payload: payload
  };
}

export function moveBullet(payload) {
  return {
    type: MOVE_BULLET,
    payload: payload
  };
}

export function populateDataFromLinkedIn (payload) {
  return {
    type: POPULATE_DATA_FROM_LINKEDIN,
    payload: payload
  }
}

export function resetResume (payload) {
  return {
    type: RESET_RESUME,
    payload: payload
  };
}

export function serverIsSavingUpdate (payload) {
  return {
    type: SERVER_IS_SAVING_UPDATE,
    payload: payload
  };
}

export function updateLocalState(payload) {
  return {
    type: UPDATE_LOCAL_STATE,
    payload: payload
  };
}

export function updateLocalStateBlocks(payload) {
  return {
    type: UPDATE_LOCAL_STATE_BLOCKS,
    payload: payload
  };
}

export function updateLocalStateBullets(payload) {
  return {
    type: UPDATE_LOCAL_STATE_BULLETS,
    payload: payload
  };
}

export function updateLocalStateFooter(payload) {
  return {
    type: UPDATE_LOCAL_STATE_FOOTER,
    payload: payload
  };
}

export function updateLocalStateHeader(payload) {
  return {
    type: UPDATE_LOCAL_STATE_HEADER,
    payload: payload
  };
}

export function updateLocalStateSavePrint(payload) {
  return {
    type: UPDATE_LOCAL_STATE_SAVEPRINT,
    payload: payload
  };
}

export function updateResumeWithServerResponse (payload) {
  return {
    type: UPDATE_RESUME_WITH_SERVER_RESPONSE,
    payload: payload
  };
}

export function updateThesaurusResults (payload) {
  return {
    type: UPDATE_THESAURUS_RESULTS,
    payload: payload
  };
}

export function wordSearch(payload) {
  return {
    type: WORD_SEARCH,
    payload
  };
}


/* END ACTION CREATORS */

export function getResumeFromServerDBAsync (payload) { // rename to "serverupdate"
  return function(dispatch) {
    console.log('ran getResumeFromServerDBAsync in resumeActions.js')
    return fetch('http://localhost:3000/api/resume/get', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(serverResponseJavascriptObject =>
        dispatch(updateResumeWithServerResponse(serverResponseJavascriptObject))
      ).then((action) =>
        dispatch(serverIsSavingUpdate('resumeHeader.name of recieved Resume:' + JSON.stringify(action.payload.resumeHeader.name)))
      ) // this needs to eventually be a server response that has {text: 'successful save!'} added to the resume body object.

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}

export function sendResumeToServerAsync(sentResumeObj) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {
    console.log('ran sendResumeToServerAsync in resumeActions.js')
    return fetch('http://localhost:3000/api/resume/update', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sentResumeObj)
      })
      .then(response => response.json())
      .then(serverResponse =>
        dispatch(serverIsSavingUpdate(serverResponse.text))
      )
      .then(() =>
        dispatch(clientIsDirtyUpdate(false))
      )
    // In a real world app, you also want to
    // catch any error in the network call.
  };
}


export function getThesaurusResultsAsync (thesaurusQuery) { // rename to "serverupdate"
  return function(dispatch) {
    console.log('ran getThesaurusResultsAsync in resumeActions.js')
    const queryURL = 'http://words.bighugelabs.com/api/2/ecb6566c60b2ee6f4c85013ebfb5e70b/' + thesaurusQuery +'/json'
    return fetch(queryURL, {
        method: 'get'
        // body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(thesaurusReplyJSON =>
        dispatch(updateThesaurusResults(thesaurusReplyJSON))
      )
      // .then((action) =>
        // dispatch(serverIsSavingUpdate('resumeHeader.name of recieved Resume:' + JSON.stringify(action.payload.resumeHeader.name)))
      // ) // this needs to eventually be a server response that has {text: 'successful save!'} added to the resume body object.

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}
