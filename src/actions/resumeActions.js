import { UPDATE_RESUME_WITH_SERVER_RESPONSE, DROP_BULLET, UPDATE_LOCAL_STATE } from 'constants/resumeConstants';

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

export function updateResumeState (payload) { // rename to "serverupdate"
  return {
    type: UPDATE_RESUME_WITH_SERVER_RESPONSE,
    payload: payload
  };
}

const testUserSendResume = {
  resumeId: 1,
  resumeTitle: 'win',
  resumeHeader: {
    name: 'win',
    profession: 'win',
    city: 'win',
    state: 'win',
    displayEmail: 'win@win.com',
    phone: 'win-win',
    webLinkedin: 'linkedin.com/win',
    webOther: 'github.com/number23'
  },
  blockChildren: [
    { blockId: 1,
      bulletChildren: [{bulletId: 1, text: 'My first bullet'}, {bulletId: 2, text: 'SECONDS'}],
      companyName: 'Aww yah 1',
      jobTitle: 'Win',
      year: '2015',
      location: 'San Francisco, CA'
    }
  ]
};

export function sendResumeToServerAsync(sentResumeObj) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {

    return fetch('http://localhost:3000/api/resumeheader', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sentResumeObj)
      })
      .then(response => response.json())
      .then(serverResumeJSON =>
        dispatch(updateResumeState(serverResumeJSON))
      )

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}



////////////////////////////////////////////////
//    old stuff from userFormActions.js       //

// export function saveForm(payload) {
//   return {
//     type: SAVE_FORM,
//     payload: payload
//   };
// }

// export function enableSubmit(payload) {
//   return {
//     type: ENABLE_SUBMIT,
//     payload: payload
//   };
// }

// export function disableSubmit(payload) {
//   return {
//     type: DISABLE_SUBMIT,
//     payload: payload
//   };
// }
