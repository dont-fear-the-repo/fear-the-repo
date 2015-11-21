import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import goHome                 from './goHome';
import userForm               from './userForm';

export default combineReducers({
  counter,
  goHome,
  userForm,
  router: routerStateReducer
});
