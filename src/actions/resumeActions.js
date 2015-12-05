import { UPDATE_RESUME_WITH_SERVER_RESPONSE,
         DROP_BULLET,
         UPDATE_LOCAL_STATE,
         MOVE_BLOCK,
         UPDATE_LOCAL_STATE_HEADER,
         UPDATE_LOCAL_STATE_FOOTER,
         UPDATE_LOCAL_STATE_SAVEPRINT,
         UPDATE_LOCAL_STATE_BLOCKS,
         SERVER_IS_SAVING_UPDATE,
         CLIENT_IS_DIRTY_UPDATE } from 'constants/resumeConstants';

////////////////////////////////////////////////////////////////////////
//                                                                    //
// TODO: needs to catch errors from the server, and set state flags   //
//                                                                    //
////////////////////////////////////////////////////////////////////////





export function dropBullet (payload) {
  return {
    type: DROP_BULLET,
    payload: payload
  };
}


export function updateLocalState (payload) {
  return {
    type: UPDATE_LOCAL_STATE,
    payload: payload
  };
}

export function updateLocalStateHeader (payload) {
  return {
    type: UPDATE_LOCAL_STATE_HEADER,
    payload: payload
  };
}

export function updateLocalStateFooter (payload) {
  return {
    type: UPDATE_LOCAL_STATE_FOOTER,
    payload: payload
  };
}

export function updateLocalStateSavePrint (payload) {
  return {
    type: UPDATE_LOCAL_STATE_SAVEPRINT,
    payload: payload
  };
}

export function updateLocalStateBlocks (payload) {
  return {
    type: UPDATE_LOCAL_STATE_BLOCKS,
    payload: payload
  };
}

export function moveBlock (payload) {
  return {
    type: MOVE_BLOCK,
    payload: payload
  };
}

export function updateResumeWithServerResponse (payload) {
  return {
    type: UPDATE_RESUME_WITH_SERVER_RESPONSE,
    payload: payload
  };
}

export function getResumeFromServerDBAsync (payload) { // rename to "serverupdate"
  return function(dispatch) {
    console.log('hola mundo')
    return fetch('http://localhost:3000/api/resume/giveMeTestResume', {
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
      )

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}


export function sendResumeToServerAsync(sentResumeObj) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {

    return fetch('http://localhost:3000/api/resume/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sentResumeObj)
      })
      .then(response => response.json())
      .then(serverResponseJavascriptObject =>
        dispatch(updateResumeWithServerResponse(serverResponseJavascriptObject))
      )

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}
