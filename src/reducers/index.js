import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import userFormReducer from './userFormReducer';
import titleBarReducer from './titleBarReducer';
import resumeReducer from './resumeReducer';
import validationReducer from './validationReducer';


export default combineReducers({
  counter,
  userFormReducer,
  titleBarReducer,
  resumeReducer,
  validationReducer,
  router: routerStateReducer
});
