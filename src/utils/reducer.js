import { combineReducers } from 'redux';

import { reducer as drawer } from '../modules/MenuDrawer';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducer as intl } from './intl';
import { reducers as restReducers } from './rest';

const reducers = {
  // Menu drawer state
  drawer,

  // Routing state (TODO!)
  // routing: routerReducer,

  // Internationalization state
  intl,

  err,

  // REST API
  ...restReducers,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
