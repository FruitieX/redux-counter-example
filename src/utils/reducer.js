import { combineReducers } from 'redux'

import { reducer as drawer } from '../modules/MenuDrawer';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducers as restReducers, } from './rest';

const reducers = {
  // Menu drawer state
  drawer,

  // Routing state (TODO!)
  //routing: routerReducer,

  // Internationalization state (TODO!)
  //intl: intlReducer,

  err,

  // REST API
  ...restReducers,
}

const rootReducer = combineReducers(reducers);
export default rootReducer;
