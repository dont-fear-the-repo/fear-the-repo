import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import goHome                 from './goHome';
import saveTextFoo               from './saveText';

export default combineReducers({
  counter,
  goHome,
  saveTextFoo,
  router: routerStateReducer
});
