import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import userFormReducer from './userFormReducer';

export default combineReducers({
  counter,
  userFormReducer,
  router: routerStateReducer
});
