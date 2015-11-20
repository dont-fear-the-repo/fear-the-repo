import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import goHome                 from './goHome';

export default combineReducers({
  counter,
  goHome,
  router: routerStateReducer
});
