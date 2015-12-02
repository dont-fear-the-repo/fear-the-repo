import { UPDATE_RESUME_FROM_SERVER, DROP_BULLET } from 'constants/resumeConstants';

export function updateResumeState (payload) {
  return {
    type: UPDATE_RESUME_FROM_SERVER,
    payload: payload
  };
}

export function dropBullet (payload) {
  return {
    type: DROP_BULLET,
    payload: payload
  };
}

export function sendResumeToServerAsync(resume) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function(dispatch) {

    return fetch('http://localhost:3000/api/userinfo', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userId)
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
