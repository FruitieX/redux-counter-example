import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import throttle from 'lodash/throttle';

import { saveState, loadState } from './persist';
import rootReducer from './reducer';
import { injectStore } from './rest';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-disable no-underscore-dangle */

export const history = createBrowserHistory();

const store = createStore(connectRouter(history)(rootReducer), loadState(),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);
export default store;

// this is to get rid of cyclic dependencies
// TODO: better way?
injectStore(store);

store.subscribe(throttle(() => saveState(store.getState()), 1000));
