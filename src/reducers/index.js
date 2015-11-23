import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import userFormReducer from './userFormReducer';
import titleBarReducer from './titleBarReducer';

export default combineReducers({
  counter,
  userFormReducer,
  titleBarReducer,
  router: routerStateReducer
});
