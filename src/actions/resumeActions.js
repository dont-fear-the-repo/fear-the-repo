import { SAVE_RESUME } from 'constants/resumeConstants';

export function saveResume (payload) {
  return {
    type: SAVE_RESUME,
    payload: payload
  };
}

//**TODO Notes by Sujay - DELETE OR FIX ME :)
// export function saveResumeDb(payload){
//   return dispatch => {
//     dispatch(saveResumeRequest(payload));
//       return console.log('in saveResumeDb');
//     }
  //   return request
  //     .post()
  //     // ** TODO add url ** // ex. serverUrl + '/saveResume'
  //     .send({
  //       payload: payload
  //     })
  //     .end((err,res={}) => {
  //       err ? dispatch(saveResumeError(err))
  //       : dispatch(saveResumeSuccess());
  //     });
  //   };
//}


// export function saveResumeSuccess(){
//   return console.log("woo you saved to the database!");
// }

// export function saveResumeError(err){
//   return console.log("there is an error saving resume to db", err);
// }

//create action 1. post 2. response
//npm install superagent