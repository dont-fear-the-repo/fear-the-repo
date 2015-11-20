import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import goHome                 from './goHome';
import saveTextBar               from './saveText';

export default combineReducers({
  counter,
  goHome,
  saveTextBar,
  router: routerStateReducer
});
