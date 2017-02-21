import { combineReducers } from 'redux';

import { reducer as drawer } from '../modules/NavigationDrawer';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducer as intl } from './intl';
import { reducers as restReducers } from './rest';

const reducers = {
  // Navigation drawer state
  drawer,

  // Internationalization state
  intl,

  // Error snackbar component state
  err,

  // REST API endpoints' state
  ...restReducers,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
