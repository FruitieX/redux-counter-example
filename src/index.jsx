import Offline from 'offline-plugin/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { IntlProvider } from 'react-intl-redux';

import Login from './modules/Login';
import ErrorSnackbar from './modules/ErrorSnackbar';
import NavigationDrawer from './modules/NavigationDrawer';
import Header from './modules/Header';

import routeConfigs, { IndexRoute, ConfiguredRoutes } from './utils/routes';

import store, { history } from './utils/store';
import theme from './utils/theme';

const muiTheme = getMuiTheme(theme);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try {
  injectTapEventPlugin();
} catch (e) {
  // ignore errors
  // otherwise we break hot reloading
}

// offline-plugin: Apply updates immediately
// https://github.com/NekR/offline-plugin/blob/master/docs/updates.md
if (process.env.NODE_ENV === 'production') {
  Offline.install({
    onUpdating: () => {
      // console.log('SW Event:', 'onUpdating');
    },

    onUpdateReady: () => {
      // console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      Offline.applyUpdate();
    },

    onUpdated: () => {
      // console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      // TODO: alert user
      // console.log('SW Event:', 'onUpdateFailed');
    },
  });
}

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <div>
            <NavigationDrawer />
            <Header />

            <IndexRoute routeConfig={routeConfigs[0]} />
            <ConfiguredRoutes />

            <ErrorSnackbar />
          </div>
        </ConnectedRouter>
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
);

export default Root;

if (!module.hot) render(<Root />, document.querySelector('react'));
