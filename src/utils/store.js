import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './persist'

import { reducer as drawer } from '../modules/MenuDrawer';
import rest from './rest';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = {
  // Menu drawer state
  drawer,

  // Routing state (TODO!)
  //routing: routerReducer,

  // Internationalization state (TODO!)
  //intl: intlReducer,

  // REST API
  ...rest.reducers,
}

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, loadState(),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
)

store.subscribe(throttle(() => saveState(store.getState()), 1000))
