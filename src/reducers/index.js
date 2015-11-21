import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import goHome from './goHome';
import userFormReducer from './userFormReducer';

export default combineReducers({
  counter,
  goHome,
  userFormReducer,
  router: routerStateReducer
});
