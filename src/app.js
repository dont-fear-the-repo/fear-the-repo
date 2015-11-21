import React          from 'react';
import ReactDOM       from 'react-dom';
import Root           from './containers/Root';
import configureStore from './store/configureStore';

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);

const node = (
  <Root store={store}
        debug={__DEBUG__}
        debugExternal={__DEBUG_NW__} />
);

  // Turn this on to watch the store constantly update.
  // store.subscribe(() =>
  // console.log(store.getState())
  // )

ReactDOM.render(node, target);
