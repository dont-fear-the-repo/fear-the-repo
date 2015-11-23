import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import goHome from './goHome';
import userFormReducer from './userFormReducer';
import resumeReducer from './resumeReducer';


export default combineReducers({
  counter,
  goHome,
  userFormReducer,
  resumeReducer,
  router: routerStateReducer
});
