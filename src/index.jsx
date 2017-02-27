import Offline from 'offline-plugin/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

// material-ui 'next' branch
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';

// Old material-ui
/* eslint-disable import/no-extraneous-dependencies */
import LegacyMuiThemeProvider from 'material-ui-old/styles/MuiThemeProvider';
import legacyGetMuiTheme from 'material-ui-old/styles/getMuiTheme';
/* eslint-enable import/no-extraneous-dependencies */

import { IntlProvider } from 'react-intl-redux';

import ErrorSnackbar from './modules/ErrorSnackbar';
import NavigationDrawer from './modules/NavigationDrawer';
import Header from './modules/Header';

import routeConfigs, { IndexRoute, ConfiguredRoutes } from './utils/routes';

import store, { history } from './utils/store';
import theme from './utils/theme';

const muiTheme = createMuiTheme(theme);
const legacyMuiTheme = legacyGetMuiTheme({ palette: theme.legacyPalette, spacing: theme.spacing });

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

const style = {
  appContainer: {
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  viewContainer: {
    flex: 1,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
};

const Root = () => (
  <Provider store={store}>
    <LegacyMuiThemeProvider muiTheme={legacyMuiTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <IntlProvider>
          <ConnectedRouter history={history}>
            <div style={style.appContainer}>
              <NavigationDrawer />
              <Header />

              <div style={style.viewContainer}>
                <IndexRoute routeConfig={routeConfigs[0]} />
                <ConfiguredRoutes />

                <ErrorSnackbar />
              </div>
            </div>
          </ConnectedRouter>
        </IntlProvider>
      </MuiThemeProvider>
    </LegacyMuiThemeProvider>
  </Provider>
);

export default Root;

if (!module.hot) render(<Root />, document.querySelector('react'));
