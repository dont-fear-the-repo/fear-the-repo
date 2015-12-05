import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import counter from './counter';
import titleBarReducer from './titleBarReducer';
import resumeReducer from './resumeReducer';
import validationReducer from './validationReducer';


export default combineReducers({
  counter,
  titleBarReducer,
  resumeReducer,
  validationReducer,
  router: routerStateReducer
});
