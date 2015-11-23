import { SAVE_RESUME } from 'constants/resumeConstants';
//import request from '../_config/superagent';

export function saveResumeRequest (payload) {
  return {
    type: SAVE_RESUME,
    payload: payload
  };
}

export function saveResumeDb(payload){
  return dispatch => {
    dispatch(saveResumeRequest(payload));
      return console.log('in dbSaveResume');
    }
  //   return request
  //     .post()
  //     // ** TODO add url ** // ex. serverUrl + '/saveResume'
  //     .send({
  //       payload: payload
  //     })
  //     .end((err,res={}) => {
  //       err ? dispatch(dbSaveResumeError(err))
  //       : dispatch(dbSaveResumeSucess());
  //     });
  //   };
}


export function dbSaveResumeSucess(){
  return console.log("woo you saved to the database!");
}

export function dbSaveResumeError(err){
  return console.log("there is an error saving resume to db", err);
}

//create action 1. post 2. response