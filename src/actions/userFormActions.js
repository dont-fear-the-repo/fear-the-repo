import { SAVE_FORM, ENABLE_SUBMIT, DISABLE_SUBMIT } from 'constants/userFormConstants';

export function saveForm(payload) {
  return {
    type: SAVE_FORM,
    payload: payload
  };
}

export function enableSubmit(payload) {
  return {
    type: ENABLE_SUBMIT,
    payload: payload
  };
}

export function disableSubmit(payload) {
  return {
    type: DISABLE_SUBMIT,
    payload: payload
  };
}



export function fetchUser(userId) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch) {
/*{
          // userName: 'please work',
          city: 'chicago',
          email: 'yay',
        }*/

    return fetch('http://localhost:3000/api/userinfo', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userId)
      })
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(userId, json))
      )

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(userId, json) {
  console.log(json);
  return {
    type: RECEIVE_POSTS,
    userId,
    json,
    receivedAt: Date.now()
  }
}
// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(reddit) {

//   // Note that the function also receives getState()
//   // which lets you choose what to dispatch next.

//   // This is useful for avoiding a network request if
//   // a cached value is already available.

//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       // Dispatch a thunk from thunk!
//       return dispatch(fetchPosts(reddit))
//     } else {
//       // Let the calling code know there's nothing to wait for.
//       return Promise.resolve()
//     }
//   }
// }
